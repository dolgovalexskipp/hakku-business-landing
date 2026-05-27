const Levels = () => {
  const levels = [
    {
      n: '01',
      title: 'Личный',
      where: 'Здесь — вы сейчас или ваши сотрудники',
      body: 'Применяете ChatGPT и Claude для своих задач — пишете тексты, генерите идеи. Эффект — экономия времени, без влияния на бизнес-результат.',
      tone: 'muted',
    },
    {
      n: '02',
      title: 'Процессный',
      where: 'Здесь — лучшие из тех, кто пробовал',
      body: 'ИИ встроен в одну функцию: продажи, поддержка, документооборот. Метрики функции растут — цикл, конверсия, NPS. Но прибыль компании пока не меняется.',
      tone: 'muted',
    },
    {
      n: '03',
      title: 'Системный',
      where: 'Здесь — лидеры следующего цикла',
      body: 'ИИ встроен в саму ткань бизнеса: процессы перепроектированы, агенты координируют людей, регулярно появляются новые внедрения. Прибыль растёт системно.',
      tone: 'accent',
    },
  ];
  return (
    <section style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Где вы сейчас</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 28px', fontWeight: 400, color: '#000',
          }}>
            На каком уровне применения ИИ находится ваш бизнес?
          </h2>

          <div style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 16,
            padding: '18px 24px', borderRadius: 20,
            background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)',
            flexWrap: 'wrap', marginBottom: 4,
          }}>
            <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 40, lineHeight: 1, letterSpacing: '-0.02em', color: '#000' }}>95%</span>
            <span style={{ fontSize: 15, color: 'rgba(0,0,0,.7)', lineHeight: 1.5, maxWidth: 540 }}>
              корпоративных пилотов с ИИ не дают измеримого эффекта на прибыль — потому что застревают на первом уровне.
              <span style={{ display: 'block', fontSize: 12, color: 'rgba(0,0,0,.45)', marginTop: 4 }}>
                MIT NANDA · The GenAI Divide: State of AI in Business 2025
              </span>
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {levels.map((l) => {
            const isAccent = l.tone === 'accent';
            return (
              <div key={l.n} style={{
                padding: '36px 32px',
                border: `1px solid ${isAccent ? '#000' : 'rgba(0,0,0,.1)'}`,
                borderRadius: 24,
                background: isAccent ? '#000' : '#fff',
                color: isAccent ? '#fff' : '#000',
                display: 'flex', flexDirection: 'column', gap: 18, minHeight: 320,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 14, color: isAccent ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.4)', letterSpacing: '0.06em' }}>{l.n}</span>
                  <span style={{
                    fontSize: 11, color: isAccent ? '#FCBC60' : 'rgba(0,0,0,.5)',
                    letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'right',
                  }}>{l.where}</span>
                </div>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, fontWeight: 400 }}>
                  {l.title}
                </h3>
                <p style={{ fontSize: 15, color: isAccent ? 'rgba(255,255,255,.85)' : 'rgba(0,0,0,.78)', lineHeight: 1.6, margin: 0 }}>{l.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.Levels = Levels;
