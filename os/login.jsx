// login.jsx — entry gate.
//   • os.business.hakku.ai -> Telegram Login Widget (verified against the paid-members
//     sheet by the backend; sets an httpOnly session cookie). onTelegramAuth lives in app.jsx.
//   • Shared access code (password) kept as a fallback for legacy users.
function Login({ onAuth }) {
  const [pw, setPw]   = React.useState('');
  const [err, setErr] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [tgErr, setTgErr] = React.useState('');
  const tgRef = React.useRef(null);

  const isOsDomain = (typeof location !== 'undefined') && /(^|\.)os\.business\.hakku\.ai$/i.test(location.hostname);

  // surface Telegram auth errors raised by onTelegramAuth (app.jsx)
  React.useEffect(()=>{
    const onTgErr = (e)=>{
      const map = {
        not_paid:'Вход не найден среди участников бИИзнес. Если вы оплатили — напишите @hakkuai_business_bot.',
        bad_signature:'Не удалось подтвердить вход через Telegram. Попробуйте ещё раз.',
        sheet_unavailable:'Сервис проверки временно недоступен. Попробуйте через минуту.',
        network:'Нет связи с сервером. Попробуйте ещё раз.'
      };
      setTgErr(map[e.detail] || 'Не удалось войти через Telegram.');
    };
    window.addEventListener('hakku-tg-error', onTgErr);
    return ()=>window.removeEventListener('hakku-tg-error', onTgErr);
  }, []);

  // inject the Telegram Login Widget once (os domain only — bot domain is os.business.hakku.ai)
  React.useEffect(()=>{
    if (!isOsDomain || !tgRef.current || tgRef.current.dataset.loaded) return;
    tgRef.current.dataset.loaded = '1';
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://telegram.org/js/telegram-widget.js?22';
    s.setAttribute('data-telegram-login', 'hakkuai_business_bot');
    s.setAttribute('data-size', 'large');
    s.setAttribute('data-radius', '10');
    s.setAttribute('data-onauth', 'onTelegramAuth(user)');
    s.setAttribute('data-request-access', 'write');
    tgRef.current.appendChild(s);
  }, [isOsDomain]);

  const submit = async (e) => {
    e.preventDefault();
    if (!pw || busy) return;
    setBusy(true); setErr(false);
    const ok = await onAuth(pw);
    setBusy(false);
    if (!ok) setErr(true);
  };

  return (
    <div className="os-login">
      <img className="holo-bg" src="/assets/graphic-holo-ring.webp" alt=""
           style={{ width: 360, top: -70, right: -70, opacity: .9, transform: 'rotate(8deg)' }}/>
      <img className="holo-bg" src="/assets/logo-mark-holo.png" alt=""
           style={{ width: 150, bottom: 60, left: 90, opacity: .85 }}/>

      <div className="os-login-card">
        <div style={{ display:'flex', alignItems:'center', gap:11 }}>
          <Glyph size={30}/>
          <div><Wordmark/></div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="os-eyebrow" style={{ marginBottom: 12 }}>Закрытая среда · для участников</div>
          <h1 className="os-h1" style={{ fontSize: 'clamp(30px, 9vw, 40px)', marginBottom: 14, overflowWrap: 'break-word' }}>Вход в образовательную среду.</h1>
          <p className="os-sub" style={{ maxWidth: 400 }}>
            База знаний сообщества: гайды, Loom-разборы, серии промптов и расписание событий. Доступ — участникам бИИзнес.
          </p>
        </div>

        {isOsDomain && (
          <div style={{ marginTop: 18 }}>
            <div ref={tgRef} style={{ minHeight: 48 }} />
            {tgErr && <div className="os-login-err show" style={{ marginTop: 10 }}>{tgErr}</div>}
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'18px 0 4px', color:'var(--ink-40)', fontSize:12.5 }}>
              <span style={{ flex:1, height:1, background:'var(--ink-12)' }}/> или по коду доступа <span style={{ flex:1, height:1, background:'var(--ink-12)' }}/>
            </div>
          </div>
        )}

        <form className="os-login-form" onSubmit={submit} autoComplete="off" style={{ marginTop: isOsDomain ? 4 : 14 }}>
          <input className="os-login-input" type="password" value={pw} spellCheck={false}
                 placeholder="Код доступа из чата" autoComplete="off"
                 onChange={(e)=>{ setPw(e.target.value); setErr(false); }}/>
          <button className="os-btn block" type="submit" style={{ height: 50 }} disabled={busy}>
            {busy ? 'Проверяем…' : 'Войти →'}
          </button>
          <div className={`os-login-err${err?' show':''}`}>Код не подошёл. Проверьте раскладку и попробуйте ещё раз.</div>
        </form>

        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--ink-12)' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Ещё не в сообществе?</div>
          <p style={{ fontSize: 13.5, color:'var(--ink-55)', lineHeight: 1.5, margin: '0 0 14px', maxWidth: 400 }}>
            бИИзнес — закрытый клуб собственников, которые внедряют ИИ как драйвер выручки и маржи. Программа, условия и тарифы — на странице сообщества.
          </p>
          <div style={{ display:'flex', gap: 10, flexWrap:'wrap' }}>
            <a className="os-btn tg" href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener" style={{ textDecoration:'none' }}>{Icons.tg()} Вступить в сообщество</a>
            <a className="os-btn ghost" href="/" style={{ textDecoration:'none' }}>Все условия и тарифы →</a>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 9, fontSize: 12.5, color:'var(--ink-40)', marginTop: 16 }}>
            <span className="os-dot mag"/> Уже участник, но не пускает? Напишите —{' '}
            <a href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener" style={{ color:'var(--blue)', fontWeight: 500 }}>@hakkuai_business_bot</a>
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color:'var(--ink-40)', lineHeight: 1.4 }}>
          хакку.ии (hakku.ai) · бИИзнес — сообщество собственников бизнеса
        </div>
      </div>
    </div>
  );
}
window.Login = Login;
