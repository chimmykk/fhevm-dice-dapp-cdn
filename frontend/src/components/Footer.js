const Footer = () => {
  return (
    <footer className="footer" style={{ padding: '8px 0', margin: '8px 0 0' }}>
      <div className="footer-content" style={{ 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '12px',
        padding: '0'
      }}>
        <div className="footer-text">
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <span>🎲 Dice</span>
            <span>•</span>
            <span>FHEVM</span>
          </p>
        </div>
        <div className="footer-links" style={{ 
          gap: '8px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <a
            href="https://github.com/chimmykk"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ fontSize: '0.75rem' }}
          >
            GitHub
          </a>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;