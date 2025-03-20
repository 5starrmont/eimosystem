
import { useState } from "react";
import Layout from "@/components/Layout";
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
  RotateCcw 
} from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
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

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  // Total completed payments amount
  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  // Total pending payments amount
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  
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
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Track rent and water bill payments.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent-hover">
                <Plus className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Record New Payment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="tenant" className="text-sm font-medium">
                      Tenant
                    </label>
                    <select 
                      id="tenant" 
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
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium">
                        Amount (KES)
                      </label>
                      <Input id="amount" type="number" min="0" placeholder="e.g. 25000" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="paymentType" className="text-sm font-medium">
                        Payment Type
                      </label>
                      <select 
                        id="paymentType" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="rent">Rent</option>
                        <option value="water">Water Bill</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Payment Date
                    </label>
                    <Input 
                      id="date" 
                      type="date" 
                      defaultValue={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <Input 
                      id="description" 
                      placeholder="e.g. June 2023 Rent" 
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-accent text-white hover:bg-accent-hover">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Payment Stats */}
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
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Amount
                  </th>
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
                      <td className="p-4 align-middle font-medium">
                        KES {payment.amount.toLocaleString()}
                      </td>
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
                          
                          {payment.receiptUrl && (
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
                    <td colSpan={6} className="p-8 text-center">
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
      </div>
      
      {/* Payment Details Dialog */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <div>
                  <h4 className="font-medium">{getTenantName(selectedPayment)}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment.description || `${selectedPayment.type.charAt(0).toUpperCase() + selectedPayment.type.slice(1)} Payment`}
                  </p>
                </div>
                <StatusBadge status={selectedPayment.status} />
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <div className="font-medium">Payment ID</div>
                  <div>{selectedPayment.id}</div>
                </div>
                <div>
                  <div className="font-medium">Date</div>
                  <div>{format(new Date(selectedPayment.date), 'dd MMM yyyy, HH:mm')}</div>
                </div>
                <div>
                  <div className="font-medium">Type</div>
                  <div className="capitalize">{selectedPayment.type}</div>
                </div>
                <div>
                  <div className="font-medium">Amount</div>
                  <div className="font-medium text-lg">KES {selectedPayment.amount.toLocaleString()}</div>
                </div>
              </div>
              
              {selectedPayment.receiptUrl && (
                <div className="mt-6 pt-4 border-t">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default Payments;
