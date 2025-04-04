
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { getUserEmail } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import { mockNotifications } from "@/utils/mockData";

interface TenantNotificationsSectionProps {
  isLoading: boolean;
}

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  updatedAt: string;
  relatedTo?: string;
  relatedType?: 'maintenance' | 'payment' | 'general';
}

const TenantNotificationsSection = ({ isLoading }: TenantNotificationsSectionProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const email = getUserEmail();
        if (!email) return;
        
        // Get the user id first
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .single();
          
        if (userError || !userData) {
          console.error("Error fetching user id:", userError);
          return;
        }
        
        // Using the in-memory notifications for now until we add them to the database
        // In a real app, we would fetch from the notifications table with user_id filter
        setNotifications(
          mockNotifications
            .filter(n => {
              // Try to find user-specific notifications, or use generic tenant ones
              const userSpecific = n.userId === userData.id;
              const isGenericTenant = n.userId === '3'; // Our mock tenant ID
              return userSpecific || isGenericTenant;
            })
            .slice(0, 4)
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (!isLoading) {
      fetchNotifications();
    }
  }, [isLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(isLoading || loading) ? (
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
          ) : notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={() => console.log('Notification clicked:', notification.id)}
              />
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No notifications available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantNotificationsSection;
