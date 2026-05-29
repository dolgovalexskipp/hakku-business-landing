// Тарифы — 3 тарифа: ПРО / МАКС / Компания · ранняя цена · месяц/год.
const Pricing = () => {
  const [annual, setAnnual] = React.useState(false);
  const tiers = [
    {
      name: 'ПРО', regular: 4900, intro: 3900,
      users: 'Только собственник',
      desc: 'Полный доступ к сообществу для вас одного. Определите, где в вашем бизнесе ИИ даст прибыль, и запустите первый инструмент лично.',
      avatars: [{ initials: 'И-1' }, { initials: 'И-2' }],
    },
    {
      name: 'МАКС', regular: 7900, intro: 5900,
      users: 'Собственник + 1 ответственный за ИИ',
      desc: 'Вы и человек, который будет вести ИИ-трансформацию изнутри компании. Соберите первый инструмент под одну функцию с измеримым ростом денег.',
      popular: true,
      avatars: [{ initials: 'А-1' }, { initials: 'А-2' }, { initials: 'А-3' }],
    },
    {
      name: 'Компания', regular: null, intro: null,
      users: 'Вся команда — по договорённости',
      desc: 'Индивидуальный формат для компаний, которые подключают операционную команду целиком. Интеграция методики сообщества под конкретные процессы.',
      avatars: [],
    },
  ];
  const fmt = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

  const Avatar = ({ a, popular }) => (
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: popular ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.06)',
      border: `1px solid ${popular ? 'rgba(255,255,255,.25)' : 'rgba(0,0,0,.15)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tektur, sans-serif', fontSize: 11,
      color: popular ? 'rgba(255,255,255,.85)' : 'rgba(0,0,0,.55)',
    }}>{a.initials}</div>
  );

  return (
    <section id="pricing" className="section-pad" style={{ borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Тарифы</div>
            <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: '#000' }}>
              Сначала вы как собственник. Потом — команда.
            </h2>
          </div>
          <div style={{ display: 'inline-flex', padding: 4, background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.1)', borderRadius: 8 }}>
            {[['Помесячно', false], ['Годовая · −20%', true]].map(([label, v]) => (
              <button key={String(v)} onClick={() => setAnnual(v)} style={{
                padding: '10px 22px', borderRadius: 5, border: 0, cursor: 'pointer',
                background: annual === v ? '#000' : 'transparent', color: annual === v ? '#fff' : 'rgba(0,0,0,.7)',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap',
              }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28, fontSize: 13, color: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 4, background: '#FD7202', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Ранний тариф</span>
          <span>Сниженная цена для всех, кто подпишется с 8 июня по 8 июля — первого месяца жизни сообщества.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="grid-3">
          {tiers.map((t) => {
            const popular = t.popular;
            const introPrice = annual && t.regular ? Math.round(t.regular * 0.8) : t.intro;
            const regularPrice = annual && t.regular ? Math.round(t.regular * 0.8) : t.regular;
            return (
              <div key={t.name} style={{
                padding: '36px 28px 28px', border: `1px solid ${popular ? '#000' : 'rgba(0,0,0,.12)'}`,
                borderRadius: 24, background: popular ? '#000' : '#fff', color: popular ? '#fff' : '#000',
                display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', minHeight: 480,
              }}>
                {popular && <span style={{ position: 'absolute', top: -12, left: 24, padding: '7px 14px', borderRadius: 4, background: '#2A3EF4', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Самый популярный</span>}
                <div>
                  <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '0 0 6px', fontWeight: 400 }}>{t.name}</h3>
                  <div style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)' }}>{t.users}</div>
                </div>
                <div style={{ minHeight: 96 }}>
                  {t.regular !== null ? (
                    <>
                      {!annual && <div style={{ fontSize: 11, color: popular ? '#FCBC60' : '#FD7202', letterSpacing: '0.06em', marginBottom: 4, textTransform: 'uppercase' }}>ранний тариф · до 8 июля</div>}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                        <div className="numeral" style={{ fontSize: 40 }}>{fmt(introPrice)} ₽</div>
                        {!annual && <div style={{ fontSize: 14, color: popular ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)', textDecoration: 'line-through' }}>{fmt(t.regular)} ₽</div>}
                      </div>
                      <div style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)', marginTop: 6 }}>{annual ? 'в месяц · при годовой оплате' : `затем ${fmt(regularPrice)} ₽ / мес`}</div>
                    </>
                  ) : (
                    <div>
                      <div className="numeral" style={{ fontSize: 30 }}>По запросу</div>
                      <div style={{ fontSize: 13, color: 'rgba(0,0,0,.5)', marginTop: 6 }}>обсуждаем индивидуально</div>
                    </div>
                  )}
                </div>
                <p style={{ fontSize: 14, color: popular ? 'rgba(255,255,255,.78)' : 'rgba(0,0,0,.7)', lineHeight: 1.55, margin: 0 }}>{t.desc}</p>
                {t.avatars.length > 0 ? (
                  <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${popular ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)'}` }}>
                    <div style={{ fontSize: 11, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)', letterSpacing: '0.06em', marginBottom: 10, textTransform: 'uppercase' }}>На этом тарифе</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      {t.avatars.map((a, i) => (<div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar a={a} popular={popular}/></div>))}
                      {t.avatars.length >= 3 && <span style={{ marginLeft: 10, fontSize: 12, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.45)' }}>и другие</span>}
                    </div>
                  </div>
                ) : <div style={{ marginTop: 'auto' }}/>}
                <a href="#cta" style={{ width: '100%' }}>
                  <button style={{ width: '100%', padding: '14px 22px', fontSize: 15, fontFamily: 'Inter, sans-serif', fontWeight: 600, borderRadius: 8, cursor: 'pointer', background: popular ? '#fff' : '#000', color: popular ? '#000' : '#fff', border: 0 }}>{t.regular === null ? 'Связаться' : 'Выбрать →'}</button>
                </a>
                <div style={{ fontSize: 12, color: popular ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.5)', textAlign: 'center', marginTop: -4 }}>
                  заявка → знакомство с основателем → оплата
                </div>
              </div>
            );
          })}
        </div>
        {/* Навсегда — горизонтальная плашка под карточками тарифов */}
        <div id="lifetime" style={{
          marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap', padding: '22px 26px', borderRadius: 16,
          background: 'var(--ash, #f4f4f5)', border: '1px solid rgba(0,0,0,.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '7px 14px', borderRadius: 4, background: '#000', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Навсегда · до 26 июня</span>
            <div style={{ maxWidth: 620 }}>
              <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 18, letterSpacing: '-0.01em', color: '#000', marginBottom: 4 }}>Зафиксировать тариф навсегда</div>
              <div style={{ fontSize: 13.5, color: 'rgba(0,0,0,.6)', lineHeight: 1.5 }}>Цена не вырастет даже после общего повышения. Ограниченное число мест — обсуждаем индивидуально на созвоне.</div>
            </div>
          </div>
          <a href="#cta" style={{ fontSize: 14, color: '#000', borderBottom: '1px solid rgba(0,0,0,.3)', paddingBottom: 2, whiteSpace: 'nowrap' }}>Узнать на созвоне →</a>
        </div>

        <div style={{ marginTop: 22, fontSize: 13, color: 'rgba(0,0,0,.5)' }}>
          Для топ-менеджеров корпораций есть отдельный формат — <a href="https://hakku.ai" style={{ color: '#2A3EF4', borderBottom: '1px solid rgba(42,62,244,.3)' }}>hakku.ai / Community</a> · 1 290 ₽/мес на основном сайте.
        </div>
      </div>
    </section>
  );
};
window.Pricing = Pricing;
