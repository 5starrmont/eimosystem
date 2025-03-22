
import { useState } from "react";
import { mockPayments, mockTenants, mockUsers, currentUser } from "@/utils/mockData";
import { Payment } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Eye, Download, Search, XCircle } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "@/components/StatusBadge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TenantPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  // Filter payments for the current tenant
  const tenantUser = mockUsers.find(user => user.role === 'tenant');
  const tenant = mockTenants.find(t => t.userId === tenantUser?.id);
  const tenantPayments = mockPayments.filter(p => p.tenantId === tenant?.id);
  
  // Total paid amount
  const totalPaid = tenantPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  
  // Total pending amount
  const totalPending = tenantPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  
  // Filtered payments based on search
  const filteredPayments = tenantPayments.filter(payment => 
    payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.toString().includes(searchTerm) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">My Payments</h1>
        <p className="text-muted-foreground">Manage and track your rent and water bill payments</p>
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
            {totalPending > 0 && (
              <Button
                className="mt-2 bg-accent text-white hover:bg-accent-hover w-full"
                size="sm"
              >
                Make Payment
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search payments..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Payments Table */}
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
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
                          onClick={() => setSelectedPayment(payment)}
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
                  <td colSpan={5} className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <XCircle className="h-8 w-8 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No payments found</h3>
                      <p className="text-muted-foreground mt-1">
                        Try adjusting your search
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
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b">
                <div>
                  <h4 className="font-medium">
                    {selectedPayment.description || `${selectedPayment.type.charAt(0).toUpperCase() + selectedPayment.type.slice(1)} Payment`}
                  </h4>
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
    </div>
  );
};

export default TenantPayments;
