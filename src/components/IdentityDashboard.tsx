import { useState } from "react";
import { VerificationCard } from "./VerificationCard";
import { WalletConnect } from "./WalletConnect";
import { AddVerificationFlow } from "./AddVerificationFlow";
import { ContractInteraction } from "./ContractInteraction";
import { Fingerprint, FileCheck, CreditCard, MapPin, User, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const IdentityDashboard = () => {
  const { toast } = useToast();
  const [verifications, setVerifications] = useState([
  
    {
      title: "Government ID",
      status: "verified" as const,
      description: "Identity verified using encrypted government-issued documentation with zero-knowledge proofs.",
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      title: "Financial Status", 
      status: "verified" as const,
      description: "Income and credit verified through encrypted bank data without exposing sensitive details.",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Address Verification",
      status: "private" as const, 
      description: "Location verified with encrypted proofs. Your actual address remains completely private.",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      title: "Professional Credentials",
      status: "pending" as const,
      description: "Employment and professional certifications pending encrypted verification.",
      icon: <User className="h-5 w-5" />
    },
    {
      title: "Digital Reputation",
      status: "verified" as const,
      description: "Online identity and reputation verified across platforms with privacy preservation.",
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: "Biometric Verification",
      status: "private" as const,
      description: "Biometric data verified using secure multi-party computation. Data never leaves your device.",
      icon: <Fingerprint className="h-5 w-5" />
    }
  ]);

  const handleVerificationComplete = (type: string) => {
    // Add new verification to pending state
    const typeMap: Record<string, any> = {
      "government-id": {
        title: "Government ID",
        icon: <FileCheck className="h-5 w-5" />,
        description: "Identity verified using encrypted government-issued documentation with zero-knowledge proofs."
      },
      "financial": {
        title: "Financial Status",
        icon: <CreditCard className="h-5 w-5" />,
        description: "Income and credit verified through encrypted bank data without exposing sensitive details."
      },
      "address": {
        title: "Address Verification", 
        icon: <MapPin className="h-5 w-5" />,
        description: "Location verified with encrypted proofs. Your actual address remains completely private."
      },
      "professional": {
        title: "Professional Credentials",
        icon: <User className="h-5 w-5" />,
        description: "Employment and professional certifications pending encrypted verification."
      },
      "digital-reputation": {
        title: "Digital Reputation",
        icon: <Globe className="h-5 w-5" />,
        description: "Online identity and reputation verified across platforms with privacy preservation."
      },
      "biometric": {
        title: "Biometric Verification",
        icon: <Fingerprint className="h-5 w-5" />,
        description: "Biometric data verified using secure multi-party computation. Data never leaves your device."
      }
    };

    const newVerification = {
      ...typeMap[type],
      status: "pending" as const
    };

    // Check if verification already exists
    const existsIndex = verifications.findIndex(v => v.title === newVerification.title);
    
    if (existsIndex >= 0) {
      // Update existing verification to pending
      const updatedVerifications = [...verifications];
      updatedVerifications[existsIndex] = { ...updatedVerifications[existsIndex], status: "pending" as const };
      setVerifications(updatedVerifications);
    } else {
      // Add new verification
      setVerifications(prev => [...prev, newVerification]);
    }

    // Simulate verification completion after delay
    setTimeout(() => {
      setVerifications(prev => 
        prev.map(v => 
          v.title === newVerification.title 
            ? { ...v, status: "verified" as const }
            : v
        )
      );
      
      toast({
        title: "Verification Completed",
        description: `Your ${newVerification.title} has been successfully verified.`,
      });
    }, 5000);
  };

  return (
    <div className="space-y-8">
      {/* Wallet Connection */}
      <WalletConnect />
      
      {/* Contract Interaction */}
      <ContractInteraction />
      
      {/* Verification Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Verification Status</h2>
            <p className="text-muted-foreground">
              Your identity credentials verified privately using zero-knowledge cryptography.
            </p>
          </div>
          <AddVerificationFlow onVerificationComplete={handleVerificationComplete} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifications.map((verification, index) => (
            <VerificationCard key={index} {...verification} />
          ))}
        </div>
      </div>
    </div>
  );
};