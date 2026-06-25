// Программа июля — конкретный календарь месяца (в отличие от Program — «что внутри»).
// Тема месяца: операционка с ИИ, где собственник перестаёт быть узким местом.
// Публичная версия: темы недель без внутренних кодов; гость вебинара не назван (разрешение).
const JulyProgram = () => {
  const weeks = [
    {
      label: 'Неделя 1', dates: '1–7 июля',
      items: [
        { type: 'Гайд', title: 'Каталог ИИ-сотрудников', body: 'Кого из ИИ-сотрудников можно собрать уже в июле: ассистент собственника, финаналитик, документовед, ассистент бухгалтерии и продаж — карточками «боль → кейс → решение».' },
        { type: 'Гайд', title: 'Промпт-аудитор решений', body: 'Какие решения вы держите на себе зря. ИИ выкладывает их списком и по каждому советует: закодировать в правило, отдать ассистенту или оставить за вами.' },
      ],
    },
    {
      label: 'Неделя 2', dates: '8–14 июля',
      items: [
        { type: 'Видео-разбор', title: 'Персональный ассистент собственника', body: 'От диктофона до повестки: как перестать тонуть во встречах и держать решения не в голове, а в системе.' },
        { type: 'Гайд', title: 'Регламент за 20 минут', body: 'Найм, согласование бюджета, ответы клиентам. Не просто текст регламента, а правило, которое исполняет ассистент — иначе собственник снова узкое место.' },
      ],
    },
    {
      label: 'Неделя 3', dates: '15–21 июля',
      items: [
        { type: 'Видео-разбор', title: 'ИИ — это отдел, а не кнопка', body: 'Разведчик → проектировщик → контролёр. Независимый контролёр ловит дыры до исполнения — и вы перестаёте быть единственным, кто всё проверяет.' },
        { type: 'Видео-разбор', title: 'Где ИИ врёт', body: 'Живая демонстрация: один каверзный вопрос трём ИИ — и как не попасться. Перекрёстная сверка двумя моделями как защита.' },
      ],
    },
    {
      label: 'Неделя 4', dates: '22–28 июля',
      items: [
        { type: 'Вебинар + Q&A', title: 'Оперативка без созвонов', body: 'Как собственник видит компанию — кассу, маржу, статус — в реальном времени, без бесконечных созвонов. Разбор кейсов участников вживую + 30 минут вопросов. Запись и AI-саммари.' },
        { type: 'Гайд', title: 'ОС компании на одной странице', body: 'Шаблон + пример: как компания работает каждый день без собственника в каждом решении.' },
      ],
    },
  ];

  const typeColor = (t) => t.startsWith('Вебинар') ? '#D51F75' : t.startsWith('Видео') ? '#2A3EF4' : 'rgba(0,0,0,.6)';

  return (
    <section id="july" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 940 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Программа · июль 2026</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            Июль: как перестать быть узким местом своей компании.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Тема месяца — операционное управление с ИИ. По две вещи в неделю: гайды, видео-разборы и вебинар с Q&A. Собственник по очереди отдаёт ИИ три роли — делать рутину, проверять и видеть картину.
          </p>
        </div>

        <style>{`
          @media (max-width: 860px) { #july .jp-week { grid-template-columns: 1fr !important; } #july .jp-wlabel { position: static !important; margin-bottom: 4px; } }
          #july .jp-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1), border-color .25s; }
          #july .jp-card:hover { transform: translateY(-3px); border-color: rgba(0,0,0,.30); }
        `}</style>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {weeks.map((w, wi) => (
            <div key={wi} className="jp-week" style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 14, alignItems: 'start' }}>
              <div className="jp-wlabel" style={{ position: 'sticky', top: 90, paddingTop: 6 }}>
                <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 19, color: '#000', letterSpacing: '-0.01em' }}>{w.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(0,0,0,.5)', marginTop: 2 }}>{w.dates}</div>
              </div>
              {w.items.map((it, ii) => (
                <div key={ii} className="jp-card" style={{ background: '#fff', border: '1px solid rgba(0,0,0,.10)', borderRadius: 18, padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 150 }}>
                  <div style={{ display: 'inline-flex', alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: typeColor(it.type), background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 999, padding: '5px 11px' }}>{it.type}</div>
                  <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, fontWeight: 400, color: '#000' }}>{it.title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(0,0,0,.68)', lineHeight: 1.55, margin: 0 }}>{it.body}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(0,0,0,.6)', flexWrap: 'wrap' }}>
          <span style={{ width: 22, height: 3, background: 'var(--grad-cool, linear-gradient(90deg,#2A3EF4,#D51F75))' }}/>
          Ранний доступ закрывается 8 июля — после этого тарифы фиксируются по обычной цене.
        </div>
      </div>
    </section>
  );
};
window.JulyProgram = JulyProgram;
