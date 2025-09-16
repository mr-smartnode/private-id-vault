import { Shield, CheckCircle, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VerificationCardProps {
  title: string;
  status: "verified" | "pending" | "private";
  description: string;
  icon?: React.ReactNode;
}

export const VerificationCard = ({ title, status, description, icon }: VerificationCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-id-primary" />;
      case "pending":
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      case "private":
        return <Eye className="h-5 w-5 text-id-accent" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "verified":
        return "bg-id-primary/10 text-id-primary border-id-primary/20";
      case "pending":
        return "bg-muted/50 text-muted-foreground border-border";
      case "private":
        return "bg-id-accent/10 text-id-accent border-id-accent/20";
    }
  };

  return (
    <Card className="relative overflow-hidden bg-id-surface/80 backdrop-blur-sm border-border/20 hover:border-id-primary/30 transition-all duration-300 group">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-id-glass/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && <div className="text-id-primary">{icon}</div>}
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          {getStatusIcon()}
        </div>
        
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {description}
        </p>
        
        <Badge 
          variant="outline" 
          className={`capitalize ${getStatusColor()}`}
        >
          {status}
        </Badge>
      </div>
    </Card>
  );
};