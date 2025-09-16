# Private ID Vault 🛡️

> **Secure Identity Verification in the Age of Privacy**

Transform how you prove your identity without compromising your privacy. Private ID Vault leverages cutting-edge cryptographic technologies to enable credential verification while keeping your personal data completely private.

## ✨ Core Capabilities

- **🔒 Zero-Knowledge Verification**: Prove credentials without revealing underlying data
- **🔐 Fully Homomorphic Encryption**: Process encrypted data without decryption
- **💼 Multi-Wallet Integration**: Seamless connection with leading Web3 wallets
- **📋 Comprehensive Identity Types**: Government, Financial, Professional, and Biometric credentials
- **🏠 Privacy-First Architecture**: Your data never leaves your control
- **🌐 Decentralized Trust**: Blockchain-based verification without central authority

## 🚀 Getting Started

### System Requirements

- **Node.js**: Version 18 or higher
- **Package Manager**: npm or yarn
- **Web3 Wallet**: MetaMask, Rainbow, or compatible wallet
- **Testnet ETH**: Sepolia testnet tokens for transaction fees

### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/mr-smartnode/private-id-vault.git

# 2. Navigate to project directory
cd private-id-vault

# 3. Install project dependencies
npm install

# 4. Configure environment variables
cp env.example .env.local

# 5. Launch development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

## 🏗️ Technical Architecture

### Frontend Stack
- **⚛️ React 18**: Modern UI framework with TypeScript
- **⚡ Vite**: Lightning-fast build tool and dev server
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🧩 shadcn/ui**: High-quality component library
- **🌈 RainbowKit**: Beautiful wallet connection interface
- **🔗 Wagmi**: Type-safe Ethereum interactions

### Blockchain Infrastructure
- **📜 Solidity 0.8.24**: Smart contract language with FHE extensions
- **🔐 Zama FHEVM**: Fully homomorphic encryption virtual machine
- **🌐 Sepolia Testnet**: Ethereum test network for development

### Application Components

| Component | Purpose | Technology |
|-----------|---------|------------|
| **IdentityDashboard** | Main credential management interface | React + TypeScript |
| **WalletConnect** | Secure Web3 wallet integration | RainbowKit + Wagmi |
| **VerificationCard** | Credential status display | React + Tailwind |
| **PrivateIdVault** | FHE-enabled smart contract | Solidity + FHEVM |

## 🛠️ Development Workflow

### Command Reference

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server | Local development |
| `npm run build` | Build for production | Deployment preparation |
| `npm run preview` | Preview production build | Testing before deploy |
| `npm run lint` | Run code linting | Code quality check |

### Smart Contract Integration

The `PrivateIdVault.sol` contract enables encrypted data operations on-chain:

```solidity
// Create encrypted identity credential
function createCredential(
    uint8 _credentialType,        // 1-6: ID types
    string memory _credentialHash, // Encrypted data hash
    uint256 _expiryTime          // Expiration timestamp
) public returns (uint256)

// Request verification with FHE
function requestVerification(
    uint256 credentialId,
    externalEuint32 requiredScore, // FHE encrypted score
    bytes calldata inputProof     // Zero-knowledge proof
) public returns (uint256)
```

## 🔐 Privacy & Security

### Cryptographic Protection
- **🔒 Fully Homomorphic Encryption**: Process encrypted data without decryption
- **🎭 Zero-Knowledge Proofs**: Verify credentials without data exposure
- **🔐 End-to-End Encryption**: Data encrypted from client to blockchain
- **🛡️ Multi-Layer Security**: Multiple encryption layers for maximum protection

### Decentralized Architecture
- **🌐 No Central Authority**: Trustless verification system
- **🔗 Blockchain Immutability**: Tamper-proof credential records
- **👥 Distributed Verification**: Multiple verifiers for consensus
- **🏠 User Data Sovereignty**: Complete control over personal information

## 🌐 Deployment

### Vercel Deployment

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Set environment variables in Vercel dashboard
5. Deploy!

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting provider
```

## 📱 Usage

1. **Connect Wallet**: Use the wallet connection button to link your Web3 wallet
2. **Create Credentials**: Add your identity credentials (Government ID, Financial, etc.)
3. **Request Verification**: Submit credentials for verification
4. **Generate Proofs**: Create zero-knowledge proofs for verified credentials
5. **Share Securely**: Share proofs without revealing underlying data

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Smart Contract**: [Sepolia Explorer](https://sepolia.etherscan.io/)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/mr-smartnode/private-id-vault/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- **Zama** for FHEVM and fully homomorphic encryption
- **Rainbow** for wallet connection infrastructure
- **Vercel** for deployment platform
- **shadcn/ui** for beautiful components

---

**Built with ❤️ for privacy and security**
