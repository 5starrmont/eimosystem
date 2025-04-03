
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Bell, Shield, UserCog, Settings, Activity } from "lucide-react";
import AlertCard from "./AlertCard";

interface SystemAlertsProps {
  isLoading: boolean;
}

const SystemAlerts = ({ isLoading }: SystemAlertsProps) => {
  return (
    <Card className="shadow-md border-purple-100">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-purple-600" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton Loader
            Array(3)
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertCard
                icon={<Shield className="h-6 w-6" />}
                title="System Update Available"
                description="New version 2.1.0 is ready to install with improved security features and bug fixes."
                buttonText="Install Update"
                colorClasses={{
                  border: "border-purple-200",
                  bg: "bg-purple-50",
                  iconBg: "bg-purple-100",
                  iconColor: "text-purple-600",
                  buttonBg: "bg-purple-100",
                  buttonText: "text-purple-700",
                  buttonHover: "bg-purple-200",
                }}
                onClick={() => console.log("Install update clicked")}
              />

              <AlertCard
                icon={<UserCog className="h-6 w-6" />}
                title="New User Registrations"
                description="2 new user accounts are pending approval. Review their details and grant access."
                buttonText="Review Users"
                colorClasses={{
                  border: "border-blue-200",
                  bg: "bg-blue-50",
                  iconBg: "bg-blue-100",
                  iconColor: "text-blue-600",
                  buttonBg: "bg-blue-100",
                  buttonText: "text-blue-700",
                  buttonHover: "bg-blue-200",
                }}
                onClick={() => console.log("Review users clicked")}
              />

              <AlertCard
                icon={<Settings className="h-6 w-6" />}
                title="Database Maintenance"
                description="Scheduled maintenance for tonight at 2:00 AM. System performance may be affected during this time."
                buttonText="View Schedule"
                colorClasses={{
                  border: "border-orange-200",
                  bg: "bg-orange-50",
                  iconBg: "bg-orange-100",
                  iconColor: "text-orange-500",
                  buttonBg: "bg-orange-100",
                  buttonText: "text-orange-700",
                  buttonHover: "bg-orange-200",
                }}
                onClick={() => console.log("View schedule clicked")}
              />

              <AlertCard
                icon={<Activity className="h-6 w-6" />}
                title="System Performance"
                description="All systems are operating at optimal performance. Current uptime: 24 days."
                buttonText="View Details"
                colorClasses={{
                  border: "border-green-200",
                  bg: "bg-green-50",
                  iconBg: "bg-green-100",
                  iconColor: "text-green-600",
                  buttonBg: "bg-green-100",
                  buttonText: "text-green-700",
                  buttonHover: "bg-green-200",
                }}
                onClick={() => console.log("View details clicked")}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemAlerts;
