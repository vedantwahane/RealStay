import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Wallet, CreditCard, Banknote } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface PaymentModalProps {
  totalAmount: number;
  nights: number;
  hotelName: string;
  roomType: string;
  onPaymentSuccess: (paymentMethod: string, transactionId?: string) => void;
  children: React.ReactNode;
}

export function PaymentModal({ 
  totalAmount, 
  nights, 
  hotelName, 
  roomType, 
  onPaymentSuccess, 
  children 
}: PaymentModalProps) {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleMetaMaskPayment = async () => {
    setProcessing(true);
    try {
      if (!window.ethereum) {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to use crypto payment",
          variant: "destructive"
        });
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // For demo purposes, we'll simulate a transaction
      // In real implementation, you'd interact with a smart contract
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const account = accounts[0];
      
      // Simulate transaction hash
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      
      toast({
        title: "Payment Successful!",
        description: `Transaction completed with MetaMask. TX: ${transactionHash.substring(0, 10)}...`
      });
      
      onPaymentSuccess('metamask', transactionHash);
      setOpen(false);
    } catch (error) {
      console.error('MetaMask payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your MetaMask payment",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleBookWithoutPayment = () => {
    onPaymentSuccess('pending');
    setOpen(false);
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been confirmed. You can pay later at the hotel."
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Booking</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Booking Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{nights} nights</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <div className="space-y-3">
            <h3 className="font-semibold">Choose Payment Method</h3>
            
            {/* MetaMask Payment */}
            <Button
              onClick={handleMetaMaskPayment}
              disabled={processing}
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <Wallet className="h-6 w-6 text-orange-500" />
                <div className="text-left">
                  <div className="font-semibold">MetaMask Wallet</div>
                  <div className="text-sm text-muted-foreground">
                    Pay with cryptocurrency
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Crypto
              </Badge>
            </Button>

            {/* UPI Payment (Simulated) */}
            <Button
              onClick={() => {
                toast({
                  title: "UPI Payment",
                  description: "UPI integration coming soon! Booking without payment for now.",
                });
                handleBookWithoutPayment();
              }}
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="h-6 w-6 text-blue-500" />
                <div className="text-left">
                  <div className="font-semibold">UPI Payment</div>
                  <div className="text-sm text-muted-foreground">
                    PhonePe, Google Pay, Paytm
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="ml-auto">
                Popular
              </Badge>
            </Button>

            {/* Book without Payment */}
            <Button
              onClick={handleBookWithoutPayment}
              className="w-full justify-start h-auto p-4"
              variant="outline"
            >
              <div className="flex items-center space-x-3">
                <Banknote className="h-6 w-6 text-green-500" />
                <div className="text-left">
                  <div className="font-semibold">Pay at Hotel</div>
                  <div className="text-sm text-muted-foreground">
                    Reserve now, pay later
                  </div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}