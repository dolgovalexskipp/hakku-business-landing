const btnStyles = {
  primary: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 999, border: 0,
    background: '#000', color: '#fff', cursor: 'pointer',
    transition: 'filter 180ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  ghost: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 999,
    border: '1px solid rgba(0,0,0,.18)', background: 'transparent', color: '#000', cursor: 'pointer',
  },
  inverse: {
    fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
    padding: '12px 22px', borderRadius: 999, border: 0,
    background: '#fff', color: '#000', cursor: 'pointer',
  },
};

const Nav = () => {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 56px',
      background: 'rgba(255, 255, 255, .82)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, .06)',
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="./design_system/assets/logo-mark.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }}/>
        <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, letterSpacing: '-0.01em' }}>
          hakku.ai <span style={{ color: 'rgba(0,0,0,.45)' }}>/ бизнес</span>
        </span>
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: 'rgba(0, 0, 0, .75)' }}>
        {[['Этапы', '#direction'], ['Инфраструктура', '#inside'], ['Тарифы', '#pricing'], ['Команда', '#founders']].map(([label, href]) => (
          <a key={label} href={href} style={{ color: 'inherit' }}>{label}</a>
        ))}
      </div>
      <a href="#cta"><button style={btnStyles.primary}>В первую когорту →</button></a>
    </nav>
  );
};

window.Nav = Nav;
window.btnStyles = btnStyles;
