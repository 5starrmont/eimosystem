import { useState, useEffect } from "react";
import { mockPayments, mockTenants, mockUsers } from "@/utils/mockData";
import { Payment } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  Home,
  Droplet 
} from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import PaymentDetailsDialog from "@/components/payments/PaymentDetailsDialog";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Define the form schema with validation
const paymentFormSchema = z.object({
  tenantId: z.string().min(1, "Tenant selection is required"),
  totalAmount: z.coerce.number().min(1, "Total amount must be greater than 0"),
  rentAmount: z.coerce.number().min(0, "Rent amount cannot be negative"),
  waterAmount: z.coerce.number().min(0, "Water amount cannot be negative"),
  date: z.string().min(1, "Payment date is required"),
  description: z.string().optional(),
}).refine(data => {
  const calculatedTotal = data.rentAmount + data.waterAmount;
  return calculatedTotal === data.totalAmount;
}, {
  message: "Total amount must equal the sum of rent and water amounts",
  path: ["totalAmount"]
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface LandlordPaymentsProps {
  isAdmin?: boolean;
}

const LandlordPayments = ({ isAdmin = false }: LandlordPaymentsProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      tenantId: "",
      totalAmount: 0,
      rentAmount: 0,
      waterAmount: 0,
      date: format(new Date(), 'yyyy-MM-dd'),
      description: "",
    },
    mode: "onChange"
  });
  
  // Watch rent and water amounts to calculate total
  const rentAmount = form.watch("rentAmount");
  const waterAmount = form.watch("waterAmount");
  
  // Update total amount when rent or water amounts change
  const updateTotalAmount = () => {
    const total = rentAmount + waterAmount;
    form.setValue("totalAmount", total);
  };
  
  // Recalculate total when rent or water changes
  useEffect(() => {
    updateTotalAmount();
  }, [rentAmount, waterAmount]);
  
  // Total completed payments amount - only needed for non-admin view
  const totalPaid = !isAdmin ? payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0) : 0;
  
  // Total pending payments amount - only needed for non-admin view
  const totalPending = !isAdmin ? payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0) : 0;
  
  // Get tenant name from payment
  const getTenantName = (payment: Payment): string => {
    const tenant = mockTenants.find(t => t.id === payment.tenantId);
    if (!tenant) return 'Unknown Tenant';
    
    const user = mockUsers.find(u => u.id === tenant.userId);
    return user ? user.name : 'Unknown Tenant';
  };
  
  // Handle search and filters
  const filteredPayments = payments.filter(payment => {
    const tenantName = getTenantName(payment);
    
    const matchesSearch = 
      tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toString().includes(searchTerm);
    
    const matchesType = typeFilter === "all" || payment.type === typeFilter;
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // View payment details
  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
  };
  
  // Handle payment verification retry
  const handleRetryVerification = (paymentId: string) => {
    // In a real app, this would call an API to retry the verification
    // For demo purposes, we'll just update the UI
    setPayments(prev => prev.map(p => {
      if (p.id === paymentId) {
        const newStatus = Math.random() > 0.5 ? 'completed' : 'pending';
        return {...p, status: newStatus};
      }
      return p;
    }));
    
    setSelectedPayment(null); // Close the dialog
    
    toast({
      title: "Payment Verification",
      description: "Verification process completed.",
    });
  };
  
  // Handle form submission
  const onSubmit = (data: PaymentFormValues) => {
    // Create a new payment
    const newPayment: Payment = {
      id: `payment-${Date.now()}`,
      tenantId: data.tenantId,
      amount: data.totalAmount,
      type: 'combined', // Use 'combined' as the payment type
      status: 'completed',
      date: data.date,
      description: data.description || `Combined Payment: Rent KES ${data.rentAmount.toLocaleString()}, Water KES ${data.waterAmount.toLocaleString()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to payments
    setPayments([newPayment, ...payments]);
    
    // Reset form and close dialog
    form.reset();
    setShowPaymentForm(false);
    
    // Show success toast
    toast({
      title: "Payment Recorded",
      description: `Combined payment of KES ${data.totalAmount.toLocaleString()} recorded successfully.`,
    });
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? "Monitor and verify payment status" 
              : "Record and manage combined rent and water bill payments"
            }
          </p>
        </div>
        
        {!isAdmin && (
          <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent-hover">
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Record New Combined Payment</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                  <FormField
                  control={form.control}
                  name="tenantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tenant</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a tenant</option>
                          {mockTenants
                            .filter(tenant => tenant.status === 'active')
                            .map(tenant => {
                              const user = mockUsers.find(u => u.id === tenant.userId);
                              if (!user) return null;
                              
                              return (
                                <option key={tenant.id} value={tenant.id}>
                                  {user.name}
                                </option>
                              );
                            })}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rentAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rent Amount (KES)</FormLabel>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-muted-foreground" />
                          <FormControl>
                            <Input {...field} type="number" min="0" placeholder="e.g. 25000" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="waterAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Water Amount (KES)</FormLabel>
                        <div className="flex items-center">
                          <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                          <FormControl>
                            <Input {...field} type="number" min="0" placeholder="e.g. 1500" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Combined Amount (KES)</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input {...field} type="number" readOnly className="bg-muted font-bold" />
                        </FormControl>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Combined total is automatically calculated as the sum of rent and water amounts
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. June 2023 Combined Rent and Water" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <DialogClose asChild>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => form.reset()}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" className="bg-accent text-white hover:bg-accent-hover">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Record Combined Payment
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Payment Stats - Only show for non-admin users */}
      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Payments (Completed)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                KES {totalPaid.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                KES {totalPending.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                {typeFilter === "all" ? "All Types" : 
                  typeFilter === "rent" ? "Rent" :
                  typeFilter === "water" ? "Water Bill" : "Other"
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup 
                value={typeFilter} 
                onValueChange={setTypeFilter}
              >
                <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="rent">Rent</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="water">Water Bill</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <Filter className="h-4 w-4 mr-2" />
                {statusFilter === "all" ? "All Status" : 
                  statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <DropdownMenuRadioItem value="all">All Status</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setStatusFilter("all");
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Tenant
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Date
                </th>
                {!isAdmin && (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
                )}
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Type
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      {getTenantName(payment)}
                    </td>
                    <td className="p-4 align-middle">
                      {format(new Date(payment.date), 'dd MMM yyyy')}
                    </td>
                    {!isAdmin && (
                      <td className="p-4 align-middle font-medium">
                        KES {payment.amount.toLocaleString()}
                      </td>
                    )}
                    <td className="p-4 align-middle capitalize">
                      {payment.type}
                    </td>
                    <td className="p-4 align-middle">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewPayment(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {payment.receiptUrl && !isAdmin && (
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => console.log('Download receipt:', payment.receiptUrl)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 5 : 6} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <XCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No payments found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Payment Details Dialog */}
      {selectedPayment && (
        <PaymentDetailsDialog
          payment={selectedPayment}
          open={!!selectedPayment}
          onOpenChange={() => setSelectedPayment(null)}
          onRetryVerification={handleRetryVerification}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default LandlordPayments;
