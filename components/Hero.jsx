const Hero = () => {
  return (
    <section style={{ position: 'relative', padding: '120px 0 140px', overflow: 'hidden', minHeight: '80vh' }}>
      <img src="./design_system/assets/graphic-chrome-wave.png" alt=""
        style={{
          position: 'absolute', right: -240, top: -100, width: 900, height: 900,
          objectFit: 'contain', opacity: .92, pointerEvents: 'none',
          animation: 'hakku-spin 90s linear infinite',
        }}/>
      <style>{`
        @keyframes hakku-spin { to { transform: rotate(360deg) } }
        @keyframes hakku-fade-up { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ maxWidth: 880, animation: 'hakku-fade-up 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: 'rgba(0, 0, 0, .75)',
            border: '1px solid rgba(0, 0, 0, .15)',
            padding: '8px 16px', borderRadius: 999, marginBottom: 36,
            background: 'rgba(255,255,255,.6)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2A3EF4' }}/>
            Запуск 8 июня 2026
          </span>
          <h1 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
            lineHeight: 0.95, letterSpacing: '-0.02em',
            margin: '0 0 32px', fontWeight: 400, color: '#000',
          }}>
            Рост прибыли<br/>через <span style={{ color: '#2A3EF4' }}>ИИ-трансформацию.</span>
          </h1>
          <p style={{
            fontSize: 19, color: 'rgba(0, 0, 0, .72)', lineHeight: 1.55,
            maxWidth: 560, margin: '0 0 44px',
          }}>
            Закрытый клуб для собственников малого и среднего бизнеса, которые внедряют ИИ системно — и получают измеримый экономический эффект.
          </p>
          <a href="#cta">
            <button style={{ ...btnStyles.primary, fontSize: 16, padding: '18px 36px' }}>
              Стать частью сообщества →
            </button>
          </a>
        </div>
        <div style={{
          marginTop: 80, paddingTop: 32,
          borderTop: '1px solid rgba(0,0,0,.08)',
          maxWidth: 880, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 13, color: 'rgba(0,0,0,.5)', letterSpacing: '0.04em' }}>УЖЕ УЧИМ</span>
          <span style={{ fontSize: 15, color: 'rgba(0,0,0,.85)' }}>
            Яндекс и крупнейшие корпорации России — методология та же, формат для SMB.
          </span>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
