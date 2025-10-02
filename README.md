# Zama React Template using UMD CDN

A template for building privacy-preserving applications using Zama's FHEVM technology. This implementation demonstrates confidential computing through a fully homomorphic encrypted dice game, showcasing best practices for integrating FHEVM with React applications via UMD CDN distribution.

## Architecture Overview

This template implements a complete stack for confidential smart contract applications:

- **Smart Contract Layer**: Solidity contracts leveraging FHEVM for encrypted computation
- **Frontend Layer**: React application with UMD CDN integration for FHEVM SDK
- **Development Environment**: Hardhat-based toolchain with TypeScript support
- **Deployment Pipeline**: Automated deployment scripts for multiple networks

## Core Features

- **Confidential Computing**: All game logic operates on encrypted data using FHEVM
- **Privacy-Preserving Architecture**: Game state remains encrypted throughout execution
- **Cryptographic Verification**: Input validation through zero-knowledge proofs
- **Modern Frontend**: React 19 with hooks-based architecture
- **CDN Distribution**: UMD-based FHEVM SDK integration for simplified deployment
- **Type Safety**: Full TypeScript implementation across the stack
- **Production Ready**: Comprehensive testing and deployment tooling

## Project Structure

```
fhevm-dice-dapp-cdn/
├── contracts/                 # Solidity smart contracts
│   └── FHEDiceGame.sol       # FHE-enabled dice game contract
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/            # Custom React hooks for FHEVM integration
│   │   └── App.js            # Application entry point
│   ├── public/
│   │   └── index.html        # HTML with UMD CDN integration
│   └── package.json          # Frontend dependencies
├── deploy/                   # Hardhat deployment scripts
├── test/                     # Comprehensive test suite
├── hardhat.config.ts         # Hardhat configuration
└── package.json              # Root project dependencies
```

## Prerequisites

- Node.js >= 20.0.0
- npm >= 7.0.0
- Git >= 2.30.0

## Installation

1. **Repository Setup**
   ```bash
   git clone <repository-url>
   cd fhevm-dice-dapp-cdn
   ```

2. **Dependency Installation**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install && cd ..
   ```

3. **Environment Configuration**
   ```bash
   # Configure Hardhat environment variables
   npx hardhat vars setup
   ```

4. **Contract Compilation**
   ```bash
   npm run compile
   ```

5. **Development Server**
   ```bash
   cd frontend && npm start
   ```

## Development Workflow

### Smart Contract Development

The project utilizes Hardhat for comprehensive smart contract development:

```bash
# Compile contracts with TypeScript support
npm run compile

# Execute test suite
npm test

# Local development network
npx hardhat node
npx hardhat deploy --network localhost

# Testnet deployment
npx hardhat deploy --network sepolia
```

### Frontend Development

React application development workflow:

```bash
cd frontend

# Development server with hot reload
npm start

# Production build
npm run build

# Test execution
npm test
```

## UMD CDN Integration Strategy

The template implements FHEVM SDK integration through UMD CDN distribution:

```html
<!-- CDN Integration in public/index.html -->
<script src="https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs" 
        type="text/javascript" 
        crossorigin="anonymous">
</script>
```

**Technical Benefits:**
- **Zero Build Dependencies**: Eliminates FHEVM SDK from build pipeline
- **Version Pinning**: Ensures consistent SDK version across deployments
- **CDN Optimization**: Leverages global CDN for improved performance
- **CORS Compliance**: Proper cross-origin resource sharing configuration

## Application Architecture

### Confidential Game Flow

1. **Wallet Integration**: MetaMask or compatible wallet connection
2. **Encrypted Input Generation**: Client-side encryption of game inputs
3. **FHEVM Processing**: On-chain homomorphic computation
4. **Encrypted State Management**: Persistent encrypted game state
5. **Result Verification**: Cryptographic proof validation
6. **Selective Decryption**: Player-controlled result revelation

### Smart Contract Implementation

The `FHEDiceGame` contract implements:

- **Encrypted State Storage**: All game data encrypted using FHEVM
- **Homomorphic Operations**: Dice roll generation and comparison on encrypted data
- **Access Control**: Secure decryption permission management
- **Gas Optimization**: Efficient FHE operations with minimal gas consumption

## Security Implementation

- **FHEVM Integration**: Fully homomorphic encryption for computation privacy
- **Encrypted State Management**: On-chain data remains encrypted at rest
- **Proof Verification**: Cryptographic validation of input authenticity
- **Permission-Based Decryption**: Controlled access to encrypted results

## Dependencies

### Smart Contract Stack
- `@fhevm/solidity`: FHEVM Solidity library for encrypted operations
- `@zama-fhe/oracle-solidity`: Zama FHE oracle contract integration
- `hardhat`: Ethereum development framework with plugin ecosystem

### Frontend Stack
- `react`: Component-based UI framework
- `ethers`: Ethereum JavaScript library
- `@zama-fhe/relayer-sdk`: FHEVM Relayer SDK (UMD CDN distribution)

## Deployment Configuration

### Smart Contract Deployment

1. **Network Configuration**
   Update `hardhat.config.ts` with target network parameters

2. **Environment Variables**
   ```bash
   export MNEMONIC="your-deployment-mnemonic"
   export INFURA_API_KEY="your-infura-api-key"
   ```

3. **Contract Deployment**
   ```bash
   npx hardhat deploy --network sepolia
   ```

### Frontend Deployment

1. **Contract Address Configuration**
   Update contract address in `frontend/src/App.js`:
   ```javascript
   const contractAddress = "0xDeployedContractAddress";
   ```

2. **Production Build**
   ```bash
   cd frontend
   npm run build
   # Deploy build/ directory to hosting service
   ```

## Testing Strategy

### Smart Contract Testing
```bash
# Execute full test suite
npm test

# Targeted test execution
npx hardhat test test/FHEDiceGame.ts

# Gas reporting
REPORT_GAS=true npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Documentation References

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Zama FHEVM Repository](https://github.com/zama-ai/fhevm)
- [React Documentation](https://reactjs.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org)

## Contributing Guidelines

1. Fork the repository
2. Create feature branch: `git checkout -b feature/implementation-name`
3. Implement changes with comprehensive tests
4. Commit with descriptive messages: `git commit -m 'feat: implement feature'`
5. Push to branch: `git push origin feature/implementation-name`
6. Submit pull request with detailed description

## Acknowledgments

- [Zama](https://zama.ai) for FHEVM technology and development support
- [FHEVM Community](https://github.com/zama-ai/fhevm) for ongoing contributions
- [Hardhat](https://hardhat.org) for comprehensive development framework
- [React](https://reactjs.org) for modern frontend development platform
