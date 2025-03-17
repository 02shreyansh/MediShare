import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { MedicineType } from '@/pages/buy-medicine';

interface MedicineGridProps {
  medicines: MedicineType[];
  onBuyClick: (medicine: MedicineType) => void;
}

const MedicineGrid = ({ medicines, onBuyClick }: MedicineGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {medicines.map((medicine) => (
        <Card key={medicine.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img 
              src={medicine.image} 
              alt={medicine.name} 
              className="object-contain w-full h-full"
            />
          </div>
          <CardContent className="pt-4">
            <Badge className="mb-2">{medicine.category}</Badge>
            <h3 className="font-semibold text-lg">{medicine.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-primary">₹{medicine.price.toFixed(2)}/unit</span>
              <span className="text-sm text-muted-foreground">{medicine.quantity} available</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              className="w-full" 
              onClick={() => onBuyClick(medicine)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MedicineGrid;