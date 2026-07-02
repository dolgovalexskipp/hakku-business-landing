// expert.jsx — «Разбор с экспертом»: личный слот с Сашей через Zoom Scheduler.
const SCHEDULER_URL = 'https://scheduler.zoom.us/aleks-sasha-dolgov/sasha-s-meetings';
function Expert({ nav = ()=>{} }) {
  return (
    <div className="os-frame">
      <Sidebar active="expert" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={['бИИзнес','Разбор с экспертом']} actions={null}/>
        <div className="os-content">
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 16, flexWrap:'wrap' }}>
            <div>
              <div className="os-eyebrow" style={{ marginBottom: 10 }}>Личный разбор · 1-на-1</div>
              <h1 className="os-h1">Разбор с экспертом.</h1>
              <p className="os-sub" style={{ marginTop: 8, maxWidth: 580 }}>
                Созвон с Сашей Долговым: разберём вашу задачу — от выбора первого ИИ-сотрудника до узких мест в процессах.
                Приходите с конкретной болью, уходите с планом. Выберите удобный слот ниже.
              </p>
            </div>
            <a className="os-btn sm" href={SCHEDULER_URL} target="_blank" rel="noopener" style={{ textDecoration:'none' }}>Открыть в новой вкладке →</a>
          </div>
          <div style={{ border:'1px solid var(--ink-12)', borderRadius: 16, overflow:'hidden', background:'#fff' }}>
            <iframe
              src={`${SCHEDULER_URL}?embed=true`}
              title="Запись на разбор с экспертом"
              style={{ display:'block', width:'100%', height: 760, border: 0 }}
              loading="lazy"
            />
          </div>
          <p style={{ fontSize: 12.5, color:'var(--ink-40)', margin: 0 }}>
            Если календарь не загрузился — откройте его в новой вкладке кнопкой выше.
          </p>
        </div>
      </div>
    </div>
  );
}
window.Expert = Expert;
