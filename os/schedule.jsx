// schedule.jsx — July 2026 calendar (Mon-start) + upcoming list rail.
// ICS-подписка: /os/hakku-biiznes.ics — отдельный календарь «хакку.ии | бИИзнес».
const ICS_PATH = '/os/hakku-biiznes.ics';
const icsWebcal = () => 'webcal://' + location.host + ICS_PATH;
const icsGoogle = () => 'https://calendar.google.com/calendar/r?cid=' + encodeURIComponent('http://' + location.host + ICS_PATH);
function Schedule({ nav = ()=>{} }) {
  const TG = 'https://t.me/hakkuai_business_bot';
  // день → список событий; полные названия материалов
  const ev = {
    1:  [ { c:'blue',   t:'Гайды: Каталог ИИ-сотрудников · Промпт-аудитор решений' } ],
    13: [ { c:'blue',   t:'Гайд: Регламент за 20 минут' } ],
    16: [ { c:'orange', t:'Финал раннего доступа' }, { c:'mag', t:'Loom: Персональный ассистент собственника' } ],
    20: [ { c:'mag',    t:'Loom: ИИ — это отдел, а не один помощник' }, { c:'mag', t:'Loom: Где ИИ врёт — живая демонстрация' } ],
    22: [ { c:'ink',    t:'Вебинар: Оперативка без созвонов · дата уточняется' } ],
    28: [ { c:'blue',   t:'Гайд: ОС компании на одной странице' } ],
  };
  const days = []; for (let i=1;i<=31;i++) days.push(i);
  const dows = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
  const now = new Date();
  const todayNum = (now.getFullYear()===2026 && now.getMonth()===6) ? now.getDate() : null;
  const upcoming = [
    { d:'1',  m:'июл', dow:'СР', time:'—', kind:'Гайды',   c:'blue',   t:'Каталог ИИ-сотрудников + Промпт-аудитор решений', who:'Саша Долгов · уже в базе' },
    { d:'13', m:'июл', dow:'ПН', time:'—', kind:'Гайд',    c:'blue',   t:'Регламент за 20 минут', who:'Саша Долгов · уже в базе' },
    { d:'16', m:'июл', dow:'ЧТ', time:'—', kind:'Дедлайн', c:'orange', t:'Закрытие раннего доступа', who:'тарифы фиксируются до конца 2026' },
    { d:'16', m:'июл', dow:'ЧТ', time:'—', kind:'Loom',    c:'mag',    t:'Персональный ассистент собственника', who:'Саша Долгов' },
    { d:'20', m:'июл', dow:'ПН', time:'—', kind:'Loom',    c:'mag',    t:'ИИ — это отдел · Где ИИ врёт', who:'Саша Долгов' },
    { d:'22', m:'июл', dow:'СР', time:'дата уточняется', kind:'Вебинар', c:'blue', t:'Оперативка без созвонов', who:'гость + разбор кейсов + Q&A' },
    { d:'28', m:'июл', dow:'ВТ', time:'—', kind:'Гайд',    c:'blue',   t:'ОС компании на одной странице', who:'финал месяца операционки' },
  ];
  return (
    <div className="os-frame">
      <Sidebar active="schedule" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Расписание']} actions={null}/>
        <div className="os-content">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 16, flexWrap:'wrap' }}>
            <div>
              <div className="os-eyebrow" style={{ marginBottom: 10 }}>Расписание · CET / МСК</div>
              <h1 className="os-h1">Июль 2026.</h1>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap: 10, flexWrap:'wrap' }}>
              <a className="os-btn sm" href={icsWebcal()} style={{ textDecoration:'none' }}>{Icons.cal(' ')} Добавить себе в календарь</a>
              <a href={icsGoogle()} target="_blank" rel="noopener" style={{ fontSize: 13, color:'var(--blue)', fontWeight: 500, textDecoration:'none' }}>Google Календарь →</a>
            </div>
          </div>

          <div className="os-cal">
            <div className="os-cal-head">{dows.map(d=><div key={d}>{d}</div>)}</div>
            <div className="os-cal-grid">
              {[29,30].map(n=><div className="os-cal-cell muted" key={'p'+n}><div className="n">{n}</div></div>)}
              {days.map(n=>{
                const es = ev[n]; const today = n===todayNum;
                return (
                  <div className={`os-cal-cell${today?' today':''}`} key={n}>
                    <div className="n">{n}</div>
                    {es && es.map((e,i)=><div className={`os-cal-ev ${e.c}`} key={i}>{e.t}</div>)}
                  </div>
                );
              })}
              {[1,2].map(n=><div className="os-cal-cell muted" key={'n'+n}><div className="n">{n}</div></div>)}
            </div>
          </div>

          <div className="os-legend">
            <span><span className="os-dot" style={{ background:'var(--ink)' }}/> вебинар (live)</span>
            <span><span className="os-dot mag"/> Loom-разбор</span>
            <span><span className="os-dot blue"/> гайды</span>
            <span><span className="os-dot orange"/> дедлайн раннего доступа</span>
            <span><span className="os-dot" style={{ background:'#fff', border:'2px solid var(--blue)' }}/> сегодня</span>
          </div>
        </div>
      </div>

      <aside className="os-rail">
        <div className="os-rail-block">
          <div className="os-rail-h">Ближайшие события</div>
          {upcoming.map((u,i)=>(
            <div key={i} className={u.live?'os-ink':'os-card tight'} style={ u.live?{ padding: 16 }:{ display:'flex', gap: 14, padding:'14px 15px', alignItems:'flex-start' }}>
              {u.live ? (
                <div style={{ position:'relative', zIndex: 2 }}>
                  <div className="eb" style={{ marginBottom: 8 }}><span className="os-dot orange" style={{ marginRight: 6 }}/>{u.dow} {u.d} июн · {u.time}</div>
                  <h4 style={{ fontFamily:'var(--font-display)', fontWeight: 400, fontSize: 18, color:'var(--paper)', lineHeight: 1.1 }}>{u.t}</h4>
                  <p className="faint" style={{ fontSize: 12.5, margin:'6px 0 0' }}>{u.kind} · {u.who} · эфир в Telegram</p>
                  <a className="os-btn tg sm block" href={TG} target="_blank" rel="noopener" style={{ marginTop: 12, textDecoration:'none' }}>{Icons.tg()} Подключиться в Telegram</a>
                </div>
              ) : (<>
                <div style={{ textAlign:'center', width: 40, flexShrink: 0 }}>
                  <div className="os-numeral" style={{ fontSize: 22 }}>{u.d}</div>
                  <div style={{ fontSize: 10.5, color:'var(--ink-40)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{u.dow}</div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <span className={`os-badge ${u.c}`} style={{ marginBottom: 6 }}>{u.kind}</span>
                  <div style={{ fontSize: 14, lineHeight: 1.3 }}>{u.t}</div>
                  <div style={{ fontSize: 12, color:'var(--ink-40)', marginTop: 3 }}>{u.who}{u.time!=='—'?` · ${u.time}`:''}</div>
                </div>
              </>)}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
window.Schedule = Schedule;
