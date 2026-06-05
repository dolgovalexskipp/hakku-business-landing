// TrustBar — marquee of real enterprise clients of the mother brand.
// Dark canvas + original white logos (no ink conversion artifacts).
const TrustBar = () => {
  const logos = [
    'yandex', 'sibur', 'gazpromneft', 'x5', 'ozon', 'rosatom', 'rostelecom',
    'alfabank', 'megafon', 'nestle', 'afk-sistema', 'fosagro',
    'bank-rossii', 'beeline', 'b1', 'akron', 'absolut', 'askona', 'bork',
    't2', 'towers', 'uzum', 'ancor',
  ];
  const doubled = [...logos, ...logos];
  return (
    <section data-canvas="ink" style={{ padding: '44px 0', background: '#000', color: '#fff', overflow: 'hidden' }}>
      <style>{`
        @keyframes hakku-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { display: flex; align-items: center; gap: 64px; width: max-content; animation: hakku-marquee 60s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-track img { height: 30px; width: auto; opacity: .72; transition: opacity .2s; flex-shrink: 0; }
        .marquee-track img:hover { opacity: 1; }
      `}</style>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 22 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Та же методика, по которой команда хакку обучает крупнейших</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.12)' }}/>
          <span style={{ fontSize: 11, color: '#FCBC60', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Теперь — для собственников малого и среднего бизнеса</span>
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 110, background: 'linear-gradient(90deg,#000,rgba(0,0,0,0))', zIndex: 2, pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 110, background: 'linear-gradient(270deg,#000,rgba(0,0,0,0))', zIndex: 2, pointerEvents: 'none' }}/>
        <div className="marquee-track">
          {doubled.map((name, i) => (
            <img key={i} src={`assets/clients/${name}.png`} alt=""/>
          ))}
        </div>
      </div>
    </section>
  );
};
window.TrustBar = TrustBar;
