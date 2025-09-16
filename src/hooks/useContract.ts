import { useContract, useContractWrite, useContractRead, useAccount } from 'wagmi';
import { PRIVATE_ID_VAULT_ABI, CONTRACT_ADDRESSES, CREDENTIAL_TYPES, VERIFICATION_STATUS } from '@/lib/contract-abi';

export const usePrivateIdVault = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
  });

  return {
    contract,
    address,
  };
};

export const useCreateCredential = () => {
  const { contract } = usePrivateIdVault();
  
  return useContractWrite({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'createCredential',
  });
};

export const useRequestVerification = () => {
  const { contract } = usePrivateIdVault();
  
  return useContractWrite({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'requestVerification',
  });
};

export const useVerifyCredential = () => {
  const { contract } = usePrivateIdVault();
  
  return useContractWrite({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'verifyCredential',
  });
};

export const useGenerateZKProof = () => {
  const { contract } = usePrivateIdVault();
  
  return useContractWrite({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'generateZKProof',
  });
};

export const useGetCredentialInfo = (credentialId: number) => {
  const { contract } = usePrivateIdVault();
  
  return useContractRead({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'getCredentialInfo',
    args: [BigInt(credentialId)],
  });
};

export const useGetUserReputation = (userAddress: string) => {
  const { contract } = usePrivateIdVault();
  
  return useContractRead({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  });
};

export const useGetCredentialCount = () => {
  const { contract } = usePrivateIdVault();
  
  return useContractRead({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'getCredentialCount',
  });
};

export const useIsVerifierAuthorized = (verifierAddress: string) => {
  const { contract } = usePrivateIdVault();
  
  return useContractRead({
    address: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
    functionName: 'isVerifierAuthorized',
    args: [verifierAddress as `0x${string}`],
  });
};
