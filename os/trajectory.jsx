// trajectory.jsx — onboarding quiz (AI-adoption diagnostic) → personalized path.
// Four scenario questions place the owner on one of the four TRACK stages (a soft
// recommendation, not a hard gate); a fifth multi-select captures GOALS, which drive
// a cross-stage "это может быть вам интересно" block and per-material relevance marks.
// Nothing is collapsed or dismissed — earlier stages stay browsable, the recommended
// one is highlighted, goals pull relevant materials forward regardless of stage.
// Result (level + goals) is cached in localStorage so returning owners skip the quiz.

const TJ_KEY  = 'hakku_traj_level';
const TJ_GKEY = 'hakku_traj_goals';

// scenario questions — each option scores 0–3 toward the adoption level
const TJ_QUESTIONS = [
  { type:'single', q:'Вам прямо сейчас нужна свежая модель Claude или ChatGPT под рабочую задачу. Что происходит?', a:[
    { t:'Открываю и работаю — оплата и доступ давно настроены', p:3 },
    { t:'Работаю, но периодически упираюсь в оплату или лимиты', p:2 },
    { t:'Пользуюсь бесплатными версиями или прошу кого-то', p:1 },
    { t:'Честно — пока не дошли руки настроить', p:0 },
  ]},
  { type:'single', q:'Насколько ИИ «в курсе» вас и вашего бизнеса, когда вы к нему обращаетесь?', a:[
    { t:'Есть единый контекст-«мозг», переиспользую его везде', p:3 },
    { t:'Накидал заготовки-промпты под частые задачи', p:2 },
    { t:'Каждый раз объясняю всё заново', p:1 },
    { t:'Пока не использую ИИ для рабочих задач', p:0 },
  ]},
  { type:'single', q:'Где ИИ у вас уже реально экономит время или приносит деньги?', a:[
    { t:'В нескольких процессах — работает стабильно, без меня', p:3 },
    { t:'В одной задаче — рутина или продажи, довёл до результата', p:2 },
    { t:'Пробую на мелочах, лично для себя', p:1 },
    { t:'Пока нигде системно', p:0 },
  ]},
  { type:'single', q:'Ваша команда и ИИ — это сейчас про что?', a:[
    { t:'Общие доступы, единый контекст, договорились как пользуемся', p:3 },
    { t:'Пользуются, но каждый по-своему — единой системы нет', p:2 },
    { t:'Пара энтузиастов экспериментируют', p:1 },
    { t:'Пока только я', p:0 },
  ]},
  { type:'multi', q:'Что хочется закрыть с ИИ в первую очередь?', hint:'Выберите всё, что откликается — под это подберём материалы.', a:'interests' },
];

// goals → topics (topics are the real filter axis on materials)
const TJ_INTERESTS = [
  { id:'routine',  t:'Рутину и операционку',          topics:['Рутина','Продуктивность','Автоматизация'] },
  { id:'sales',    t:'Продажи и работу с клиентами',   topics:['Продажи','Кейс'] },
  { id:'meetings', t:'Встречи, заметки и поручения',   topics:['Продуктивность','Контекст'] },
  { id:'safety',   t:'Доверие к ИИ и проверку фактов', topics:['Безопасность'] },
  { id:'team',     t:'Единый контекст для команды',    topics:['Компания','Контекст'] },
];

// score band → recommended entry track
const TJ_LEVELS = [
  { entry:'infra',       lvl:'Только на старте',      eb:'Уровень 1 · фундамент',
    d:'ИИ ещё не в работе — начнём с базы: оплата, доступ и настройка инструментов. Дальше всё пойдёт быстрее.' },
  { entry:'personal',    lvl:'Базовый пользователь',  eb:'Уровень 2 · личная польза',
    d:'Инструменты под рукой — пора разгрузить свой день: контекст о себе, разбор встреч, проверка на доверие.' },
  { entry:'first-agent', lvl:'Практик',               eb:'Уровень 3 · первый помощник',
    d:'Вы уже пользуетесь ИИ — соберём первую рабочую роль под бизнес-задачу: продажи, рутина, ассистент собственника.' },
  { entry:'team',        lvl:'Системный',             eb:'Уровень 4 · в команду',
    d:'ИИ работает на вас лично — масштабируем на команду через единый контекст и общие доступы.' },
];

function tjLevelForScore(score) {            // max 12 across 4 questions
  if (score <= 2)  return 0;
  if (score <= 6)  return 1;
  if (score <= 9)  return 2;
  return 3;
}

function Trajectory({ nav = ()=>{} }) {
  const restore = () => {
    try {
      const lvl = localStorage.getItem(TJ_KEY);
      const idx = TJ_LEVELS.findIndex(l => l.entry === lvl);
      const goals = (localStorage.getItem(TJ_GKEY) || '').split(',').filter(Boolean);
      return idx >= 0 ? { idx, goals } : null;
    } catch(e){ return null; }
  };
  const saved = restore();

  const [phase, setPhase] = React.useState(saved ? 'result' : 'intro'); // intro | quiz | result
  const [step, setStep]   = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [goals, setGoals] = React.useState(saved ? saved.goals : []);
  const [levelIdx, setLevelIdx] = React.useState(saved ? saved.idx : 0);

  const startQuiz = () => { setAnswers([]); setGoals([]); setStep(0); setPhase('quiz'); };

  const pick = (p) => {
    const next = [...answers.slice(0, step), p];
    setAnswers(next); setStep(step + 1);     // advance into the multi-select goals step
  };
  const toggleGoal = (id) => setGoals(g => g.includes(id) ? g.filter(x=>x!==id) : [...g, id]);

  const finish = () => {
    const score = answers.slice(0, 4).reduce((s, x) => s + (x||0), 0);
    const li = tjLevelForScore(score);
    setLevelIdx(li); setPhase('result');
    try { localStorage.setItem(TJ_KEY, TJ_LEVELS[li].entry); localStorage.setItem(TJ_GKEY, goals.join(',')); } catch(e){}
  };
  const back = () => { if (step > 0) setStep(step - 1); else setPhase('intro'); };

  const crumbs = phase === 'result'
    ? ['бИИзнес','Траектория', TJ_LEVELS[levelIdx].lvl]
    : phase === 'quiz' ? ['бИИзнес','Траектория','Диагностика'] : ['бИИзнес','Траектория'];

  return (
    <div className="os-frame">
      <Sidebar active="trajectory" nav={nav}/>
      <div className="os-main">
        <Topbar crumbs={crumbs} actions={
          phase === 'result'
            ? <span className="t-act os-clickable" onClick={startQuiz}>{Icons.route(' ')} Пройти заново</span>
            : null
        }/>
        <div className="os-content">
          {phase === 'intro'  && <TjIntro onStart={startQuiz} saved={saved}/>}
          {phase === 'quiz'   && <TjQuiz step={step} answers={answers} goals={goals} onPick={pick} onToggle={toggleGoal} onBack={back} onFinish={finish}/>}
          {phase === 'result' && <TjResult levelIdx={levelIdx} goals={goals} nav={nav} onRetake={startQuiz}/>}
        </div>
      </div>
    </div>
  );
}

/* ---- helpers -------------------------------------------------- */
function tjGoalTopics(goals) {
  const set = new Set();
  goals.forEach(id => (TJ_INTERESTS.find(x=>x.id===id)||{}).topics?.forEach(t=>set.add(t)));
  return set;
}
function tjMatchScore(m, topicSet) { return (m.topics||[]).filter(t=>topicSet.has(t)).length; }

/* ---- intro ---------------------------------------------------- */
function TjIntro({ onStart, saved }) {
  return (
    <>
      <div>
        <div className="os-eyebrow" style={{ marginBottom: 10 }}>Диагностика · 5 вопросов · 1 минута</div>
        <h1 className="os-h1">С чего начать именно вам.</h1>
        <p className="os-sub" style={{ marginTop: 8, maxWidth: 600 }}>
          Пять вопросов о том, как ИИ уже устроен в вашем бизнесе и что хочется закрыть в первую очередь —
          и мы соберём маршрут из материалов базы: с чего начать и что из соседних тем будет полезно уже сейчас.
        </p>
      </div>

      <div className="os-ink" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap: 24 }}>
        <div style={{ flex:'1 1 320px', minWidth: 0 }}>
          <div className="eb" style={{ marginBottom: 12 }}>4 уровня адопшена ИИ</div>
          <div className="os-tj-levelrow">
            {TJ_LEVELS.map((l, i) => (
              <React.Fragment key={l.entry}>
                {i > 0 && <span className="os-tj-arrow">→</span>}
                <span className="os-tj-levelchip">{trackById(l.entry).short}</span>
              </React.Fragment>
            ))}
          </div>
          <p className="muted" style={{ fontSize: 14, lineHeight: 1.55, margin:'16px 0 0', maxWidth: 460 }}>
            От «ИИ ещё не оплачен» до «команда работает на едином контексте». Диагностика подскажет точку входа — но ничего не закрывает: вся база остаётся открытой.
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap: 10, flexShrink:0 }}>
          <span className="os-btn" style={{ background:'#fff', color:'#000', borderColor:'#fff', cursor:'pointer' }} onClick={onStart}>
            {saved ? 'Пройти заново' : 'Пройти диагностику'} {Icons.chev(' ')}
          </span>
        </div>
      </div>

      <div className="os-tj-steps">
        {[['1','5 вопросов о вашей ситуации','оплата, контекст, автоматизация, команда и ваши цели'],
          ['2','Точка входа, а не приговор','рекомендуем этап — но подсветим и полезное из соседних'],
          ['3','Маршрут под ваши цели','материалы под выбранные задачи выносим вперёд']].map(([n,t,d])=>(
          <div className="os-tj-step" key={n}>
            <span className="num">{n}</span>
            <div><div className="t">{t}</div><div className="d">{d}</div></div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---- quiz (single + multi) ------------------------------------ */
function TjQuiz({ step, answers, goals, onPick, onToggle, onBack, onFinish }) {
  const Q = TJ_QUESTIONS[step];
  const total = TJ_QUESTIONS.length;
  const pct = Math.round((step / total) * 100);
  return (
    <>
      <div className="os-tj-quizhead">
        <span className="os-clickable os-tj-backlink" onClick={onBack}>← назад</span>
        <span className="os-tj-counter">Вопрос {step + 1} из {total}</span>
      </div>
      <div className="os-tj-progress"><span style={{ width: `${pct}%` }}/></div>

      <h1 className="os-h1" style={{ fontSize: 29, maxWidth: 700 }}>{Q.q}</h1>
      {Q.hint && <p className="os-sub" style={{ marginTop:-10 }}>{Q.hint}</p>}

      {Q.type === 'single' ? (
        <div className="os-tj-opts">
          {Q.a.map((opt, i) => (
            <button key={i} className={`os-tj-opt${answers[step]===opt.p?' on':''}`} onClick={()=>onPick(opt.p)}>
              <span className="dot"/>
              <span className="lbl">{opt.t}</span>
              <span className="go">{Icons.chev(' ')}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="os-tj-opts">
            {TJ_INTERESTS.map((it) => {
              const on = goals.includes(it.id);
              return (
                <button key={it.id} className={`os-tj-opt multi${on?' on':''}`} onClick={()=>onToggle(it.id)}>
                  <span className="box">{on ? Icons.check(' ') : null}</span>
                  <span className="lbl">{it.t}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap' }}>
            <span className="os-btn" style={{ cursor:'pointer' }} onClick={onFinish}>
              Показать мой маршрут {Icons.chev(' ')}
            </span>
            <span className="os-clickable" onClick={onFinish} style={{ fontSize: 13, color:'var(--ink-40)' }}>
              {goals.length ? `выбрано: ${goals.length}` : 'пропустить — покажем общий маршрут'}
            </span>
          </div>
        </>
      )}
    </>
  );
}

/* ---- result: interest picks + soft roadmap -------------------- */
function TjResult({ levelIdx, goals, nav, onRetake }) {
  const L = TJ_LEVELS[levelIdx];
  const entryIdx = TRACKS.findIndex(t => t.id === L.entry);
  const topicSet = tjGoalTopics(goals);
  const hasGoals = topicSet.size > 0;

  const recommended = hasGoals
    ? MATERIALS.map(m => ({ m, s: tjMatchScore(m, topicSet) }))
        .filter(x => x.s > 0)
        .sort((a,b) => b.s - a.s || (a.m.status==='live'?-1:1))
        .slice(0, 3).map(x => x.m)
    : [];
  const isRec = (m) => hasGoals && tjMatchScore(m, topicSet) > 0;

  return (
    <>
      {/* level hero */}
      <div className="os-ink" style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap: 24 }}>
        <div style={{ flex:'1 1 340px', minWidth: 0 }}>
          <div className="eb" style={{ marginBottom: 12 }}>{Icons.flag(' ')} Ваш уровень · {L.eb}</div>
          <h3 style={{ fontSize: 32, lineHeight: 1.05, marginBottom: 12 }}>{L.lvl}</h3>
          <p className="muted" style={{ fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 520 }}>{L.d}</p>
          <span className="os-btn" style={{ marginTop: 22, background:'#fff', color:'#000', borderColor:'#fff', cursor:'pointer' }}
                onClick={()=>nav('knowledge', { track: L.entry })}>
            Открыть этап «{trackById(L.entry).short}» {Icons.chev(' ')}
          </span>
        </div>
        <div className="os-tj-levelrow" style={{ flexShrink:0 }}>
          {TRACKS.map((t, i) => (
            <React.Fragment key={t.id}>
              {i > 0 && <span className="os-tj-arrow">→</span>}
              <span className={`os-tj-levelchip${i === entryIdx ? ' on' : ''}`}>{t.n}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* goal-matched picks — cross-stage */}
      {recommended.length > 0 && (
        <div>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 14, flexWrap:'wrap', gap: 8 }}>
            <h2 className="os-h2">Это может быть вам интересно</h2>
            <span style={{ fontSize: 13, color:'var(--ink-40)' }}>под ваши цели — из разных этапов</span>
          </div>
          <div className="os-grid-2">
            {recommended.map((m, i) => {
              const tr = trackById(m.track);
              const live = m.status === 'live';
              const locked = live && !canAccess(m);
              const inner = (<>
                <div className="head">
                  <span className={`os-badge ${m.k==='video'?'mag':m.k==='prompt'?'orange':m.k==='cal'?'blue':''}`}>{Icons[m.k](' ')}{m.kind}</span>
                  <span className="os-tj-stagechip">{Icons.star(' ')} Этап {tr.n} · {tr.short}</span>
                </div>
                <h4>{m.title}</h4>
                <p style={{ fontSize: 13.5, color:'var(--ink-55)', margin: 0, lineHeight: 1.45 }}>{m.sub}</p>
                <div className="foot">
                  {live
                    ? <span className="os-status live">{locked ? Icons.lock(' ') : Icons.check(' ')} {locked ? 'по тарифу выше' : 'доступно'}</span>
                    : <span className="os-status soon">{Icons.clock(' ')} {m.date}</span>}
                </div>
              </>);
              return (live && !locked)
                ? <a className="os-mat-card" key={i} href={m.href} style={{ textDecoration:'none' }}>{inner}</a>
                : <div className={`os-mat-card${live?'':' soon'}`} key={i}>{inner}</div>;
            })}
          </div>
        </div>
      )}

      <div>
        <h2 className="os-h2" style={{ marginBottom: 6 }}>Ваш маршрут</h2>
        <p className="os-sub" style={{ marginBottom: 4, maxWidth: 620 }}>
          Этапы базы знаний по порядку. Рекомендуем стартовать с подсвеченного — но соседние этапы открыты,
          а {hasGoals ? <span>отмеченное {Icons.star(' ')} подобрано под ваши цели.</span> : <span>любую тему можно взять сразу.</span>}
        </p>
      </div>

      {/* roadmap — soft states */}
      <div className="os-tj-road">
        {TRACKS.map((tr, i) => {
          const state = i < entryIdx ? 'prior' : i === entryIdx ? 'start' : 'next';
          const live = MATERIALS.filter(m => m.track === tr.id && m.status === 'live');
          const soon = MATERIALS.filter(m => m.track === tr.id && m.status !== 'live');
          const tag = state === 'prior' ? 'по желанию' : state === 'start' ? 'рекомендуем начать' : 'впереди';
          const matRow = (m, j, isSoon) => {
            const locked = !isSoon && !canAccess(m);
            const rec = isRec(m);
            const inner = (<>
              <span className="mk">{Icons[m.k](' ')}</span>
              <span className="mt">{m.title}</span>
              {rec && <span className="rec" title="под вашу цель">{Icons.star(' ')}</span>}
              <span className="mr">{isSoon ? m.date : m.read}</span>
              <span className="mc">{isSoon ? null : locked ? Icons.lock(' ') : Icons.chev(' ')}</span>
            </>);
            const cls = `os-tj-mat${isSoon?' soon':''}${locked?' locked':''}${rec?' rec':''}`;
            return (!isSoon && !locked)
              ? <a className={cls} href={m.href} key={j} style={{ textDecoration:'none' }}>{inner}</a>
              : <div className={cls} key={j}>{inner}</div>;
          };
          return (
            <div className={`os-tj-stage ${state}`} key={tr.id}>
              <div className="rail"><span className="node">{tr.n}</span></div>
              <div className="body">
                <div className="head">
                  <div>
                    <div className="ttl">{tr.t}</div>
                    <div className="dsc">{tr.d}</div>
                  </div>
                  <span className={`os-tj-statetag ${state}`}>{tag}</span>
                </div>
                <div className="os-tj-mats">
                  {live.map((m,j)=>matRow(m,j,false))}
                  {soon.map((m,j)=>matRow(m,`s${j}`,true))}
                  {!live.length && !soon.length && <div className="os-tj-empty">Материалы скоро</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap: 14, fontSize: 13.5, color:'var(--ink-55)', flexWrap:'wrap' }}>
        <span style={{ width: 22, height: 3, background:'var(--grad-cool)', display:'inline-block', borderRadius: 2 }}/>
        Уровень — ориентир, а не рамка. Можно идти по порядку или прыгнуть к нужной теме.
        <span className="os-clickable" onClick={onRetake} style={{ color:'var(--blue)', fontWeight: 500 }}>Пройти заново →</span>
      </div>
    </>
  );
}

window.Trajectory = Trajectory;
