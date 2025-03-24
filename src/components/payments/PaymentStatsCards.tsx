
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface PaymentStatsCardsProps {
  totalPaid: number;
  totalPending: number;
  currentRent: number;
  currentWaterBill: number;
  totalCurrentBill: number;
  onMakePayment: () => void;
}

const PaymentStatsCards = ({
  totalPaid,
  totalPending,
  currentRent,
  currentWaterBill,
  totalCurrentBill,
  onMakePayment
}: PaymentStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Current Bill Due</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">
            KES {totalCurrentBill.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1 space-y-1">
            <div className="flex justify-between">
              <span>Rent:</span>
              <span>KES {currentRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Water Bill:</span>
              <span>KES {currentWaterBill.toLocaleString()}</span>
            </div>
          </div>
          <Button
            className="mt-3 bg-accent text-white hover:bg-accent-hover w-full"
            size="sm"
            onClick={onMakePayment}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Make Combined Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStatsCards;
