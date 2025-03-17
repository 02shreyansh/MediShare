import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface FilterPanelProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  resetFilters: () => void;
}

const FilterPanel = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  resetFilters
}: FilterPanelProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="antibiotics">Antibiotics</SelectItem>
                <SelectItem value="painkillers">Painkillers</SelectItem>
                <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                <SelectItem value="antidiabetic">Antidiabetic</SelectItem>
                <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                <SelectItem value="antiallergic">Antiallergic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
            <Slider
              defaultValue={[0, 10]}
              max={10}
              step={0.5}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-6"
            />
          </div>
          
          <div className="flex items-end">
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;