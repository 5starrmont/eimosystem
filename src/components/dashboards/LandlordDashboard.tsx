
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Home, 
  Users, 
  CreditCard, 
  BarChart3,
  Droplets,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Bell
} from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import NotificationCard from "@/components/NotificationCard";
import { mockNotifications } from "@/utils/mockData";

interface LandlordDashboardProps {
  dashboard: any;
  isLoading: boolean;
  chartData: any[];
}

const LandlordDashboard = ({ dashboard, isLoading, chartData }: LandlordDashboardProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to EIMO Investments.</p>
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
                <span>{dashboard.occupiedHouses} Occupied</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboard.totalTenants}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+1 from previous month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Rent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {dashboard.pendingRent.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-danger flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+15% from last month</span>
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Water Bills</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {dashboard.pendingWaterBills.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>-5% from last month</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and Recent Activities */}
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
                colors={["#0496FF", "#10B981"]}
                valueFormatter={(value: number) => `KES ${value.toLocaleString()}`}
                customTooltip
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
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
            <Home className="h-5 w-5 mr-2" />
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

export default LandlordDashboard;
