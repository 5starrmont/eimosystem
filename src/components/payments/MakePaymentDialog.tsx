
import { CreditCard, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

interface MakePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompletePayment: () => void;
  currentRent: number;
  currentWaterBill: number;
  totalCurrentBill: number;
}

const MakePaymentDialog = ({
  open,
  onOpenChange,
  onCompletePayment,
  currentRent,
  currentWaterBill,
  totalCurrentBill,
}: MakePaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make Combined Payment</DialogTitle>
          <DialogDescription>
            Pay your rent and water bill together in one transaction
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-2">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rent</span>
                  <span className="font-medium">KES {currentRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Water Bill</span>
                  <span className="font-medium">KES {currentWaterBill.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-lg">KES {totalCurrentBill.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-start">
              <PlusCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Combine for Convenience</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Paying all bills together saves you time and helps you keep track of your expenses more easily.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCompletePayment} className="bg-accent text-white hover:bg-accent-hover">
            <CreditCard className="h-4 w-4 mr-2" />
            Pay KES {totalCurrentBill.toLocaleString()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MakePaymentDialog;
