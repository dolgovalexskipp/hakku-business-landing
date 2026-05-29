// Контент-план июня — реальный список материалов сообщества. Заход на LTV:
// ценность не в «результате за месяц», а в постоянном потоке контента.
const Program = () => {
  const items = [
    { date: 'уже есть', type: 'Гайд', title: 'Как оплатить нейронки' },
    { date: 'уже есть', type: 'Гайд', title: 'Как настроить Claude' },
    { date: '8.06', type: 'Гайд', title: 'Инфраструктура ИИ: как совместить зарубежный и российский софт' },
    { date: '8.06', type: 'Гайд', title: 'Настраиваем единый корпоративный контекст', sub: 'Meet и коннектор в Claude' },
    { date: '10.06', type: 'Loom', title: 'Настраиваем personal и company brain' },
    { date: '15.06', type: 'Серия промптов', title: '«Как ИИ может забустить мой бизнес»', sub: 'Рутинные процессы · Продажи' },
    { date: '22.06', type: 'Loom', title: 'Цифровая трансформация войсов сотрудникам. От хаоса к эффективности' },
    { date: '23.06', type: 'Вебинар', title: 'Цифровая революция в Excel', sub: 'Нетворк + контентная часть' },
  ];

  return (
    <section id="program" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)', background: 'var(--ash, #f4f4f5)' }}>
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 940 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Контент-план · июнь 2026</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            От разового курса — к потоку контента каждую неделю.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Сообщество — это не «прошёл и забыл». Вот что выходит к старту в июне. И так каждый месяц: гайды, Loom-разборы, серии промптов и вебинары с нетворком. База и доступ остаются с вами.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,.12)', borderRadius: 16, overflow: 'hidden' }}>
          <style>{`
            .cp-row { display:grid; grid-template-columns: 88px 150px 1fr 130px; gap:20px; align-items:center; padding:20px 26px; border-top:1px solid rgba(0,0,0,.08); }
            .cp-row:first-child { border-top:0; }
            @media (max-width: 860px) {
              .cp-row { grid-template-columns: 1fr; gap:8px; padding:18px 20px; }
              .cp-row .cp-auth { display:none; }
            }
          `}</style>
          {items.map((it, i) => {
            const soon = it.date === 'уже есть';
            return (
              <div className="cp-row" key={i}>
                <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: soon ? 13 : 18, letterSpacing: '-0.01em', color: soon ? 'rgba(0,0,0,.45)' : '#000', whiteSpace: 'nowrap' }}>
                  {soon ? 'уже есть' : it.date}
                </div>
                <div>
                  <span style={{ display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(0,0,0,.6)', background: 'rgba(0,0,0,.05)', border: '1px solid rgba(0,0,0,.1)', borderRadius: 4, padding: '5px 10px' }}>{it.type}</span>
                </div>
                <div>
                  <div style={{ fontSize: 16, color: '#000', lineHeight: 1.4 }}>{it.title}</div>
                  {it.sub && <div style={{ fontSize: 13, color: 'rgba(0,0,0,.5)', marginTop: 4 }}>{it.sub}</div>}
                </div>
                <div className="cp-auth" style={{ fontSize: 13, color: 'rgba(0,0,0,.4)', textAlign: 'right' }}>{soon ? '' : '@dolgovalex'}</div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(0,0,0,.6)', flexWrap: 'wrap' }}>
          <span style={{ width: 22, height: 3, background: 'var(--grad-cool, linear-gradient(90deg,#2A3EF4,#D51F75))' }}/>
          Это только июнь. Календарь пополняется каждую неделю — и остаётся в базе навсегда.
        </div>
      </div>
    </section>
  );
};
window.Program = Program;
