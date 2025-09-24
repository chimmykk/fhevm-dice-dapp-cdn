import React, { useState } from 'react';
import Header from './components/Header';
import WalletConnect from './components/WalletConnect';



import ContractInfo from './components/ContractInfo';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import StatusMessage from './components/StatusMessage';

import { useWallet } from './hooks/useWallet';
import { useToast } from './hooks/useToast';
import { useDiceGame } from './hooks/useDiceGame';
import PlayDice from './components/PlayDice';
import DiceResults from './components/DiceResults';

function App() {
  const [txStatus, setTxStatus] = useState('');

  // FHEDiceGame contract address - update to your deployed address
  const contractAddress = "0xA6915c97f44f1708e37dD871CCE991fD6D45E943";

  const { messages, showToast } = useToast();
  const { account, isConnected, connectWallet } = useWallet(showToast, contractAddress);
  const {
    loading,
    encryptedState,
    decryptedState,
    fairness,
    playDice,
    refreshEncryptedState,
    decryptLastDiceRoll,
    decryptPlayerGuess,
    decryptWinnerStatus
  } = useDiceGame(account, showToast, setTxStatus, contractAddress);

  return (
    <div className="app">
      <div className="container">
        <div className="app-content">
          <Header />
          <div className="section contract-section">
                <ContractInfo contractAddress={contractAddress} />
              </div>
          <ToastContainer messages={messages} />

          {/* Wallet Connection Section */}
          <div className="section wallet-section">
            <WalletConnect
              isConnected={isConnected}
              account={account}
              onConnect={connectWallet}
              txStatus={txStatus}
              loading={loading}
            />

            {isConnected && txStatus && (
              <StatusMessage type="info">
                <strong>Transaction in progress:</strong> {txStatus}
              </StatusMessage>
            )}
          </div>

          {isConnected && (
            <>
              <div className="section actions-section">
                <PlayDice loading={loading} onPlay={playDice} />
                <DiceResults
                  encrypted={encryptedState}
                  decrypted={decryptedState}
                  onDecryptRoll={decryptLastDiceRoll}
                  onDecryptGuess={decryptPlayerGuess}
                  onDecryptWinner={decryptWinnerStatus}
                  loading={loading}
                  fairness={fairness}
                />
              </div>

          
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
