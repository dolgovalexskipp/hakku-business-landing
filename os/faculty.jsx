// faculty.jsx — lecturer profiles. Co-founders as practitioners.
function Faculty({ nav = ()=>{} }) {
  const alexMats = MATERIALS.filter(m=>m.auth==='alex' && m.status==='live').slice(0,3);
  return (
    <div className="os-frame">
      <Sidebar active="faculty" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Лекторы']} actions={null}/>
        <div className="os-content">
          <div>
            <div className="os-eyebrow" style={{ marginBottom: 10 }}>Команда · практики, не лекторы</div>
            <h1 className="os-h1">Кто ведёт материалы.</h1>
            <p className="os-sub" style={{ marginTop: 8, maxWidth: 580 }}>
              Не теоретики со сцены. Собственники и продуктологи, которые сами внедрили ИИ в свои компании — и показывают, как это сделали.
            </p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 16 }}>
            {LECTURERS.map((l,i)=>(
              <div className="os-fac-card" key={i}>
                <img className="ph" src={l.img} alt=""/>
                <div className="bd">
                  <div>
                    <div className="rl">{l.role}</div>
                    <div className="nm" style={{ marginTop: 4 }}>{l.name}</div>
                  </div>
                  <p className="bio">{l.bio}</p>
                  <div className="tags">{l.tags.map((t,j)=><span className="os-tag" key={j}>{t}</span>)}</div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 4, paddingTop: 14, borderTop:'1px solid var(--ink-08)' }}>
                    <span className="os-meta">{Icons.book(' ')} {l.count} материалов</span>
                    <a href={`https://t.me/${l.tg.replace('@','')}`} target="_blank" rel="noopener" style={{ fontSize: 13, color:'var(--blue)', fontWeight: 500, textDecoration:'none' }}>{l.tg}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="os-rail">
        <div className="os-rail-block">
          <div className="os-rail-h">Профиль</div>
          <div className="os-card tight" style={{ padding: 0, overflow:'hidden' }}>
            <img src={AV.alex} alt="" style={{ width:'100%', aspectRatio:'4/3', objectFit:'cover', display:'block' }}/>
            <div style={{ padding: 16, display:'flex', flexDirection:'column', gap: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--magenta)' }}>co-founder · бИИзнес</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize: 22, marginTop: 4 }}>Саша Долгов</div>
              </div>
              <p style={{ fontSize: 13.5, color:'var(--ink-55)', lineHeight: 1.5, margin: 0 }}>Основатель VEYRA. Ведёт гайды по инфраструктуре и настройке инструментов.</p>
              <a className="os-btn tg sm block" href="https://t.me/dolgovalex" target="_blank" rel="noopener" style={{ textDecoration:'none' }}>{Icons.tg()} Написать @dolgovalex</a>
            </div>
          </div>
        </div>
        <div className="os-rail-block">
          <div className="os-rail-h">Материалы Саши</div>
          {alexMats.map((m,i)=>(
            <a key={i} href={m.href} style={{ display:'flex', gap: 11, alignItems:'center', padding:'9px 0', borderTop: i?'1px solid var(--ink-08)':'0', textDecoration:'none', color:'inherit' }}>
              <span style={{ color:'var(--ink-40)' }}>{Icons[m.k](' ')}</span>
              <span style={{ fontSize: 13.5, lineHeight: 1.3 }}>{m.title}</span>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
window.Faculty = Faculty;
