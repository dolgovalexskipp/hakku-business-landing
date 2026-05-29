// Кто за этим стоит — Hakku.ai (founders) + амбассадоры placeholder (до 08.06).
const Team = () => {
  const people = [
    { name: 'Николай Писаренко', role: 'co-founder', bio: 'PwC, СИБУР, СберУниверситет. Спикер 100+ конференций.', photo: 'assets/founders/nikolai.jpg' },
    { name: 'Сергей Ершов', role: 'co-founder', bio: 'CPO/CEO Edutoria, директор по развитию Ultimate Education.', photo: 'assets/founders/sergei.png' },
    { name: 'Саша Долгов', role: 'co-founder · бИИзнес', bio: 'Фаундер VEYRA. Практик внедрения AI в собственные процессы.', link: 'https://dolgovalex.com/about', photo: 'assets/founders/alexander.png' },
  ];
  return (
    <section id="team" className="section-pad section-line">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 28 }}>Кто за этим стоит</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: '#000' }}>
            Команда hakku.ai.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 18, marginBottom: 56 }}>
          {people.map((p) => (
            <div key={p.name} style={{ padding: '30px 28px', border: '1px solid rgba(0,0,0,.12)', borderRadius: 24, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 260, background: '#fff' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(0,0,0,.12)', background: 'rgba(0,0,0,.04)' }}>
                <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}/>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 21, letterSpacing: '-0.01em', margin: '0 0 6px', fontWeight: 400, color: '#000' }}>{p.name}</h3>
                <div style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', letterSpacing: '0.04em' }}>{p.role}</div>
              </div>
              <p style={{ fontSize: 14, color: 'rgba(0,0,0,.68)', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.bio}</p>
              {p.link && <a href={p.link} target="_blank" rel="noopener" style={{ fontSize: 13, color: '#000', borderBottom: '1px solid rgba(0,0,0,.2)', paddingBottom: 2, alignSelf: 'flex-start' }}>Подробнее →</a>}
            </div>
          ))}
        </div>

        {/* Амбассадоры — placeholder silhouettes до 08.06 */}
        <div style={{ padding: '32px 32px', border: '1px dashed rgba(0,0,0,.2)', borderRadius: 24, background: '#fafafa' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
            <div>
              <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 22, letterSpacing: '-0.01em', color: '#000' }}>Амбассадоры сообщества</div>
              <div style={{ fontSize: 14, color: 'rgba(0,0,0,.55)', marginTop: 4 }}>Собственники, которые уже трансформируют бизнес. Имена откроем 8 июня.</div>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', border: '1px solid rgba(0,0,0,.15)', borderRadius: 999, padding: '7px 14px' }}>Скоро · 08.06.2026</span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: '50%', background: 'repeating-linear-gradient(45deg,rgba(0,0,0,.05),rgba(0,0,0,.05) 6px,rgba(0,0,0,.09) 6px,rgba(0,0,0,.09) 12px)', border: '1px solid rgba(0,0,0,.1)' }}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
window.Team = Team;
