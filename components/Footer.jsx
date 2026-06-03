// Final CTA — вход в сообщество через короткий созвон с одним из основателей.
// Механика: заявка → знакомство → waitlist → оплата к запуску 8 июня.
const FinalCTA = () => {
  const steps = [
    {
      n: '01',
      title: 'Оставляете заявку',
      time: '2 минуты',
      body: 'Короткая анкета в Telegram-боте: компания, выручка, что хотите получить от ИИ. Без обязательств.',
    },
    {
      n: '02',
      title: 'Созвон с одним из основателей',
      time: '20 минут',
      body: 'С Николаем, Сергеем или Сашей — знакомимся, проверяем, что подходим друг другу. Отвечаем на ваши вопросы.',
    },
    {
      n: '03',
      title: 'Попадаете в лист ожидания',
      time: 'до 8 июня',
      body: 'За день до открытия — ссылка на оплату по тарифу. Ядро первой когорты — 50 собственников.',
    },
  ];
  return (
    <section id="cta" data-canvas="ink" style={{ background: '#000', color: '#fff', padding: '96px 0 104px', position: 'relative', overflow: 'hidden' }}>
      <img src="assets/graphic-chrome-gear.webp" alt="" style={{
        position: 'absolute', right: -220, bottom: -220, width: 620, height: 620,
        objectFit: 'contain', opacity: .55, pointerEvents: 'none',
        animation: 'hakku-spin 110s linear infinite',
      }}/>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 820, marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22 }}>Как войти в сообщество</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5.2vw,4.2rem)', lineHeight: 1.03, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400 }}>
            Сначала <span style={{ background: 'linear-gradient(90deg,#2A3EF4,#D51F75,#FD7202)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>созвон с основателем</span>.<br/>Потом — оплата.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,.72)', lineHeight: 1.55, margin: 0, maxWidth: 660 }}>
            Сообщество не продаётся через корзину. Первый шаг — короткое знакомство с одним из нас, чтобы понимать, кто рядом и зачем. Запуск — 8 июня.
          </p>
        </div>

        <style>{`
          @media (max-width: 980px) { #cta .cta-steps { grid-template-columns: 1fr !important; } #cta .cta-arrow { display: none !important; } }
        `}</style>
        <div className="cta-steps" style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr 24px 1fr', gap: 0, alignItems: 'stretch', marginBottom: 48 }}>
          {steps.map((s, i) => (
            <React.Fragment key={s.n}>
              <div style={{
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20,
                padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 32, letterSpacing: '-0.02em', color: '#fff' }}>{s.n}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }}>{s.time}</span>
                </div>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, fontWeight: 400, color: '#fff' }}>{s.title}</h3>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="cta-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.4)', fontSize: 22 }}>→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 22 }}>
          <a href="https://t.me/hakkuai_business_bot"><button style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, padding: '18px 34px', borderRadius: 8, border: 0, background: '#fff', color: '#000', cursor: 'pointer' }}>Оставить заявку в Telegram →</button></a>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Без обязательств · отказаться можно на любом шаге</div>
        </div>
      </div>
    </section>
  );
};

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
