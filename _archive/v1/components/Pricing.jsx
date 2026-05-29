const Pricing = () => {
  const [annual, setAnnual] = React.useState(false);

  // Аватары амбассадоров / клиентов на тарифе. Placeholder инициалы — заменим на портреты.
  const tiers = [
    {
      name: 'ПРО',
      regular: 4990, intro: 3990,
      users: 'Только собственник',
      desc: 'Полный доступ к сообществу для вас одного. Определите, где в вашем бизнесе AI даст прибыль, и запустите первый инструмент лично.',
      avatars: [
        { initials: 'И-1', sub: 'Имя · Отрасль' },
        { initials: 'И-2', sub: 'Имя · Отрасль' },
      ],
    },
    {
      name: 'МАКС',
      regular: 7990, intro: 5990,
      users: 'Собственник + 1 ответственный за AI',
      desc: 'Вы и человек, который будет вести AI-трансформацию изнутри компании. Соберите первый AI-инструмент под одну функцию с измеримым эффектом.',
      popular: true,
      avatars: [
        { initials: 'А-1', sub: 'Имя · Компания' },
        { initials: 'А-2', sub: 'Имя · Компания' },
        { initials: 'А-3', sub: 'Имя · Компания' },
      ],
    },
    {
      name: 'Компания',
      regular: null, intro: null,
      users: 'Вся команда — по договорённости',
      desc: 'Индивидуальный формат для компаний, которые подключают операционную команду целиком. Интеграция методики сообщества под конкретные процессы.',
      avatars: [],
    },
  ];

  const fmt = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

  const Avatar = ({ a, popular }) => (
    <div title={a.sub} style={{
      width: 32, height: 32, borderRadius: '50%',
      background: popular ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.06)',
      border: `1px solid ${popular ? 'rgba(255,255,255,.25)' : 'rgba(0,0,0,.15)'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Tektur, sans-serif', fontSize: 11,
      color: popular ? 'rgba(255,255,255,.85)' : 'rgba(0,0,0,.55)',
    }}>{a.initials}</div>
  );

  return (
    <section id="pricing" style={{ padding: '140px 0', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <style>{`
        @media (max-width: 960px) {
          .hakku-pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="container">
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Тарифы</div>
            <h2 style={{
              fontFamily: 'Tektur, sans-serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em',
              margin: 0, fontWeight: 400, color: '#000',
            }}>
              Сначала вы как собственник. Потом — команда.
            </h2>
          </div>
          <div style={{ display: 'inline-flex', padding: 4, background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.1)', borderRadius: 999 }}>
            {[['Помесячно', false], ['Годовая · −20%', true]].map(([label, v]) => (
              <button key={String(v)} onClick={() => setAnnual(v)} style={{
                padding: '10px 22px', borderRadius: 999, border: 0, cursor: 'pointer',
                background: annual === v ? '#000' : 'transparent',
                color: annual === v ? '#fff' : 'rgba(0,0,0,.7)',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28, fontSize: 13, color: 'rgba(0,0,0,.55)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: '#FD7202', color: '#fff', fontSize: 12, letterSpacing: '0.02em',
          }}>Early-bird</span>
          <span>Сниженная цена для всех, кто подпишется с 8 июня по 8 июля — первого месяца жизни сообщества.</span>
        </div>

        <div className="hakku-pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {tiers.map((t) => {
            const popular = t.popular;
            const introPrice = annual && t.regular ? Math.round(t.regular * 0.8) : t.intro;
            const regularPrice = annual && t.regular ? Math.round(t.regular * 0.8) : t.regular;
            return (
              <div key={t.name} style={{
                padding: '36px 28px 28px',
                border: `1px solid ${popular ? '#000' : 'rgba(0,0,0,.12)'}`,
                borderRadius: 24,
                background: popular ? '#000' : '#fff',
                color: popular ? '#fff' : '#000',
                display: 'flex', flexDirection: 'column', gap: 18, position: 'relative',
                minHeight: 480,
              }}>
                {popular && (
                  <span style={{
                    position: 'absolute', top: -12, left: 24,
                    padding: '6px 14px', borderRadius: 999,
                    background: '#2A3EF4', color: '#fff',
                    fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
                  }}>Самый популярный</span>
                )}
                <div>
                  <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 28, lineHeight: 1.1, letterSpacing: '-0.01em', margin: '0 0 6px', fontWeight: 400 }}>{t.name}</h3>
                  <div style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,.6)' : 'rgba(0,0,0,.55)' }}>{t.users}</div>
                </div>

                <div style={{ minHeight: 96 }}>
                  {t.regular !== null ? (
                    <>
                      {!annual && (
                        <div style={{
                          fontSize: 11, color: popular ? '#FCBC60' : '#FD7202',
                          letterSpacing: '0.06em', marginBottom: 4, textTransform: 'uppercase',
                        }}>early-bird · до 8 июля</div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 40, lineHeight: 1, letterSpacing: '-0.02em' }}>
                          {fmt(introPrice)} ₽
                        </div>
                        {!annual && (
                          <div style={{
                            fontSize: 14, color: popular ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.4)',
                            textDecoration: 'line-through',
                          }}>{fmt(t.regular)} ₽</div>
                        )}
                      </div>
                      <div style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)', marginTop: 6 }}>
                        {annual ? 'в месяц · при годовой оплате' : `затем ${fmt(regularPrice)} ₽ / мес`}
                      </div>
                    </>
                  ) : (
                    <div>
                      <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 30, lineHeight: 1, letterSpacing: '-0.01em' }}>По запросу</div>
                      <div style={{ fontSize: 13, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)', marginTop: 6 }}>
                        обсуждаем индивидуально
                      </div>
                    </div>
                  )}
                </div>

                <p style={{ fontSize: 14, color: popular ? 'rgba(255,255,255,.78)' : 'rgba(0,0,0,.7)', lineHeight: 1.55, margin: 0 }}>{t.desc}</p>

                {t.avatars.length > 0 ? (
                  <div style={{ marginTop: 'auto', paddingTop: 18, borderTop: `1px solid ${popular ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.08)'}` }}>
                    <div style={{
                      fontSize: 11, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.5)',
                      letterSpacing: '0.06em', marginBottom: 10, textTransform: 'uppercase',
                    }}>На этом тарифе</div>
                    <div style={{ display: 'flex', gap: -4, flexWrap: 'wrap' }}>
                      {t.avatars.map((a, i) => (
                        <div key={i} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                          <Avatar a={a} popular={popular}/>
                        </div>
                      ))}
                      {t.avatars.length >= 3 && (
                        <span style={{ marginLeft: 10, alignSelf: 'center', fontSize: 12, color: popular ? 'rgba(255,255,255,.55)' : 'rgba(0,0,0,.45)' }}>
                          и другие
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ marginTop: 'auto' }}/>
                )}

                <a href="#cta" style={{ width: '100%' }}>
                  <button style={{
                    width: '100%', padding: '14px 22px', fontSize: 15,
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    borderRadius: 999, cursor: 'pointer',
                    background: popular ? '#fff' : '#000',
                    color: popular ? '#000' : '#fff',
                    border: 0,
                  }}>{t.regular === null ? 'Связаться' : 'Выбрать →'}</button>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.Pricing = Pricing;
