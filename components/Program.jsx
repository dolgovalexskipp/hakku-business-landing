// Что внутри сообщества — крупные обещания ценности, без расписания.
// Заход: «sexy», через ценность не через календарь.
const Program = () => {
  const blocks = [
    {
      tag: 'Каждую неделю',
      title: 'Разборы реальных внедрений',
      body: 'Loom-разборы и гайды на основе того, что собственники сообщества пробуют у себя. Что сработало, что нет, во сколько обошлось.',
    },
    {
      tag: 'Ежемесячно',
      title: 'Сборка одного AI-сотрудника',
      body: 'Месяц = один AI-сотрудник из каталога. Стартуем с «AI-помощника собственника». Шаблоны и промпты остаются у вас навсегда.',
    },
    {
      tag: 'Закрытый чат',
      title: 'Сообщество собственников 50–500М',
      body: 'Не курс с лектором. Рядом — те, кто прямо сейчас перестраивает свой бизнес под AI. Команда hakku отвечает в течение дня.',
    },
    {
      tag: 'Office hours',
      title: 'Еженедельные созвоны с командой',
      body: 'Q&A по вашим внедрениям с Сашей, Сергеем и Николаем. По запросу — разбор вашего бизнеса с правом на анонимность.',
    },
    {
      tag: 'База методик',
      title: 'Всё, что вышло — остаётся с вами',
      body: 'Гайды, промпты, шаблоны, инфраструктурные настройки. Доступ к корпоративным VPN-решениям и безопасной работе с данными.',
    },
    {
      tag: 'Hakku enterprise',
      title: 'Методика, по которой учат Яндекс',
      body: 'Те же методические рамки, по которым команда hakku обучает 27+ корпораций, — адаптированы под собственника SMB.',
    },
  ];

  return (
    <section id="program" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)', background: 'var(--ash, #f4f4f5)' }}>
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 940 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Что внутри</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            Не курс на месяц. Среда, которая держит вас в AI-потоке постоянно.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Шесть слоёв ценности, которые работают вместе. Подписка живёт месяцами — методика обновляется в темпе AI-индустрии, а доступ к команде и базе остаётся с вами.
          </p>
        </div>

        <style>{`
          @media (max-width: 1080px) { #program .prog-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 720px)  { #program .prog-grid { grid-template-columns: 1fr !important; } }
          #program .prog-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1), border-color .25s; }
          #program .prog-card:hover { transform: translateY(-4px); border-color: rgba(0,0,0,.32); }
        `}</style>
        <div className="prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {blocks.map((b, i) => (
            <div key={i} className="prog-card" style={{
              background: '#fff', border: '1px solid rgba(0,0,0,.10)', borderRadius: 20,
              padding: '28px 26px 30px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220,
            }}>
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(0,0,0,.6)', background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 999, padding: '6px 12px' }}>{b.tag}</div>
              <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, fontWeight: 400, color: '#000' }}>{b.title}</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(0,0,0,.68)', lineHeight: 1.55, margin: 0 }}>{b.body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(0,0,0,.6)', flexWrap: 'wrap' }}>
          <span style={{ width: 22, height: 3, background: 'var(--grad-cool, linear-gradient(90deg,#2A3EF4,#D51F75))' }}/>
          Стартуем 8 июня. Каждую неделю — новый материал. Каждый месяц — новый AI-сотрудник.
        </div>
      </div>
    </section>
  );
};
window.Program = Program;
