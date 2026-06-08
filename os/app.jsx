// app.jsx — auth gate + view router for the LMS.
// Password is verified by decrypting a probe blob (the password itself is never
// stored in plaintext anywhere). On success it's saved to localStorage, which
// also auto-opens every gated material page. Telegram auth is intentionally
// absent until paid-user accounts exist.

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

function App(){
  const [ready, setReady]   = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const [view, setView]     = React.useState('home');

  React.useEffect(()=>{ (async()=>{
    try { var pw = localStorage.getItem('hakku_os_pw'); if (pw && await verifyPassword(pw)) setAuthed(true); } catch(e){}
    setReady(true);
  })(); }, []);

  React.useEffect(()=>{ window.scrollTo(0, 0); }, [view]);

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

  const Screen = ({ home:HomeA, knowledge:Knowledge, schedule:Schedule, faculty:Faculty }[view]) || HomeA;
  return <div className="os-app"><Screen nav={setView}/></div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
