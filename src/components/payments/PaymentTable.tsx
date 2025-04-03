
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Payment } from "@/utils/types";

interface PaymentTableProps {
  payments: Payment[];
  onViewDetails: (payment: Payment) => void;
}

const PaymentTable = ({ payments, onViewDetails }: PaymentTableProps) => {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                Date
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
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    {format(new Date(payment.date), 'dd MMM yyyy')}
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
                        onClick={() => onViewDetails(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-muted-foreground mt-1">
                      No payments found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
