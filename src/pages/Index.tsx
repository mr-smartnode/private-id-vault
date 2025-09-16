import { IdentityDashboard } from "@/components/IdentityDashboard";
import { Lock, Eye, Zap, Key } from "lucide-react";
import heroImage from "@/assets/hero-identity.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Header */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-id-primary via-id-secondary to-id-accent bg-clip-text text-transparent leading-tight">
                Identity Verified,
                <br />
                Data Hidden
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Prove your credentials without revealing personal information using 
                zero-knowledge cryptography and encrypted identity verification.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Key, text: "Zero-Knowledge Proofs" },
                { icon: Lock, text: "End-to-End Encrypted" },
                { icon: Eye, text: "Privacy Preserved" },
                { icon: Zap, text: "Instant Verification" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-2 bg-id-surface/60 backdrop-blur-sm border border-border/20 rounded-full px-4 py-2 hover:border-id-primary/30 transition-colors"
                >
                  <feature.icon className="h-4 w-4 text-id-primary" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="container mx-auto px-6 py-16">
        <IdentityDashboard />
      </div>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-id-surface/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-id-primary" />
              <span className="font-semibold text-foreground">PrivateID Vault</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by FHE encryption • Built for privacy
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;