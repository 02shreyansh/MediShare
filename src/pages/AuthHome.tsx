import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ShoppingCart, Trash2, Package, Bell, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const AuthenticatedHomePage: React.FC = () => {
  const user = {
    name: "John Doe",
    avatar: "/avatars/user.png",
    recentActivity: [
      { id: "act1", type: "purchase", medicine: "Amoxicillin", date: "2025-03-15", status: "Delivered" },
      { id: "act2", type: "sale", medicine: "Vitamin D", date: "2025-03-12", status: "Completed" },
      { id: "act3", type: "disposal", medicine: "Expired Pain Relievers", date: "2025-03-10", status: "Collected" }
    ],
    recommendations: [
      { id: "med1", name: "Paracetamol", price: 0.25, seller: "HealthPlus", rating: 4.8 },
      { id: "med2", name: "Cetirizine", price: 0.35, seller: "MediCare", rating: 4.7 },
      { id: "med3", name: "Multivitamin", price: 0.45, seller: "VitaHealth", rating: 4.9 }
    ],
    notifications: 3
  };

  return (
    <div className="space-y-8 pb-8">
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-muted-foreground">What would you like to do today?</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/notifications/hugytyg">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {user.notifications}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile">
              <Button>My Profile</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/sell" className="flex-1">
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Sell Medicine</CardTitle>
                  <CardDescription>List your unused medicines</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/buy" className="flex-1">
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Buy Medicine</CardTitle>
                  <CardDescription>Browse available medicines</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/dispose" className="flex-1">
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Trash2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Dispose Medicine</CardTitle>
                  <CardDescription>Schedule a pickup for expired medicines</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for medicines..." 
            className="pl-10 py-6 text-lg"
          />
        </div>
      </section>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {activity.type === 'purchase' && <ShoppingCart className="h-4 w-4 text-primary" />}
                      {activity.type === 'sale' && <PlusCircle className="h-4 w-4 text-primary" />}
                      {activity.type === 'disposal' && <Trash2 className="h-4 w-4 text-primary" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.medicine}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === 'purchase' ? 'Purchased' : 
                         activity.type === 'sale' ? 'Sold' : 'Disposed of'} on {activity.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={activity.status === "Completed" || activity.status === "Delivered" || activity.status === "Collected" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/profile" className="w-full">
              <Button variant="outline" className="w-full">View All Activity</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Recommended For You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.recommendations.map(med => (
                <Link to={`/buy/${med.id}`} key={med.id}>
                  <div className="flex items-start justify-between hover:bg-accent/50 p-2 rounded-md cursor-pointer">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${med.price.toFixed(2)} per unit • {med.seller}
                      </p>
                    </div>
                    <div className="flex items-center text-sm text-yellow-500">
                      {med.rating}
                      <svg className="h-4 w-4 ml-1 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/buy" className="w-full">
              <Button variant="outline" className="w-full">View All Medicines</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Featured Services */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold">Medicine Subscription</h3>
                <p>Never run out of your regular medications</p>
              </div>
            </div>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Set up automatic purchases for medications you need regularly.
                Save up to 15% with subscription service.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/subscriptions" className="w-full">
                <Button className="w-full">Explore Subscriptions</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-emerald-400 to-teal-500 flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold">Bulk Disposal Program</h3>
                <p>For healthcare providers and pharmacies</p>
              </div>
            </div>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                Our specialized program for bulk medicine disposal offers 
                convenient and environmentally responsible solutions.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/bulk-disposal" className="w-full">
                <Button className="w-full">Learn More</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Community Impact</h2>
          <p className="text-muted-foreground mb-6">
            Together, our Medishare community has made a difference:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-background/70 backdrop-blur-sm">
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-primary">$125,000+</p>
                <p className="text-muted-foreground">Money saved by users</p>
              </CardContent>
            </Card>
            <Card className="bg-background/70 backdrop-blur-sm">
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-primary">15,000+</p>
                <p className="text-muted-foreground">Medicine units shared</p>
              </CardContent>
            </Card>
            <Card className="bg-background/70 backdrop-blur-sm">
              <CardContent className="text-center py-6">
                <p className="text-3xl font-bold text-primary">5,000+</p>
                <p className="text-muted-foreground">Medicines properly disposed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticatedHomePage;