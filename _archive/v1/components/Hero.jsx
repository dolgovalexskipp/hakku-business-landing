const Hero = () => {
  return (
    <section style={{ position: 'relative', padding: '120px 0 140px', overflow: 'hidden', minHeight: '80vh' }}>
      <img src="./design_system/assets/graphic-chrome-wave.png" alt=""
        style={{
          position: 'absolute', right: -240, top: -100, width: 820, height: 820,
          objectFit: 'contain', opacity: .55, pointerEvents: 'none',
          animation: 'hakku-spin 90s linear infinite',
          zIndex: 0,
        }}/>
      <style>{`
        @keyframes hakku-spin { to { transform: rotate(360deg) } }
        @keyframes hakku-fade-up { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 940, animation: 'hakku-fade-up 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: 'rgba(0, 0, 0, .75)',
            border: '1px solid rgba(0, 0, 0, .15)',
            padding: '8px 16px', borderRadius: 999, marginBottom: 36,
            background: 'rgba(255,255,255,.6)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2A3EF4' }}/>
            Открытие сообщества · 8 июня 2026
          </span>
          <h1 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(3rem, 6.8vw, 5.6rem)',
            lineHeight: 0.98, letterSpacing: '-0.02em',
            margin: '0 0 32px', fontWeight: 400, color: '#000',
          }}>
            Среда, где <span style={{ color: '#2A3EF4' }}>AI</span><br/>
            работает на прибыль<br/>
            вашего бизнеса.
          </h1>
          <p style={{
            fontSize: 19, color: 'rgba(0, 0, 0, .72)', lineHeight: 1.55,
            maxWidth: 680, margin: '0 0 44px',
          }}>
            Закрытое сообщество собственников. Каждую неделю практикующие профессионалы разбирают, где в бизнесе AI растит прибыль — а не просто экономит часы. По этой же методологии команда Hakku обучает Яндекс и крупнейшие корпорации России.
          </p>
          <a href="#cta">
            <button style={{ ...btnStyles.primary, fontSize: 16, padding: '18px 36px' }}>
              Войти в сообщество →
            </button>
          </a>
        </div>
        <div style={{
          marginTop: 80, paddingTop: 32,
          borderTop: '1px solid rgba(0,0,0,.08)',
          maxWidth: 940, display: 'grid',
          gridTemplateColumns: '120px 1fr',
          columnGap: 48, rowGap: 24, alignItems: 'baseline',
        }}>
          <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em', color: '#000' }}>71%</span>
          <span style={{ fontSize: 15, color: 'rgba(0,0,0,.78)', lineHeight: 1.55 }}>
            крупных компаний РФ уже применяют AI. Большинство — точечно, без эффекта на прибыль. Здесь вы получаете методику и людей, которые помогают довести AI до результата в деньгах.
            <span style={{ display: 'block', fontSize: 12, color: 'rgba(0,0,0,.45)', marginTop: 4 }}>
              Яков и Партнёры × Yandex B2B Tech · 2025
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
