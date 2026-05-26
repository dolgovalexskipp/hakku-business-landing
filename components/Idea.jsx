const Idea = () => {
  return (
    <section id="idea" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Идея</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 40px', fontWeight: 400, color: '#000',
          }}>
            Системно, а не <span style={{ color: '#D51F75' }}>точечно.</span>
          </h2>

          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 16,
            padding: '20px 28px', borderRadius: 20,
            background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)',
            marginBottom: 36, flexWrap: 'wrap',
          }}>
            <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 48, lineHeight: 1, letterSpacing: '-0.02em', color: '#000' }}>95%</span>
            <span style={{ fontSize: 15, color: 'rgba(0,0,0,.7)', lineHeight: 1.5, maxWidth: 460 }}>
              корпоративных GenAI-пилотов в мире не дают измеримого эффекта на прибыль и убытки
              <span style={{ display: 'block', fontSize: 12, color: 'rgba(0,0,0,.45)', marginTop: 4 }}>
                MIT NANDA · The GenAI Divide: State of AI in Business 2025
              </span>
            </span>
          </div>

          <p style={{ fontSize: 19, color: 'rgba(0,0,0,.78)', lineHeight: 1.6, maxWidth: 760, margin: 0 }}>
            Большинство применяет ИИ для рутины — пишут письма, делают рассылки, ускоряют отдельные операции. Эффект на бизнес — копеечный. Те, кто меняет процессы целиком, находят бутылочные горлышки в продажах, документообороте, управлении — и ставят на их место ИИ. Это даёт кратный рост прибыли, а не оптимизацию рабочего времени.
          </p>
        </div>
      </div>
    </section>
  );
};

window.Idea = Idea;
