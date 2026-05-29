const Footer = () => {
  return (
    <footer style={{ padding: '64px 0 40px', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="./design_system/assets/logo-mark.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }}/>
            <span style={{ fontFamily: 'Tektur, sans-serif', fontSize: 20, letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              Хакку.ии
              <span style={{ fontSize: 13, color: 'rgba(0,0,0,.45)', letterSpacing: 0 }}>(hakku.ai)</span>
              <span style={{ color: 'rgba(0,0,0,.45)' }}>| бИИзнес</span>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 28, fontSize: 14, color: 'rgba(0,0,0,.65)' }}>
            <a href="https://hakku.ai">основной сайт</a>
            <a href="#">политика</a>
            <a href="#">оферта</a>
            <a href="mailto:hello@hakku.ai">hello@hakku.ai</a>
          </div>
        </div>
        <div style={{
          paddingTop: 24, borderTop: '1px solid rgba(0,0,0,.06)',
          fontSize: 12, color: 'rgba(0,0,0,.45)',
        }}>
          © 2026 ИП Писаренко Н.С.
        </div>
      </div>
    </footer>
  );
};

window.Footer = Footer;
