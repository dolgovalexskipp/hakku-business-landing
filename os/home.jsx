// home.jsx — Dashboard (light). Next-event hero + new materials + context rail.
function HomeA({ nav = ()=>{} }) {
  const fresh = MATERIALS.filter(m=>m.status==='live').slice(0, 4);
  const TG = 'https://t.me/hakkuai_business_bot';
  return (
    <div className="os-frame">
      <Sidebar active="home" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Главная']} actions={
          <a className="t-act" href="/materials/kak-oplatit-nejronki/" style={{ textDecoration:'none' }}>{Icons.dl(' ')} Гайд для новичка</a>
        }/>
        <div className="os-content">
          <div>
            <div className="os-eyebrow" style={{ marginBottom: 10 }}>Понедельник · 8 июня</div>
            <h1 className="os-h1">С возвращением.</h1>
            <p className="os-sub" style={{ marginTop: 8 }}>Старт сообщества сегодня. В базе — {liveCount} материалов, дальше выходят новые каждую неделю.</p>
          </div>

          {/* next-event hero — dark accent zone */}
          <div className="os-ink" style={{ padding: 30 }}>
            <img className="holo" src="/assets/graphic-holo-ring.webp" alt=""
                 style={{ width: 230, right: -36, top: -46, opacity: .92 }}/>
            <div style={{ position:'relative', zIndex: 2, maxWidth: 560 }}>
              <div className="eb" style={{ marginBottom: 14 }}>Старт сообщества · сегодня 18:00 МСК</div>
              <h3 style={{ fontSize: 32, lineHeight: 1.04, marginBottom: 12 }}>Запуск сообщества бИИзнес.</h3>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 480 }}>
                Открываем закрытую среду: база знаний, расписание и команда на связи. Дальше — новые материалы и разборы каждую неделю.
              </p>
              <div style={{ display:'flex', gap: 10, marginTop: 22, alignItems:'center', flexWrap:'wrap' }}>
                <a className="os-btn tg" href={TG} target="_blank" rel="noopener">{Icons.tg()} В Telegram-чат</a>
                <button className="os-btn ghost" onClick={()=>nav('knowledge')} style={{ color:'#fff', borderColor:'rgba(255,255,255,.24)' }}>Открыть базу</button>
              </div>
            </div>
          </div>

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
          <div className="os-rail-h">Контент-план · июнь</div>
          <div style={{ display:'flex', flexDirection:'column' }}>
            {MATERIALS.map((m,i)=>(
              <div key={i} style={{ display:'flex', gap: 12, padding:'10px 0', borderTop: i?'1px solid var(--ink-08)':'0' }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize: 13, color:'var(--ink-40)', width: 42, flexShrink:0 }}>{m.status==='live'?'есть':m.d}</span>
                <div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.35 }}>{m.title}</div>
                  <div style={{ fontSize: 11.5, color:'var(--ink-40)', marginTop: 2 }}>{m.kind}</div>
                </div>
              </div>
            ))}
          </div>
          <hr className="os-grad-rule" style={{ marginTop: 6 }}/>
          <div style={{ fontSize: 12.5, color:'var(--ink-55)' }}>Календарь пополняется каждую неделю и остаётся в базе.</div>
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
