import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  FileCheck, 
  CreditCard, 
  MapPin, 
  User, 
  Globe, 
  Shield, 
  Upload, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const verificationTypes = [
  {
    id: "government-id",
    title: "Government ID",
    description: "Verify your identity with government-issued documents",
    icon: <FileCheck className="h-5 w-5" />,
    estimatedTime: "2-5 minutes"
  },
  {
    id: "financial",
    title: "Financial Verification",
    description: "Prove income and creditworthiness through bank connections",
    icon: <CreditCard className="h-5 w-5" />,
    estimatedTime: "3-7 minutes"
  },
  {
    id: "address",
    title: "Address Verification", 
    description: "Confirm your residential address with utility bills",
    icon: <MapPin className="h-5 w-5" />,
    estimatedTime: "2-4 minutes"
  },
  {
    id: "professional",
    title: "Professional Credentials",
    description: "Verify employment and professional certifications",
    icon: <User className="h-5 w-5" />,
    estimatedTime: "5-10 minutes"
  },
  {
    id: "digital-reputation",
    title: "Digital Reputation",
    description: "Connect social media and online professional profiles",
    icon: <Globe className="h-5 w-5" />,
    estimatedTime: "1-3 minutes"
  },
  {
    id: "biometric",
    title: "Biometric Verification",
    description: "Secure biometric identity verification",
    icon: <Shield className="h-5 w-5" />,
    estimatedTime: "2-5 minutes"
  }
];

interface VerificationFlowProps {
  onVerificationComplete: (type: string) => void;
}

export const AddVerificationFlow = ({ onVerificationComplete }: VerificationFlowProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleTypeSelection = (typeId: string) => {
    setSelectedType(typeId);
    setCurrentStep(2);
  };

  const handleFormSubmit = () => {
    setCurrentStep(3);
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const handleComplete = () => {
    if (selectedType) {
      onVerificationComplete(selectedType);
      toast({
        title: "Verification Started",
        description: "Your identity verification is now being processed securely.",
      });
    }
    
    // Reset and close
    setCurrentStep(1);
    setSelectedType(null);
    setFormData({});
    setIsProcessing(false);
    setIsOpen(false);
  };

  const renderTypeSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Choose Verification Type</h3>
        <p className="text-sm text-muted-foreground">
          Select the type of credential you want to verify privately
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {verificationTypes.map((type) => (
          <Card 
            key={type.id}
            className="p-4 cursor-pointer hover:border-id-primary/50 transition-all duration-200 bg-id-surface/50 border-border/20"
            onClick={() => handleTypeSelection(type.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="text-id-primary mt-1">{type.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{type.title}</h4>
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                  {type.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  {type.estimatedTime}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderForm = () => {
    const selectedTypeData = verificationTypes.find(t => t.id === selectedType);
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-id-primary/10 rounded-lg">
              {selectedTypeData?.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {selectedTypeData?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            All data is encrypted end-to-end and processed using zero-knowledge proofs
          </p>
        </div>

        <div className="space-y-4">
          {selectedType === "government-id" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="id-type">Document Type</Label>
                <Select>
                  <SelectTrigger className="bg-id-surface/50 border-border/20">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers-license">Driver's License</SelectItem>
                    <SelectItem value="national-id">National ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="id-number">Document Number</Label>
                <Input 
                  id="id-number" 
                  placeholder="Enter document number"
                  className="bg-id-surface/50 border-border/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Document</Label>
                <div className="border-2 border-dashed border-border/20 rounded-lg p-8 text-center hover:border-id-primary/30 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </>
          )}

          {selectedType === "financial" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input 
                  id="bank-name" 
                  placeholder="Enter your bank name"
                  className="bg-id-surface/50 border-border/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select>
                  <SelectTrigger className="bg-id-surface/50 border-border/20">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="investment">Investment Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-id-surface/30 border border-id-primary/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-id-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="text-foreground font-medium mb-1">Bank-Grade Security</p>
                    <p className="text-muted-foreground">
                      We use read-only connections with 256-bit encryption. We never see your login credentials.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedType === "biometric" && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-id-surface/50 border-2 border-dashed border-border/20 rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Position your face in the circle above</p>
                </div>
                <Button className="w-full bg-id-primary hover:bg-id-primary/90">
                  <Camera className="mr-2 h-4 w-4" />
                  Start Face Verification
                </Button>
                <div className="bg-id-surface/30 border border-id-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-id-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="text-foreground font-medium mb-1">Privacy Protected</p>
                      <p className="text-muted-foreground">
                        Biometric data is processed locally on your device and never stored.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {(selectedType === "address" || selectedType === "professional" || selectedType === "digital-reputation") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="info">Additional Information</Label>
                <Textarea 
                  id="info"
                  placeholder={`Enter relevant ${selectedTypeData?.title.toLowerCase()} information...`}
                  className="bg-id-surface/50 border-border/20"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Supporting Documents</Label>
                <div className="border-2 border-dashed border-border/20 rounded-lg p-6 text-center hover:border-id-primary/30 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Upload supporting documents</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 mx-auto bg-id-primary/10 rounded-full flex items-center justify-center">
        <Shield className="h-8 w-8 text-id-primary animate-pulse" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Processing Verification</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your data is being encrypted and verified using zero-knowledge proofs...
        </p>
        <Progress value={isProcessing ? 100 : 0} className="w-full" />
      </div>
      <div className="bg-id-surface/30 border border-id-primary/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          This process typically takes 1-3 minutes. Your personal data remains encrypted throughout.
        </p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6 py-8">
      <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Verification Complete!</h3>
        <p className="text-sm text-muted-foreground">
          Your identity credential has been successfully verified and encrypted.
        </p>
      </div>
      <Button onClick={handleComplete} className="w-full bg-id-primary hover:bg-id-primary/90">
        Done
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-id-primary to-id-secondary hover:from-id-primary/90 hover:to-id-secondary/90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Verification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-id-surface/95 backdrop-blur-sm border-border/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-id-primary" />
            <span>New Identity Verification</span>
          </DialogTitle>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>

        <div className="mt-6">
          {currentStep === 1 && renderTypeSelection()}
          {currentStep === 2 && renderForm()}
          {currentStep === 3 && renderProcessing()}
          {currentStep === 4 && renderSuccess()}
        </div>

        {currentStep === 2 && (
          <div className="flex justify-between pt-6 border-t border-border/20">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="border-border/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleFormSubmit}
              className="bg-id-primary hover:bg-id-primary/90"
            >
              Start Verification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};