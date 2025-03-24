
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TenantMaintenanceSection = () => {
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const { toast } = useToast();

  const handleSubmitRequest = () => {
    // In a real app, this would send data to backend
    toast({
      title: "Maintenance request submitted",
      description: "Your request has been received and is being processed.",
    });
    
    // Reset form and close dialog
    setRequestTitle("");
    setRequestDescription("");
    setIsMaintenanceDialogOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <Wrench className="h-5 w-5 mr-2" />
            Maintenance Requests
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setIsMaintenanceDialogOpen(true)}
          >
            <PlusCircle className="h-4 w-4" />
            <span>New Request</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start p-3 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                <Wrench className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">Bathroom Sink Leaking</h4>
                <p className="text-sm text-muted-foreground">Reported on June 10, 2023</p>
                <div className="mt-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">In Progress</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start p-3 rounded-lg border">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Wrench className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">Light Bulb Replacement</h4>
                <p className="text-sm text-muted-foreground">Reported on May 15, 2023</p>
                <div className="mt-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Request Dialog */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Maintenance Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="request-title">Request Title</Label>
              <Input
                id="request-title"
                placeholder="e.g., Leaking Faucet"
                value={requestTitle}
                onChange={(e) => setRequestTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="request-description">Description</Label>
              <Textarea
                id="request-description"
                placeholder="Please describe the issue in detail..."
                className="min-h-[100px]"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitRequest} 
              disabled={!requestTitle || !requestDescription}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TenantMaintenanceSection;
