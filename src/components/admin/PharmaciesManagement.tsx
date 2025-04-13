import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreHorizontal, Plus, Filter, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const PharmaciesManagement = () => {
  const pharmacies = [
    { 
      id: 1, 
      name: 'Pharmacy Plus', 
      location: '123 Main St, New York, NY', 
      status: 'Active', 
      medicines: 128,
      transactions: 543,
      joinDate: '05/02/2024',
    },
    { 
      id: 2, 
      name: 'Health Pharmacy', 
      location: '456 Oak Ave, Los Angeles, CA', 
      status: 'Pending', 
      medicines: 0,
      transactions: 0,
      joinDate: '04/04/2024',
    },
    { 
      id: 3, 
      name: 'MediCare Drugs', 
      location: '789 Elm Blvd, Chicago, IL', 
      status: 'Active', 
      medicines: 95,
      transactions: 327,
      joinDate: '12/01/2024',
    },
    { 
      id: 4, 
      name: 'City Pharmacy', 
      location: '321 Pine St, Houston, TX', 
      status: 'Active', 
      medicines: 76,
      transactions: 215,
      joinDate: '24/02/2024',
    },
    { 
      id: 5, 
      name: 'Care Drugs', 
      location: '654 Cedar Rd, Miami, FL', 
      status: 'Inactive', 
      medicines: 0,
      transactions: 189,
      joinDate: '10/12/2023',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pharmacies Management</h2>
          <p className="text-muted-foreground">Manage partner pharmacies and distribution points</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Pharmacy
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Pharmacies</CardTitle>
          <CardDescription>View and manage all pharmacy partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search pharmacies..."
                className="pl-8 w-full"
              />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Medicines</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pharmacies.map((pharmacy) => (
                  <TableRow key={pharmacy.id}>
                    <TableCell className="font-medium">{pharmacy.name}</TableCell>
                    <TableCell className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      {pharmacy.location}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          pharmacy.status === 'Active'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : pharmacy.status === 'Inactive'
                            ? 'bg-gray-50 text-gray-700 border-gray-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {pharmacy.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{pharmacy.medicines}</TableCell>
                    <TableCell>{pharmacy.transactions}</TableCell>
                    <TableCell>{pharmacy.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Pharmacy</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem>View Inventory</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove Partnership</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">5</span> of{' '}
              <span className="font-medium">86</span> results
            </div>
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmaciesManagement;