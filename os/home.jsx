// home.jsx — Dashboard (light). Next-event hero + new materials + context rail.
// MONTHS — единая листалка контента по месяцам в правом рейле.
// Формат строки одинаковый для всех месяцев: когда · что · формат + этап (где применим).
const MONTHS = [
  { id:'june', label:'Июнь',
    items: MATERIALS.filter(m=>!m.isNew).map(m=>({ when: m.status==='live'?'есть':m.d, kind:m.kind, title:m.title, href:m.href, track:m.track })),
    foot:'Материалы июня остаются в базе навсегда.' },
  { id:'july', label:'Июль', now:true,
    items:[
      { when:'есть',  kind:'Гайд',         title:'Каталог ИИ-сотрудников',              href:'/materials/katalog-ii-sotrudnikov/', track:'first-agent' },
      { when:'есть',  kind:'Промпты',      title:'Промпт-аудитор решений',              href:'/materials/prompt-auditor/',        track:'personal' },
      { when:'есть',  kind:'Гайд',         title:'Регламент за 20 минут',               href:'/materials/reglament-za-20-minut/', track:'team' },
      { when:'16.07', kind:'Loom-разбор',  title:'Персональный ассистент собственника', track:'first-agent' },
      { when:'20.07', kind:'Loom-разбор',  title:'ИИ — это отдел, а не один помощник',  track:'team' },
      { when:'20.07', kind:'Loom-разбор',  title:'Где ИИ врёт — живая демонстрация',    track:'personal' },
      { when:'22.07', kind:'Вебинар + Q&A', title:'Оперативка без созвонов',            track:'team', note:'дата уточняется' },
      { when:'28.07', kind:'Гайд',         title:'ОС компании на одной странице',       track:'team' },
    ] },
];
function HomeA({ nav = ()=>{} }) {
  const [monthIdx, setMonthIdx] = React.useState(MONTHS.findIndex(m=>m.now));
  const featured = MATERIALS.find(m=>m.k==='video' && m.status==='live') || MATERIALS.find(m=>m.status==='live');
  // latest additions first — new registry entries land at the tail of MATERIALS
  const fresh = MATERIALS.filter(m=>m.status==='live' && m!==featured).slice(-4).reverse();
  const TG = 'https://t.me/hakkuai_business_bot';
  const today = new Date().toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long' });
  return (
    <div className="os-frame">
      <Sidebar active="home" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Главная']}/>
        <div className="os-content">
          <div>
            <div className="os-eyebrow" style={{ marginBottom: 10 }}>{today}</div>
            <h1 className="os-h1">С возвращением.</h1>
            <p className="os-sub" style={{ marginTop: 8 }}>В базе — {liveCount} материалов, новые выходят каждую неделю.</p>
          </div>

          {/* trajectory CTA — "не знаете с чего начать?" */}
          <div className="os-tj-cta os-clickable" onClick={()=>nav('trajectory')}>
            <span className="ic">{Icons.route(' ')}</span>
            <div className="tx">
              <div className="t">Не знаете, с чего начать?</div>
              <div className="d">Пройдите короткую диагностику — соберём персональный маршрут под ваш уровень и цели.</div>
            </div>
            <span className="os-btn sm">Пройти диагностику {Icons.chev(' ')}</span>
          </div>

          {/* featured video hero — dark accent zone */}
          {featured && (
          <a className="os-ink os-clickable" href={featured.href}
             style={{ padding: 0, display:'flex', flexWrap:'wrap', textDecoration:'none' }}>
            <div style={{ flex:'1 1 320px', minWidth: 0, padding: 30, alignSelf:'center' }}>
              <div className="eb" style={{ marginBottom: 14 }}>Начни отсюда · Loom · {featured.read}</div>
              <h3 style={{ fontSize: 30, lineHeight: 1.05, marginBottom: 12 }}>{featured.title}</h3>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 460 }}>{featured.sub}</p>
              <span className="os-btn" style={{ marginTop: 22, background:'#fff', color:'#000', borderColor:'#fff' }}>
                <span style={{ display:'inline-block', borderStyle:'solid', borderWidth:'6px 0 6px 10px', borderColor:'transparent transparent transparent #000', marginRight: 9 }}/>
                Смотреть разбор
              </span>
            </div>
            <div style={{ flex:'1 1 280px', position:'relative', minHeight: 240,
                          backgroundImage:`url(${featured.href}poster.jpg)`, backgroundSize:'cover', backgroundPosition:'center' }}>
              <div style={{ position:'absolute', inset: 0, background:'linear-gradient(90deg, var(--ink) 0%, rgba(0,0,0,.35) 28%, rgba(0,0,0,0) 62%)' }}/>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width: 62, height: 62, borderRadius: 999,
                            background:'rgba(255,255,255,.94)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 34px rgba(0,0,0,.4)' }}>
                <span style={{ display:'inline-block', marginLeft: 5, borderStyle:'solid', borderWidth:'10px 0 10px 16px', borderColor:'transparent transparent transparent #0a0a0b' }}/>
              </div>
            </div>
          </a>
          )}

          {/* learning track — "с чего начать" */}
          <div>
            <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 16 }}>
              <h2 className="os-h2">С чего начать</h2>
              <span className="os-clickable" onClick={()=>nav('knowledge',{track:null})} style={{ fontSize: 13.5, color:'var(--blue)', fontWeight: 500 }}>Весь маршрут →</span>
            </div>
            <div className="os-grid-2">
              {TRACKS.map(tr=>(
                <div className="os-mat-card os-clickable" key={tr.id} onClick={()=>nav('knowledge',{track:tr.id})}>
                  <div className="head">
                    <span className="os-badge ink">Этап {tr.n}</span>
                    <span style={{ fontSize: 12.5, color:'var(--ink-40)' }}>{countByTrack(tr.id)} мат.</span>
                  </div>
                  <h4>{tr.t}</h4>
                  <p style={{ fontSize: 13.5, color:'var(--ink-55)', margin: 0, lineHeight: 1.45 }}>{tr.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* new materials */}
          <div>
            <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 16 }}>
              <h2 className="os-h2">Новое в базе</h2>
              <span className="os-clickable" onClick={()=>nav('knowledge')} style={{ fontSize: 13.5, color:'var(--blue)', fontWeight: 500 }}>Все материалы →</span>
            </div>
            <div className="os-grid-2">
              {fresh.map((m,i)=>(
                <a className="os-mat-card" key={i} href={m.href} style={{ textDecoration:'none' }}>
                  <div className="head">
                    <span className={`os-badge ${m.k==='video'?'mag':m.k==='prompt'?'orange':'blue'}`}>{Icons[m.k](' ')}{m.kind}</span>
                    {m.isNew && <span className="os-badge mag">новое</span>}
                    <span className="os-status live">{Icons.check(' ')} доступно</span>
                  </div>
                  <h4>{m.title}</h4>
                  <p style={{ fontSize: 13.5, color:'var(--ink-55)', margin: 0, lineHeight: 1.45 }}>{m.sub}</p>
                  <div className="foot"><img className="av" src={AV[m.auth]} alt=""/> {LECTURERS.find(l=>l.id===m.auth)?.name} · {m.read}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right rail — context */}
      <aside className="os-rail">
        <div className="os-rail-block">
          {/* листалка по месяцам — единый формат строк для любого месяца */}
          {(()=>{ const mo = MONTHS[monthIdx]; return (
            <React.Fragment>
              <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                <button className="os-mo-arrow" disabled={monthIdx===0} onClick={()=>setMonthIdx(monthIdx-1)}>‹</button>
                <div style={{ flex: 1, textAlign:'center', fontFamily:'var(--font-display)', fontSize: 15 }}>
                  {mo.label}{mo.now && <span style={{ fontSize: 11.5, fontFamily:'var(--font-body)', fontWeight: 600, color:'var(--magenta)', marginLeft: 7, textTransform:'uppercase', letterSpacing:'.05em' }}>сейчас</span>}
                </div>
                <button className="os-mo-arrow" disabled={monthIdx===MONTHS.length-1} onClick={()=>setMonthIdx(monthIdx+1)}>›</button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', marginTop: 10 }}>
                {mo.items.map((it,i)=>{
                  const tr = it.track && trackById(it.track);
                  const inner = (
                    <div style={{ display:'flex', gap: 12, padding:'10px 0', borderTop: i?'1px solid var(--ink-08)':'0' }}>
                      <span style={{ fontFamily:'var(--font-display)', fontSize: 13, color: it.when==='есть'?'var(--blue)':'var(--ink-40)', width: 44, flexShrink:0 }}>{it.when}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, lineHeight: 1.35 }}>{it.title}</div>
                        <div style={{ fontSize: 11.5, color:'var(--ink-40)', marginTop: 2 }}>
                          {it.kind}{tr ? ` · этап ${tr.n} · ${tr.short.toLowerCase()}` : ''}{it.note ? ` · ${it.note}` : ''}
                        </div>
                      </div>
                    </div>
                  );
                  return it.href
                    ? <a key={i} className="os-rail-row" href={it.href} style={{ display:'block', textDecoration:'none', color:'inherit' }}>{inner}</a>
                    : <div key={i} className="os-rail-row" style={{ opacity:.75 }}>{inner}</div>;
                })}
              </div>
              {mo.now ? (
                <React.Fragment>
                  <a className="os-clickable" href="/programma-iyulya/" style={{ display:'inline-block', marginTop: 12, fontSize: 13.5, color:'var(--blue)', fontWeight: 500, textDecoration:'none' }}>Открыть программу июля →</a>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <hr className="os-grad-rule" style={{ marginTop: 6 }}/>
                  <div style={{ fontSize: 12.5, color:'var(--ink-55)' }}>{mo.foot}</div>
                </React.Fragment>
              )}
            </React.Fragment>
          ); })()}
        </div>

        <div className="os-rail-block">
          <div className="os-rail-h">Сообщество</div>
          <div className="os-card tight" style={{ padding: 16, display:'flex', flexDirection:'column', gap: 12 }}>
            <div style={{ display:'flex', alignItems:'center', gap: 8, fontSize: 13 }}>
              {Icons.tg(' ')} <b style={{ fontWeight: 600 }}>Закрытый чат</b> <span style={{ color:'var(--ink-40)' }}>собственников</span>
            </div>
            <div style={{ display:'flex', alignItems:'center' }}>
              {[AV.alex,AV.sergei,AV.nikolai].map((a,i)=>(
                <img key={i} src={a} alt="" style={{ width: 28, height: 28, borderRadius:999, objectFit:'cover', marginLeft: i?-8:0, border:'2px solid #fff' }}/>
              ))}
              <span style={{ fontSize: 12.5, color:'var(--ink-55)', marginLeft: 10 }}>команда отвечает в течение дня</span>
            </div>
            <a className="os-btn tg sm block" href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener" style={{ textDecoration:'none' }}>{Icons.tg()} Перейти в Telegram</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
window.HomeA = HomeA;
