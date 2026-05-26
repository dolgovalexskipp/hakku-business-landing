const Program = () => {
  const weeks = [
    { n: '01', title: 'Базовая инфраструктура', sub: 'Нейросети, доступ, канал клуба' },
    { n: '02', title: 'Личная польза',          sub: 'Ассистент собственника на каждый день' },
    { n: '03', title: 'Первый ИИ-инструмент',   sub: 'Скилл в Claude под Ваш процесс' },
    { n: '04', title: 'Передача в команду',     sub: 'Доступы, регламент, безопасность' },
  ];
  return (
    <section style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 64, maxWidth: 880 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Программа первого месяца</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: '0 0 24px', fontWeight: 400, color: '#000',
          }}>
            От нуля до первого ИИ-инструмента в компании.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.6)', lineHeight: 1.55, margin: 0 }}>
            Каждая неделя — один шаг к работающему результату. Тема первого месяца — ассистент собственника.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {weeks.map((w) => (
            <div key={w.n} style={{ padding: '32px 28px 28px', border: '1px solid rgba(0,0,0,.1)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 220, background: '#fff' }}>
              <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#000' }}>{w.n}</div>
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '0 0 8px', fontWeight: 400, color: '#000' }}>{w.title}</h3>
                <div style={{ fontSize: 14, color: 'rgba(0,0,0,.55)', lineHeight: 1.4 }}>{w.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Program = Program;
