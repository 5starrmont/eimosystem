
import { useState } from "react";
import { mockPayments, mockTenants, mockUsers } from "@/utils/mockData";
import { Payment } from "@/utils/types";
import { useToast } from "@/hooks/use-toast";
import PaymentStatsCards from "./PaymentStatsCards";
import PaymentSearch from "./PaymentSearch";
import PaymentTable from "./PaymentTable";
import PaymentDetailsDialog from "./PaymentDetailsDialog";
import MakePaymentDialog from "./MakePaymentDialog";

const TenantPayments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
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
  
  // Mock data for current bills
  const currentRent = 25000;
  const currentWaterBill = 1200;
  const totalCurrentBill = currentRent + currentWaterBill;
  
  // Filtered payments based on search
  const filteredPayments = tenantPayments.filter(payment => 
    payment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.toString().includes(searchTerm) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleMakePayment = () => {
    setPaymentDialogOpen(true);
  };
  
  const handleCompletePayment = (paymentMethod: string, paymentDetails?: any) => {
    // Here you would integrate with a payment gateway
    let paymentMethodText = "";
    
    switch (paymentMethod) {
      case "mpesa":
        paymentMethodText = `M-Pesa (${paymentDetails?.phoneNumber || 'Not provided'})`;
        break;
      case "card":
        paymentMethodText = "Credit/Debit Card";
        break;
      case "crypto":
        paymentMethodText = "Cryptocurrency";
        break;
      default:
        paymentMethodText = paymentMethod;
    }
    
    toast({
      title: "Payment Processing",
      description: `Your combined payment of KES ${totalCurrentBill.toLocaleString()} via ${paymentMethodText} is being processed.`,
    });
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Your combined payment of KES ${totalCurrentBill.toLocaleString()} has been completed successfully.`,
      });
      
      // Add new payment to the list
      const newPayment: Payment = {
        id: `payment-${Date.now()}`,
        tenantId: tenant?.id || '',
        amount: totalCurrentBill,
        type: 'combined',
        status: 'completed',
        date: new Date().toISOString(),
        description: `Combined rent and water bill payment`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // This would be done via API in a real app
      mockPayments.unshift(newPayment);
      
    }, 2000);
    
    setPaymentDialogOpen(false);
  };

  const handleViewPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">My Payments</h1>
        <p className="text-muted-foreground">Manage and track your combined rent and utility payments</p>
      </div>
      
      {/* Payment Stats Cards */}
      <PaymentStatsCards
        totalPaid={totalPaid}
        totalPending={totalPending}
        currentRent={currentRent}
        currentWaterBill={currentWaterBill}
        totalCurrentBill={totalCurrentBill}
        onMakePayment={handleMakePayment}
      />
      
      {/* Search */}
      <PaymentSearch 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      
      {/* Payments Table */}
      <PaymentTable 
        payments={filteredPayments} 
        onViewDetails={handleViewPaymentDetails} 
      />
      
      {/* Payment Details Dialog */}
      <PaymentDetailsDialog
        payment={selectedPayment}
        open={!!selectedPayment}
        onOpenChange={(open) => !open && setSelectedPayment(null)}
      />
      
      {/* Make Payment Dialog */}
      <MakePaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onCompletePayment={handleCompletePayment}
        currentRent={currentRent}
        currentWaterBill={currentWaterBill}
        totalCurrentBill={totalCurrentBill}
      />
    </div>
  );
};

export default TenantPayments;
