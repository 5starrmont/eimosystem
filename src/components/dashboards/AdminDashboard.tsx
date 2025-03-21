
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  CreditCard,
  Shield,
  BarChart3,
  Settings,
  UserCog,
  Bell,
  Activity
} from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";

interface AdminDashboardProps {
  dashboard: any;
  isLoading: boolean;
  chartData: any[];
}

const AdminDashboard = ({ dashboard, isLoading, chartData }: AdminDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System administration for EIMO Investments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Today's date: {format(new Date(), 'PPP')}
          </p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.totalHouses}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center">
                <span>+2 added this month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.totalTenants + 5}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center">
                <span>Across all user roles</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {(dashboard.pendingRent * 3).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center">
                <span>+12% from last month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">Healthy</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="flex items-center">
                <span>All systems operational</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and Admin Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart
                data={chartData}
                index="name"
                categories={["rent", "water"]}
                colors={["#8B5CF6", "#10B981"]}
                valueFormatter={(value: number) => `KES ${value.toLocaleString()}`}
                customTooltip
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              System Alerts
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
                  <div className="flex items-start p-3 rounded-lg border border-purple-200 bg-purple-50">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">System Update Available</h4>
                      <p className="text-sm text-muted-foreground">New version 2.1.0 ready to install</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Update</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <UserCog className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">New User Registrations</h4>
                      <p className="text-sm text-muted-foreground">2 new user accounts pending approval</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Review</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 rounded-lg border">
                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <Settings className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Database Maintenance</h4>
                      <p className="text-sm text-muted-foreground">Scheduled for tonight at 2:00 AM</p>
                      <div className="mt-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">Automated</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent System Activities */}
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
              Array(4).fill(0).map((_, i) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockNotifications.slice(0, 4).map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onClick={() => console.log('Notification clicked:', notification.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
