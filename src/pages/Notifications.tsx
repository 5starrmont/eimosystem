
import { useState } from "react";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { mockNotifications, mockMaintenanceRequests } from "@/utils/mockData";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BellOff, CheckCheck, Filter, Wrench } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/NotificationCard";
import { useToast } from "@/hooks/use-toast";
import { MaintenanceRequest, Notification } from "@/utils/types";

// Mock function to fetch notifications data
const fetchNotifications = async (userId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter notifications for the current user
  return mockNotifications.filter(n => n.userId === userId);
};

// Mock function to fetch related maintenance requests
const fetchMaintenanceRequest = async (requestId: string) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMaintenanceRequests.find(req => req.id === requestId) || null;
};

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read" | "maintenance">("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { user, userRole } = useAuth();
  const userId = userRole === 'tenant' ? '3' : userRole === 'landlord' ? '1' : userRole === 'caretaker' ? '2' : '4'; // Mock user IDs
  
  const { 
    data: notifications = [], 
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => fetchNotifications(userId),
  });
  
  // Filter notifications based on active tab and selected type
  const filteredNotifications = notifications.filter(notification => {
    // Filter by tab
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    if (activeTab === 'maintenance') return notification.relatedType === 'maintenance';
    
    // Filter by type if "all" tab
    if (selectedType !== 'all' && activeTab === 'all') {
      return notification.type === selectedType;
    }
    
    return true; // 'all' tab with 'all' types
  });
  
  // Count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Count of maintenance notifications (for caretakers)
  const maintenanceCount = userRole === 'caretaker' ? 
    notifications.filter(n => n.relatedType === 'maintenance').length : 0;
  
  const handleMarkAsRead = (notificationId: string) => {
    // In a real app, this would call an API endpoint
    console.log('Marking notification as read:', notificationId);
    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    });
    
    // Refetch to simulate update
    setTimeout(() => refetch(), 500);
  };
  
  const handleMarkAllAsRead = () => {
    // In a real app, this would call an API endpoint
    console.log('Marking all notifications as read');
    toast({
      title: "All notifications marked as read",
      description: "All your notifications have been marked as read.",
    });
    
    // Refetch to simulate update
    setTimeout(() => refetch(), 500);
  };
  
  const handleViewMaintenanceRequest = (requestId: string) => {
    // In a real app, this would navigate to the maintenance request details page
    console.log('Viewing maintenance request:', requestId);
    toast({
      title: "Maintenance Request",
      description: "Viewing details for maintenance request #" + requestId,
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with important alerts and messages</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Today's date: {format(new Date(), 'PPP')}
            </p>
          </div>
        </div>
        
        {isLoading ? (
          // Skeleton loader for notifications
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Notification stats and actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between bg-card p-4 rounded-lg border">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">
                  You have{" "}
                  <span className="font-bold text-primary">{unreadCount}</span>{" "}
                  unread {unreadCount === 1 ? "notification" : "notifications"}
                </p>
              </div>
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 md:mt-0"
                  onClick={handleMarkAllAsRead}
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </div>
            
            {/* Notification tabs and filtering */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="all" className="relative">
                    All
                    {notifications.length > 0 && (
                      <Badge className="ml-2">{notifications.length}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="relative">
                    Unread
                    {unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="read">Read</TabsTrigger>
                  
                  {/* Show maintenance tab only for caretakers */}
                  {userRole === 'caretaker' && (
                    <TabsTrigger value="maintenance" className="relative">
                      Maintenance
                      {maintenanceCount > 0 && (
                        <Badge variant="outline" className="ml-2">{maintenanceCount}</Badge>
                      )}
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filter by type:</span>
                  <select 
                    className="ml-2 text-sm bg-background border rounded px-2 py-1"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <NotificationsList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  onViewMaintenanceRequest={handleViewMaintenanceRequest}
                  userRole={userRole}
                />
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                <NotificationsList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  onViewMaintenanceRequest={handleViewMaintenanceRequest}
                  userRole={userRole}
                />
              </TabsContent>
              
              <TabsContent value="read" className="mt-0">
                <NotificationsList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                  onViewMaintenanceRequest={handleViewMaintenanceRequest}
                  userRole={userRole}
                />
              </TabsContent>
              
              {userRole === 'caretaker' && (
                <TabsContent value="maintenance" className="mt-0">
                  <NotificationsList 
                    notifications={filteredNotifications} 
                    onMarkAsRead={handleMarkAsRead}
                    onViewMaintenanceRequest={handleViewMaintenanceRequest}
                    userRole={userRole}
                    showMaintenanceDetails={true}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Helper component for listing notifications
interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onViewMaintenanceRequest: (id: string) => void;
  userRole: string;
  showMaintenanceDetails?: boolean;
}

const NotificationsList = ({ 
  notifications, 
  onMarkAsRead, 
  onViewMaintenanceRequest,
  userRole,
  showMaintenanceDetails = false
}: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <Alert>
        <BellOff className="h-4 w-4" />
        <AlertTitle>No notifications</AlertTitle>
        <AlertDescription>
          You don't have any notifications in this category.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {notifications.map(notification => (
            <div key={notification.id} className="space-y-2">
              <NotificationCard
                notification={notification}
                onClick={() => !notification.read && onMarkAsRead(notification.id)}
              />
              
              {/* Show maintenance details for caretakers if this is a maintenance notification */}
              {userRole === 'caretaker' && 
               notification.relatedType === 'maintenance' && 
               showMaintenanceDetails && (
                <MaintenanceRequestDetail 
                  requestId={notification.relatedTo as string} 
                  onViewDetails={() => onViewMaintenanceRequest(notification.relatedTo as string)}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// New component for displaying maintenance request details
interface MaintenanceRequestDetailProps {
  requestId: string;
  onViewDetails: () => void;
}

const MaintenanceRequestDetail = ({ requestId, onViewDetails }: MaintenanceRequestDetailProps) => {
  const { data: maintenanceRequest, isLoading } = useQuery({
    queryKey: ['maintenanceRequest', requestId],
    queryFn: () => fetchMaintenanceRequest(requestId),
  });
  
  if (isLoading) {
    return <Skeleton className="h-20 w-full mt-2" />;
  }
  
  if (!maintenanceRequest) {
    return null;
  }
  
  // Map priority to color
  const priorityColor = {
    low: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-orange-100 text-orange-700",
    urgent: "bg-red-100 text-red-700"
  };
  
  return (
    <div className="ml-8 mt-2 p-3 rounded-lg border border-dashed">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">Maintenance Request #{requestId}</span>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${priorityColor[maintenanceRequest.priority as keyof typeof priorityColor]}`}>
          {maintenanceRequest.priority.charAt(0).toUpperCase() + maintenanceRequest.priority.slice(1)}
        </span>
      </div>
      <p className="text-sm mt-1">{maintenanceRequest.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-muted-foreground">
          Status: <span className="font-medium">{maintenanceRequest.status.replace('_', ' ')}</span>
        </span>
        <Button size="sm" variant="outline" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
