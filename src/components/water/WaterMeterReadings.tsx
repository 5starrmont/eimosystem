
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Droplet, Calculator, ArrowDown, ArrowUp, Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

// Define the form schema with validation
const waterReadingSchema = z.object({
  propertyId: z.string().min(1, "Property selection is required"),
  newReading: z.coerce.number().positive("Reading must be a positive number"),
});

type WaterReadingFormValues = z.infer<typeof waterReadingSchema>;

// Mock data - would be replaced with API calls in a real application
const mockProperties = [
  { id: "prop1", name: "Apartment 101", lastReading: 1250, rent: 25000 },
  { id: "prop2", name: "Apartment 102", lastReading: 890, rent: 18000 },
  { id: "prop3", name: "House 201", lastReading: 2100, rent: 35000 },
  { id: "prop4", name: "Apartment 104", lastReading: 750, rent: 20000 },
];

// Water price per unit (cubic meter)
const WATER_PRICE_PER_UNIT = 150; // KES per cubic meter (m³)

const WaterMeterReadings = () => {
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState(mockProperties[0]);
  const [calculatedUsage, setCalculatedUsage] = useState<{ 
    units: number; 
    waterAmount: number;
    rentAmount: number;
    totalAmount: number;
    lastReading: number;
    newReading: number;
  } | null>(null);

  const form = useForm<WaterReadingFormValues>({
    resolver: zodResolver(waterReadingSchema),
    defaultValues: {
      propertyId: selectedProperty.id,
      newReading: undefined,
    },
  });

  const handlePropertyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const propertyId = event.target.value;
    const property = mockProperties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(property);
      form.setValue("propertyId", propertyId);
      // Reset calculated usage when property changes
      setCalculatedUsage(null);
    }
  };

  const onSubmit = (data: WaterReadingFormValues) => {
    // Ensure we have a valid reading
    const newReading = data.newReading;
    
    if (newReading <= selectedProperty.lastReading) {
      toast({
        title: "Invalid Reading",
        description: "New reading must be greater than the last reading.",
        variant: "destructive",
      });
      return;
    }
    
    // Calculate water usage in cubic meters (m³)
    const unitsUsed = newReading - selectedProperty.lastReading; // 1 unit = 1 cubic meter (m³)
    const waterBillAmount = unitsUsed * WATER_PRICE_PER_UNIT;
    const rentAmount = selectedProperty.rent;
    const totalAmount = waterBillAmount + rentAmount;
    
    // Set calculated results
    setCalculatedUsage({
      units: unitsUsed,
      waterAmount: waterBillAmount,
      rentAmount: rentAmount,
      totalAmount: totalAmount,
      lastReading: selectedProperty.lastReading,
      newReading: newReading
    });
    
    toast({
      title: "Calculation Complete",
      description: `Bill calculated for ${selectedProperty.name}`,
    });
  };

  const handleSaveBill = () => {
    if (!calculatedUsage) return;
    
    // Here you would call an API to save the bill
    // For now we'll just show a success toast
    toast({
      title: "Bill Saved",
      description: `Total bill of KES ${calculatedUsage.totalAmount.toLocaleString()} saved for ${selectedProperty.name}`,
    });
    
    // Reset the form
    form.reset();
    setCalculatedUsage(null);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Droplet className="h-5 w-5 mr-2 text-blue-500" />
          Water & Rent Bill Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormLabel>Select Property</FormLabel>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedProperty.id}
                  onChange={handlePropertyChange}
                >
                  {mockProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel>Last Meter Reading</FormLabel>
                  <span className="text-xs text-muted-foreground">Units (m³)</span>
                </div>
                <div className="flex items-center">
                  <ArrowDown className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input 
                    value={selectedProperty.lastReading} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="newReading"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>New Meter Reading</FormLabel>
                    <span className="text-xs text-muted-foreground">Units (m³)</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowUp className="h-4 w-4 mr-2 text-accent" />
                    <FormControl>
                      <Input 
                        {...field} 
                        type="number"
                        min={selectedProperty.lastReading + 1}
                        placeholder="Enter current meter reading"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={form.formState.isSubmitting}
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Bill
              </Button>
            </div>
          </form>
        </Form>
        
        {calculatedUsage && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium text-lg mb-4">Calculation Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-md">
                <div className="text-sm text-blue-700 mb-1">Water Usage</div>
                <div className="text-2xl font-bold">{calculatedUsage.units} m³</div>
                <div className="text-sm text-muted-foreground mt-1">
                  From {calculatedUsage.lastReading} to {calculatedUsage.newReading}
                </div>
                <div className="mt-2 text-blue-700 font-medium">
                  KES {calculatedUsage.waterAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  At KES {WATER_PRICE_PER_UNIT}/m³
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-md">
                <div className="text-sm text-amber-700 mb-1">Monthly Rent</div>
                <div className="text-2xl font-bold">{selectedProperty.name}</div>
                <div className="mt-2 text-amber-700 font-medium">
                  KES {calculatedUsage.rentAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Fixed monthly rent
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-md">
                <div className="text-sm text-green-700 mb-1">Total Bill Amount</div>
                <div className="text-2xl font-bold">KES {calculatedUsage.totalAmount.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center">
                  <Home className="h-3 w-3 mr-1" />
                  Rent: KES {calculatedUsage.rentAmount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Droplet className="h-3 w-3 mr-1" />
                  Water: KES {calculatedUsage.waterAmount.toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleSaveBill}
                className="bg-accent text-white hover:bg-accent-hover"
              >
                Save Bill
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WaterMeterReadings;
