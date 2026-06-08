// schedule.jsx — June 2026 calendar (Mon-start) + upcoming list rail.
function Schedule({ nav = ()=>{} }) {
  const TG = 'https://t.me/hakkuai_business_bot';
  const ev = {
    8:  { c:'ink',    t:'Запуск · live 18:00' },
    15: { c:'orange', t:'Серия промптов' },
    22: { c:'mag',    t:'Loom · войсы' },
    23: { c:'blue',   t:'Вебинар · Excel' },
  };
  const days = []; for (let i=1;i<=30;i++) days.push(i);
  const dows = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
  const upcoming = [
    { d:'8',  m:'июн', dow:'ПН', time:'18:00', kind:'Запуск',  c:'ink',    t:'Запуск сообщества бИИзнес', who:'Саша Долгов', live:true },
    { d:'15', m:'июн', dow:'ПН', time:'—',     kind:'Промпты', c:'orange', t:'«Как ИИ забустит мой бизнес»', who:'Сергей Ершов' },
    { d:'22', m:'июн', dow:'ПН', time:'—',     kind:'Loom',    c:'mag',    t:'Цифровая трансформация войсов', who:'Николай Писаренко' },
    { d:'23', m:'июн', dow:'ВТ', time:'19:00', kind:'Вебинар', c:'blue',   t:'Цифровая революция в Excel', who:'Сергей Ершов', live:true },
  ];
  return (
    <div className="os-frame">
      <Sidebar active="schedule" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Расписание']} actions={null}/>
        <div className="os-content">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
            <div>
              <div className="os-eyebrow" style={{ marginBottom: 10 }}>Расписание · CET / МСК</div>
              <h1 className="os-h1">Июнь 2026.</h1>
            </div>
            <div className="os-seg"><button>‹</button><button className="on">Июнь</button><button>›</button></div>
          </div>

          <div className="os-cal">
            <div className="os-cal-head">{dows.map(d=><div key={d}>{d}</div>)}</div>
            <div className="os-cal-grid">
              {days.map(n=>{
                const e = ev[n]; const today = n===8;
                return (
                  <div className={`os-cal-cell${today?' today':''}`} key={n}>
                    <div className="n">{n}</div>
                    {e && <div className={`os-cal-ev ${e.c}`}>{e.t}</div>}
                  </div>
                );
              })}
              {[0,1,2,3,4].map(i=><div className="os-cal-cell muted" key={'p'+i}><div className="n">{i+1}</div></div>)}
            </div>
          </div>

          <div className="os-legend">
            <span><span className="os-dot" style={{ background:'var(--ink)' }}/> вебинар (live)</span>
            <span><span className="os-dot mag"/> Loom-разбор</span>
            <span><span className="os-dot orange"/> серия промптов</span>
            <span><span className="os-dot blue"/> эфир + запись</span>
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
                  <p className="faint" style={{ fontSize: 12.5, margin:'6px 0 0' }}>{u.kind} · {u.who}</p>
                  <a className="os-btn tg sm block" href={TG} target="_blank" rel="noopener" style={{ marginTop: 12, textDecoration:'none' }}>{Icons.tg()} Подключиться</a>
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
