// Кто за этим стоит — Hakku.ai (founders) + tight ambassadors teaser.
const Team = () => {
  const people = [
    {
      name: 'Николай Писаренко',
      role: 'сооснователь · хакку.ии',
      bio: 'PwC, СИБУР, СберУниверситет. Спикер 100+ конференций. 10+ лет в корпоративном обучении и ИИ-трансформации.',
      photo: 'assets/founders/nikolai.jpg',
    },
    {
      name: 'Сергей Ершов',
      role: 'сооснователь · хакку.ии',
      bio: 'CPO/CEO Edutoria (образовательная платформа Сбера). Директор по развитию Ultimate Education. Автор каналов про ИИ и технологии.',
      photo: 'assets/founders/sergei.jpg',
    },
    {
      name: 'Саша Долгов',
      role: 'сооснователь · бИИзнес',
      bio: 'Основатель VEYRA (голосовые ИИ-агенты). McKinsey → Skyeng → собственная компания, построенная с нуля вокруг ИИ.',
      link: 'https://dolgovalex.com/about',
      photo: 'assets/founders/alexander.jpg',
    },
  ];
  const ambassadors = [
    { name: 'Анастасия Федорова', photo: 'assets/ambassadors/fedorova.jpg' },
    { name: 'Александр Потапенко', photo: 'assets/ambassadors/potapenko.jpg' },
    { name: 'Андрей Ларионов', photo: 'assets/ambassadors/larionov.jpg' },
    { name: 'Марина Курганова', photo: 'assets/ambassadors/kurganova.jpg' },
  ];
  return (
    <section id="team" className="section-pad section-line">
      <div className="container">
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 11, color: 'rgba(0,0,0,.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 22 }}>Кто за этим стоит</div>
          <h2 style={{ fontFamily: 'Tektur, sans-serif', fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontWeight: 400, color: '#000' }}>
            Команда хакку.ии.
          </h2>
        </div>

        <style>{`
          @media (max-width: 980px) { #team .team-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 980px) and (min-width: 561px) { #team .team-card { flex-direction: row !important; } #team .team-photo { width: 200px !important; flex: 0 0 200px !important; } }
          #team .team-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1); }
          #team .team-card:hover { transform: translateY(-4px); }
          #team .amb-card { transition: transform .25s cubic-bezier(0.2,0.8,0.2,1); }
          #team .amb-card:hover { transform: translateY(-4px); }
          @media (max-width: 760px) { #team .amb-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 36 }}>
          {people.map((p) => (
            <div key={p.name} className="team-card" style={{
              display: 'flex', flexDirection: 'column', borderRadius: 20, overflow: 'hidden',
              background: 'var(--ash, #f4f4f5)', border: '1px solid rgba(0,0,0,.06)',
            }}>
              <div className="team-photo" style={{
                width: '100%', aspectRatio: '1 / 1', background: '#f4f4f5', overflow: 'hidden',
              }}>
                <img src={p.photo} alt={p.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
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

        {/* Амбассадоры — собственники бизнеса, которые уже идут с нами */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: 'Tektur, sans-serif', fontSize: 18, letterSpacing: '-0.01em', color: '#000', marginBottom: 4 }}>
            Амбассадоры — собственники бизнеса, которые уже идут с нами
          </div>
          <div style={{ fontSize: 13.5, color: 'rgba(0,0,0,.55)' }}>Те, кто внедряет ИИ в своих компаниях и присоединился к сообществу одним из первых.</div>
        </div>
        <div className="amb-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {ambassadors.map((a) => (
            <div key={a.name} className="amb-card" style={{
              borderRadius: 16, overflow: 'hidden', background: '#000',
              aspectRatio: '1 / 1', border: '1px solid rgba(0,0,0,.08)',
            }}>
              <img src={a.photo} alt={a.name} style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              }}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
window.Team = Team;
