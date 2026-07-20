// Hero — «от → к» headline, prominent holographic accent, sourced stat.
const Hero = () => {
  return (
    <section style={{ position: 'relative', padding: '80px 0 72px', overflow: 'hidden' }}>
      {/* signature holographic object — bright + present */}
      <img className="hero-holo" src="assets/graphic-holo-torus.webp" alt="" style={{
        position: 'absolute', right: -170, top: 90, width: 540, height: 540,
        objectFit: 'contain', pointerEvents: 'none', zIndex: 0,
        animation: 'hakku-spin 120s linear infinite, hakku-float 9s ease-in-out infinite',
        filter: 'drop-shadow(0 30px 80px rgba(42,62,244,.18))',
      }}/>
      <style>{`
        @media (max-width: 900px) { .hero-holo { width: 220px !important; height: 220px !important; right: -96px !important; top: -24px !important; opacity: .3; } }
        @media (max-width: 640px) {
          .hero-stat { grid-template-columns: 1fr !important; row-gap: 10px !important; }
          .hero-stat .numeral { font-size: 44px !important; }
        }
      `}</style>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 960 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: 'rgba(0,0,0,.75)',
            border: '1px solid rgba(0,0,0,.12)', padding: '8px 16px', borderRadius: 999,
            marginBottom: 34, background: 'rgba(255,255,255,.6)', whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2A3EF4' }}/>
            Открытие сообщества · 8 июня 2026
          </span>
          <h1 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.6rem, 5.6vw, 4.6rem)',
            lineHeight: 1.0, letterSpacing: '-0.025em',
            margin: '0 0 30px', fontWeight: 400, color: '#000', maxWidth: 620,
          }}>
            От разовых <span style={{ color: '#2A3EF4' }}>ИИ</span>-экспериментов<br/>
            — к системному росту<br/>
            <span style={{
              background: 'linear-gradient(90deg,#2A3EF4 0%,#D51F75 70%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>прибыли вашего бизнеса.</span>
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(0,0,0,.72)', lineHeight: 1.55, maxWidth: 600, margin: '0 0 40px' }}>
            Закрытое сообщество собственников малого и среднего бизнеса. Каждую неделю практики разбирают, где ИИ растит выручку и маржу — а не просто экономит часы. По этой методике команда хакку обучает Яндекс и крупнейшие компании страны.
          </p>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#cta"><button style={{ ...btnStyles.primary, fontSize: 16, padding: '18px 34px' }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.7)'} onMouseOut={e => e.currentTarget.style.filter = 'none'}>Войти в сообщество →</button></a>
            <a href="#pricing" style={{ fontSize: 15, color: 'rgba(0,0,0,.6)', borderBottom: '1px solid rgba(0,0,0,.2)', paddingBottom: 2 }}>Тарифы от 4 900 ₽ в месяц</a>
          </div>
        </div>

        <div className="hero-stat" style={{
          marginTop: 56, paddingTop: 26, borderTop: '1px solid rgba(0,0,0,.08)',
          maxWidth: 940, display: 'grid', gridTemplateColumns: '140px 1fr',
          columnGap: 48, rowGap: 24, alignItems: 'baseline',
        }}>
          <span className="numeral" style={{ fontSize: 52, color: '#000' }}>−60%</span>
          <span style={{ fontSize: 15, color: 'rgba(0,0,0,.78)', lineHeight: 1.55, maxWidth: 560 }}>
            времени на типовые задачи экономит сотрудник с генеративным ИИ. Но сэкономленные часы ещё не прибыль. Здесь — методика, которая доводит экономию до денег в кассе.
            <span style={{ display: 'block', fontSize: 12, color: 'rgba(0,0,0,.45)', marginTop: 5 }}>Stanford × World Bank · 2025</span>
          </span>
        </div>
      </div>
    </section>
  );
};
window.Hero = Hero;
