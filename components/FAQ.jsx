// FAQ — accordion incl. data-security / corporate VPN block.
const FAQ = () => {
  const qa = [
    { q: 'Это курс или сообщество?', a: 'Сообщество практиков с контентной подпиской. Нет «прошёл и забыл»: каждую неделю — новые разборы, воркшопы и прямой контакт с командой и собственниками, которые идут тем же путём.' },
    { q: 'Я не айтишник. Разберусь?', a: 'Продукт сделан для собственников, а не для разработчиков. Мы идём от функции и боли бизнеса к готовому AI-сотруднику — без кода и теории, на ваших процессах.' },
    { q: 'Это про экономию времени или про деньги?', a: 'Про деньги. Мы заходим с вопроса «какой процесс, усиленный AI, добавит к выручке или марже» и доводим до измеримого эффекта в P&L. Экономия времени — приятный побочный эффект.' },
    { q: 'Что с безопасностью данных и законом РФ?', a: 'Отдельный блок методики: как дать AI доступ к документам компании, не нарушая 152-ФЗ и не отдавая данные в публичные нейросети. На тарифах Org и Custom — шаблоны корпоративного VPN и закрытого контура данных.', security: true },
    { q: 'Можно с командой?', a: 'Да. ПРО — только собственник. МАКС — собственник + ответственный за AI. Компания — вся операционная команда, по договорённости. Состав и цены — в блоке «Тарифы».' },
    { q: 'Что такое Lifetime до 26.06?', a: 'Подписавшись до 26 июня, вы фиксируете пожизненный доступ по цене запуска — она не вырастет даже после общего повышения.' },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" className="section-pad section-line">
      <div className="container">
        <div style={{ marginBottom: 48, maxWidth: 720 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Вопросы</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: '#000' }}>Коротко о главном.</h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,.12)', maxWidth: 920 }}>
          {qa.map((item, i) => {
            const on = i === open;
            return (
              <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,.12)' }}>
                <button onClick={() => setOpen(on ? -1 : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, cursor: 'pointer', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(1.1rem,2vw,1.4rem)', letterSpacing: '-0.01em', color: '#000', display: 'flex', alignItems: 'center', gap: 12 }}>
                    {item.security && <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', background: '#2A3EF4', borderRadius: 999, padding: '4px 10px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}>Безопасность</span>}
                    {item.q}
                  </span>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 24, color: 'rgba(0,0,0,.4)', transform: on ? 'rotate(45deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>+</span>
                </button>
                {on && <p style={{ margin: '0 0 24px', fontSize: 16, color: 'rgba(0,0,0,.7)', lineHeight: 1.6, maxWidth: 760 }}>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
window.FAQ = FAQ;
