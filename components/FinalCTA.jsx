const FinalCTA = () => {
  return (
    <section id="cta" style={{ padding: '160px 0', borderTop: '1px solid rgba(0,0,0,.06)', position: 'relative', overflow: 'hidden' }}>
      <img src="./design_system/assets/graphic-chrome-gear.png" alt=""
        style={{
          position: 'absolute',
          right: -260, bottom: -240,
          width: 720, height: 720,
          objectFit: 'contain', opacity: 0.18, pointerEvents: 'none',
          animation: 'hakku-spin 110s linear infinite',
          zIndex: 0,
        }}/>
      <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
        <div style={{
          display: 'inline-block', maxWidth: 720,
          padding: '14px 24px', borderRadius: 999,
          background: 'rgba(0,0,0,.06)', border: '1px solid rgba(0,0,0,.1)',
          fontSize: 14, color: 'rgba(0,0,0,.7)', lineHeight: 1.5,
          marginBottom: 28,
        }}>
          ИИ — новый технологический цикл. Как ПК в 1993-м или iPhone в 2007-м.
        </div>
        <h2 style={{
          fontFamily: 'Tektur, sans-serif',
          fontSize: 'clamp(2.6rem, 6vw, 5rem)',
          lineHeight: 1, letterSpacing: '-0.02em',
          margin: '0 auto 40px', fontWeight: 400, maxWidth: 1040, color: '#000',
        }}>
          Войти в клуб до 8 июня — <span style={{ color: '#FD7202' }}>попасть в первую когорту.</span>
        </h2>
        <a href="#"><button style={{ ...btnStyles.primary, fontSize: 17, padding: '20px 40px' }}>Стать частью сообщества →</button></a>
        <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(0,0,0,.55)' }}>
          Открытый онбординг в Telegram-боте · без обязательств до запуска
        </div>
      </div>
    </section>
  );
};

window.FinalCTA = FinalCTA;
