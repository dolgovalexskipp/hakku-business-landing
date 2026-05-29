// Final CTA (dark canvas, holographic gear) + Footer.
const FinalCTA = () => (
  <section id="cta" data-canvas="ink" style={{ background: '#000', color: '#fff', padding: '150px 0', position: 'relative', overflow: 'hidden' }}>
    <img src="assets/graphic-chrome-gear.png" alt="" style={{
      position: 'absolute', right: -200, bottom: -200, width: 620, height: 620,
      objectFit: 'contain', opacity: .85, pointerEvents: 'none',
      animation: 'hakku-spin 110s linear infinite',
    }}/>
    <div className="container" style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
      <div style={{ display: 'inline-block', maxWidth: 760, padding: '12px 22px', borderRadius: 999, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', fontSize: 14, color: 'rgba(255,255,255,.78)', marginBottom: 28 }}>
        AI меняется каждый месяц. Подписка обновляет методику в этом же темпе.
      </div>
      <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.4rem,6vw,5rem)', lineHeight: 1, letterSpacing: '-0.02em', margin: '0 auto 28px', fontWeight: 400, maxWidth: 1000 }}>
        От одиночных экспериментов<br/>— к <span style={{ background: 'linear-gradient(90deg,#2A3EF4,#D51F75,#FD7202)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>сообществу, которое доводит AI до прибыли.</span>
      </h2>
      <p style={{ fontSize: 18, color: 'rgba(255,255,255,.72)', lineHeight: 1.55, margin: '0 auto 38px', maxWidth: 700 }}>
        Сообщество собственников бизнеса открывается 8 июня. Еженедельные разборы, библиотека методик, доступ к команде hakku и собственникам, которые рядом с вами делают свои компании AI-native.
      </p>
      <a href="#"><button style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, padding: '20px 40px', borderRadius: 8, border: 0, background: '#fff', color: '#000', cursor: 'pointer' }}>Войти в сообщество →</button></a>
      <div style={{ marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Открытый онбординг в Telegram-боте · без обязательств до подписки</div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ padding: '60px 0 40px', background: '#000', color: '#fff' }}>
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Glyph size={26} color="#fff"/>
          <Wordmark light/>
        </div>
        <div style={{ display: 'flex', gap: 26, fontSize: 14, color: 'rgba(255,255,255,.65)', flexWrap: 'wrap' }}>
          <a href="https://hakku.ai">основной сайт</a>
          <a href="#">политика</a>
          <a href="#">оферта</a>
          <a href="mailto:hello@hakku.ai">hello@hakku.ai</a>
        </div>
      </div>
      <div style={{ paddingTop: 22, borderTop: '1px solid rgba(255,255,255,.12)', fontSize: 12, color: 'rgba(255,255,255,.45)' }}>© 2026 ИП Писаренко Н.С. · hakku.ai / бИИзнес</div>
    </div>
  </footer>
);

Object.assign(window, { FinalCTA, Footer });
