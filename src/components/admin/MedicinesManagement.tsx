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
import { Search, MoreHorizontal, Plus, Filter, AlertTriangle } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MedicinesManagement = () => {
    const medicines = [
        {
            id: 1,
            name: 'Amoxicillin',
            category: 'Antibiotics',
            status: 'Available',
            expirationDate: '15/08/2024',
            quantity: 45,
            donatedBy: 'John Doe',
            price: '$12.50',
        },
        {
            id: 2,
            name: 'Metformin',
            category: 'Antidiabetic',
            status: 'Available',
            expirationDate: '23/09/2024',
            quantity: 30,
            donatedBy: 'Sarah Wilson',
            price: '$8.75',
        },
        {
            id: 3,
            name: 'Lisinopril',
            category: 'Cardiovascular',
            status: 'Reserved',
            expirationDate: '05/07/2024',
            quantity: 15,
            donatedBy: 'Robert Johnson',
            price: '$15.20',
        },
        {
            id: 4,
            name: 'Atorvastatin',
            category: 'Cardiovascular',
            status: 'Sold',
            expirationDate: '12/10/2024',
            quantity: 0,
            donatedBy: 'Jane Smith',
            price: '$18.90',
        },
        {
            id: 5,
            name: 'Cetirizine',
            category: 'Antihistamines',
            status: 'Available',
            expirationDate: '28/06/2024',
            quantity: 25,
            donatedBy: 'John Doe',
            price: '$7.35',
        },
        {
            id: 6,
            name: 'Omeprazole',
            category: 'Gastrointestinal',
            status: 'Available',
            expirationDate: '30/05/2024',
            quantity: 18,
            donatedBy: 'Pharmacy Plus',
            price: '$10.60',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Medicines Management</h2>
                    <p className="text-muted-foreground">Track and manage all medicines in the system</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Medicine
                </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="all">All Medicines</TabsTrigger>
                    <TabsTrigger value="available">Available</TabsTrigger>
                    <TabsTrigger value="expiring">
                        Expiring Soon
                        <Badge variant="destructive" className="ml-2">28</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="verification">
                        Pending Verification
                        <Badge variant="outline" className="ml-2">14</Badge>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                    <Card>
                        <CardHeader>
                            <CardTitle>Medicine Inventory</CardTitle>
                            <CardDescription>View all medicines in the system</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-4">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search medicines..."
                                        className="pl-8 w-full"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto">
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            <SelectItem value="antibiotics">Antibiotics</SelectItem>
                                            <SelectItem value="analgesics">Analgesics</SelectItem>
                                            <SelectItem value="antihistamines">Antihistamines</SelectItem>
                                            <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                                            <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Expiration</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {medicines.map((medicine) => (
                                            <TableRow key={medicine.id}>
                                                <TableCell className="font-medium">
                                                    {medicine.name}
                                                    {new Date(medicine.expirationDate.split('/').reverse().join('-')) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                                        <div className="flex items-center mt-1">
                                                            <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                                                            <span className="text-xs text-yellow-500">Expiring soon</span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>{medicine.category}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            medicine.status === 'Available'
                                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                                : medicine.status === 'Reserved'
                                                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                                        }
                                                    >
                                                        {medicine.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{medicine.expirationDate}</TableCell>
                                                <TableCell>{medicine.quantity}</TableCell>
                                                <TableCell>{medicine.price}</TableCell>
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
                                                            <DropdownMenuItem>Edit Medicine</DropdownMenuItem>
                                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
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
                                    <span className="font-medium">6</span> of{' '}
                                    <span className="font-medium">1,017</span> results
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
                </TabsContent>

                <TabsContent value="available" className="mt-0">
                    {/* Similar content as "all" tab but filtered for available medicines */}
                </TabsContent>

                <TabsContent value="expiring" className="mt-0">
                    {/* Content for medicines expiring soon */}
                </TabsContent>

                <TabsContent value="verification" className="mt-0">
                    {/* Content for medicines pending verification */}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MedicinesManagement;