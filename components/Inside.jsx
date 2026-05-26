const Inside = () => {
  const items = [
    { n: '01', title: 'Сообщество', body: 'Закрытый канал в Telegram. Тематические разделы и форум-группы по запросам участников.' },
    { n: '02', title: 'Инструменты', body: 'Готовые гайды и шаблоны по пяти ИИ-ролям. Каждый месяц — один сценарий до готового внедрения.' },
    { n: '03', title: 'Эфиры', body: 'Ежемесячный вебинар с разбором кейсов. Подкаст «Где бизнес теряет деньги без ИИ».' },
    { n: '04', title: 'Эксперты', body: 'Office hours с фаундерами клуба. Материалы по безопасности данных и легальной работе с ИИ.' },
  ];
  return (
    <section id="inside" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Что внутри</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: 0, fontWeight: 400, color: '#000',
          }}>
            Четыре слоя ценности.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'rgba(0,0,0,.1)', border: '1px solid rgba(0,0,0,.1)', borderRadius: 24, overflow: 'hidden' }}>
          {items.map((it) => (
            <div key={it.n} style={{ background: '#fff', padding: '36px 32px', minHeight: 240, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 14, color: 'rgba(0,0,0,.35)', letterSpacing: '0.06em' }}>{it.n}</div>
              <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0, fontWeight: 400, color: '#000' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 15, color: 'rgba(0,0,0,.68)', lineHeight: 1.6, margin: 0 }}>
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Inside = Inside;
