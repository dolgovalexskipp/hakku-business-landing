// knowledge.jsx — knowledge base index. Working filter; rows link to the real
// gated material pages (which auto-open thanks to the shared LMS password).
function Knowledge({ nav = ()=>{} }) {
  const [filter, setFilter] = React.useState('Все');
  const [q, setQ] = React.useState('');
  const KMAP = { 'Гайды':'Гайд', 'Подборки':'Подборка', 'Loom':'Loom', 'Промпты':'Промпты', 'Вебинары':'Вебинар' };
  const byCat = filter==='Все' ? MATERIALS : MATERIALS.filter(m=>m.kind===KMAP[filter]);
  const query = q.trim().toLowerCase();
  const list = !query ? byCat : byCat.filter(m=>(
    (m.title+' '+m.sub+' '+m.kind+' '+(LECTURERS.find(l=>l.id===m.auth)?.name||'')).toLowerCase().includes(query)
  ));

  const Row = (m, i) => {
    const inner = (<>
      <div className="date">{ m.status==='live'
        ? <span className="os-status live">{Icons.check(' ')}есть</span>
        : <span style={{ fontSize: 12, color:'var(--ink-40)', fontFamily:'var(--font-display)' }}>{m.date}</span> }</div>
      <div><span className={`os-badge ${m.k==='video'?'mag':m.k==='prompt'?'orange':m.k==='cal'?'blue':''}`}>{Icons[m.k](' ')}{m.kind}</span></div>
      <div>
        <div className="ttl">{m.title}</div>
        <div className="sub">{m.sub}</div>
      </div>
      <div className="auth"><img className="av" src={AV[m.auth]} alt=""/>{LECTURERS.find(l=>l.id===m.auth)?.name.split(' ')[1]}<span style={{ color:'var(--ink-12)' }}>·</span>{m.read}</div>
      <div className="chev">{m.status==='live' ? Icons.chev(' ') : <span style={{ fontSize: 10.5, color:'var(--ink-40)', textTransform:'uppercase', letterSpacing:'.06em' }}>скоро</span>}</div>
    </>);
    return m.status==='live'
      ? <a className="os-mat-row" href={m.href} key={i} style={{ textDecoration:'none' }}>{inner}</a>
      : <div className="os-mat-row soon" key={i}>{inner}</div>;
  };

  return (
    <div className="os-frame">
      <Sidebar active="knowledge" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','База знаний','Все материалы']} actions={
          <div className="os-search live" style={{ width: 240, height: 34 }}>
            {Icons.search()}
            <input className="os-search-input" type="text" placeholder="Поиск по базе" value={q}
                   onChange={e=>setQ(e.target.value)} autoComplete="off" spellCheck="false"/>
            {q && <span className="os-search-clear" onClick={()=>setQ('')}>×</span>}
          </div>
        }/>
        <div className="os-content">
          <div>
            <div className="os-eyebrow" style={{ marginBottom: 10 }}>База знаний · обновляется еженедельно</div>
            <h1 className="os-h1">Все материалы.</h1>
            <p className="os-sub" style={{ marginTop: 8, maxWidth: 560 }}>
              Гайды, Loom-разборы, серии промптов и записи вебинаров. Прошёл — осталось в базе навсегда.
            </p>
          </div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 12 }}>
            <div className="os-seg">
              {['Все','Гайды','Подборки','Loom','Промпты','Вебинары'].map(t=>(
                <button key={t} className={filter===t?'on':''} onClick={()=>setFilter(t)}>{t}</button>
              ))}
            </div>
            <span style={{ fontSize: 13, color:'var(--ink-40)' }}>{query ? `${list.length} найдено` : `${MATERIALS.length} материалов · ${liveCount} доступно сейчас`}</span>
          </div>

          {/* lattice list */}
          <div className="os-card" style={{ padding: 0, overflow:'hidden' }}>
            {list.length ? list.map(Row) : (
              <div style={{ padding:'40px 24px', textAlign:'center', color:'var(--ink-40)', fontSize: 14 }}>
                Ничего не нашлось по запросу «{q}».
              </div>
            )}
          </div>

          <div style={{ display:'flex', alignItems:'center', gap: 12, fontSize: 13.5, color:'var(--ink-55)' }}>
            <span style={{ width: 22, height: 3, background:'var(--grad-cool)', display:'inline-block', borderRadius: 2 }}/>
            Это только июнь. Каждую неделю — новые материалы.
          </div>
        </div>
      </div>

      <aside className="os-rail">
        <div className="os-rail-block">
          <div className="os-rail-h">Коллекции</div>
          {[['С чего начать','2 материала','blue'],['Инфраструктура ИИ','3 материала','mag'],['Продажи и выручка','скоро','orange']].map(([t,c,col],i)=>(
            <div key={i} className="os-card tight os-clickable" onClick={()=>nav('knowledge')} style={{ display:'flex', flexDirection:'column', gap: 4, padding:'13px 15px' }}>
              <div style={{ display:'flex', alignItems:'center', gap: 8 }}><span className={`os-dot ${col}`}/><span style={{ fontSize: 14, fontWeight: 600 }}>{t}</span></div>
              <span style={{ fontSize: 12, color:'var(--ink-40)' }}>{c}</span>
            </div>
          ))}
        </div>
        <div className="os-rail-block">
          <div className="os-rail-h">Форматы</div>
          {[['book','Гайд','пошаговый разбор'],['video','Loom','видео-запись'],['prompt','Промпты','готовые шаблоны'],['cal','Вебинар','эфир + запись']].map(([ic,t,d],i)=>(
            <div key={i} style={{ display:'flex', gap: 11, alignItems:'center', padding:'8px 0', borderTop: i?'1px solid var(--ink-08)':'0' }}>
              <span style={{ color:'var(--ink-40)' }}>{Icons[ic](' ')}</span>
              <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div style={{ fontSize: 12, color:'var(--ink-40)' }}>{d}</div></div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
window.Knowledge = Knowledge;
