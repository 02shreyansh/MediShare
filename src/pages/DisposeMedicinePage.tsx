import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Calendar, MapPin, Info, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const formSchema = z.object({
  medicineName: z.string().min(2, 'Medicine name is required').max(100),
  quantity: z.string().min(1, 'Quantity is required'),
  expiryDate: z.date({
    required_error: 'Expiry date is required',
  }),
  address: z.string().min(5, 'Address is required'),
  phone: z.string().min(10, 'Phone number is required').max(15),
  email: z.string().email('Invalid email address'),
  description: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const DisposeMedicinePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      medicineName: '',
      quantity: '',
      expiryDate: new Date(),
      address: '',
      phone: '',
      email: '',
      description: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    console.log(data);
    
    
    setTimeout(() => {
      setIsSubmitting(false);
      setPickupDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
      setShowConfirmation(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Dispose of Expired Medicine</h1>
      <p className="text-center text-muted-foreground mb-8">
        Schedule a pickup for your expired or unused medications for safe disposal
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trash2 className="mr-2 h-5 w-5" />
                Medicine Disposal Form
              </CardTitle>
              <CardDescription>
                Fill out the details below to schedule a medicine disposal pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="medicineName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medicine Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter medicine name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2 strips, 1 box" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional details about the medicines" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions for medicine disposal
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you confirm that the information provided is accurate
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Scheduling Pickup...' : 'Schedule Pickup'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>About Our Medicine Disposal Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Proper disposal of expired or unused medicines is crucial for environmental protection and public safety.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Our team will collect your medicines from your doorstep and ensure they are disposed of properly.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Pickups are scheduled within 2-3 business days of your request.
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Why Proper Disposal Matters:</h3>
                <ul className="text-sm space-y-2">
                  <li>• Prevents accidental ingestion by children or pets</li>
                  <li>• Reduces environmental contamination</li>
                  <li>• Prevents drug misuse and abuse</li>
                  <li>• Avoids water supply contamination</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Pickup Scheduled Successfully
            </DialogTitle>
            <DialogDescription>
              Your medicine disposal pickup has been scheduled
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Thank you for choosing our medicine disposal service. Our team will collect your medicines on:
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="font-medium text-center">
                {pickupDate?.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Between 9:00 AM and 5:00 PM
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation email with the details of your scheduled pickup. Our team will contact you before arriving.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowConfirmation(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisposeMedicinePage;