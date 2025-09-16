// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PrivateIdVault is SepoliaConfig {
    using FHE for *;
    
    struct IdentityCredential {
        euint32 credentialId;
        euint8 credentialType; // 1: Government ID, 2: Financial, 3: Address, 4: Professional, 5: Digital Reputation, 6: Biometric
        euint8 verificationStatus; // 0: Pending, 1: Verified, 2: Private
        euint32 verificationScore;
        bool isActive;
        string credentialHash;
        address owner;
        uint256 timestamp;
        uint256 expiryTime;
    }
    
    struct VerificationRequest {
        euint32 requestId;
        euint8 credentialType;
        euint32 requiredScore;
        address requester;
        address verifier;
        bool isApproved;
        uint256 timestamp;
    }
    
    struct ZeroKnowledgeProof {
        euint32 proofId;
        euint8 proofType;
        euint32 credentialId;
        string proofHash;
        address prover;
        uint256 timestamp;
    }
    
    mapping(uint256 => IdentityCredential) public credentials;
    mapping(uint256 => VerificationRequest) public verificationRequests;
    mapping(uint256 => ZeroKnowledgeProof) public zkProofs;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public verifierReputation;
    mapping(address => bool) public authorizedVerifiers;
    
    uint256 public credentialCounter;
    uint256 public requestCounter;
    uint256 public proofCounter;
    
    address public owner;
    address public systemVerifier;
    
    event CredentialCreated(uint256 indexed credentialId, address indexed owner, uint8 credentialType);
    event VerificationRequested(uint256 indexed requestId, address indexed requester, uint8 credentialType);
    event VerificationCompleted(uint256 indexed credentialId, bool isVerified, uint32 score);
    event ZKProofGenerated(uint256 indexed proofId, address indexed prover, uint8 proofType);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event VerifierAuthorized(address indexed verifier, bool isAuthorized);
    
    constructor(address _systemVerifier) {
        owner = msg.sender;
        systemVerifier = _systemVerifier;
        authorizedVerifiers[_systemVerifier] = true;
    }
    
    function createCredential(
        uint8 _credentialType,
        string memory _credentialHash,
        uint256 _expiryTime
    ) public returns (uint256) {
        require(_credentialType >= 1 && _credentialType <= 6, "Invalid credential type");
        require(bytes(_credentialHash).length > 0, "Credential hash cannot be empty");
        require(_expiryTime > block.timestamp, "Expiry time must be in the future");
        
        uint256 credentialId = credentialCounter++;
        
        credentials[credentialId] = IdentityCredential({
            credentialId: FHE.asEuint32(0), // Will be set properly later
            credentialType: FHE.asEuint8(_credentialType),
            verificationStatus: FHE.asEuint8(0), // Pending
            verificationScore: FHE.asEuint32(0),
            isActive: true,
            credentialHash: _credentialHash,
            owner: msg.sender,
            timestamp: block.timestamp,
            expiryTime: _expiryTime
        });
        
        emit CredentialCreated(credentialId, msg.sender, _credentialType);
        return credentialId;
    }
    
    function requestVerification(
        uint256 credentialId,
        externalEuint32 requiredScore,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(credentials[credentialId].owner != address(0), "Credential does not exist");
        require(credentials[credentialId].isActive, "Credential is not active");
        require(block.timestamp <= credentials[credentialId].expiryTime, "Credential has expired");
        
        uint256 requestId = requestCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalRequiredScore = FHE.fromExternal(requiredScore, inputProof);
        
        verificationRequests[requestId] = VerificationRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            credentialType: credentials[credentialId].credentialType,
            requiredScore: internalRequiredScore,
            requester: msg.sender,
            verifier: address(0), // Will be assigned by system
            isApproved: false,
            timestamp: block.timestamp
        });
        
        emit VerificationRequested(requestId, msg.sender, 0); // Type will be decrypted off-chain
        return requestId;
    }
    
    function verifyCredential(
        uint256 credentialId,
        euint32 verificationScore,
        bool isVerified
    ) public returns (bool) {
        require(authorizedVerifiers[msg.sender], "Only authorized verifiers can verify");
        require(credentials[credentialId].owner != address(0), "Credential does not exist");
        require(credentials[credentialId].isActive, "Credential is not active");
        
        // Update credential verification status
        credentials[credentialId].verificationScore = verificationScore;
        credentials[credentialId].verificationStatus = isVerified ? FHE.asEuint8(1) : FHE.asEuint8(0);
        
        // Update user reputation based on verification
        if (isVerified) {
            userReputation[credentials[credentialId].owner] = FHE.add(
                userReputation[credentials[credentialId].owner],
                FHE.asEuint32(10)
            );
        }
        
        // Update verifier reputation
        verifierReputation[msg.sender] = FHE.add(
            verifierReputation[msg.sender],
            FHE.asEuint32(1)
        );
        
        emit VerificationCompleted(credentialId, isVerified, 0); // Score will be decrypted off-chain
        emit ReputationUpdated(credentials[credentialId].owner, 0); // Reputation will be decrypted off-chain
        emit ReputationUpdated(msg.sender, 0); // Verifier reputation will be decrypted off-chain
        
        return isVerified;
    }
    
    function generateZKProof(
        uint256 credentialId,
        uint8 proofType,
        string memory proofHash
    ) public returns (uint256) {
        require(credentials[credentialId].owner == msg.sender, "Only credential owner can generate proof");
        require(credentials[credentialId].isActive, "Credential is not active");
        require(credentials[credentialId].verificationStatus == FHE.asEuint8(1), "Credential must be verified");
        
        uint256 proofId = proofCounter++;
        
        zkProofs[proofId] = ZeroKnowledgeProof({
            proofId: FHE.asEuint32(0), // Will be set properly later
            proofType: FHE.asEuint8(proofType),
            credentialId: FHE.asEuint32(0), // Will be set to actual value
            proofHash: proofHash,
            prover: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ZKProofGenerated(proofId, msg.sender, proofType);
        return proofId;
    }
    
    function authorizeVerifier(address verifier, bool isAuthorized) public {
        require(msg.sender == owner, "Only owner can authorize verifiers");
        require(verifier != address(0), "Invalid verifier address");
        
        authorizedVerifiers[verifier] = isAuthorized;
        emit VerifierAuthorized(verifier, isAuthorized);
    }
    
    function revokeCredential(uint256 credentialId) public {
        require(credentials[credentialId].owner == msg.sender, "Only credential owner can revoke");
        require(credentials[credentialId].isActive, "Credential is already inactive");
        
        credentials[credentialId].isActive = false;
    }
    
    function getCredentialInfo(uint256 credentialId) public view returns (
        uint8 credentialType,
        uint8 verificationStatus,
        uint8 verificationScore,
        bool isActive,
        string memory credentialHash,
        address owner,
        uint256 timestamp,
        uint256 expiryTime
    ) {
        IdentityCredential storage credential = credentials[credentialId];
        return (
            0, // FHE.decrypt(credential.credentialType) - will be decrypted off-chain
            0, // FHE.decrypt(credential.verificationStatus) - will be decrypted off-chain
            0, // FHE.decrypt(credential.verificationScore) - will be decrypted off-chain
            credential.isActive,
            credential.credentialHash,
            credential.owner,
            credential.timestamp,
            credential.expiryTime
        );
    }
    
    function getVerificationRequestInfo(uint256 requestId) public view returns (
        uint8 credentialType,
        uint8 requiredScore,
        address requester,
        address verifier,
        bool isApproved,
        uint256 timestamp
    ) {
        VerificationRequest storage request = verificationRequests[requestId];
        return (
            0, // FHE.decrypt(request.credentialType) - will be decrypted off-chain
            0, // FHE.decrypt(request.requiredScore) - will be decrypted off-chain
            request.requester,
            request.verifier,
            request.isApproved,
            request.timestamp
        );
    }
    
    function getZKProofInfo(uint256 proofId) public view returns (
        uint8 proofType,
        uint8 credentialId,
        string memory proofHash,
        address prover,
        uint256 timestamp
    ) {
        ZeroKnowledgeProof storage proof = zkProofs[proofId];
        return (
            0, // FHE.decrypt(proof.proofType) - will be decrypted off-chain
            0, // FHE.decrypt(proof.credentialId) - will be decrypted off-chain
            proof.proofHash,
            proof.prover,
            proof.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getVerifierReputation(address verifier) public view returns (uint8) {
        return 0; // FHE.decrypt(verifierReputation[verifier]) - will be decrypted off-chain
    }
    
    function isVerifierAuthorized(address verifier) public view returns (bool) {
        return authorizedVerifiers[verifier];
    }
    
    function getCredentialCount() public view returns (uint256) {
        return credentialCounter;
    }
    
    function getRequestCount() public view returns (uint256) {
        return requestCounter;
    }
    
    function getProofCount() public view returns (uint256) {
        return proofCounter;
    }
}
