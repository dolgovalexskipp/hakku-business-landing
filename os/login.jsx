// login.jsx — entry gate. Password only (Telegram auth removed until paid-user
// accounts exist). Verifies via an encrypted probe; on success the password is
// stored so every material page auto-opens. onAuth(pwd) -> Promise<bool>.
function Login({ onAuth }) {
  const [pw, setPw]   = React.useState('');
  const [err, setErr] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

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
          <div className="os-eyebrow" style={{ marginBottom: 12 }}>Закрытая среда · по приглашению</div>
          <h1 className="os-h1" style={{ fontSize: 40, marginBottom: 14 }}>Вход в образовательную среду.</h1>
          <p className="os-sub" style={{ maxWidth: 400 }}>
            База знаний сообщества: гайды, Loom-разборы, серии промптов и расписание событий. Доступ — участникам бИИзнес.
          </p>
        </div>

        <form className="os-login-form" onSubmit={submit} autoComplete="off" style={{ marginTop: 4 }}>
          <input className="os-login-input" type="password" value={pw} autoFocus spellCheck={false}
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
            <span className="os-dot mag"/> Уже участник, но нет кода? Напишите —{' '}
            <a href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener" style={{ color:'var(--blue)', fontWeight: 500 }}>@hakkuai_business_bot</a>
          </div>
        </div>
      </div>

      <div style={{ position:'absolute', bottom: 28, left: 0, right: 0, textAlign:'center', fontSize: 12.5, color:'var(--ink-40)' }}>
        хакку.ии (hakku.ai) · бИИзнес — сообщество собственников бизнеса
      </div>
    </div>
  );
}
window.Login = Login;
