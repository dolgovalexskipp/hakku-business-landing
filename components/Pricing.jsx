const Pricing = () => {
  const [annual, setAnnual] = React.useState(false);
  const tiers = [
    { name: 'Старт',     price: 2900, users: '1 пользователь',    desc: 'Собственник входит один и пробует на себе.' },
    { name: 'Рост',      price: 4900, users: 'До 3 пользователей', desc: 'Собственник и ключевые сотрудники.', popular: true },
    { name: 'Масштаб',   price: 9900, users: 'До 10 пользователей', desc: 'Операционная команда целиком.' },
    { name: 'Стратегия', price: null, users: '10+ пользователей',   desc: 'Индивидуальный формат для крупных компаний.' },
  ];
  const fmt = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ');

  return (
    <section id="pricing" style={{ padding: '140px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Тарифы</div>
            <h2 style={{
              fontFamily: 'Tektur, sans-serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em',
              margin: 0, fontWeight: 400,
            }}>
              От первого шага до системной стратегии.
            </h2>
          </div>
          <div style={{ display: 'inline-flex', padding: 4, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 999 }}>
            {[['Помесячно', false], ['Годовая · −20%', true]].map(([label, v]) => (
              <button key={String(v)} onClick={() => setAnnual(v)} style={{
                padding: '10px 22px', borderRadius: 999, border: 0, cursor: 'pointer',
                background: annual === v ? '#fff' : 'transparent',
                color: annual === v ? '#000' : 'rgba(255,255,255,.75)',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
              }}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {tiers.map((t) => {
            const monthly = annual && t.price ? Math.round(t.price * 0.8) : t.price;
            const popular = t.popular;
            return (
              <div key={t.name} style={{
                padding: '36px 28px 28px',
                border: `1px solid ${popular ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.1)'}`,
                borderRadius: 24,
                background: popular ? '#fff' : 'transparent',
                color: popular ? '#000' : '#fff',
                display: 'flex', flexDirection: 'column', gap: 18, position: 'relative',
                minHeight: 380,
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
                  <div style={{ fontSize: 13, color: popular ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.55)' }}>{t.users}</div>
                </div>
                <div style={{ minHeight: 76 }}>
                  {monthly !== null ? (
                    <>
                      <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 44, lineHeight: 1, letterSpacing: '-0.02em' }}>{fmt(monthly)} ₽</div>
                      <div style={{ fontSize: 13, color: popular ? 'rgba(0,0,0,.55)' : 'rgba(255,255,255,.5)', marginTop: 6 }}>
                        в месяц{annual ? ' · при годовой оплате' : ''}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 30, lineHeight: 1, letterSpacing: '-0.01em' }}>По запросу</div>
                  )}
                </div>
                <p style={{ fontSize: 14, color: popular ? 'rgba(0,0,0,.7)' : 'rgba(255,255,255,.68)', lineHeight: 1.55, margin: 0, flex: 1 }}>{t.desc}</p>
                <a href="#cta" style={{ width: '100%' }}>
                  <button style={{
                    width: '100%', padding: '14px 22px', fontSize: 15,
                    fontFamily: 'Inter, sans-serif', fontWeight: 500,
                    borderRadius: 999, cursor: 'pointer',
                    background: popular ? '#000' : 'transparent',
                    color: popular ? '#fff' : '#fff',
                    border: popular ? '0' : '1px solid rgba(255,255,255,.25)',
                  }}>{t.price === null ? 'Связаться' : 'Выбрать →'}</button>
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
