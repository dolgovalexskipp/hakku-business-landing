const Idea = () => {
  return (
    <section id="idea" style={{ padding: '140px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="container">
        <div style={{ maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Идея</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 40px', fontWeight: 400,
          }}>
            Системно, а не <span style={{ color: '#D51F75' }}>точечно.</span>
          </h2>
          <p style={{ fontSize: 19, color: 'rgba(255,255,255,.78)', lineHeight: 1.6, maxWidth: 760, margin: 0 }}>
            Большинство применяет ИИ для рутины — пишут письма, делают рассылки, ускоряют отдельные операции. Те, кто меняет процессы целиком, находят бутылочные горлышки в продажах, документообороте, управлении — и ставят на их место ИИ. Это даёт кратный рост прибыли, а не оптимизацию рабочего времени.
          </p>
        </div>
      </div>
    </section>
  );
};

window.Idea = Idea;
