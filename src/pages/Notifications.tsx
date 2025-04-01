
import { useState } from "react";
import Layout from "@/components/Layout";
import { useQuery } from "@tanstack/react-query";
import { mockNotifications } from "@/utils/mockData";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, BellOff, CheckCheck, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import NotificationCard from "@/components/NotificationCard";
import { useToast } from "@/hooks/use-toast";

// Mock function to fetch notifications data
const fetchNotifications = async (userId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter notifications for the current user
  return mockNotifications.filter(n => n.userId === userId);
};

const Notifications = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");
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
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    return true; // 'all' tab
  });
  
  // Count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
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
                </TabsList>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Filter by type:</span>
                  <select className="ml-2 text-sm bg-background border rounded px-2 py-1">
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
                />
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0">
                <NotificationsList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </TabsContent>
              
              <TabsContent value="read" className="mt-0">
                <NotificationsList 
                  notifications={filteredNotifications} 
                  onMarkAsRead={handleMarkAsRead}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

// Helper component for listing notifications
interface NotificationsListProps {
  notifications: any[];
  onMarkAsRead: (id: string) => void;
}

const NotificationsList = ({ notifications, onMarkAsRead }: NotificationsListProps) => {
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
            <NotificationCard
              key={notification.id}
              notification={notification}
              onClick={() => !notification.read && onMarkAsRead(notification.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Notifications;
