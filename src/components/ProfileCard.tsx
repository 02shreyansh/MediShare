import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  avatar: string;
}

interface ProfileCardProps {
  profileData: ProfileData;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  setProfileData: (data: ProfileData) => void;
  onSave: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profileData,
  isEditing,
  setIsEditing,
  setProfileData,
  onSave
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={profileData.avatar} alt={profileData.name} />
          <AvatarFallback>{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle>{profileData.name}</CardTitle>
        <CardDescription>Member since {profileData.joinedDate}</CardDescription>
        <Badge className="mt-2" variant="secondary">Verified User</Badge>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={profileData.phone} 
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={profileData.address} 
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Phone:</span>
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-500">Address:</span>
              <span>{profileData.address}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={onSave}>Save Changes</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="w-full">Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
};