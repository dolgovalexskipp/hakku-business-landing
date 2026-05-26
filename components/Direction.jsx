const Direction = () => {
  const stages = [
    {
      mark: 'через 1 месяц',
      title: 'У Вас работает первый ИИ-помощник',
      body: 'Собран Ваш личный ассистент: видит почту и встречи, готовит протоколы, отвечает черновиками, помогает с входящими документами. Вы вышли с первого уровня.',
      meta: 'персональный артефакт',
    },
    {
      mark: 'через 3 месяца',
      title: 'У Вас работает первый ИИ-сотрудник',
      body: 'Спроектирован и запущен ИИ под один реальный процесс компании: продажи, документооборот или финансы. Сотрудники работают с ним ежедневно. Метрики функции растут.',
      meta: 'процессный артефакт',
    },
    {
      mark: 'через 6 месяцев',
      title: 'У Вас AI-native инфраструктура',
      body: 'Несколько ИИ-агентов в разных функциях работают вместе. Корпоративная база знаний доступна агентам безопасно. Внедрение нового — рутина, не проект.',
      meta: 'системный артефакт',
    },
  ];
  return (
    <section id="direction" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)', background: '#fafafa' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Этапы трансформации</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 24px', fontWeight: 400, color: '#000',
          }}>
            Из эксперимента — в системную трансформацию.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Подписка — это ритм, а не курс. За первые шесть месяцев Вы проходите путь от одного работающего инструмента до AI-native бизнеса. Дальше движение продолжается — клуб обновляется по мере появления новых инструментов и кейсов.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 36,
            height: 2, background: 'linear-gradient(90deg, rgba(0,0,0,.08), #000)',
          }}/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
            {stages.map((s, i) => {
              const isLast = i === stages.length - 1;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isLast ? '#000' : '#fff',
                    border: `2px solid ${isLast ? '#000' : 'rgba(0,0,0,.4)'}`,
                    zIndex: 1, marginTop: 24,
                  }}/>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {s.mark}
                  </div>
                  <h3 style={{
                    fontFamily: 'Tektur, sans-serif', fontSize: 26, lineHeight: 1.15,
                    letterSpacing: '-0.01em', margin: 0, fontWeight: 400, color: '#000',
                  }}>{s.title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(0,0,0,.7)', lineHeight: 1.6, margin: 0 }}>{s.body}</p>
                  <div style={{
                    marginTop: 'auto', paddingTop: 16,
                    borderTop: '1px solid rgba(0,0,0,.08)',
                    fontSize: 12, color: 'rgba(0,0,0,.5)', letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>{s.meta}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

window.Direction = Direction;
