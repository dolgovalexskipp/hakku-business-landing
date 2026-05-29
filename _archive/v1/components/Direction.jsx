const Direction = () => {
  const stages = [
    {
      mark: 'через 1 месяц',
      title: 'Вы видите, где в вашем бизнесе AI добавит к прибыли',
      body: 'Прошли разборы и воркшопы сообщества, определили 2-3 процесса, в которых AI даст измеримый эффект. Запустили первый инструмент лично — он уже работает на вас.',
      meta: 'карта точек роста',
    },
    {
      mark: 'через 3 месяца',
      title: 'AI работает в одной функции — прибыль в ней выросла',
      body: 'Спроектирован и запущен AI-инструмент под один процесс компании: продажи, документооборот или операции. Сотрудники работают с ним ежедневно. Эффект измеряется в P&L.',
      meta: 'первая функция',
    },
    {
      mark: 'через 6 месяцев',
      title: 'AI встроен в несколько функций — рентабельность бизнеса выше',
      body: 'Корпоративная база знаний доступна AI-агентам, несколько процессов автоматизированы, команда умеет проектировать новые сценарии сама. Внедрение нового — рутина.',
      meta: 'операционная модель',
    },
  ];
  return (
    <section id="direction" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)', background: '#fafafa' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Этапы внутри сообщества</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 24px', fontWeight: 400, color: '#000',
          }}>
            От первых разборов — до измеримой прибыли.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Подписка — это постоянный процесс, а не разовое обучение. В первые шесть месяцев вы проходите путь от понимания, где AI принесёт прибыль, до встроенного в операционку AI. Дальше сообщество продолжает обновлять методики — AI меняется ежемесячно.
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
                    fontFamily: 'Tektur, sans-serif', fontSize: 24, lineHeight: 1.2,
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
