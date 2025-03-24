
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";

interface TenantNotificationsSectionProps {
  isLoading: boolean;
}

const TenantNotificationsSection = ({ isLoading }: TenantNotificationsSectionProps) => {
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
  );
};

export default TenantNotificationsSection;
