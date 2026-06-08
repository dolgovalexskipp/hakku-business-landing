// faculty.jsx — lecturer profiles. Co-founders as practitioners.
function Faculty({ nav = ()=>{} }) {
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

          <div className="os-grid-3">
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
          <div className="os-rail-h">Команда на связи</div>
          <div className="os-card tight" style={{ padding: 16, display:'flex', flexDirection:'column', gap: 12 }}>
            <p style={{ fontSize: 13.5, color:'var(--ink-55)', lineHeight: 1.5, margin: 0 }}>
              Основатели сами в чате сообщества — вопросы по материалам, разборы и нетворк. Отвечаем в течение дня.
            </p>
            <div style={{ display:'flex', alignItems:'center' }}>
              {[AV.nikolai,AV.sergei,AV.alex].map((a,i)=>(
                <img key={i} src={a} alt="" style={{ width: 30, height: 30, borderRadius:999, objectFit:'cover', objectPosition:'center top', marginLeft: i?-8:0, border:'2px solid #fff' }}/>
              ))}
            </div>
            <a className="os-btn tg sm block" href="https://t.me/hakkuai_business_bot" target="_blank" rel="noopener" style={{ textDecoration:'none' }}>{Icons.tg()} Перейти в чат</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
window.Faculty = Faculty;
