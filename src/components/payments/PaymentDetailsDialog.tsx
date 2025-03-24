
import { format } from "date-fns";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Payment } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentDetailsDialogProps {
  payment: Payment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDetailsDialog = ({
  payment,
  open,
  onOpenChange,
}: PaymentDetailsDialogProps) => {
  if (!payment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between pb-4 border-b">
            <div>
              <h4 className="font-medium">
                {payment.description || `${payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} Payment`}
              </h4>
            </div>
            <StatusBadge status={payment.status} />
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <div className="font-medium">Payment ID</div>
              <div>{payment.id}</div>
            </div>
            <div>
              <div className="font-medium">Date</div>
              <div>{format(new Date(payment.date), 'dd MMM yyyy, HH:mm')}</div>
            </div>
            <div>
              <div className="font-medium">Type</div>
              <div className="capitalize">{payment.type}</div>
            </div>
            <div>
              <div className="font-medium">Amount</div>
              <div className="font-medium text-lg">KES {payment.amount.toLocaleString()}</div>
            </div>
          </div>
          
          {payment.receiptUrl && (
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
  );
};

export default PaymentDetailsDialog;
