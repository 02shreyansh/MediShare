import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { MedicineType } from '@/pages/buy-medicine';

interface PurchaseDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  medicine: MedicineType | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  purchaseComplete: boolean;
  handlePurchase: () => void;
  resetPurchase: () => void;
}

const PurchaseDialog = ({
  open,
  setOpen,
  medicine,
  quantity,
  setQuantity,
  purchaseComplete,
  handlePurchase,
  resetPurchase
}: PurchaseDialogProps) => {
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onPurchase = () => {
    setIsProcessing(true);
    handlePurchase();
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        resetPurchase();
      }
      setOpen(newOpen);
    }}>
      <DialogContent className="sm:max-w-md">
        {!purchaseComplete ? (
          <>
            <DialogHeader>
              <DialogTitle>Purchase Medicine</DialogTitle>
              <DialogDescription>
                Complete your purchase for {medicine?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 overflow-hidden bg-gray-100 rounded">
                  <img 
                    src={medicine?.image} 
                    alt={medicine?.name} 
                    className="object-contain w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{medicine?.name}</h4>
                  <p className="text-sm text-muted-foreground">₹{medicine?.price.toFixed(2)} per unit</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={medicine?.quantity || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value || '1'))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Total Price</Label>
                  <div className="text-xl font-bold mt-2">
                    ₹{((medicine?.price || 0) * quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input 
                  id="address"
                  className="mt-1" 
                  placeholder="Enter your delivery address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="payment">Payment Method</Label>
                <select 
                  id="payment"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Digital Wallet</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={onPurchase} 
                disabled={!address || quantity < 1 || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Purchase'}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Purchase Complete!</h2>
            <p className="text-muted-foreground mb-4">
              Your order of {quantity} {quantity === 1 ? 'unit' : 'units'} of {medicine?.name} has been confirmed.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to your registered email address.
            </p>
            <Button onClick={resetPurchase}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseDialog;