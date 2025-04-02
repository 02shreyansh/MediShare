// src/MedicineAdmin.tsx
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample medicine listing data for demonstration
interface MedicineListing {
  id: string;
  medicineName: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  quantity: number;
  pricePerUnit: number;
  expiryDate: string;
  manufactureDate: string;
  listingDate: string;
  status: 'pending' | 'approved' | 'rejected';
  billVerified: boolean;
  imageUrl?: string;
  billImageUrl?: string;
}

const sampleMedicines: MedicineListing[] = [
  {
    id: "m1",
    medicineName: "Paracetamol 500mg",
    seller: {
      id: "u1",
      name: "John Smith",
      email: "john.smith@example.com"
    },
    quantity: 20,
    pricePerUnit: 0.50,
    expiryDate: "2026-05-15",
    manufactureDate: "2024-05-15",
    listingDate: "2025-03-28",
    status: "pending",
    billVerified: false,
    imageUrl: "/api/placeholder/200/200",
    billImageUrl: "/api/placeholder/300/400"
  },
  {
    id: "m2",
    medicineName: "Amoxicillin 250mg",
    seller: {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com"
    },
    quantity: 14,
    pricePerUnit: 0.75,
    expiryDate: "2025-12-10",
    manufactureDate: "2024-01-10",
    listingDate: "2025-03-25",
    status: "approved",
    billVerified: true,
    imageUrl: "/api/placeholder/200/200",
    billImageUrl: "/api/placeholder/300/400"
  },
  {
    id: "m3",
    medicineName: "Losartan 50mg",
    seller: {
      id: "u3",
      name: "Raj Patel",
      email: "raj.p@example.com"
    },
    quantity: 30,
    pricePerUnit: 0.80,
    expiryDate: "2026-08-22",
    manufactureDate: "2024-08-22",
    listingDate: "2025-03-30",
    status: "pending",
    billVerified: false,
    imageUrl: "/api/placeholder/200/200",
    billImageUrl: "/api/placeholder/300/400"
  },
  {
    id: "m4",
    medicineName: "Metformin 500mg",
    seller: {
      id: "u4",
      name: "Lisa Chen",
      email: "lisa.chen@example.com"
    },
    quantity: 60,
    pricePerUnit: 0.40,
    expiryDate: "2026-02-15",
    manufactureDate: "2024-02-15",
    listingDate: "2025-03-22",
    status: "rejected",
    billVerified: false,
    imageUrl: "/api/placeholder/200/200",
    billImageUrl: "/api/placeholder/300/400"
  },
  {
    id: "m5",
    medicineName: "Atorvastatin 10mg",
    seller: {
      id: "u5",
      name: "Miguel Rodriguez",
      email: "miguel.r@example.com"
    },
    quantity: 30,
    pricePerUnit: 0.65,
    expiryDate: "2026-06-30",
    manufactureDate: "2024-06-30",
    listingDate: "2025-03-29",
    status: "pending",
    billVerified: false,
    imageUrl: "/api/placeholder/200/200",
    billImageUrl: "/api/placeholder/300/400"
  }
];

const MedicineAdmin: React.FC = () => {
  const [medicines, setMedicines] = useState<MedicineListing[]>(sampleMedicines);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  const approveMedicine = (medicineId: string) => {
    setMedicines(medicines.map(medicine => 
      medicine.id === medicineId ? { ...medicine, status: 'approved', billVerified: true } : medicine
    ));
  };

  const rejectMedicine = (medicineId: string) => {
    setMedicines(medicines.map(medicine => 
      medicine.id === medicineId ? { ...medicine, status: 'rejected' } : medicine
    ));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedicines = medicines.filter(medicine => {
    const searchMatch = medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       medicine.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all') return searchMatch;
    return searchMatch && medicine.status === selectedTab;
  });

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.medicineName.localeCompare(b.medicineName);
      case 'expiry':
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      case 'price':
        return a.pricePerUnit - b.pricePerUnit;
      case 'date':
      default:
        return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime();
    }
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const daysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h1 className="text-3xl font-bold text-gray-900">Medishare Admin</h1>
            <div className="mt-4 md:mt-0">
              <nav className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">Dashboard</a>
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-900">Medicine Listings</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Users</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Orders</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Medicine Listings Management</CardTitle>
            <CardDescription>
              Review and manage medicine listings before they appear on the marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
                <Input 
                  className="max-w-xs" 
                  placeholder="Search medicines or sellers..." 
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date Listed</SelectItem>
                    <SelectItem value="name">Medicine Name</SelectItem>
                    <SelectItem value="expiry">Expiry Date</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Export Data</Button>
            </div>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Listings</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            {medicines.filter(m => m.status === 'pending').length > 0 && selectedTab === 'all' && (
              <Alert className="mb-6">
                <AlertTitle>Pending Approvals</AlertTitle>
                <AlertDescription>
                  You have {medicines.filter(m => m.status === 'pending').length} medicine listings waiting for approval.
                </AlertDescription>
              </Alert>
            )}

            <Table>
              <TableCaption>List of medicine listings as of April 2, 2025</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMedicines.length > 0 ? (
                  sortedMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-medium">{medicine.medicineName}</TableCell>
                      <TableCell>{medicine.seller.name}</TableCell>
                      <TableCell>{medicine.quantity} units</TableCell>
                      <TableCell>${medicine.pricePerUnit.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(medicine.expiryDate).toLocaleDateString()}
                        {daysUntilExpiry(medicine.expiryDate) < 180 && (
                          <Badge className="ml-2 bg-orange-500">
                            {daysUntilExpiry(medicine.expiryDate)} days left
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(medicine.status)}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Review</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Medicine Listing Review</DialogTitle>
                              <DialogDescription>
                                Verify details and review documentation before approving
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                  <h3 className="text-lg font-medium mb-2">Medicine Details</h3>
                                  <div className="grid grid-cols-2 gap-y-4 mb-6">
                                    <div>
                                      <p className="text-sm text-gray-500">Medicine Name</p>
                                      <p className="font-medium">{medicine.medicineName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Quantity Available</p>
                                      <p>{medicine.quantity} units</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Price Per Unit</p>
                                      <p>${medicine.pricePerUnit.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Total Value</p>
                                      <p>${(medicine.quantity * medicine.pricePerUnit).toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Manufacture Date</p>
                                      <p>{new Date(medicine.manufactureDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Expiry Date</p>
                                      <p>{new Date(medicine.expiryDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Listing Date</p>
                                      <p>{new Date(medicine.listingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Status</p>
                                      <p>{getStatusBadge(medicine.status)}</p>
                                    </div>
                                  </div>
                                  
                                  <h3 className="text-lg font-medium mb-2">Seller Information</h3>
                                  <div className="mb-6">
                                    <p><span className="text-gray-500">Name:</span> {medicine.seller.name}</p>
                                    <p><span className="text-gray-500">Email:</span> {medicine.seller.email}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h3 className="text-lg font-medium mb-2">Verification</h3>
                                  <div className="space-y-4">
                                    <div>
                                      <p className="text-sm text-gray-500 mb-1">Medicine Image</p>
                                      <img 
                                        src={medicine.imageUrl} 
                                        alt={medicine.medicineName} 
                                        className="w-full h-40 object-contain border rounded"
                                      />
                                    </div>
                                    
                                    <div>
                                      <p className="text-sm text-gray-500 mb-1">Bill/Receipt Image</p>
                                      <img 
                                        src={medicine.billImageUrl} 
                                        alt="Purchase receipt" 
                                        className="w-full h-48 object-contain border rounded"
                                      />
                                      <div className="mt-2 flex items-center">
                                        <Badge className={medicine.billVerified ? "bg-green-500" : "bg-yellow-500"}>
                                          {medicine.billVerified ? "Verified" : "Pending Verification"}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              {medicine.status !== 'approved' && (
                                <Button 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => approveMedicine(medicine.id)}
                                >
                                  Approve Listing
                                </Button>
                              )}
                              {medicine.status !== 'rejected' && (
                                <Button 
                                  variant="destructive"
                                  onClick={() => rejectMedicine(medicine.id)}
                                >
                                  Reject Listing
                                </Button>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No medicine listings found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Listing Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Listings</span>
                  <span className="font-medium">{medicines.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Approval</span>
                  <span className="font-medium">{medicines.filter(m => m.status === 'pending').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Approved Listings</span>
                  <span className="font-medium">{medicines.filter(m => m.status === 'approved').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rejected Listings</span>
                  <span className="font-medium">{medicines.filter(m => m.status === 'rejected').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Average Price/Unit</span>
                  <span className="font-medium">
                    ${(medicines.reduce((acc, med) => acc + med.pricePerUnit, 0) / medicines.length).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">New Listing</p>
                    <p className="text-sm text-gray-500">Losartan 50mg by Raj Patel</p>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Listing Approved</p>
                    <p className="text-sm text-gray-500">Amoxicillin 250mg by Sarah Johnson</p>
                  </div>
                  <span className="text-sm text-gray-500">8 days ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Listing Rejected</p>
                    <p className="text-sm text-gray-500">Metformin 500mg by Lisa Chen</p>
                  </div>
                  <span className="text-sm text-gray-500">11 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Safety Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="bg-amber-50 border-amber-300">
                  <AlertTitle>Near Expiry Medicines</AlertTitle>
                  <AlertDescription>
                    {medicines.filter(m => daysUntilExpiry(m.expiryDate) < 180).length} listings have less than 6 months until expiry
                  </AlertDescription>
                </Alert>
                
                <Alert className="bg-blue-50 border-blue-300">
                  <AlertTitle>High Value Pending Approvals</AlertTitle>
                  <AlertDescription>
                    {medicines.filter(m => m.status === 'pending' && m.quantity * m.pricePerUnit > 20).length} pending listings with value over $20
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MedicineAdmin;