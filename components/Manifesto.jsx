// Manifesto — the core promise: AI as an EBITDA driver, not cost-cutting.
// Dark canvas accent strip — a "key moment", so the signature gradient appears.
const Manifesto = () => {
  return (
    <section id="manifesto" data-canvas="ink" style={{ background: '#000', color: '#fff', padding: '96px 0', overflow: 'hidden', position: 'relative' }}>
      <img src="assets/graphic-holo-knot.webp" alt="" style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)', width: 540, height: 540,
        objectFit: 'contain', opacity: .55, pointerEvents: 'none',
        animation: 'hakku-spin-rev 140s linear infinite',
      }}/>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Манифест</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,4.6vw,3.6rem)', lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 28px', fontWeight: 400 }}>
            AI — это драйвер <span style={{ background: 'linear-gradient(90deg,#D51F75,#FD7202)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>выручки и маржи</span>.<br/>Не «уберём бухгалтера».
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,.72)', lineHeight: 1.6, margin: '0 0 14px', maxWidth: 720 }}>
            Большинство внедрений AI в SMB застревают на оптимизации рутины — пара сэкономленных часов, ноль эффекта на P&L. Мы заходим с другой стороны: какой процесс, если его усилить AI, добавит к выручке или марже — и доводим до измеримого результата.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, overflow: 'hidden', marginTop: 40 }} className="grid-3">
            {[['EBITDA', 'а не «оптимизация рутины»'], ['Выручка и маржа', 'AI встроен в процесс, дающий деньги'], ['Сообщество практиков', 'а не курс с лектором']].map(([h, s]) => (
              <div key={h} style={{ background: '#000', padding: '26px 24px' }}>
                <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 21, letterSpacing: '-0.01em', marginBottom: 8 }}>{h}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', lineHeight: 1.5 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.Manifesto = Manifesto;
