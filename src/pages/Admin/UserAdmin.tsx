// src/App.tsx
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'pending' | 'verified' | 'rejected';
  totalTransactions: number;
  avatar: string;
}

const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2025-03-15",
    status: "pending",
    totalTransactions: 0,
    avatar: "JS"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    joinDate: "2025-03-18",
    status: "verified",
    totalTransactions: 3,
    avatar: "SJ"
  },
  {
    id: "3",
    name: "Raj Patel",
    email: "raj.p@example.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2025-03-20",
    status: "pending",
    totalTransactions: 0,
    avatar: "RP"
  },
  {
    id: "4",
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "+1 (555) 333-2222",
    joinDate: "2025-03-21",
    status: "rejected",
    totalTransactions: 0,
    avatar: "LC"
  },
  {
    id: "5",
    name: "Miguel Rodriguez",
    email: "miguel.r@example.com",
    phone: "+1 (555) 777-8888",
    joinDate: "2025-03-22", 
    status: "pending",
    totalTransactions: 0,
    avatar: "MR"
  }
];

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const verifyUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'verified' } : user
    ));
  };

  const rejectUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: 'rejected' } : user
    ));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedTab === 'all') return searchMatch;
    return searchMatch && user.status === selectedTab;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'verified':
        return <Badge className="bg-green-500">Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Medishare Admin</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Settings</Button>
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage registered users for the Medishare platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <Input 
                className="max-w-xs" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button>Export Data</Button>
            </div>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Users</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="verified">Verified</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>

            <Table>
              <TableCaption>List of registered users as of April 2, 2025</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transactions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.totalTransactions}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Details</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>User Details</DialogTitle>
                              <DialogDescription>
                                View and manage user information
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="flex items-center space-x-4 mb-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>{user.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-medium">{user.name}</h3>
                                  <p className="text-gray-500">{user.email}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-gray-500">Phone Number</p>
                                  <p>{user.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Join Date</p>
                                  <p>{new Date(user.joinDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Status</p>
                                  <p>{getStatusBadge(user.status)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Total Transactions</p>
                                  <p>{user.totalTransactions}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              {user.status !== 'verified' && (
                                <Button 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => verifyUser(user.id)}
                                >
                                  Verify User
                                </Button>
                              )}
                              {user.status !== 'rejected' && (
                                <Button 
                                  variant="destructive"
                                  onClick={() => rejectUser(user.id)}
                                >
                                  Reject User
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
                    <TableCell colSpan={6} className="text-center py-6">
                      No users found matching your search criteria
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
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Users</span>
                  <span className="font-medium">{users.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Verification</span>
                  <span className="font-medium">{users.filter(u => u.status === 'pending').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Verified Users</span>
                  <span className="font-medium">{users.filter(u => u.status === 'verified').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rejected Users</span>
                  <span className="font-medium">{users.filter(u => u.status === 'rejected').length}</span>
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
                    <p className="font-medium">New User Registration</p>
                    <p className="text-sm text-gray-500">Miguel Rodriguez</p>
                  </div>
                  <span className="text-sm text-gray-500">10 mins ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">User Verified</p>
                    <p className="text-sm text-gray-500">Sarah Johnson</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">User Rejected</p>
                    <p className="text-sm text-gray-500">Lisa Chen</p>
                  </div>
                  <span className="text-sm text-gray-500">3 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">Process Pending Verifications</Button>
                <Button variant="outline" className="w-full">Generate User Report</Button>
                <Button variant="outline" className="w-full">Notify Users</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserAdmin;