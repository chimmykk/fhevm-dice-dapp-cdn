const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '1px'
        }}>
        </div>
        <h1 className="title">
           Dice — Confidential Rolls
        </h1>
   
      </div>
    </header>
  );
};

export default Header;
