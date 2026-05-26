const Levels = () => {
  const levels = [
    {
      n: '01',
      title: 'Личный',
      body: 'Собственник и сотрудники применяют ИИ для своих задач — ускоряют рутину, генерируют тексты. До 60% времени высвобождается.',
      detail: 'Без организации команд эффект может стать негативным: эхо-камера и накопление рисков.',
      meta: 'Здесь — большинство',
      tone: 'muted',
    },
    {
      n: '02',
      title: 'Процессный',
      body: 'ИИ встроен в одну функцию — продажи, поддержку, документооборот. Дают кратный рост метрик: цикл, конверсия, FCR, NPS.',
      detail: 'Без системной координации не приведёт к росту выручки и снижению затрат компании в целом.',
      meta: 'Здесь — лучшие из 95%',
      tone: 'muted',
    },
    {
      n: '03',
      title: 'Системный',
      body: 'ИИ встроен в саму ткань компании: перепроектирует процессы, координирует агентов и людей, улучшает результат бизнеса целиком.',
      detail: 'Главный вопрос — как построить организационную обвязку вокруг ИИ.',
      meta: 'Здесь — лидеры следующего цикла',
      tone: 'accent',
    },
  ];
  return (
    <section style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 64, maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Уровни применения ИИ</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 24px', fontWeight: 400, color: '#000',
          }}>
            На каком уровне находится Ваш бизнес?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.6)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Уровни ИИ-зрелости компании отличаются масштабом эффекта на прибыль. Большинство задерживается на первом и не выходит за него — и поэтому не видит результата.
          </p>
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
                display: 'flex', flexDirection: 'column', gap: 18, minHeight: 360,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 14, color: isAccent ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.4)', letterSpacing: '0.06em' }}>{l.n}</span>
                  <span style={{
                    fontSize: 11, color: isAccent ? '#FCBC60' : 'rgba(0,0,0,.5)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>{l.meta}</span>
                </div>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0, fontWeight: 400 }}>
                  {l.title}
                </h3>
                <p style={{ fontSize: 15, color: isAccent ? 'rgba(255,255,255,.85)' : 'rgba(0,0,0,.78)', lineHeight: 1.6, margin: 0 }}>{l.body}</p>
                <p style={{
                  fontSize: 13, lineHeight: 1.55, margin: 0, marginTop: 'auto',
                  paddingTop: 16, borderTop: `1px solid ${isAccent ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)'}`,
                  color: isAccent ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.5)',
                  fontStyle: 'italic',
                }}>{l.detail}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.Levels = Levels;
