import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Loader2, Upload } from 'lucide-react';

const sellMedicineSchema = z.object({
  medicineName: z.string().min(2, "Medicine name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  pricePerUnit: z.string().min(1, "Price per unit is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  manufactureDate: z.string().min(1, "Manufacture date is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

type SellMedicineFormValues = z.infer<typeof sellMedicineSchema>;

const SellMedicinePage = () => {
  const [medicineImage, setMedicineImage] = useState<File | null>(null);
  const [billImage, setBillImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<SellMedicineFormValues>({
    resolver: zodResolver(sellMedicineSchema),
    defaultValues: {
      medicineName: "",
      quantity: "",
      pricePerUnit: "",
      expiryDate: "",
      manufactureDate: "",
      description: "",
      category: "",
    },
  });

  const handleMedicineImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedicineImage(e.target.files[0]);
    }
  };

  const handleBillImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBillImage(e.target.files[0]);
    }
  };

  const onSubmit = async (data: SellMedicineFormValues) => {
    setIsLoading(true);

    try {
      console.log("Form data:", data);
      console.log("Medicine Image:", medicineImage);
      console.log("Bill Image:", billImage);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form
      form.reset();
      setMedicineImage(null);
      setBillImage(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sell Your Unused Medicine</h1>
        <p className="text-muted-foreground mt-2">
          List your unused medicine for others who need it while recovering some of your costs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Details</CardTitle>
          <CardDescription>
            Please provide accurate information about the medicine you want to sell.
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
                      <FormLabel>Medicine Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter medicine name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="antibiotics">Antibiotics</SelectItem>
                          <SelectItem value="painkillers">Painkillers</SelectItem>
                          <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                          <SelectItem value="antidiabetic">Antidiabetic</SelectItem>
                          <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                          <SelectItem value="respiratory">Respiratory</SelectItem>
                          <SelectItem value="vitamins">Vitamins & Supplements</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Available*</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Number of tablets/units" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Unit (₹)*</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Price per tablet/unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manufactureDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacture Date*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date*</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any additional details about the medicine" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel>Medicine Image*</FormLabel>
                  <div className="mt-2 flex items-center justify-center w-full border border-dashed border-gray-300 rounded-lg h-40 bg-gray-50 hover:bg-gray-100 cursor-pointer overflow-hidden relative">
                    {medicineImage ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">{medicineImage.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{Math.round(medicineImage.size / 1024)} KB</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2" 
                          onClick={(e) => {
                            e.preventDefault();
                            setMedicineImage(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">Click to upload medicine photo</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMedicineImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a clear image of the medicine package
                  </p>
                </div>

                <div>
                  <FormLabel>Bill Image*</FormLabel>
                  <div className="mt-2 flex items-center justify-center w-full border border-dashed border-gray-300 rounded-lg h-40 bg-gray-50 hover:bg-gray-100 cursor-pointer overflow-hidden relative">
                    {billImage ? (
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">{billImage.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{Math.round(billImage.size / 1024)} KB</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="mt-2" 
                          onClick={(e) => {
                            e.preventDefault();
                            setBillImage(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-500">Click to upload bill/receipt</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBillImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a clear image of the purchase bill for verification
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => form.reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Listing"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Listing Submitted Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Your medicine has been listed for sale. You will be notified when someone purchases it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SellMedicinePage;