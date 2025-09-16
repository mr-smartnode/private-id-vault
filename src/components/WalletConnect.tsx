import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Key, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

export const WalletConnect = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { toast } = useToast();

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
    });
  };

  if (isConnected) {
    return (
      <Card className="bg-id-surface/80 backdrop-blur-sm border-id-primary/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-id-primary/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-id-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Identity Wallet Connected</h3>
              <p className="text-sm text-muted-foreground">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDisconnect}
            className="border-border/50 hover:border-destructive/50 hover:text-destructive"
          >
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-id-surface/80 backdrop-blur-sm border-border/20 p-6">
      <div className="text-center space-y-4">
        <div className="mx-auto p-3 bg-id-primary/10 rounded-full w-fit">
          <Wallet className="h-8 w-8 text-id-primary" />
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-2">Connect Your Identity Wallet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Securely connect your digital identity wallet to verify credentials with zero-knowledge proofs.
          </p>
        </div>

        <div className="flex justify-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal}
                          className="w-full bg-gradient-to-r from-id-primary to-id-secondary hover:from-id-primary/90 hover:to-id-secondary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                        >
                          <Key className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button 
                          onClick={openChainModal}
                          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={openChainModal}
                          className="flex items-center space-x-2 bg-id-surface/60 border border-border/20 hover:border-id-primary/30"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          className="bg-id-surface/60 border border-border/20 hover:border-id-primary/30"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Key className="h-3 w-3" />
          <span>End-to-end encrypted • Zero-knowledge proofs</span>
        </div>
      </div>
    </Card>
  );
};