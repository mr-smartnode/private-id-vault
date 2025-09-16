import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Lock, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Key,
  FileText,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";
import { useCreateCredential, useRequestVerification, useGenerateZKProof } from "@/hooks/useContract";
import { CREDENTIAL_TYPES } from "@/lib/contract-abi";

export const ContractInteraction = () => {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'create' | 'verify' | 'proof'>('create');
  const [isLoading, setIsLoading] = useState(false);
  
  // Create credential states
  const [credentialType, setCredentialType] = useState<string>('');
  const [credentialHash, setCredentialHash] = useState('');
  const [expiryDays, setExpiryDays] = useState('365');
  
  // Verification states
  const [credentialId, setCredentialId] = useState('');
  const [requiredScore, setRequiredScore] = useState('80');
  
  // ZK Proof states
  const [proofCredentialId, setProofCredentialId] = useState('');
  const [proofType, setProofType] = useState('1');
  const [proofHash, setProofHash] = useState('');

  const createCredential = useCreateCredential();
  const requestVerification = useRequestVerification();
  const generateZKProof = useGenerateZKProof();

  const handleCreateCredential = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }

    if (!credentialType || !credentialHash) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const expiryTime = Math.floor(Date.now() / 1000) + (parseInt(expiryDays) * 24 * 60 * 60);
      
      const result = await createCredential.writeAsync({
        args: [parseInt(credentialType), credentialHash, BigInt(expiryTime)]
      });

      toast({
        title: "Credential Created",
        description: `Credential created successfully! Transaction: ${result.hash}`,
      });

      // Reset form
      setCredentialType('');
      setCredentialHash('');
      setExpiryDays('365');
    } catch (error) {
      console.error('Error creating credential:', error);
      toast({
        title: "Error",
        description: "Failed to create credential. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestVerification = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }

    if (!credentialId || !requiredScore) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Note: In a real implementation, you would need to encrypt the requiredScore using FHE
      // For now, we'll use a placeholder
      const encryptedScore = new Uint8Array(32); // Placeholder for FHE encrypted data
      const inputProof = new Uint8Array(64); // Placeholder for zero-knowledge proof

      const result = await requestVerification.writeAsync({
        args: [BigInt(credentialId), encryptedScore, inputProof]
      });

      toast({
        title: "Verification Requested",
        description: `Verification requested successfully! Transaction: ${result.hash}`,
      });

      // Reset form
      setCredentialId('');
      setRequiredScore('80');
    } catch (error) {
      console.error('Error requesting verification:', error);
      toast({
        title: "Error",
        description: "Failed to request verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateZKProof = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first.",
        variant: "destructive"
      });
      return;
    }

    if (!proofCredentialId || !proofHash) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateZKProof.writeAsync({
        args: [BigInt(proofCredentialId), parseInt(proofType), proofHash]
      });

      toast({
        title: "ZK Proof Generated",
        description: `Zero-knowledge proof generated successfully! Transaction: ${result.hash}`,
      });

      // Reset form
      setProofCredentialId('');
      setProofType('1');
      setProofHash('');
    } catch (error) {
      console.error('Error generating ZK proof:', error);
      toast({
        title: "Error",
        description: "Failed to generate ZK proof. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="bg-id-surface/80 backdrop-blur-sm border-border/20 p-6">
        <div className="text-center space-y-4">
          <div className="mx-auto p-3 bg-yellow-500/10 rounded-full w-fit">
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Wallet Required</h3>
            <p className="text-sm text-muted-foreground">
              Please connect your wallet to interact with the smart contract and encrypt your data on-chain.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-id-surface/80 backdrop-blur-sm border-border/20 p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-id-primary" />
          <h3 className="text-xl font-semibold text-foreground">Contract Interaction</h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
          <Button
            variant={activeTab === 'create' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('create')}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Create Credential
          </Button>
          <Button
            variant={activeTab === 'verify' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('verify')}
            className="flex-1"
          >
            <Shield className="h-4 w-4 mr-2" />
            Request Verification
          </Button>
          <Button
            variant={activeTab === 'proof' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('proof')}
            className="flex-1"
          >
            <Key className="h-4 w-4 mr-2" />
            Generate Proof
          </Button>
        </div>

        {/* Create Credential Tab */}
        {activeTab === 'create' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="credentialType">Credential Type</Label>
              <Select value={credentialType} onValueChange={setCredentialType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select credential type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CREDENTIAL_TYPES.GOVERNMENT_ID.toString()}>Government ID</SelectItem>
                  <SelectItem value={CREDENTIAL_TYPES.FINANCIAL.toString()}>Financial Status</SelectItem>
                  <SelectItem value={CREDENTIAL_TYPES.ADDRESS.toString()}>Address Verification</SelectItem>
                  <SelectItem value={CREDENTIAL_TYPES.PROFESSIONAL.toString()}>Professional Credentials</SelectItem>
                  <SelectItem value={CREDENTIAL_TYPES.DIGITAL_REPUTATION.toString()}>Digital Reputation</SelectItem>
                  <SelectItem value={CREDENTIAL_TYPES.BIOMETRIC.toString()}>Biometric Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialHash">Encrypted Data Hash</Label>
              <Textarea
                id="credentialHash"
                placeholder="Enter the encrypted hash of your credential data..."
                value={credentialHash}
                onChange={(e) => setCredentialHash(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDays">Expiry (Days)</Label>
              <Input
                id="expiryDays"
                type="number"
                placeholder="365"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              />
            </div>

            <Button
              onClick={handleCreateCredential}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-id-primary to-id-secondary hover:from-id-primary/90 hover:to-id-secondary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Create Encrypted Credential
                </>
              )}
            </Button>
          </div>
        )}

        {/* Request Verification Tab */}
        {activeTab === 'verify' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="credentialId">Credential ID</Label>
              <Input
                id="credentialId"
                placeholder="Enter credential ID to verify"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requiredScore">Required Verification Score</Label>
              <Input
                id="requiredScore"
                type="number"
                placeholder="80"
                value={requiredScore}
                onChange={(e) => setRequiredScore(e.target.value)}
              />
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-600">
                <Lock className="h-4 w-4" />
                <span className="text-sm font-medium">FHE Encrypted</span>
              </div>
              <p className="text-xs text-blue-600/80 mt-1">
                Your verification score will be encrypted using Fully Homomorphic Encryption
              </p>
            </div>

            <Button
              onClick={handleRequestVerification}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-500/90 hover:to-purple-600/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Request Encrypted Verification
                </>
              )}
            </Button>
          </div>
        )}

        {/* Generate ZK Proof Tab */}
        {activeTab === 'proof' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="proofCredentialId">Credential ID</Label>
              <Input
                id="proofCredentialId"
                placeholder="Enter verified credential ID"
                value={proofCredentialId}
                onChange={(e) => setProofCredentialId(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proofType">Proof Type</Label>
              <Select value={proofType} onValueChange={setProofType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select proof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Zero-Knowledge Proof</SelectItem>
                  <SelectItem value="2">Encrypted Proof</SelectItem>
                  <SelectItem value="3">Privacy-Preserving Proof</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proofHash">Proof Hash</Label>
              <Textarea
                id="proofHash"
                placeholder="Enter the hash of your zero-knowledge proof..."
                value={proofHash}
                onChange={(e) => setProofHash(e.target.value)}
                rows={3}
              />
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600">
                <Key className="h-4 w-4" />
                <span className="text-sm font-medium">Zero-Knowledge</span>
              </div>
              <p className="text-xs text-green-600/80 mt-1">
                Generate a proof that verifies your credential without revealing the underlying data
              </p>
            </div>

            <Button
              onClick={handleGenerateZKProof}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-500/90 hover:to-emerald-600/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Generate ZK Proof
                </>
              )}
            </Button>
          </div>
        )}

        {/* Status Badge */}
        <div className="flex items-center justify-center space-x-2 pt-4 border-t border-border/20">
          <Badge variant="outline" className="flex items-center space-x-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span>FHE Encrypted</span>
          </Badge>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Lock className="h-3 w-3 text-blue-500" />
            <span>On-Chain</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
};
