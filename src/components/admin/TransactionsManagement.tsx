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
import { Search, MoreHorizontal, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TransactionsManagement = () => {
  const transactions = [
    { 
      id: 'TRX-12345', 
      type: 'Donation', 
      medicine: 'Amoxicillin', 
      user: 'John Doe', 
      pharmacy: 'Pharmacy Plus', 
      amount: '$12.50',
      date: '12/04/2024',
      status: 'Completed',
    },
    { 
      id: 'TRX-12346', 
      type: 'Purchase', 
      medicine: 'Metformin', 
      user: 'Jane Smith', 
      pharmacy: 'Pharmacy Plus', 
      amount: '$8.75',
      date: '12/04/2024',
      status: 'Completed',
    },
    { 
      id: 'TRX-12347', 
      type: 'Donation', 
      medicine: 'Lisinopril', 
      user: 'Robert Johnson', 
      pharmacy: 'MediCare Drugs', 
      amount: '$15.20',
      date: '11/04/2024',
      status: 'Processing',
    },
    { 
      id: 'TRX-12348', 
      type: 'Purchase', 
      medicine: 'Cetirizine', 
      user: 'Sarah Wilson', 
      pharmacy: 'City Pharmacy', 
      amount: '$7.35',
      date: '10/04/2024',
      status: 'Completed',
    },
    { 
      id: 'TRX-12349', 
      type: 'Donation', 
      medicine: 'Atorvastatin', 
      user: 'Jane Smith', 
      pharmacy: 'MediCare Drugs', 
      amount: '$18.90',
      date: '09/04/2024',
      status: 'Completed',
    },
    { 
      id: 'TRX-12350', 
      type: 'Purchase', 
      medicine: 'Omeprazole', 
      user: 'Robert Johnson', 
      pharmacy: 'Pharmacy Plus', 
      amount: '$10.60',
      date: '08/04/2024',
      status: 'Completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions Management</h2>
        <p className="text-muted-foreground">Monitor all donations and purchases</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all platform transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-8 w-full"
                  />
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
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
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Medicine</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Pharmacy</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.type === 'Donation' ? (
                              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
                            ) : (
                              <ArrowDownLeft className="h-4 w-4 mr-1 text-blue-500" />
                            )}
                            {transaction.type}
                          </div>
                        </TableCell>
                        <TableCell>{transaction.medicine}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{transaction.pharmacy}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.status === 'Completed'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : transaction.status === 'Processing'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
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
                              <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
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
                  <span className="font-medium">8,942</span> results
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
        
        <TabsContent value="donations" className="mt-0">
          {/* Similar content as "all" tab but filtered for donations */}
        </TabsContent>
        
        <TabsContent value="purchases" className="mt-0">
          {/* Similar content as "all" tab but filtered for purchases */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionsManagement;