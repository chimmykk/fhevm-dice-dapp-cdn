import React from 'react';

const WalletConnect = ({ isConnected, account, onConnect, txStatus, pastRounds, onClaimPastPrize, loading }) => {
  const [showPastRounds, setShowPastRounds] = React.useState(false);

  if (isConnected) {
    return (
      <div>
        {/* Connected Account */}
        <div className="card" style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Connected Account</div>
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            </div>
            <span className="badge" style={{ background: 'var(--success-color)', fontSize: '0.7rem', padding: '2px 8px' }}>
              ✅ Connected
            </span>
          </div>
        </div>

        {/* Past Rounds Section */}
        {pastRounds && pastRounds.length > 0 && (
          <div className="card" style={{ marginTop: '12px', padding: '12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px'
              }}
              onClick={() => setShowPastRounds(!showPastRounds)}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                📜 Past Rounds ({pastRounds.length})
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {showPastRounds ? '▼' : '▶'}
              </span>
            </div>

            {showPastRounds && (
              <div style={{ padding: '0 8px 8px 8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                  {pastRounds.map((round) => {
                    const isWinner = round.winner.toLowerCase() === account.toLowerCase();
                    const canClaim = isWinner && !round.claimed;

                    return (
                      <div
                        key={round.index}
                        style={{
                          padding: '8px',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          backgroundColor: 'var(--bg-secondary)',
                          fontSize: '0.8rem'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                            Round #{round.index + 1}
                          </span>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {new Date(round.drawTime * 1000).toLocaleDateString()}
                          </span>
                        </div>

                        <div style={{ marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Winner: </span>
                          <span style={{ fontFamily: 'monospace' }}>
                            {round.winner.slice(0, 4)}...{round.winner.slice(-4)}
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            Prize: {round.prize} ETH
                          </span>

                          {isWinner ? (
                            round.claimed ? (
                              <span style={{ color: 'var(--success-color)', fontSize: '0.75rem' }}>✅ Claimed</span>
                            ) : (
                              <button
                                onClick={() => onClaimPastPrize(round.index)}
                                disabled={loading}
                                className="btn btn-success"
                                style={{ fontSize: '0.7rem', padding: '2px 6px' }}
                              >
                                {loading ? '💰 ...' : '💰 Claim'}
                              </button>
                            )
                          ) : (
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                              Better luck!
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card-priority" style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      textAlign: 'center'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          marginBottom: '12px', 
          color: 'var(--text-primary)',
          fontWeight: 700
        }}>
          Connect Your Wallet
        </h2>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '0', 
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          Connect your MetaMask wallet to experience confidential dice rolling
        </p>
      </div>

      {/* App Description */}
      <div className="card-secondary" style={{
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        textAlign: 'left'
      }}>
        <h3 style={{ 
          fontSize: '1rem', 
          marginBottom: '12px', 
          color: 'var(--text-primary)',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          What is Confidential Dice?
        </h3>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '12px',
          lineHeight: '1.6'
        }}>
          A privacy-focused dice game built with Zama FHEVM technology where:
        </p>
        <ul style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)', 
          paddingLeft: '20px', 
          marginBottom: '0',
          lineHeight: '1.6'
        }}>
          <li style={{ marginBottom: '6px' }}>🎲 Roll dice with encrypted results</li>
          <li style={{ marginBottom: '6px' }}>🔒 Your moves stay completely private</li>
   
        </ul>
      </div>

      <button
        onClick={onConnect}
        disabled={txStatus === 'Connecting...'}
        className={`btn ${txStatus === 'Connecting...' ? 'btn-loading' : 'btn-primary'}`}
        style={{ 
          minWidth: '200px',
          height: '50px',
          fontSize: '1rem',
          fontWeight: '600'
        }}
      >
        {txStatus === 'Connecting...' ? 'Connecting...' : 'Connect MetaMask'}
      </button>
    </div>
  );
};

export default WalletConnect;
