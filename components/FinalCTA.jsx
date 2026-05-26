const FinalCTA = () => {
  return (
    <section id="cta" style={{ padding: '160px 0', borderTop: '1px solid rgba(0,0,0,.06)', position: 'relative', overflow: 'hidden' }}>
      <img src="./design_system/assets/graphic-chrome-gear.png" alt=""
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)', width: 920, height: 920,
          objectFit: 'contain', opacity: 0.85, pointerEvents: 'none',
          animation: 'hakku-spin 110s linear infinite',
        }}/>
      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Запуск 8 июня 2026</div>
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
