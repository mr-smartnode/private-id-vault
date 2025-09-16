import { useContractWrite, useContractRead, useAccount } from 'wagmi';
import { PRIVATE_ID_VAULT_ABI, CONTRACT_ADDRESSES, CREDENTIAL_TYPES, VERIFICATION_STATUS } from '@/lib/contract-abi';

export const usePrivateIdVault = () => {
  const { address } = useAccount();
  
  return {
    address,
    contractAddress: CONTRACT_ADDRESSES.privateIdVault as `0x${string}`,
    abi: PRIVATE_ID_VAULT_ABI,
  };
};

export const useCreateCredential = () => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'createCredential',
  });
};

export const useRequestVerification = () => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'requestVerification',
  });
};

export const useVerifyCredential = () => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'verifyCredential',
  });
};

export const useGenerateZKProof = () => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'generateZKProof',
  });
};

export const useGetCredentialInfo = (credentialId: number) => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'getCredentialInfo',
    args: [BigInt(credentialId)],
  });
};

export const useGetUserReputation = (userAddress: string) => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'getUserReputation',
    args: [userAddress as `0x${string}`],
  });
};

export const useGetCredentialCount = () => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'getCredentialCount',
  });
};

export const useIsVerifierAuthorized = (verifierAddress: string) => {
  const { contractAddress, abi } = usePrivateIdVault();
  
  return useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'isVerifierAuthorized',
    args: [verifierAddress as `0x${string}`],
  });
};
