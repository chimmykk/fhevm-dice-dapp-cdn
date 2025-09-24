const ContractInfo = ({ contractAddress }) => {
  return (
    <div className="card-secondary" style={{ padding: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Contract Address */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 10px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-light)',
          borderRadius: '6px'
        }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.8rem' }}>
            Contract:
          </span>
          <a
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'monospace',
              color: 'var(--primary-blue)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: '3px 6px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--bg-tertiary)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--bg-card)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}
          </a>
        </div>

        {/* Network and Tech badges in one row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span className="badge" style={{ 
            background: 'var(--bg-card)', 
            color: 'var(--text-primary)', 
            padding: '2px 6px', 
            fontSize: '0.7rem', 
            border: '1px solid var(--border-light)',
            borderRadius: '4px'
          }}>
            🌐 Sepolia
          </span>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            <span className="badge" style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-light)', 
              fontSize: '0.65rem', 
              padding: '1px 5px',
              borderRadius: '4px'
            }}>🔒 FHEVM</span>
            <span className="badge" style={{ 
              background: 'var(--bg-card)', 
              border: '1px solid var(--border-light)', 
              fontSize: '0.65rem', 
              padding: '1px 5px',
              borderRadius: '4px'
            }}>🛡️ Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;