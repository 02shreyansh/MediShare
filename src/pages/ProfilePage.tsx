import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProfileCard } from "@/components/ProfileCard";
import { ActivityCard } from "@/components/ActivityCard";
import { StatsCard } from "@/components/StatsCard";

// Mock data
const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    joinedDate: "January 2023",
    avatar: "/avatars/user.png"
};

const purchaseHistory = [
    { id: "ORD-12345", date: "2025-03-10", medicineName: "Paracetamol", quantity: 10, amount: 15.00, status: "Delivered" },
    { id: "ORD-12346", date: "2025-03-05", medicineName: "Amoxicillin", quantity: 5, amount: 25.00, status: "Delivered" },
    { id: "ORD-12347", date: "2025-02-28", medicineName: "Ibuprofen", quantity: 15, amount: 12.50, status: "Processing" }
];

const salesHistory = [
    { id: "SLE-98765", date: "2025-03-12", medicineName: "Aspirin", quantity: 20, amount: 30.00, status: "Completed" },
    { id: "SLE-98766", date: "2025-03-01", medicineName: "Cetirizine", quantity: 12, amount: 18.00, status: "Completed" },
    { id: "SLE-98767", date: "2025-02-20", medicineName: "Multivitamin", quantity: 8, amount: 24.00, status: "Shipped" }
];

const disposalHistory = [
    { id: "DSP-54321", date: "2025-03-15", medicineName: "Expired Antibiotics", quantity: 10, status: "Collected" },
    { id: "DSP-54322", date: "2025-02-25", medicineName: "Expired Pain Relievers", quantity: 15, status: "Scheduled" }
];

const listedMedicines = [
    { id: "MED-34567", name: "Vitamin D", quantity: 30, price: 0.50, expiryDate: "2025-12-31", status: "Active" },
    { id: "MED-34568", name: "Omega-3", quantity: 45, price: 0.75, expiryDate: "2025-10-15", status: "Active" },
    { id: "MED-34569", name: "Calcium Supplements", quantity: 20, price: 0.60, expiryDate: "2025-11-20", status: "Active" }
];

const ProfilePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState(userProfile);

    const handleSaveProfile = () => {
        setIsEditing(false);
        // Here you would typically save the profile data to your backend
        console.log("Profile saved:", profileData);
    };

    const listedColumns = [
        { key: "id", header: "ID" },
        { key: "name", header: "Name" },
        { key: "quantity", header: "Quantity" },
        {
            key: "price",
            header: "Price/Unit",
            render: (value: number) => `$${value.toFixed(2)}`
        },
        { key: "expiryDate", header: "Expiry Date" },
        {
            key: "status",
            header: "Status",
            render: (value: string) => <Badge>{value}</Badge>
        },
        {
            key: "actions",
            header: "Actions",
            render: () => <Button variant="outline" size="sm">Edit</Button>
        }
    ];

    const purchaseColumns = [
        { key: "id", header: "Order ID" },
        { key: "date", header: "Date" },
        { key: "medicineName", header: "Medicine" },
        { key: "quantity", header: "Quantity" },
        {
            key: "amount",
            header: "Amount",
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: "status",
            header: "Status",
            render: (value: string) => (
                <Badge variant={value === "Delivered" ? "default" : "secondary"}>
                    {value}
                </Badge>
            )
        }
    ];

    const salesColumns = [
        { key: "id", header: "Sale ID" },
        { key: "date", header: "Date" },
        { key: "medicineName", header: "Medicine" },
        { key: "quantity", header: "Quantity" },
        {
            key: "amount",
            header: "Amount",
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: "status",
            header: "Status",
            render: (value: string) => (
                <Badge variant={value === "Completed" ? "default" : "secondary"}>
                    {value}
                </Badge>
            )
        }
    ];

    const disposalColumns = [
        { key: "id", header: "Request ID" },
        { key: "date", header: "Date" },
        { key: "medicineName", header: "Medicine" },
        { key: "quantity", header: "Quantity" },
        {
            key: "status",
            header: "Status",
            render: (value: string) => (
                <Badge variant={value === "Collected" ? "default" : "secondary"}>
                    {value}
                </Badge>
            )
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <ProfileCard
                        profileData={profileData}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        setProfileData={setProfileData}
                        onSave={handleSaveProfile}
                    />
                </div>

                {/* Activity Tabs */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="listed" className="w-full">
                        <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="listed">Listed Medicines</TabsTrigger>
                            <TabsTrigger value="purchases">Purchases</TabsTrigger>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="disposal">Disposal</TabsTrigger>
                        </TabsList>

                        <TabsContent value="listed" className="space-y-4">
                            <ActivityCard
                                title="Listed Medicines"
                                description="Medicines you currently have listed for sale"
                                data={listedMedicines}
                                columns={listedColumns}
                                footerButton={{
                                    label: "List New Medicine",
                                    onClick: () => console.log("List new medicine")
                                }}
                            />
                        </TabsContent>

                        <TabsContent value="purchases" className="space-y-4">
                            <ActivityCard
                                title="Purchase History"
                                description="Medicines you have purchased"
                                data={purchaseHistory}
                                columns={purchaseColumns}
                            />
                        </TabsContent>

                        <TabsContent value="sales" className="space-y-4">
                            <ActivityCard
                                title="Sales History"
                                description="Medicines you have sold"
                                data={salesHistory}
                                columns={salesColumns}
                            />
                        </TabsContent>

                        <TabsContent value="disposal" className="space-y-4">
                            <ActivityCard
                                title="Disposal History"
                                description="Expired medicines you have requested for disposal"
                                data={disposalHistory}
                                columns={disposalColumns}
                                footerButton={{
                                    label: "Request New Disposal",
                                    onClick: () => console.log("Request new disposal")
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Your Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCard
                        title="Total Sales"
                        value="₹72.00"
                        subtitle="From 3 sales"
                    />
                    <StatsCard
                        title="Total Purchases"
                        value="₹52.50"
                        subtitle="From 3 purchases"
                    />
                    <StatsCard
                        title="Disposal Requests"
                        value="25"
                        subtitle="Medicine units disposed safely"
                    />
                </div>
            </div>

            {/* Settings Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Notification Preferences</h3>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="email-notifications">Email notifications</Label>
                                    <input type="checkbox" id="email-notifications" className="toggle" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="sms-notifications">SMS notifications</Label>
                                    <input type="checkbox" id="sms-notifications" className="toggle" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Security</h3>
                                <Button variant="outline" className="w-full">Change Password</Button>
                                <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="destructive" className="ml-auto">Delete Account</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;