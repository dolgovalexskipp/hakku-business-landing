// app.jsx — auth gate + view router for the LMS.
// Two auth paths:
//   1. Telegram session (os.business.hakku.ai): /api/auth/me cookie -> tier from the
//      paid-members sheet. window.__SESSION_TIER drives canAccess() in chrome.jsx.
//   2. Legacy shared password (fallback): PBKDF2 probe stored in localStorage; such
//      users have no __SESSION_TIER so canAccess() defaults them to 'company'.

const AUTH_PROBE = { "salt":"ULERfbQ7eP7hM5rcJs2SRA==", "iv":"dmM/z52LaNMJQvFE", "ct":"hszrx7qxp71upJ2qnSwKX1UZxs/+MJupR7Yb" };

function _b64(s){ var bin=atob(s); var out=new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i); return out; }

async function verifyPassword(pwd){
  if(!pwd) return false;
  try {
    var enc = new TextEncoder();
    var km  = await crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey(
      { name:'PBKDF2', salt:_b64(AUTH_PROBE.salt), iterations:100000, hash:'SHA-256' },
      km, { name:'AES-GCM', length:256 }, false, ['decrypt']
    );
    var buf = await crypto.subtle.decrypt({ name:'AES-GCM', iv:_b64(AUTH_PROBE.iv) }, key, _b64(AUTH_PROBE.ct));
    return new TextDecoder().decode(buf) === 'hakku-os-ok';
  } catch(e){ return false; }
}

// Telegram Login Widget callback — invoked by telegram-widget.js via data-onauth.
window.onTelegramAuth = async function(user){
  try {
    const r = await fetch('/api/auth/telegram', {
      method:'POST', credentials:'same-origin',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    });
    if (r.ok) { location.reload(); return; }
    const j = await r.json().catch(()=>({}));
    window.dispatchEvent(new CustomEvent('hakku-tg-error', { detail: (j && j.error) || 'error' }));
  } catch(e){
    window.dispatchEvent(new CustomEvent('hakku-tg-error', { detail: 'network' }));
  }
};

function App(){
  const [ready, setReady]   = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const [view, setView]     = React.useState('home');
  const [kbTrack, setKbTrack] = React.useState(null); // preselected knowledge-base track

  // nav(view, opts?) — opts.track deep-links the knowledge base to a track stage
  const go = (v, opts) => { if (opts && 'track' in opts) setKbTrack(opts.track); setView(v); };

  React.useEffect(()=>{ (async()=>{
    // 1) Telegram session via backend cookie
    try {
      const r = await fetch('/api/auth/me', { credentials:'same-origin' });
      if (r.ok) {
        const j = await r.json();
        if (j && j.ok) { window.__SESSION_TIER = j.tier || 'pro'; window.__SESSION = j; setAuthed(true); setReady(true); return; }
      }
    } catch(e){}
    // 2) Legacy shared password
    try { var pw = localStorage.getItem('hakku_os_pw'); if (pw && await verifyPassword(pw)) setAuthed(true); } catch(e){}
    setReady(true);
  })(); }, []);

  React.useEffect(()=>{ window.scrollTo(0, 0); }, [view]);

  // ⌘K / Ctrl+K opens the knowledge base search
  React.useEffect(()=>{
    const onKey = (e)=>{ if ((e.metaKey||e.ctrlKey) && (e.key==='k'||e.key==='K')) { e.preventDefault(); setKbTrack(null); setView('knowledge'); } };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  }, []);

  const handleAuth = async (pw) => {
    const ok = await verifyPassword(pw);
    if (ok) {
      try { localStorage.setItem('hakku_os_pw', pw); localStorage.setItem('hakku_os_authed', '1'); } catch(e){}
      setAuthed(true);
    }
    return ok;
  };

  if (!ready) return null;
  if (!authed) return <div className="os-app"><Login onAuth={handleAuth}/></div>;

  const Screen = ({ home:HomeA, trajectory:Trajectory, knowledge:Knowledge, schedule:Schedule, faculty:Faculty }[view]) || HomeA;
  return <div className="os-app"><Screen nav={go} kbTrack={kbTrack}/></div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
