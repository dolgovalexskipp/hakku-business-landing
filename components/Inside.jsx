const Inside = () => {
  const items = [
    {
      n: '01',
      title: 'Самые свежие подходы внедрения ИИ',
      body: 'Подборки лучших практик из реальных кейсов, которые мы и сообщество собираем по ходу запуска инструментов. Обновляются ежемесячно.',
    },
    {
      n: '02',
      title: 'Пожизненный доступ к базе знаний',
      body: 'Все материалы клуба — гайды, разборы, шаблоны, протоколы воркшопов — остаются с вами навсегда. Даже после паузы подписки.',
    },
    {
      n: '03',
      title: 'Воркшопы по поиску процессов под ИИ',
      body: 'Где в вашей компании ИИ принесёт деньги быстрее всего. Карта процессов, приоритизация по эффекту, чек-листы.',
    },
    {
      n: '04',
      title: 'Воркшопы по проектированию ИИ-сотрудников',
      body: 'Соберёте своего ассистента, документоведа или финансового аналитика — с готовым промптом, навыками и регламентом передачи в команду.',
    },
    {
      n: '05',
      title: 'Гайды по современным ИИ-инструментам',
      body: 'Claude, Cursor, n8n, голосовые агенты, агентные платформы. Что выбрать под ваш процесс, как подключить, что не работает.',
      stat: '−60% времени на рабочие задачи · Stanford × World Bank, 2025',
    },
    {
      n: '06',
      title: 'Лайв-эфиры — от 4 в месяц',
      body: 'Разборы кейсов участников, гостевые сессии практиков, обсуждение свежих инструментов. Запись доступна навсегда.',
    },
    {
      n: '07',
      title: 'Office hours — от 4 часов в месяц',
      body: 'Прямые ответы фаундеров клуба на ваши вопросы. Без проброса в чат-бот, без задержек на сутки.',
    },
    {
      n: '08',
      title: 'Гайды и инструкции — каждую неделю',
      body: 'Новый прикладной материал каждые 7 дней: один промпт, один процесс, один разбор инструмента.',
    },
    {
      n: '09',
      title: 'Корпоративная база знаний и безопасность',
      body: 'Как организовать ИИ-доступ к документам компании, не нарушая закон РФ и не отдавая данные в публичные нейросети.',
    },
  ];

  return (
    <section id="inside" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 64, maxWidth: 980 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Что входит в подписку</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 24px', fontWeight: 400, color: '#000',
          }}>
            Девять вещей, которые Вы получаете каждый месяц.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.6)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Подписка — не «доступ к чату». Это инфраструктура для системного внедрения ИИ в Вашу компанию: контент, воркшопы, прикладные артефакты и поддержка экспертов.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(0,0,0,.1)',
          border: '1px solid rgba(0,0,0,.1)',
          borderRadius: 24,
          overflow: 'hidden',
        }}>
          {items.map((it) => (
            <div key={it.n} style={{
              background: '#fff', padding: '32px 28px',
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
            }}>
              <div style={{
                fontFamily: 'Tektur, sans-serif', fontSize: 14,
                color: 'rgba(0,0,0,.32)', letterSpacing: '0.06em',
              }}>{it.n}</div>
              <h3 style={{
                fontFamily: 'Tektur, sans-serif', fontSize: 22,
                lineHeight: 1.15, letterSpacing: '-0.01em',
                margin: 0, fontWeight: 400, color: '#000',
              }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,.68)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                {it.body}
              </p>
              {it.stat && (
                <div style={{
                  marginTop: 4, paddingTop: 12,
                  borderTop: '1px solid rgba(0,0,0,.06)',
                  fontSize: 12, color: 'rgba(0,0,0,.55)', letterSpacing: '0.02em',
                }}>
                  {it.stat}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Inside = Inside;
