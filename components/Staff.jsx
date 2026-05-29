// AI-сотрудники — interactive catalog. Click an employee → функция / боль / решение.
const Staff = () => {
  const staff = [
    {
      role: 'Персональный ассистент собственника',
      tag: 'Управление',
      fn: 'Держит ваш день, переписку и задачи под контролем — повестки, протоколы, follow-up.',
      pain: 'Собственник — узкое горло: всё через него, решения тонут в чатах, важное теряется.',
      sol: 'AI-ассистент собирает контекст из переписок и встреч, готовит решения к подписи и не даёт задачам провисать.',
    },
    {
      role: 'Финансовый аналитик',
      tag: 'Финансы',
      fn: 'Считает юнит-экономику, маржу и сценарии «что если» по вашим выгрузкам.',
      pain: 'P&L раз в месяц от бухгалтера, решения — на ощущениях, а не на цифрах.',
      sol: 'AI читает выгрузки 1С/банка, держит дашборд маржи и подсвечивает, где деньги утекают.',
    },
    {
      role: 'Документовед',
      tag: 'Документы',
      fn: 'Готовит и проверяет договоры, КП, регламенты по вашим шаблонам.',
      pain: 'Договоры неделями, ручная сверка, риски в формулировках, узкое место — юрист.',
      sol: 'AI собирает документ из шаблона, сверяет с прошлыми версиями и помечает рискованные пункты.',
    },
    {
      role: 'Ассистент бухгалтерии',
      tag: 'Учёт',
      fn: 'Разносит первичку, сверяет акты и закрытие, готовит данные для бухгалтера.',
      pain: 'Бардак в первичке, ручной ввод, ошибки всплывают на сдаче отчётности.',
      sol: 'AI распознаёт документы, раскладывает по статьям и отдаёт бухгалтеру готовый, сверенный массив.',
    },
    {
      role: 'Ассистент по продажам',
      tag: 'Продажи',
      fn: 'Квалифицирует лиды, пишет follow-up, ведёт CRM и готовит КП.',
      pain: 'Лиды остывают, менеджеры забывают перезвонить, CRM не заполнена.',
      sol: 'AI ведёт каждого лида по воронке, сам пишет касания и подсказывает, кому звонить сегодня.',
    },
  ];
  const [active, setActive] = React.useState(0);
  const cur = staff[active];
  return (
    <section id="staff" className="section-pad section-line">
      <div className="container">
        <div style={{ marginBottom: 56, maxWidth: 920 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Пример · чему учим в сообществе</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 22px', fontWeight: 400, color: '#000' }}>
            Например — вы научитесь проектировать AI-сотрудников.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(0,0,0,.6)', lineHeight: 1.55, margin: 0, maxWidth: 720 }}>
            Это один из разборов, которыми живёт сообщество: не «подключить нейросеть», а закрыть конкретную функцию. Выберите роль — увидите функцию, боль и AI-сотрудника, который её закрывает. Шаблоны остаются у вас навсегда.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16 }} className="grid-2">
          {/* selector list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {staff.map((s, i) => {
              const on = i === active;
              return (
                <button key={i} onClick={() => setActive(i)} style={{
                  textAlign: 'left', cursor: 'pointer', border: `1px solid ${on ? '#000' : 'rgba(0,0,0,.12)'}`,
                  background: on ? '#000' : '#fff', color: on ? '#fff' : '#000',
                  borderRadius: 16, padding: '18px 20px', transition: 'all .18s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                }}>
                  <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.role}</span>
                  <span style={{ fontSize: 18, opacity: on ? 1 : .3 }}>→</span>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div style={{ border: '1px solid rgba(0,0,0,.12)', borderRadius: 24, padding: '40px 40px 36px', position: 'relative', overflow: 'hidden', minHeight: 360, display: 'flex', flexDirection: 'column' }}>
            <img src="assets/graphic-holo-ring.png" alt="" style={{ position: 'absolute', right: -90, top: -90, width: 340, height: 340, objectFit: 'contain', opacity: .85, pointerEvents: 'none' }}/>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 500, color: '#2A3EF4', border: '1px solid rgba(42,62,244,.3)', borderRadius: 999, padding: '5px 13px', marginBottom: 20 }}>{cur.tag}</span>
              <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 30, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '0 0 28px', fontWeight: 400, color: '#000', maxWidth: 520 }}>{cur.role}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 620 }}>
                {[['Функция', cur.fn, 'rgba(0,0,0,.4)'], ['Боль', cur.pain, '#D51F75'], ['AI-сотрудник закрывает', cur.sol, '#2A3EF4']].map(([label, text, c]) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 18, alignItems: 'baseline', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,.08)' }}>
                    <span style={{ fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: c, fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 15, color: 'rgba(0,0,0,.78)', lineHeight: 1.55 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
window.Staff = Staff;
