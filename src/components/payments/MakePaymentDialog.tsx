
import { useState } from "react";
import { CreditCard, PlusCircle, CreditCard as CardIcon, Phone, Bitcoin } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface MakePaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompletePayment: (paymentMethod: string, paymentDetails?: any) => void;
  currentRent: number;
  currentWaterBill: number;
  totalCurrentBill: number;
}

type PaymentMethod = "mpesa" | "card" | "crypto";

const MakePaymentDialog = ({
  open,
  onOpenChange,
  onCompletePayment,
  currentRent,
  currentWaterBill,
  totalCurrentBill,
}: MakePaymentDialogProps) => {
  const [step, setStep] = useState<"summary" | "method" | "details">("summary");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  
  const form = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvv: "",
      phoneNumber: "",
      walletAddress: "",
    },
  });
  
  const handleContinue = () => {
    setStep("method");
  };
  
  const handleSelectMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setStep("details");
  };
  
  const handleBack = () => {
    if (step === "method") {
      setStep("summary");
    } else if (step === "details") {
      setStep("method");
    }
  };
  
  const handleSubmitPayment = () => {
    onCompletePayment(paymentMethod, form.getValues());
  };
  
  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case "mpesa":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <Phone className="mx-auto h-12 w-12 text-green-500 mb-2" />
              <h3 className="font-medium text-lg">M-Pesa Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  placeholder="Enter your phone number" 
                  {...form.register("phoneNumber")}
                />
                <p className="text-xs text-muted-foreground">A payment request will be sent to this number</p>
              </div>
            </div>
          </div>
        );
      case "card":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <CardIcon className="mx-auto h-12 w-12 text-blue-500 mb-2" />
              <h3 className="font-medium text-lg">Credit/Debit Card</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  placeholder="1234 5678 9012 3456" 
                  {...form.register("cardNumber")}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    {...form.register("expiry")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    type="password"
                    maxLength={4}
                    {...form.register("cvv")}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "crypto":
        return (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <Bitcoin className="mx-auto h-12 w-12 text-orange-500 mb-2" />
              <h3 className="font-medium text-lg">Cryptocurrency</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="walletAddress">Your Wallet Address</Label>
                <Input 
                  id="walletAddress" 
                  placeholder="Enter your crypto wallet address" 
                  {...form.register("walletAddress")}
                />
                <p className="text-xs text-muted-foreground">We accept Bitcoin, Ethereum, and other major cryptocurrencies</p>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make Combined Payment</DialogTitle>
          <DialogDescription>
            Pay your rent and water bill together in one transaction
          </DialogDescription>
        </DialogHeader>
        
        {step === "summary" && (
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
        )}
        
        {step === "method" && (
          <div className="space-y-4 my-4">
            <h3 className="font-medium">Select Payment Method</h3>
            <RadioGroup className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-accent/5 cursor-pointer" onClick={() => handleSelectMethod("mpesa")}>
                <RadioGroupItem value="mpesa" id="mpesa" />
                <div className="flex flex-1 items-center justify-between">
                  <Label htmlFor="mpesa" className="flex items-center cursor-pointer">
                    <Phone className="h-5 w-5 mr-2 text-green-500" />
                    <span>M-Pesa</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">Mobile Money</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-accent/5 cursor-pointer" onClick={() => handleSelectMethod("card")}>
                <RadioGroupItem value="card" id="card" />
                <div className="flex flex-1 items-center justify-between">
                  <Label htmlFor="card" className="flex items-center cursor-pointer">
                    <CardIcon className="h-5 w-5 mr-2 text-blue-500" />
                    <span>Credit/Debit Card</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">Visa, Mastercard, etc.</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-accent/5 cursor-pointer" onClick={() => handleSelectMethod("crypto")}>
                <RadioGroupItem value="crypto" id="crypto" />
                <div className="flex flex-1 items-center justify-between">
                  <Label htmlFor="crypto" className="flex items-center cursor-pointer">
                    <Bitcoin className="h-5 w-5 mr-2 text-orange-500" />
                    <span>Cryptocurrency</span>
                  </Label>
                  <span className="text-sm text-muted-foreground">Bitcoin, Ethereum, etc.</span>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
        
        {step === "details" && (
          <div className="space-y-4 my-2">
            {renderPaymentDetails()}
          </div>
        )}
        
        <DialogFooter>
          {step !== "summary" && (
            <Button variant="outline" onClick={handleBack} className="mr-auto">
              Back
            </Button>
          )}
          
          {step === "summary" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleContinue} className="bg-accent text-white hover:bg-accent-hover">
                <CreditCard className="h-4 w-4 mr-2" />
                Continue
              </Button>
            </>
          )}
          
          {step === "method" && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          )}
          
          {step === "details" && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitPayment} className="bg-accent text-white hover:bg-accent-hover">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay KES {totalCurrentBill.toLocaleString()}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MakePaymentDialog;
