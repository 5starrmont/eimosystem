
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  CreditCard,
  Shield,
  Settings,
  UserCog,
  Bell,
  Activity,
  ArrowRight
} from "lucide-react";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  dashboard: any;
  isLoading: boolean;
  chartData: any[];
}

const AdminDashboard = ({ dashboard, isLoading, chartData }: AdminDashboardProps) => {
  const navigate = useNavigate();
  
  const handleViewAllUsers = () => {
    // Navigate to a users page (you might need to create this)
    navigate('/users');
  };

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
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                Across all user roles
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center text-xs font-medium"
                onClick={handleViewAllUsers}
              >
                View all
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
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
      
      {/* System Alerts - Now the Main Section */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start p-4 rounded-lg border border-purple-200 bg-purple-50">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">System Update Available</h4>
                    <p className="text-sm text-muted-foreground mt-1">New version 2.1.0 is ready to install with improved security features and bug fixes.</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200">
                        Install Update
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-blue-200 bg-blue-50">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <UserCog className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">New User Registrations</h4>
                    <p className="text-sm text-muted-foreground mt-1">2 new user accounts are pending approval. Review their details and grant access.</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                        Review Users
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-orange-200 bg-orange-50">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <Settings className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">Database Maintenance</h4>
                    <p className="text-sm text-muted-foreground mt-1">Scheduled maintenance for tonight at 2:00 AM. System performance may be affected during this time.</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
                        View Schedule
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start p-4 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">System Performance</h4>
                    <p className="text-sm text-muted-foreground mt-1">All systems are operating at optimal performance. Current uptime: 24 days.</p>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
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
