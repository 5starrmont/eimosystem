
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  Users, 
  Wrench, 
  Bell, 
  ClipboardList,
  Building2
} from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";

interface CaretakerDashboardProps {
  dashboard: any;
  isLoading: boolean;
}

const CaretakerDashboard = ({ dashboard, isLoading }: CaretakerDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Caretaker Dashboard</h1>
          <p className="text-muted-foreground">Manage properties and tenant concerns</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Today's date: {format(new Date(), 'PPP')}
          </p>
        </div>
      </div>
      
      {/* Stats Cards for Caretaker */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Properties To Maintain</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.totalHouses}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-warning flex items-center">
                <span>{dashboard.maintenanceHouses} Need attention</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.totalTenants}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center">
                <span>Across {dashboard.occupiedHouses} properties</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Tasks</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-danger flex items-center">
                <span>1 Urgent task</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClipboardList className="h-5 w-5 mr-2" />
              Maintenance Tasks
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
                  <div className="flex items-start p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <Wrench className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Apartment 104: Plumbing Issue</h4>
                      <p className="text-sm text-muted-foreground">Reported by tenant on June 15. Urgent.</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Urgent</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                      <Wrench className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">House 201: Electrical Repair</h4>
                      <p className="text-sm text-muted-foreground">Scheduled for tomorrow.</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Medium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Wrench className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Apartment 102: Paint Touch-up</h4>
                      <p className="text-sm text-muted-foreground">Scheduled for next week.</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Recent Notifications
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
                mockNotifications.slice(0, 4).map(notification => (
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
      
      {/* Property Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Property Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col p-4 rounded-lg bg-success-muted">
              <span className="text-sm text-success-foreground opacity-80">Occupied</span>
              <span className="text-2xl font-bold text-success">{dashboard.occupiedHouses}</span>
              <span className="text-xs mt-1 text-success-foreground opacity-70">
                {Math.round((dashboard.occupiedHouses / dashboard.totalHouses) * 100)}% of total
              </span>
            </div>
            
            <div className="flex flex-col p-4 rounded-lg bg-accent-muted">
              <span className="text-sm text-accent opacity-80">Vacant</span>
              <span className="text-2xl font-bold text-accent">{dashboard.vacantHouses}</span>
              <span className="text-xs mt-1 text-accent opacity-70">
                {Math.round((dashboard.vacantHouses / dashboard.totalHouses) * 100)}% of total
              </span>
            </div>
            
            <div className="flex flex-col p-4 rounded-lg bg-warning-muted">
              <span className="text-sm text-warning opacity-80">Maintenance</span>
              <span className="text-2xl font-bold text-warning">{dashboard.maintenanceHouses}</span>
              <span className="text-xs mt-1 text-warning opacity-70">
                {Math.round((dashboard.maintenanceHouses / dashboard.totalHouses) * 100)}% of total
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaretakerDashboard;
