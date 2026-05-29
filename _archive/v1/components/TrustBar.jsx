const TrustBar = () => {
  // 7 placeholder companies — заменить на реальные логотипы клиентов Hakku Enterprise,
  // когда Сергей подтвердит, какие можно публиковать.
  const logos = [
    'Yandex', 'Sber', 'Сибур', 'МТС', 'Альфа', 'X5', 'Лента',
  ];
  const doubled = [...logos, ...logos];

  return (
    <section style={{
      padding: '40px 0', borderTop: '1px solid rgba(0,0,0,.06)',
      overflow: 'hidden', background: '#fff',
    }}>
      <style>{`
        @keyframes hakku-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hakku-marquee-track {
          display: flex;
          gap: 72px;
          width: max-content;
          animation: hakku-marquee 38s linear infinite;
        }
        .hakku-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          marginBottom: 24,
        }}>
          <span style={{
            fontSize: 11, color: 'rgba(0,0,0,.5)',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>Методологию Hakku уже используют</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(0,0,0,.08)' }}/>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* fade-out edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0) 100%)', zIndex: 2, pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg, #fff 0%, rgba(255,255,255,0) 100%)', zIndex: 2, pointerEvents: 'none' }}/>
        <div className="hakku-marquee-track">
          {doubled.map((name, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minWidth: 140, height: 56, padding: '0 24px',
              border: '1px solid rgba(0,0,0,.08)', borderRadius: 12,
              fontFamily: 'Tektur, sans-serif', fontSize: 18, letterSpacing: '-0.01em',
              color: 'rgba(0,0,0,.65)', background: '#fafafa',
              flexShrink: 0,
            }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.TrustBar = TrustBar;
