const Founders = () => {
  const people = [
    { name: 'Николай Писаренко', role: 'co-founder',           bio: 'PwC, СИБУР, СберУниверситет. Спикер 100+ конференций.' },
    { name: 'Сергей Ершов',      role: 'co-founder',           bio: 'CPO/CEO Edutoria, директор по развитию Ultimate Education.' },
    { name: 'Саша Долгов',       role: 'co-founder · бизнес',  bio: 'Фаундер VEYRA. Практикующий предприниматель по внедрению ИИ в собственные процессы.', link: 'https://dolgovalex.com/about' },
  ];
  return (
    <section id="founders" style={{ padding: '140px 0', borderTop: '1px solid rgba(255,255,255,.06)' }}>
      <div className="container">
        <div style={{ marginBottom: 64 }}>
          <div className="eyebrow-tag" style={{ marginBottom: 32 }}>Команда</div>
          <h2 style={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05, letterSpacing: '-0.02em',
            margin: 0, fontWeight: 400,
          }}>
            Фаундеры клуба.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {people.map((p) => (
            <div key={p.name} style={{ padding: '32px 28px', border: '1px solid rgba(255,255,255,.1)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 280 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Tektur, sans-serif', fontSize: 22, color: 'rgba(255,255,255,.7)',
              }}>{p.name.split(' ').map(s => s[0]).join('')}</div>
              <div>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.01em', margin: '0 0 6px', fontWeight: 400 }}>{p.name}</h3>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', letterSpacing: '0.04em' }}>{p.role}</div>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.bio}</p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener" style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', borderBottom: '1px solid rgba(255,255,255,.2)', paddingBottom: 2, alignSelf: 'flex-start' }}>
                  Подробнее →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Founders = Founders;
