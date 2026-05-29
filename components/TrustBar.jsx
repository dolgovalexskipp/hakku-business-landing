// TrustBar — marquee of real enterprise clients of the mother brand (ink logos).
const TrustBar = () => {
  const logos = [
    'yandex', 'sibur', 'gazpromneft', 'x5', 'ozon', 'rosatom', 'rostelecom',
    'alfabank', 'megafon', 'nestle', 'afk-sistema', 'fosagro',
    'bank-rossii', 'beeline', 'b1', 'akron', 'absolut', 'askona', 'bork',
    't2', 'towers', 'uzum', 'ancor',
  ];
  const doubled = [...logos, ...logos];
  return (
    <section style={{ padding: '38px 0', borderTop: '1px solid rgba(0,0,0,.06)', overflow: 'hidden', background: '#fff' }}>
      <style>{`
        @keyframes hakku-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; align-items: center; gap: 56px; width: max-content; animation: hakku-marquee 60s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-track img { height: 26px; width: auto; opacity: .55; transition: opacity .2s; flex-shrink: 0; }
        .marquee-track img:hover { opacity: 1; }
      `}</style>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 26 }}>
          <span style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Методологию hakku уже используют</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(0,0,0,.08)' }}/>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 110, background: 'linear-gradient(90deg,#fff,rgba(255,255,255,0))', zIndex: 2, pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 110, background: 'linear-gradient(270deg,#fff,rgba(255,255,255,0))', zIndex: 2, pointerEvents: 'none' }}/>
        <div className="marquee-track">
          {doubled.map((name, i) => (
            <img key={i} src={`assets/clients/ink/${name}.png`} alt=""/>
          ))}
        </div>
      </div>
    </section>
  );
};
window.TrustBar = TrustBar;
