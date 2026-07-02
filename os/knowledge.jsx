// knowledge.jsx — knowledge base index.
// Primary axis = learning TRACK (progression "с чего начать"); secondary = TOPIC
// filter (real, not decorative); format stays a badge on the card; tier chip marks
// materials that will sit behind a higher plan once the gate lands. Rows link to the
// gated material pages (which auto-open thanks to the shared LMS password).
function Knowledge({ nav = ()=>{}, kbTrack = null }) {
  const [track, setTrack] = React.useState(kbTrack || 'all');
  const [topic, setTopic] = React.useState('Все');
  const [q, setQ] = React.useState('');

  // deep-link from the sidebar (nav('knowledge', {track}))
  React.useEffect(()=>{ setTrack(kbTrack || 'all'); }, [kbTrack]);

  const query = q.trim().toLowerCase();
  const match = (m) => {
    if (topic !== 'Все' && !(m.topics||[]).includes(topic)) return false;
    if (query) {
      const hay = (m.title+' '+m.sub+' '+m.kind+' '+(m.topics||[]).join(' ')+' '+(LECTURERS.find(l=>l.id===m.auth)?.name||'')).toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  };
  const filtered = MATERIALS.filter(match);
  const visTracks = track==='all' ? TRACKS : TRACKS.filter(t=>t.id===track);
  const total = (track==='all' ? filtered : filtered.filter(m=>m.track===track)).length;

  // download the skill-ready .md without triggering the row's link navigation
  const dlMd = (e, href) => {
    e.preventDefault(); e.stopPropagation();
    const a = document.createElement('a'); a.href = href; a.download = href.split('/').pop();
    document.body.appendChild(a); a.click(); a.remove();
  };

  const Row = (m, i) => {
    const locked = m.status==='live' && !canAccess(m);
    const tierChip = m.tier && m.tier!=='pro'
      ? <span className={`os-tier ${m.tier}`}>{locked && Icons.lock ? Icons.lock(' ') : null}{TIERS[m.tier]}</span> : null;
    const inner = (<>
      <div className="date">{ m.status==='live'
        ? <span className="os-status live">{Icons.check(' ')}есть</span>
        : <span style={{ fontSize: 12, color:'var(--ink-40)', fontFamily:'var(--font-display)' }}>{m.date}</span> }</div>
      <div><span className={`os-badge ${m.k==='video'?'mag':m.k==='prompt'?'orange':m.k==='cal'?'blue':''}`}>{Icons[m.k](' ')}{m.kind}</span></div>
      <div>
        <div className="ttl">{m.title}{m.isNew && <span className="os-badge mag" style={{ marginLeft: 8, verticalAlign:'middle' }}>новое</span>}{tierChip}</div>
        <div className="sub">{m.sub}</div>
        {((m.topics||[]).length>0 || m.md) && (
          <div className="os-row-tags">
            {(m.topics||[]).slice(0,3).map((t,j)=><span className="os-tag" key={j} onClick={(e)=>{ e.preventDefault(); setTopic(t); }}>{t}</span>)}
            {m.md && <span className="os-tag md" onClick={(e)=>dlMd(e,m.md)} title="Скачать .md — отдайте своему ИИ, чтобы собрать навык">{Icons.dl(' ')} .md для ИИ</span>}
          </div>
        )}
      </div>
      <div className="auth"><img className="av" src={AV[m.auth]} alt=""/>{LECTURERS.find(l=>l.id===m.auth)?.name}<span style={{ color:'var(--ink-12)' }}>·</span>{m.read}</div>
      <div className="chev">{m.status==='live' && !locked ? Icons.chev(' ') : null}</div>
    </>);
    return (m.status==='live' && !locked)
      ? <a className="os-mat-row" href={m.href} key={i} style={{ textDecoration:'none' }}>{inner}</a>
      : <div className={`os-mat-row${m.status!=='live'?' soon':''}`} key={i}>{inner}</div>;
  };

  return (
    <div className="os-frame">
      <Sidebar active="knowledge" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','База знаний', track==='all' ? 'Все материалы' : trackById(track).t]} actions={
          <div className="os-search live" style={{ width: 240, height: 34 }}>
            {Icons.search()}
            <input className="os-search-input" type="text" placeholder="Поиск по базе" value={q} autoFocus
                   onChange={e=>setQ(e.target.value)} autoComplete="off" spellCheck="false"/>
            {q && <span className="os-search-clear" onClick={()=>setQ('')}>×</span>}
          </div>
        }/>
        <div className="os-content">
          <div>
            <div className="os-eyebrow" style={{ marginBottom: 10 }}>База знаний · обновляется еженедельно</div>
            <h1 className="os-h1">{track==='all' ? 'Путь от нуля к ИИ в бизнесе.' : trackById(track).t+'.'}</h1>
            <p className="os-sub" style={{ marginTop: 8, maxWidth: 580 }}>
              {track==='all'
                ? 'Материалы выстроены в маршрут: инфраструктура → личная польза → первый ИИ-помощник → передача в команду. Идите по порядку или фильтруйте по теме.'
                : trackById(track).d+'. Прошёл — осталось в базе навсегда.'}
            </p>
          </div>

          {/* primary axis — learning track */}
          <div className="os-seg">
            <button className={track==='all'?'on':''} onClick={()=>setTrack('all')}>Все</button>
            {TRACKS.map(tr=>(
              <button key={tr.id} className={track===tr.id?'on':''} onClick={()=>setTrack(tr.id)}>{tr.n} · {tr.short}</button>
            ))}
          </div>

          {/* secondary axis — topic / function filter (real) */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 12 }}>
            <div className="os-chips">
              <button className={topic==='Все'?'on':''} onClick={()=>setTopic('Все')}>Все темы</button>
              {ALL_TOPICS.map(t=>(
                <button key={t} className={topic===t?'on':''} onClick={()=>setTopic(t)}>{t}</button>
              ))}
            </div>
            <span style={{ fontSize: 13, color:'var(--ink-40)', whiteSpace:'nowrap' }}>
              {query || topic!=='Все' ? `${total} найдено` : `${matPlural(liveCount)} в базе${soonCount ? ` · ещё ${soonCount} скоро` : ''}`}
            </span>
          </div>

          {/* track-grouped lattice */}
          {total ? visTracks.map(tr=>{
            const rows = filtered.filter(m=>m.track===tr.id);
            if (!rows.length) return null;
            return (
              <div key={tr.id} className="os-track-sec">
                <div className="os-track-head">
                  <span className="n">{tr.n}</span>
                  <div><div className="t">{tr.t}</div><div className="d">{tr.d}</div></div>
                  <span className="c">{rows.length}</span>
                </div>
                <div className="os-card" style={{ padding: 0, overflow:'hidden' }}>{rows.map(Row)}</div>
              </div>
            );
          }) : (
            <div className="os-card" style={{ padding:'40px 24px', textAlign:'center', color:'var(--ink-40)', fontSize: 14 }}>
              Ничего не нашлось{q?` по запросу «${q}»`:''}{topic!=='Все'?` в теме «${topic}»`:''}.
            </div>
          )}

          <div style={{ display:'flex', alignItems:'center', gap: 12, fontSize: 13.5, color:'var(--ink-55)' }}>
            <span style={{ width: 22, height: 3, background:'var(--grad-cool)', display:'inline-block', borderRadius: 2 }}/>
            Идёт июль — месяц операционки. Каждую неделю — новые материалы, всё пройденное остаётся в базе.
          </div>
        </div>
      </div>

      <aside className="os-rail">
        <div className="os-rail-block">
          <div className="os-rail-h">Форматы</div>
          {[['book','Гайд','пошаговый разбор'],['video','Loom','видео-запись'],['prompt','Промпты','готовые шаблоны'],['cal','Вебинар','эфир + запись']].map(([ic,t,d],i)=>(
            <div key={i} style={{ display:'flex', gap: 11, alignItems:'center', padding:'8px 0', borderTop: i?'1px solid var(--ink-08)':'0' }}>
              <span style={{ color:'var(--ink-40)' }}>{Icons[ic](' ')}</span>
              <div><div style={{ fontSize: 13.5, fontWeight: 500 }}>{t}</div><div style={{ fontSize: 12, color:'var(--ink-40)' }}>{d}</div></div>
            </div>
          ))}
        </div>
        <div className="os-rail-block">
          <div className="os-rail-h">Уровни доступа</div>
          <div style={{ fontSize: 12.5, color:'var(--ink-55)', lineHeight: 1.5 }}>
            Без метки — входит в <b>ПРО</b>. Метка <span className="os-tier max" style={{ verticalAlign:'middle' }}>МАКС</span> — материалы старшего тарифа. Сейчас открыт весь доступ.
          </div>
        </div>
      </aside>
    </div>
  );
}
window.Knowledge = Knowledge;
