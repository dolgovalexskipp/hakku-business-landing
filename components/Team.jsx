// Кто за этим стоит — Hakku.ai (founders) + tight ambassadors teaser.
const Team = () => {
  const people = [
    {
      name: 'Николай Писаренко',
      role: 'co-founder · hakku.ai',
      bio: 'PwC, СИБУР, СберУниверситет. Спикер 100+ конференций. 10+ лет в корпоративном обучении и AI-трансформации.',
      photo: 'assets/founders/nikolai.jpg',
    },
    {
      name: 'Сергей Ершов',
      role: 'co-founder · hakku.ai',
      bio: 'CPO/CEO Edutoria (EdTech Сбера). Директор по развитию Ultimate Education. Автор каналов про AI и tech.',
      photo: 'assets/founders/sergei.png',
    },
    {
      name: 'Саша Долгов',
      role: 'co-founder · бИИзнес',
      bio: 'Фаундер VEYRA (голосовые AI-агенты). McKinsey → Skyeng → собственная компания, построенная с нуля как AI-native.',
      link: 'https://dolgovalex.com/about',
      photo: 'assets/founders/alexander.png',
    },
  ];
  return (
    <section id="team" className="section-pad section-line">
      <div className="container">
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22 }}>Кто за этим стоит</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: '#000' }}>
            Команда hakku.ai.
          </h2>
        </div>

        <style>{`
          @media (max-width: 980px) { #team .team-grid { grid-template-columns: 1fr !important; } #team .team-photo { aspect-ratio: 16/10 !important; } }
          #team .team-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1); }
          #team .team-card:hover { transform: translateY(-4px); }
        `}</style>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 36 }}>
          {people.map((p) => (
            <div key={p.name} className="team-card" style={{
              display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden',
              background: 'var(--ash, #f4f4f5)', border: '1px solid rgba(0,0,0,.06)',
            }}>
              <div className="team-photo" style={{
                width: '100%', aspectRatio: '1 / 1', background: '#000', overflow: 'hidden',
              }}>
                <img src={p.photo} alt={p.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
                  filter: 'grayscale(1) contrast(1.05)',
                }}/>
              </div>
              <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 24, letterSpacing: '-0.01em', margin: '0 0 4px', fontWeight: 400, color: '#000' }}>{p.name}</h3>
                  <div style={{ fontSize: 12, color: 'rgba(0,0,0,.5)', letterSpacing: '0.04em' }}>{p.role}</div>
                </div>
                <p style={{ fontSize: 14.5, color: 'rgba(0,0,0,.7)', lineHeight: 1.55, margin: 0 }}>{p.bio}</p>
                {p.link && <a href={p.link} target="_blank" rel="noopener" style={{ fontSize: 13, color: '#000', borderBottom: '1px solid rgba(0,0,0,.25)', paddingBottom: 2, alignSelf: 'flex-start' }}>Подробнее →</a>}
              </div>
            </div>
          ))}
        </div>

        {/* Амбассадоры — компактный тизер без силуэтов */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
          flexWrap: 'wrap', padding: '20px 24px',
          border: '1px solid rgba(0,0,0,.1)', borderRadius: 16, background: '#fff',
        }}>
          <div>
            <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 18, letterSpacing: '-0.01em', color: '#000', marginBottom: 4 }}>
              + 7 амбассадоров — собственники бизнеса, которые уже идут с нами
            </div>
            <div style={{ fontSize: 13.5, color: 'rgba(0,0,0,.55)' }}>Имена и компании откроем 8 июня, к старту сообщества.</div>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(0,0,0,.55)', border: '1px solid rgba(0,0,0,.15)', borderRadius: 999, padding: '7px 14px', whiteSpace: 'nowrap' }}>Скоро · 08.06.2026</span>
        </div>
      </div>
    </section>
  );
};
window.Team = Team;
