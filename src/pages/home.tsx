import { Link } from 'react-router-dom';
import { PlusCircle, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Reduce Medicine Waste, <span className="text-primary">Save Money</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Buy and sell unused medicine or dispose of expired ones responsibly. 
          Medishare connects people to make healthcare more affordable and eco-friendly.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Sell Medicine</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                List your unused medicine packets for sale. Help others access medications at lower costs.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/sell">
                <Button variant="outline">Sell Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Buy Medicine</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Buy exactly what you need - even just 1 or 2 tablets - and reduce your healthcare expenses.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/buy">
                <Button variant="outline">Shop Now</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
                <Trash2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Dispose Medicine</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Schedule a pickup for your expired medications and ensure they're disposed of properly.
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/dispose">
                <Button variant="outline">Schedule Pickup</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Benefits*/}
      <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 h-fit rounded-full">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Save Money</h3>
              <p className="text-muted-foreground">Buy only what you need and sell what you don't, reducing healthcare costs for everyone.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 h-fit rounded-full">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Reduce Waste</h3>
              <p className="text-muted-foreground">Help reduce medicine waste by ensuring unused medications find a new home instead of being thrown away.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 h-fit rounded-full">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Safe & Secure</h3>
              <p className="text-muted-foreground">All medicine listings are verified and our platform ensures HIPAA compliance for your privacy.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-primary/10 p-2 h-fit rounded-full">
              <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Community Support</h3>
              <p className="text-muted-foreground">Join a community of health-conscious individuals committed to making healthcare more accessible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Join thousands of people who are already saving money and reducing medicine waste.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register">
            <Button size="lg">Create Account</Button>
          </Link>
          <Link to="/buy">
            <Button variant="outline" size="lg">Browse Medicines</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;