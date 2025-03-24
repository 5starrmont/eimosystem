
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Droplets, 
  Receipt, 
  Bell, 
  CreditCard,
  Wrench,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications, mockPayments } from "@/utils/mockData";
import { Input } from "@/components/ui/input";

interface TenantDashboardProps {
  dashboard: any;
  isLoading: boolean;
}

const TenantDashboard = ({ dashboard, isLoading }: TenantDashboardProps) => {
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your tenant portal</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Today's date: {format(new Date(), 'PPP')}
          </p>
        </div>
      </div>
      
      {/* Stats Cards for Tenant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 25,000</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center">
                <span>Due on 1st of each month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Water Bill</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 1,200</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-warning flex items-center">
                <span>Due in 5 days</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payment History</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center">
                <span>All payments on time</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Payments and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                // Skeleton Loader
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-start p-4 rounded-lg">
                    <div className="h-5 w-5 rounded-full bg-eimo-200 mr-4"></div>
                    <div className="flex-grow">
                      <div className="h-4 bg-eimo-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-eimo-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-eimo-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  {mockPayments.slice(0, 4).map((payment, index) => (
                    <div key={index} className="flex items-start p-3 rounded-lg border">
                      <div className={`flex-shrink-0 w-10 h-10 ${
                        payment.type === 'rent' ? 'bg-blue-100' : 'bg-green-100'
                      } rounded-full flex items-center justify-center mr-3`}>
                        {payment.type === 'rent' ? (
                          <Home className={`h-5 w-5 ${payment.type === 'rent' ? 'text-blue-500' : 'text-green-500'}`} />
                        ) : (
                          <Droplets className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          KES {payment.amount.toLocaleString()} • {format(new Date(payment.date), 'PPP')}
                        </p>
                        <div className="mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {payment.status === 'completed' ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                // Skeleton Loader
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-start p-4 rounded-lg">
                    <div className="h-5 w-5 rounded-full bg-eimo-200 mr-4"></div>
                    <div className="flex-grow">
                      <div className="h-4 bg-eimo-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-eimo-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-eimo-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                mockNotifications
                  .filter(n => n.userId === '3') // Filter notifications for tenant
                  .slice(0, 4)
                  .map(notification => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onClick={() => console.log('Notification clicked:', notification.id)}
                    />
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Maintenance Requests */}
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
    </div>
  );
};

export default TenantDashboard;
