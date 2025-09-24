import { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';

export const useWallet = (showToast, contractAddress) => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Contract ABI for Dice Game
  const contractABI = [
    "function playDice(uint256 seed, uint8 guess) payable",
    "function getLastDiceRoll() view returns (bytes)",
    "function getPlayerGuess() view returns (bytes)", 
    "function getWinnerStatus() view returns (bytes)",
    "function decryptLastDiceRoll() view returns (uint8)",
    "function decryptPlayerGuess() view returns (uint8)",
    "function decryptWinnerStatus() view returns (bool)",
    "function getGameFee() view returns (uint256)",
    "function getContractBalance() view returns (uint256)"
  ];

  // Switch to Sepolia network
  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              nativeCurrency: { name: 'SepoliaETH', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://sepolia.infura.io/v3/54d227d3f34347b5b4ba31bbfdb83093'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/']
            }]
          });
        } catch (addError) {
          console.error("Error adding Sepolia network:", addError);
        }
      } else {
        console.error("Error switching to Sepolia:", error);
      }
    }
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      showToast('Please install MetaMask browser extension', 'error');
      return;
    }

    try {
      showToast('Connecting...', 'info');

      await switchToSepolia();

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setIsConnected(true);

      showToast('Wallet connected successfully!', 'success');

    } catch (error) {
      console.error("Error connecting wallet:", error);
      showToast('Connection failed: ' + error.message, 'error');
    }
  };

  return { account, isConnected, connectWallet };
};
