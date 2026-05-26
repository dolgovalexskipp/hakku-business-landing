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
          display: 'inline-block', maxWidth: 760,
          padding: '14px 24px', borderRadius: 999,
          background: 'rgba(0,0,0,.06)', border: '1px solid rgba(0,0,0,.1)',
          fontSize: 14, color: 'rgba(0,0,0,.7)', lineHeight: 1.5,
          marginBottom: 28,
        }}>
          ИИ — новый технологический цикл. Как ПК в 1993-м или iPhone в 2007-м. Окно для перестройки бизнеса всё ещё открыто.
        </div>
        <h2 style={{
          fontFamily: 'Tektur, sans-serif',
          fontSize: 'clamp(2.6rem, 6vw, 5rem)',
          lineHeight: 1, letterSpacing: '-0.02em',
          margin: '0 auto 28px', fontWeight: 400, maxWidth: 1080, color: '#000',
        }}>
          Запустите ИИ-трансформацию<br/>
          <span style={{ color: '#FD7202' }}>в первой когорте.</span>
        </h2>
        <p style={{
          fontSize: 18, color: 'rgba(0,0,0,.7)', lineHeight: 1.55,
          margin: '0 auto 40px', maxWidth: 720,
        }}>
          Первая когорта собственников малого и среднего бизнеса стартует 8 июня. Рядом — фаундеры Hakku и собственники, которые проходят тот же путь.
        </p>
        <a href="#"><button style={{ ...btnStyles.primary, fontSize: 17, padding: '20px 40px' }}>Войти в первую когорту →</button></a>
        <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(0,0,0,.55)' }}>
          Открытый онбординг в Telegram-боте · без обязательств до запуска
        </div>
      </div>
    </section>
  );
};

window.FinalCTA = FinalCTA;
