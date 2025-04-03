
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";

interface RecentActivitiesProps {
  isLoading: boolean;
}

const RecentActivities = ({ isLoading }: RecentActivitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Recent System Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton Loader
            Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex items-start p-4 rounded-lg"
                >
                  <div className="h-5 w-5 rounded-full bg-eimo-200 mr-4"></div>
                  <div className="flex-grow">
                    <div className="h-4 bg-eimo-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-eimo-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-eimo-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockNotifications.slice(0, 4).map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => console.log("Notification clicked:", notification.id)}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
