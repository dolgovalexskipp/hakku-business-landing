// chrome.jsx — shared primitives, icons, REAL data, Sidebar, Topbar.
// Adapted from the design handoff for the live LMS: absolute asset paths,
// real content plan, clickable navigation, logout. Exported to window.

/* ---- Brand glyph (spark/bird) ------------------------------- */
const Glyph = ({ size = 24, color = '#000' }) => (
  <svg width={size} height={size * (63.746 / 75.947)} viewBox="0 0 75.947 63.746" fill={color} style={{ flexShrink: 0 }}>
    <g transform="translate(52.456,1.459)"><path d="M 12.389 59.989 L 23.491 48.887 C 18.463 43.859 15.701 37.15 15.701 29.994 C 15.701 22.822 18.463 16.113 23.491 11.102 L 12.389 0 C 4.41 7.979 0 18.635 0 29.994 C 0 41.354 4.393 52.01 12.389 59.989 Z"/></g>
    <g transform="translate(0,21.328)"><path fillRule="evenodd" d="M 42.418 0 L 42.418 0.001 L 48.578 0.001 L 48.578 15.702 L 39.403 15.702 C 33.149 31.34 17.844 42.418 0 42.418 L 0 26.718 C 14.723 26.718 26.717 14.74 26.717 0 L 42.418 0 Z"/></g>
    <g transform="translate(26.734,0)"><path d="M 7.859 15.718 C 12.199 15.718 15.718 12.199 15.718 7.859 C 15.718 3.519 12.199 0 7.859 0 C 3.519 0 0 3.519 0 7.859 C 0 12.199 3.519 15.718 7.859 15.718 Z"/></g>
  </svg>
);

const Wordmark = () => (
  <span className="os-wordmark">
    <span>хакку.ии</span>
    <span className="bar">|</span>
    <span>б<span className="ii">ИИ</span>знес</span>
  </span>
);

/* ---- icons --------------------------------------------------- */
const I = (p) => <svg width={p.s||16} height={p.s||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={p.c}>{p.children}</svg>;
const Icons = {
  home:   (c)=><I c={c}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></I>,
  book:   (c)=><I c={c}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/></I>,
  video:  (c)=><I c={c}><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/></I>,
  prompt: (c)=><I c={c}><path d="M8 9h8M8 13h5"/><path d="M4 4h16v12H8l-4 4z"/></I>,
  cal:    (c)=><I c={c}><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></I>,
  users:  (c)=><I c={c}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M16.5 20a5.5 5.5 0 0 0-2-4.3"/></I>,
  search: (c)=><I c={c}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></I>,
  star:   (c)=><I c={c}><path d="M12 3.5 14.6 9l6 .5-4.5 4 1.4 5.9L12 16.4 6.5 19.4 7.9 13.5 3.4 9.5l6-.5z"/></I>,
  clock:  (c)=><I c={c}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></I>,
  route:  (c)=><I c={c}><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="5" r="2.4"/><path d="M8.4 5H15a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6.6"/></I>,
  flag:   (c)=><I c={c}><path d="M5 21V4"/><path d="M5 4h12l-2.5 3.5L17 11H5"/></I>,
  chev:   (c)=><I c={c}><path d="m9 6 6 6-6 6"/></I>,
  play:   (c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>,
  dl:     (c)=><I c={c}><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19h14"/></I>,
  check:  (c)=><I c={c}><path d="M5 12.5 10 17.5 19 7"/></I>,
  lock:   (c)=><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>,
  tg:     (c)=><svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className={c}><path d="M21.9 4.3 18.6 20c-.25 1.1-.9 1.37-1.82.85l-5.03-3.7-2.43 2.34c-.27.27-.5.5-1 .5l.36-5.13L17.1 7.1c.4-.36-.09-.56-.62-.2L6.9 13.1l-4.96-1.55c-1.08-.34-1.1-1.08.23-1.6L20.5 2.6c.9-.33 1.69.2 1.4 1.7z"/></svg>,
};

/* ---- real content plan -------------------------------------- */
const AV = {
  alex:    '/assets/founders/alexander.jpg',
  nikolai: '/assets/founders/nikolai.jpg',
  sergei:  '/assets/founders/sergei.jpg',
};
// Material model:
//   kind/k  — format (badge only, secondary axis)
//   track   — learning-progression stage (PRIMARY nav axis): infra→personal→first-agent→team
//   topics  — function/theme tags (real filter; seeds the "AI-сотрудники" catalog)
//   tier    — access level (pro|max|company); wired to the real gate when Telegram auth lands
//   status  — live = ready gated page (auto-opens after LMS login); soon = on the June plan
const MATERIALS = [
  { kind:'Loom',     k:'video',  title:'Как устроена база знаний',    sub:'Короткий обзор: где что лежит и как искать',     auth:'alex',    read:'4 мин',  status:'live', track:'infra',       topics:['Старт','Навигация'],              tier:'pro', href:'/v/kak-ustroena-baza-znaniy-soobschestva/' },
  { kind:'Гайд',     k:'book',   title:'Как оплатить нейронки',       sub:'Карты, посредники, обход ограничений из России', auth:'nikolai', read:'5 мин',  status:'live', track:'infra',       topics:['Инфраструктура','Доступ'],        tier:'pro', href:'/materials/kak-oplatit-nejronki/' },
  { kind:'Гайд',     k:'book',   title:'Как настроить Claude',        sub:'Учётка, оплата и настройка — с видео-разбором',  auth:'nikolai', read:'10 мин', status:'live', track:'infra',       topics:['Инфраструктура','Claude'],        tier:'pro', href:'/materials/kak-nastroit-claude/' },
  { kind:'Гайд',     k:'book',   title:'Инфраструктура ИИ',           sub:'Как совместить зарубежный и российский софт',    auth:'alex',    read:'12 мин', status:'live', track:'infra',       topics:['Инфраструктура','Безопасность'],  tier:'pro', href:'/materials/infrastruktura-ii/' },
  { kind:'Гайд',     k:'book',   title:'Второй мозг',                 sub:'Контекст о вас, который читает любая нейросеть', auth:'alex',    read:'10 мин', status:'live', track:'personal',    topics:['Контекст','Личная польза'],       tier:'pro', href:'/materials/second-brain/' },
  { kind:'Гайд',     k:'book',   title:'Единый мозг компании',        sub:'Один контекст для всех ваших ИИ',                auth:'alex',    read:'10 мин', status:'live', track:'team',        topics:['Контекст','Компания'],            tier:'max', href:'/materials/company-brain/' },
  { kind:'Гайд',     k:'book',   title:'ИИ-ассистент собственника',   sub:'Из диктофона — в готовую повестку и поручения',  auth:'alex',    read:'10 мин', status:'live', track:'first-agent', topics:['Продуктивность','Кейс','Рутина'], tier:'pro', href:'/materials/assistent-sobstvennika/' },
  { kind:'Гайд',     k:'book',   title:'Где ИИ врёт — и как не попасться', sub:'Эхо-камера, выдумки и проверка на доверие',  auth:'alex',    read:'8 мин',  status:'live', track:'personal',    topics:['Безопасность','Личная польза'],   tier:'pro', href:'/materials/gde-ii-vret/' },
  { kind:'Подборка', k:'prompt', title:'Запись и расшифровка встреч', sub:'20+ инструментов, матрица выбора, 152-ФЗ',       auth:'nikolai', read:'8 мин',  status:'live', track:'personal',    topics:['Продуктивность','Безопасность'],  tier:'pro', href:'/materials/zapis-rasshifrovka-vstrech/' },
  { kind:'Промпты',  k:'prompt', title:'«Как ИИ забустит мой бизнес»', sub:'Серия промптов · рутина · продажи',             auth:'sergei',  read:'серия', status:'soon', track:'first-agent', topics:['Продажи','Рутина'],               tier:'pro', date:'15 июн', d:'15.06' },
  { kind:'Loom',     k:'video',  title:'Цифровая трансформация войсов', sub:'От хаоса в чатах — к системе',                 auth:'alex',    read:'16 мин', status:'live', track:'first-agent', topics:['Кейс','Автоматизация'],           tier:'max', href:'/v/tsifrovaya-transformatsiya-voysov/' },
  { kind:'Вебинар',  k:'book',   title:'Революция в Excel',           sub:'Конспект эфира: ИИ внутри таблицы, демо, промпты', auth:'alex',   read:'10 мин', status:'live', track:'personal',    topics:['Кейс','Продуктивность'],          tier:'pro', href:'/materials/revolyuciya-v-excel/' },
  { kind:'Гайд',     k:'book',   title:'Каталог ИИ-сотрудников',      sub:'5 ролей: боль → кейс → решение. Кого собрать первым', auth:'alex', read:'12 мин', status:'live', track:'first-agent', topics:['Кейс','Рутина','Продажи'],       tier:'pro', href:'/materials/katalog-ii-sotrudnikov/', isNew:true },
  { kind:'Промпты',  k:'prompt', title:'Промпт-аудитор решений',      sub:'Найдите решения, которые принимаете зря',        auth:'alex',    read:'7 мин',  status:'live', track:'personal',    topics:['Продуктивность','Рутина'],        tier:'pro', href:'/materials/prompt-auditor/', isNew:true },
];
const liveCount = MATERIALS.filter(m=>m.status==='live').length;
const soonCount = MATERIALS.length - liveCount;
// russian plural: 1 материал / 2 материала / 5 материалов
const matPlural = (n) => {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return `${n} материал`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${n} материала`;
  return `${n} материалов`;
};
// materials авторства спикера — считается из реестра, не хардкодом
const matCountByAuthor = (id) => MATERIALS.filter(m => m.auth === id && m.status === 'live').length;

/* ---- taxonomy: learning track (primary) + access tiers ------ */
const TRACKS = [
  { id:'infra',       n:1, t:'Базовая инфраструктура', short:'Инфраструктура',  d:'Оплата, доступ и настройка инструментов' },
  { id:'personal',    n:2, t:'Личная польза',          short:'Личная польза',   d:'Разгрузить свой день с ИИ' },
  { id:'first-agent', n:3, t:'Первый ИИ-помощник',     short:'Первый помощник', d:'Первая рабочая роль — продажи, рутина' },
  { id:'team',        n:4, t:'Передача в команду',     short:'В команду',       d:'Единый контекст и доступы для сотрудников' },
];
const TIERS = { pro:'ПРО', max:'МАКС', company:'Компания' };
const TIER_RANK = { pro:1, max:2, company:3 };
// Access tier of the current viewer. Hard-coded while the shared password is the
// only gate (everyone sees everything). Wire to the real Telegram/billing auth later.
const USER_TIER = 'company';
const canAccess = (m) => TIER_RANK[window.__SESSION_TIER || USER_TIER] >= TIER_RANK[m.tier || 'pro'];
const trackById = (id) => TRACKS.find(t => t.id === id);
const countByTrack = (id) => MATERIALS.filter(m => m.track === id && m.status === 'live').length;
const ALL_TOPICS = [...new Set(MATERIALS.flatMap(m => m.topics || []))];

const LECTURERS = [
  { id:'nikolai', name:'Николай Писаренко', role:'сооснователь · хакку.ии', tg:'@npisarenko', img:AV.nikolai,
    bio:'PwC, СИБУР, СберУниверситет. Спикер 100+ конференций, 10+ лет в корпоративном обучении и ИИ-трансформации. В сообществе отвечает за методологию и корпоративный контекст — как встроить ИИ в процессы компании системно, без хаоса в чатах.',
    tags:['Методология','Корпоративный контекст','Процессы','Обучение'] },
  { id:'sergei', name:'Сергей Ершов', role:'сооснователь · хакку.ии', tg:'@sershov', img:AV.sergei,
    bio:'CPO/CEO Edutoria (образовательная платформа Сбера), директор по развитию Ultimate Education. Продукт и образование, автор каналов про ИИ и технологии. Ведёт серии промптов и вебинары с разбором кейсов выручки и маржи.',
    tags:['Продукт','Промпт-инжиниринг','Продажи','EdTech'] },
  { id:'alex', name:'Саша Долгов', role:'сооснователь · бИИзнес', tg:'@dolgovalex', img:AV.alex,
    bio:'Основатель VEYRA (голосовые ИИ-агенты). McKinsey → Skyeng → собственная компания, построенная с нуля вокруг ИИ. Практик ИИ-интеграций: ведёт гайды по инфраструктуре и настройке инструментов — от оплаты нейронок до второго мозга.',
    tags:['ИИ-инфраструктура','Claude','Автоматизация'] },
];

const navData = [
  { label:'', items:[
    { ic:'home', t:'Главная', view:'home' },
    { ic:'route', t:'Траектория', view:'trajectory' },
  ] },
  { label:'База знаний', items:[
    { ic:'book', t:'Все материалы', count:String(liveCount), view:'knowledge', track:null },
    ...TRACKS.map(tr => ({ sub:true, t:`${tr.n} · ${tr.short}`, count:String(countByTrack(tr.id)), view:'knowledge', track:tr.id })),
  ]},
  { label:'Среда', items:[
    { ic:'cal', t:'Расписание', view:'schedule' },
    { ic:'users', t:'Спикеры', view:'faculty' },
    { ic:'video', t:'Office hours', view:'expert' },
  ]},
];

function osLogout() {
  try { localStorage.removeItem('hakku_os_pw'); localStorage.removeItem('hakku_os_authed'); } catch (e) {}
  try { fetch('/api/auth/logout', { method:'POST', credentials:'same-origin' }).catch(function(){}).finally(function(){ location.reload(); }); }
  catch (e) { location.reload(); }
}

function Sidebar({ active='home', nav=()=>{} }) {
  return (
    <aside className="os-sidebar">
      <div className="os-brand os-clickable" onClick={()=>nav('home')}>
        <Glyph size={26}/>
        <div><Wordmark/><small>образовательная среда</small></div>
      </div>
      <div className="os-search os-clickable" onClick={()=>nav('knowledge')}>{Icons.search()} поиск<span className="kbd">⌘K</span></div>
      <nav className="os-nav">
        {navData.map((g,gi)=>(
          <div className="os-nav-group" key={gi}>
            {g.label && <div className="os-nav-label">{g.label}</div>}
            {g.items.map((it,ii)=>{
              const on = !it.sub && it.view===active;
              return (
                <div key={ii} className={`os-nav-item${it.sub?' sub':''}${on?' active':''}`} onClick={()=>nav(it.view, ('track' in it)?{track:it.track}:undefined)}>
                  {it.sub ? <span className="dot"/> : <span className="ic">{Icons[it.ic]?.()}</span>}
                  <span>{it.t}</span>
                  {it.count && <span className="count">{it.count}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="os-side-foot">
        <div className="os-tg-card">
          <div className="t">{Icons.tg()} Сообщество в Telegram</div>
          <div className="d">Обсуждения, разборы и нетворк — в закрытом чате. База знаний — здесь.</div>
          <a className="lk" href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener">Открыть чат →</a>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 9 }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, background:'var(--ash)', border:'1px solid var(--ink-08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Glyph size={15}/></span>
            <div><div className="nm" style={{ fontSize: 13, fontWeight: 600 }}>Доступ открыт</div><div className="rl" style={{ fontSize: 11, color:'var(--ink-40)' }}>участник бИИзнес</div></div>
          </div>
          <span className="os-logout" onClick={osLogout}>Выйти</span>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ crumbs, actions }) {
  return (
    <div className="os-topbar">
      <div className="os-crumbs">
        {crumbs.map((c,i)=>(
          <React.Fragment key={i}>
            {i>0 && <span className="sep">/</span>}
            {i===crumbs.length-1 ? <b>{c}</b> : <span>{c}</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="spacer"/>
      {actions}
    </div>
  );
}

Object.assign(window, { Glyph, Wordmark, Icons, AV, MATERIALS, LECTURERS, liveCount, soonCount, matPlural, matCountByAuthor, TRACKS, TIERS, USER_TIER, canAccess, trackById, countByTrack, ALL_TOPICS, Sidebar, Topbar, osLogout });
