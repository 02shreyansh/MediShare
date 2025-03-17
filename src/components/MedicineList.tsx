import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { MedicineType } from '@/pages/buy-medicine';

interface MedicineListProps {
  medicines: MedicineType[];
  onBuyClick: (medicine: MedicineType) => void;
}

const MedicineList = ({ medicines, onBuyClick }: MedicineListProps) => {
  return (
    <div className="space-y-4">
      {medicines.map((medicine) => (
        <Card key={medicine.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-52 h-52 overflow-hidden bg-gray-100">
              <img 
                src={medicine.image} 
                alt={medicine.name} 
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex-grow p-4">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <Badge className="mb-2">{medicine.category}</Badge>
                  <h3 className="font-semibold text-xl">{medicine.name}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    Seller: {medicine.seller} • Rating: {medicine.rating}/5
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="md:text-right mt-4 md:mt-0">
                  <span className="font-bold text-xl text-primary">₹{medicine.price.toFixed(2)}</span>
                  <div className="text-sm text-muted-foreground">per unit</div>
                  <div className="text-sm font-medium mt-1">{medicine.quantity} units available</div>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => onBuyClick(medicine)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MedicineList;