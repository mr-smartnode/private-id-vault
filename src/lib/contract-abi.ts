// PrivateIdVault Contract ABI
export const PRIVATE_ID_VAULT_ABI = [
  // Events
  "event CredentialCreated(uint256 indexed credentialId, address indexed owner, uint8 credentialType)",
  "event VerificationRequested(uint256 indexed requestId, address indexed requester, uint8 credentialType)",
  "event VerificationCompleted(uint256 indexed credentialId, bool isVerified, uint32 score)",
  "event ZKProofGenerated(uint256 indexed proofId, address indexed prover, uint8 proofType)",
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  "event VerifierAuthorized(address indexed verifier, bool isAuthorized)",
  
  // Functions
  "function createCredential(uint8 _credentialType, string memory _credentialHash, uint256 _expiryTime) external returns (uint256)",
  "function requestVerification(uint256 credentialId, externalEuint32 requiredScore, bytes calldata inputProof) external returns (uint256)",
  "function verifyCredential(uint256 credentialId, euint32 verificationScore, bool isVerified) external returns (bool)",
  "function generateZKProof(uint256 credentialId, uint8 proofType, string memory proofHash) external returns (uint256)",
  "function authorizeVerifier(address verifier, bool isAuthorized) external",
  "function revokeCredential(uint256 credentialId) external",
  "function getCredentialInfo(uint256 credentialId) external view returns (uint8, uint8, uint8, bool, string memory, address, uint256, uint256)",
  "function getVerificationRequestInfo(uint256 requestId) external view returns (uint8, uint8, address, address, bool, uint256)",
  "function getZKProofInfo(uint256 proofId) external view returns (uint8, uint8, string memory, address, uint256)",
  "function getUserReputation(address user) external view returns (uint8)",
  "function getVerifierReputation(address verifier) external view returns (uint8)",
  "function isVerifierAuthorized(address verifier) external view returns (bool)",
  "function getCredentialCount() external view returns (uint256)",
  "function getRequestCount() external view returns (uint256)",
  "function getProofCount() external view returns (uint256)",
  
  // Constructor
  "constructor(address _systemVerifier)"
] as const;

// Contract addresses (to be updated after deployment)
export const CONTRACT_ADDRESSES = {
  privateIdVault: '0x...', // Will be set after contract deployment
  fheToken: '0x...', // FHE token contract address
} as const;

// Credential types enum
export const CREDENTIAL_TYPES = {
  GOVERNMENT_ID: 1,
  FINANCIAL: 2,
  ADDRESS: 3,
  PROFESSIONAL: 4,
  DIGITAL_REPUTATION: 5,
  BIOMETRIC: 6,
} as const;

// Verification status enum
export const VERIFICATION_STATUS = {
  PENDING: 0,
  VERIFIED: 1,
  PRIVATE: 2,
} as const;

// Proof types enum
export const PROOF_TYPES = {
  ZERO_KNOWLEDGE: 1,
  ENCRYPTED_PROOF: 2,
  PRIVACY_PRESERVING: 3,
} as const;
