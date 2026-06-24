// Materials — публичная витрина библиотеки сообщества (маркетинг).
// Логика недоступности: открыт тизер + заблюренное превью реального контента
// под замком → CTA «вступить» в @hakkuai_business_bot. Карточки ведут на
// gated-страницы (под паролем) — доказательство ценности + scarcity.
const Materials = () => {
  const items = [
    {
      cat: 'Вебинар', catColor: '#D51F75',
      title: 'Революция в Excel: ИИ внутри таблицы',
      teaser: 'Запись эфира 87 минут + конспект: как ИИ забирает 80% рутины таблиц. Модель «аналитик + добытчик», живое демо на «грязных» данных, готовые промпты.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Вебинар · запись + 15 глав',
      href: '/materials/revolyuciya-v-excel/',
      peek: ['ПРОМПТ 1 · Опиши данные: какие листы и столбцы…', 'Очисти → Классифицируй по смыслу → Дашборд', '15 таймкодов · запись 87 минут · .md для ИИ'],
    },
    {
      cat: 'Инфраструктура', catColor: '#2A3EF4',
      title: 'Инфраструктура ИИ: зарубежный + российский софт',
      teaser: 'Как собрать два контура — зарубежные модели через свой узел и российские по API. Маршрутизация, резерв на случай блокировки, готовые команды.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Разбор · с командами',
      href: '/materials/infrastruktura-ii/',
      peek: ['Контур 1 — Hysteria2, устойчивый узел…', 'Контур 2 — российские модели по API…', 'Резерв и маршрутизация на случай блока'],
    },
    {
      cat: 'Доступ', catColor: '#2A3EF4',
      title: 'Как завести и настроить Claude из России',
      teaser: 'Рабочая учётка без блокировок: правильный Google, оплата, приложение и расширение. С видео-разбором по шагам.',
      author: 'Николай Писаренко', photo: 'assets/founders/nikolai.jpg', meta: 'Гайд · с видео',
      href: '/materials/kak-nastroit-claude/',
      peek: ['Шаг 1 — «американский» Google под учётку…', 'Шаг 2 — claude.ai, оплата, без СМС…', 'Видео-разбор настройки · 16 минут'],
    },
    {
      cat: 'Доступ', catColor: '#2A3EF4',
      title: 'Как оплатить нейросети из России',
      teaser: 'Карты, посредники и обходы — всё рабочее на 2026. Чтобы платить за зарубежный ИИ без танцев с бубном.',
      author: 'Николай Писаренко', photo: 'assets/founders/nikolai.jpg', meta: 'Гайд',
      href: '/materials/kak-oplatit-nejronki/',
      peek: ['Способ 1 — карта зарубежного банка…', 'Способ 2 — платёжный посредник…', 'Цены, комиссии, что реально работает'],
    },
    {
      cat: 'Контекст', catColor: '#FD7202',
      title: 'Второй мозг: контекст о вас для любой нейросети',
      teaser: 'Один файл, который читает любая модель и сразу знает ваш бизнес, стиль и приоритеты. С готовым шаблоном.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Гайд · с шаблоном',
      href: '/materials/second-brain/',
      peek: ['Кто вы, как принимаете решения, что важно…', 'Шаблон «второго мозга» под копипаст…', 'Подключается к любому ИИ за минуту'],
    },
    {
      cat: 'Продуктивность', catColor: '#D51F75',
      title: 'ИИ-ассистент собственника',
      teaser: 'Из диктофона и записей встреч — готовая повестка, поручения и недельный дайджест. Четыре роли, готовые промпты.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Кейс · с промптами',
      href: '/materials/assistent-sobstvennika/',
      peek: ['Роль 1 — повестка до встречи…', 'Роль 2 — разбор записи на поручения…', '4 готовых промпта · собрать за вечер'],
    },
    {
      cat: 'Безопасность', catColor: '#D51F75',
      title: 'Где ИИ врёт — и как не попасться',
      teaser: 'Эхо-камера, выдумки, ложная уверенность. Как проверять ответы и не принять галлюцинацию за факт.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Разбор',
      href: '/materials/gde-ii-vret/',
      peek: ['Почему модель уверенно выдумывает…', 'Приёмы проверки на доверие…', 'Чек-лист: где не верить с первого раза'],
    },
    {
      cat: 'Контекст', catColor: '#FD7202',
      title: 'Единый мозг компании',
      teaser: 'Один контекст для всех ИИ-сотрудников: термины, процессы, правила. Чтобы агенты говорили на языке вашей компании.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Гайд · уровень Макс',
      href: '/materials/company-brain/',
      peek: ['Словарь статусов и терминов компании…', 'Процессы и правила для всех агентов…', 'Один источник правды для ИИ'],
    },
    {
      cat: 'Инструменты', catColor: '#D51F75',
      title: 'Запись и расшифровка встреч в 2026',
      teaser: '20+ инструментов по пяти типам — российские и зарубежные. Матрица выбора под задачу, отметки по 152-ФЗ, цены.',
      author: 'Николай Писаренко', photo: 'assets/founders/nikolai.jpg', meta: 'Подборка · 20+ сервисов',
      href: '/materials/zapis-rasshifrovka-vstrech/',
      peek: ['5 типов инструментов записи…', 'Матрица выбора + отметки 152-ФЗ…', 'Цены и что брать под вашу задачу'],
    },
    {
      cat: 'Старт', catColor: '#2A3EF4',
      title: 'Как устроена база знаний сообщества',
      teaser: 'Короткий Loom-обзор: где что лежит и как искать. С него начинают новые участники.',
      author: 'Александр Долгов', photo: 'assets/author-dolgov.jpg', meta: 'Loom · 5 минут',
      href: '/v/kak-ustroena-baza-znaniy-soobschestva/',
      peek: ['Где лежат разборы, записи, промпты…', 'Как искать по трекам и темам…', 'Видео-обзор · 5 минут'],
    },
  ];

  const Lock = ({ s = 13, c = '#000' }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  );

  return (
    <section id="materials" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 900 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>Библиотека сообщества</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            Что внутри: разборы, которые применяются в тот же день
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.65)', lineHeight: 1.55, margin: 0, maxWidth: 760 }}>
            Каждую неделю — новый практический материал от команды и участников. Не статьи «про ИИ вообще», а пошаговые разборы с командами, промптами и ценами. Вступление открыто для всех — полный разбор открывается внутри сообщества.
          </p>
        </div>

        <style>{`
          @media (max-width: 1080px) { #materials .mat-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 720px)  { #materials .mat-grid { grid-template-columns: 1fr !important; } }
          #materials .mat-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1), border-color .25s, box-shadow .25s; }
          #materials .mat-card:hover { transform: translateY(-4px); border-color: rgba(0,0,0,.30); box-shadow: 0 18px 44px rgba(0,0,0,.07); }
          #materials .mat-card:hover .mat-go { gap: 12px; }
          #materials .mat-peek .blur { filter: blur(5px); }
        `}</style>

        <div className="mat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {items.map((m, i) => (
            <a key={i} href={m.href} className="mat-card" style={{
              display: 'flex', flexDirection: 'column', background: '#fff',
              border: '1px solid rgba(0,0,0,.10)', borderRadius: 22, padding: '24px 24px 22px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 16 }}>
                <span style={{ display: 'inline-flex', fontFamily: 'Inter, sans-serif', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: m.catColor, background: `${m.catColor}14`, borderRadius: 999, padding: '5px 11px' }}>{m.cat}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,.55)' }}>
                  <Lock s={11} c="rgba(0,0,0,.55)"/> участникам
                </span>
              </div>

              <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, lineHeight: 1.16, letterSpacing: '-0.01em', margin: '0 0 12px', fontWeight: 400, color: '#000' }}>{m.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,.68)', lineHeight: 1.56, margin: '0 0 16px' }}>{m.teaser}</p>

              {/* заблюренное превью реального контента под замком */}
              <div className="mat-peek" style={{ position: 'relative', marginBottom: 18, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,.07)', background: '#f6f6f8' }}>
                <div className="blur" style={{ padding: '13px 15px', fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, lineHeight: 1.75, color: 'rgba(0,0,0,.6)', userSelect: 'none', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {m.peek.map((line, k) => (
                    <div key={k} style={{ overflow: 'hidden', textOverflow: 'clip' }}>{line}</div>
                  ))}
                </div>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, rgba(246,246,248,.25), rgba(246,246,248,.82))' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, fontWeight: 600, color: '#000', background: '#fff', border: '1px solid rgba(0,0,0,.12)', borderRadius: 999, padding: '7px 13px', boxShadow: '0 6px 20px rgba(0,0,0,.08)' }}>
                    <Lock s={12}/> Откроется после вступления
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <img src={m.photo} alt={m.author} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(0,0,0,.1)' }}/>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: '#000' }}>{m.author}</div>
                    <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)' }}>{m.meta}</div>
                  </div>
                </div>
                <span className="mat-go" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: m.catColor, fontWeight: 600, transition: 'gap .2s', whiteSpace: 'nowrap' }}>Открыть →</span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA: вступить → бот */}
        <div style={{
          marginTop: 26, background: '#000', borderRadius: 24, padding: 'clamp(28px,4vw,44px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap',
        }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: 14 }}>
              <Lock s={12} c="rgba(255,255,255,.7)"/> Полный доступ — у участников
            </div>
            <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(1.5rem,3vw,2.1rem)', lineHeight: 1.12, letterSpacing: '-0.02em', margin: '0 0 12px', fontWeight: 400, color: '#fff' }}>
              Это малая часть библиотеки
            </h3>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,.72)', lineHeight: 1.55, margin: 0 }}>
              Все разборы, записи вебинаров, промпты и шаблоны — и новый материал каждую неделю — открываются внутри сообщества. Всё, что вышло, остаётся с вами навсегда.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <a href="https://t.me/hakkuai_business_bot">
              <button style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, padding: '17px 32px', borderRadius: 8, border: 0, background: '#fff', color: '#000', cursor: 'pointer', whiteSpace: 'nowrap' }}
                onMouseOver={e => e.currentTarget.style.filter = 'brightness(.9)'} onMouseOut={e => e.currentTarget.style.filter = 'none'}>
                Вступить в сообщество →
              </button>
            </a>
            <a href="#pricing" style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)', borderBottom: '1px solid rgba(255,255,255,.25)', paddingBottom: 2 }}>Тарифы от 3 900 ₽ — ранняя цена</a>
          </div>
        </div>
      </div>
    </section>
  );
};
window.Materials = Materials;
