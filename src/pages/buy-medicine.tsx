import { useState } from 'react';
import SearchBar from '@/components/searchBar';
import FilterPanel from '@/components/FilterPanel';
import MedicineGrid from '@/components/MedicineGrid';
import MedicineList from '@/components/MedicineList';
import PurchaseDialog from '@/components/PurchaseDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
export interface MedicineType {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  expiryDate: string;
  seller: string;
  image: string;
  rating: number;
}
const sampleMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "painkillers",
    price: 2.50,
    quantity: 30,
    expiryDate: "2025-12-31",
    seller: "John D.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEAQA8ws9_de41fCd3iTOa82dOMIDMxO1Bg&s",
    rating: 4.8
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "antibiotics",
    price: 4.75,
    quantity: 20,
    expiryDate: "2025-06-30",
    seller: "Sarah M.",
    image: "https://5.imimg.com/data5/GN/KS/VJ/SELLER-10593466/amoxicillin-capsules-250-mg.jpeg",
    rating: 4.5
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    category: "antiallergic",
    price: 3.25,
    quantity: 15,
    expiryDate: "2025-09-15",
    seller: "Robert K.",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/3/HN/OH/CH/149355096/cetirizine-10mg-tablets.jpg",
    rating: 4.9
  },
  {
    id: 4,
    name: "Lisinopril 10mg",
    category: "cardiovascular",
    price: 5.20,
    quantity: 25,
    expiryDate: "2025-08-20",
    seller: "Emma L.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/402765630/CG/FX/XY/214855024/lisinopril-tablets.jpg",
    rating: 4.7
  },
  {
    id: 5,
    name: "Metformin 500mg",
    category: "antidiabetic",
    price: 3.75,
    quantity: 40,
    expiryDate: "2025-10-10",
    seller: "Michael T.",
    image: "https://5.imimg.com/data5/SELLER/Default/2022/2/XK/KH/FK/146734484/metformin-500mg-tablets.jpg",
    rating: 4.6
  },
  {
    id: 6,
    name: "Omeprazole 20mg",
    category: "gastrointestinal",
    price: 3.90,
    quantity: 18,
    expiryDate: "2025-07-25",
    seller: "Jessica P.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/3/401693216/BP/XC/MF/47442852/omeprazole-20-mg.jpeg",
    rating: 4.4
  }
];

const BuyMedicinePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [showFilters, setShowFilters] = useState(false);
  const [displayMedicines, setDisplayMedicines] = useState<MedicineType[]>(sampleMedicines);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineType | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const handleSearch = () => {
    let filtered = sampleMedicines;
    if (searchQuery) {
      filtered = filtered.filter(medicine => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    filtered = filtered.filter(medicine => 
      medicine.price >= priceRange[0] && medicine.price <= priceRange[1]
    );
    
    setDisplayMedicines(filtered);
  };

  const handlePurchase = () => {
    setTimeout(() => {
      setPurchaseComplete(true);
    }, 1500);
  };

  const resetPurchase = () => {
    setSelectedMedicine(null);
    setPurchaseQuantity(1);
    setShowPurchaseDialog(false);
    setPurchaseComplete(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Buy Medicine</h1>
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        handleSearch={handleSearch}
      />
      
      {showFilters && (
        <FilterPanel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          resetFilters={() => {
            setSelectedCategory("");
            setPriceRange([0, 10]);
            setSearchQuery("");
            setDisplayMedicines(sampleMedicines);
          }}
        />
      )}
      
      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {displayMedicines.length} results
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="grid" className="mt-6">
          <MedicineGrid 
            medicines={displayMedicines} 
            onBuyClick={(medicine:any) => {
              setSelectedMedicine(medicine);
              setPurchaseQuantity(1);
              setShowPurchaseDialog(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <MedicineList 
            medicines={displayMedicines} 
            onBuyClick={(medicine) => {
              setSelectedMedicine(medicine);
              setPurchaseQuantity(1);
              setShowPurchaseDialog(true);
            }}
          />
        </TabsContent>
      </Tabs>
      
      {displayMedicines.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No medicines found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
        </div>
      )}
      
      <PurchaseDialog
        open={showPurchaseDialog}
        setOpen={setShowPurchaseDialog}
        medicine={selectedMedicine}
        quantity={purchaseQuantity}
        setQuantity={setPurchaseQuantity}
        purchaseComplete={purchaseComplete}
        handlePurchase={handlePurchase}
        resetPurchase={resetPurchase}
      />
    </div>
  );
};

export default BuyMedicinePage;