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
    <nav className="hakku-nav" style={{
      position: 'sticky', top: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16,
      padding: '20px 56px',
      background: 'rgba(255, 255, 255, .92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, .06)',
    }}>
      <style>{`
        @media (max-width: 768px) {
          .hakku-nav { padding: 14px 20px !important; background: #fff !important; }
          .hakku-nav .hakku-nav-links { display: none !important; }
          .hakku-nav .hakku-nav-cta { padding: 10px 16px !important; font-size: 13px !important; }
          .hakku-nav .hakku-nav-brand-mark { width: 22px !important; height: 22px !important; }
          .hakku-nav .hakku-nav-brand-text { font-size: 17px !important; }
        }
      `}</style>
      <a href="#" className="hakku-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, minWidth: 0 }}>
        <img src="./design_system/assets/logo-mark.png" alt="" className="hakku-nav-brand-mark" style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }}/>
        <span className="hakku-nav-brand-text" style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
          hakku.ai <span style={{ color: 'rgba(0,0,0,.45)' }}>/ бИИзнес</span>
        </span>
      </a>
      <div className="hakku-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: 'rgba(0, 0, 0, .75)' }}>
        {[['Этапы', '#direction'], ['Инфраструктура', '#inside'], ['Тарифы', '#pricing'], ['Команда', '#founders']].map(([label, href]) => (
          <a key={label} href={href} style={{ color: 'inherit' }}>{label}</a>
        ))}
      </div>
      <a href="#cta"><button className="hakku-nav-cta" style={btnStyles.primary}>Войти в сообщество →</button></a>
    </nav>
  );
};

window.Nav = Nav;
window.btnStyles = btnStyles;
