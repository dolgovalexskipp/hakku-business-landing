// Proof — доказательство концепции. Enterprise-сообщество @hakkuai_bot уже работает:
// 70 платящих за первые недели + измеримые результаты участников. Тёмный акцент.
const Proof = () => {
  const results = [
    { big: '3', unit: 'проекта', sub: 'собственных ИИ-проекта запустили участники' },
    { big: '5+', unit: 'млн ₽', sub: 'сэкономлено за счёт внедрения ИИ' },
    { big: 'Сотни', unit: 'часов', sub: 'освобождено от рутинных задач' },
  ];
  return (
    <section id="proof" data-canvas="ink" style={{ background: '#000', color: '#fff', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <img src="assets/graphic-holo-ring.webp" alt="" style={{
        position: 'absolute', left: -140, top: -120, width: 460, height: 460,
        objectFit: 'contain', opacity: .5, pointerEvents: 'none',
        animation: 'hakku-spin 150s linear infinite',
      }}/>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 860 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Это уже работает · не обещание</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 24px', fontWeight: 400 }}>
            В марте 2026 мы запустили первое ИИ-сообщество для enterprise.<br/>
            <span style={{ background: 'linear-gradient(90deg,#2A3EF4,#D51F75)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>70 платящих участников</span> за первые недели.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.72)', lineHeight: 1.6, margin: 0, maxWidth: 720 }}>
            Сообщество для сотрудников крупнейших компаний — <a href="https://t.me/hakkuai_bot" style={{ color: '#fff', borderBottom: '1px solid rgba(255,255,255,.35)' }}>@hakkuai_bot</a>. Та же команда, та же методика. <b style={{ color: '#fff', fontWeight: 600 }}>бИИзнес</b> — это та же механика, развёрнутая для собственников малого и среднего бизнеса.
          </p>
        </div>

        <div style={{ marginTop: 44, fontSize: 12, color: 'rgba(255,255,255,.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>Результаты участников</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 16, overflow: 'hidden' }} className="grid-3">
          {results.map((r, i) => (
            <div key={i} style={{ background: '#000', padding: '30px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                <span className="numeral" style={{ fontSize: 52, color: '#fff' }}>{r.big}</span>
                <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, color: 'rgba(255,255,255,.7)' }}>{r.unit}</span>
              </div>
              <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,.62)', lineHeight: 1.5 }}>{r.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(255,255,255,.6)', flexWrap: 'wrap' }}>
          <span style={{ width: 22, height: 3, background: 'linear-gradient(90deg,#D51F75,#FD7202)' }}/>
          3 собственных ИИ-проекта · 5+ млн ₽ сэкономлено · сотни часов из-под рутины — за несколько месяцев.
        </div>
      </div>
    </section>
  );
};
window.Proof = Proof;
