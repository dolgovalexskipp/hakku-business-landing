// Materials — превью материалов сообщества. Маркетинговая витрина «что внутри».
// Карточки ведут на реальные gated-страницы (под паролем) — доказательство + scarcity.
const Materials = () => {
  const items = [
    {
      cat: 'Инфраструктура',
      catColor: '#2A3EF4',
      title: 'Инфраструктура ИИ: зарубежный + российский софт',
      teaser: 'Как собрать два контура — зарубежные модели через свой узел и российские по API. Реальные команды, маршрутизация, резерв на случай блокировки. С готовыми промптами под ваш бизнес.',
      author: 'Александр Долгов',
      photo: 'assets/author-dolgov.jpg',
      meta: 'Разбор · с командами',
      href: '/materials/infrastruktura-ii/',
    },
    {
      cat: 'Инструменты',
      catColor: '#D51F75',
      title: 'Запись и расшифровка встреч: чем пользоваться в 2026',
      teaser: '20+ инструментов по пяти типам — российские и зарубежные. Матрица выбора под задачу, отметки по 152-ФЗ, цены. Чтобы перестать тратить час после каждой встречи на протокол.',
      author: 'Николай Писаренко',
      photo: 'assets/founders/nikolai.jpg',
      meta: 'Подборка · 20+ сервисов',
      href: '/materials/zapis-rasshifrovka-vstrech/',
    },
  ];

  return (
    <section id="materials" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 900 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Материалы сообщества</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            Что внутри: разборы, которые применяются в тот же день
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Каждую неделю — новый практический материал от команды и участников. Не статьи «про ИИ вообще», а пошаговые разборы с командами, промптами и ценами. Вот два примера из библиотеки.
          </p>
        </div>

        <style>{`
          @media (max-width: 860px) { #materials .mat-grid { grid-template-columns: 1fr !important; } }
          #materials .mat-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1), border-color .25s; }
          #materials .mat-card:hover { transform: translateY(-4px); border-color: rgba(0,0,0,.32); }
          #materials .mat-card:hover .mat-go { gap: 12px; }
        `}</style>
        <div className="mat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
          {items.map((m, i) => (
            <a key={i} href={m.href} className="mat-card" style={{
              display: 'flex', flexDirection: 'column', background: '#fff',
              border: '1px solid rgba(0,0,0,.10)', borderRadius: 22, padding: '28px 28px 26px', minHeight: 300,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
                <span style={{ display: 'inline-flex', fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: m.catColor, background: `${m.catColor}14`, borderRadius: 999, padding: '6px 12px' }}>{m.cat}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(0,0,0,.45)' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                  под паролем · участникам
                </span>
              </div>
              <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 24, lineHeight: 1.14, letterSpacing: '-0.01em', margin: '0 0 14px', fontWeight: 400, color: '#000' }}>{m.title}</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(0,0,0,.68)', lineHeight: 1.58, margin: '0 0 22px' }}>{m.teaser}</p>
              <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={m.photo} alt={m.author} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(0,0,0,.1)' }}/>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#000' }}>{m.author}</div>
                    <div style={{ fontSize: 12, color: 'rgba(0,0,0,.5)' }}>{m.meta}</div>
                  </div>
                </div>
                <span className="mat-go" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: m.catColor, fontWeight: 600, transition: 'gap .2s', whiteSpace: 'nowrap' }}>Открыть →</span>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(0,0,0,.6)', flexWrap: 'wrap' }}>
          <span style={{ width: 22, height: 3, background: 'var(--grad-cool, linear-gradient(90deg,#2A3EF4,#D51F75))' }}/>
          Новый материал каждую неделю. Всё, что вышло, остаётся с вами навсегда.
        </div>
      </div>
    </section>
  );
};
window.Materials = Materials;
