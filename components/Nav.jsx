// Shared button styles + brand glyph + Nav.
const btnStyles = {
  primary: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 8, border: 0,
    background: '#000', color: '#fff', cursor: 'pointer',
    transition: 'filter 180ms cubic-bezier(0.2,0.8,0.2,1)',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  },
  ghost: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 8,
    border: '1px solid rgba(0,0,0,.18)', background: 'transparent', color: '#000', cursor: 'pointer',
  },
};

// Brand glyph — inline SVG so it recolours via the `color` prop.
const Glyph = ({ size = 26, color = '#000' }) => (
  <svg width={size} height={size * (63.746 / 75.947)} viewBox="0 0 75.947 63.746" fill={color} style={{ flexShrink: 0 }}>
    <g transform="translate(52.456,1.459)"><path d="M 12.389 59.989 L 23.491 48.887 C 18.463 43.859 15.701 37.15 15.701 29.994 C 15.701 22.822 18.463 16.113 23.491 11.102 L 12.389 0 C 4.41 7.979 0 18.635 0 29.994 C 0 41.354 4.393 52.01 12.389 59.989 Z"/></g>
    <g transform="translate(0,21.328)"><path fillRule="evenodd" d="M 42.418 0 L 42.418 0.001 L 48.578 0.001 L 48.578 15.702 L 39.403 15.702 C 33.149 31.34 17.844 42.418 0 42.418 L 0 26.718 C 14.723 26.718 26.717 14.74 26.717 0 L 42.418 0 Z"/></g>
    <g transform="translate(26.734,0)"><path d="M 7.859 15.718 C 12.199 15.718 15.718 12.199 15.718 7.859 C 15.718 3.519 12.199 0 7.859 0 C 3.519 0 0 3.519 0 7.859 C 0 12.199 3.519 15.718 7.859 15.718 Z"/></g>
  </svg>
);

const Wordmark = ({ light = false }) => {
  const muted = light ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.45)';
  return (
    <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 19, letterSpacing: '-0.02em', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'baseline', gap: 10, color: light ? '#fff' : '#000' }}>
      <span>хакку.ии</span>
      <span style={{ color: muted }}>|</span>
      <span>б<span style={{ color: '#D51F75' }}>ИИ</span>знес</span>
    </span>
  );
};

const Nav = () => {
  const links = [['Манифест', '#manifesto'], ['Программа', '#program'], ['Тарифы', '#pricing'], ['Команда', '#team']];
  return (
    <nav className="hakku-nav" style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      padding: '18px 56px',
      background: 'rgba(255,255,255,.9)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,.06)',
    }}>
      <style>{`
        @media (max-width: 900px) {
          .hakku-nav { padding: 14px 20px !important; }
          .hakku-nav .nav-links { display: none !important; }
          .hakku-nav .nav-en { display: none !important; }
        }
      `}</style>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Glyph size={26}/>
        <span className="nav-en"><Wordmark/></span>
        <span style={{ display: 'none' }}/>
      </a>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: 'rgba(0,0,0,.75)' }}>
        {links.map(([l, h]) => (
          <a key={l} href={h} style={{ color: 'inherit' }} onMouseOver={e => e.currentTarget.style.color = '#000'} onMouseOut={e => e.currentTarget.style.color = 'rgba(0,0,0,.75)'}>{l}</a>
        ))}
      </div>
      <a href="#cta"><button style={btnStyles.primary} onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.7)'} onMouseOut={e => e.currentTarget.style.filter = 'none'}>Войти в сообщество →</button></a>
    </nav>
  );
};

Object.assign(window, { btnStyles, Glyph, Wordmark, Nav });
