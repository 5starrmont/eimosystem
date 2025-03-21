
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
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
  Bell,
  Receipt,
  ClipboardList,
  Wrench
} from "lucide-react";
import { mockDashboard, mockPayments, mockHouses, mockTenants, mockNotifications, currentUser } from "@/utils/mockData";
import NotificationCard from "@/components/NotificationCard";
import { BarChart } from "@/components/charts/BarChart";
import { format } from "date-fns";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(mockDashboard);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate simple stats
  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
    
  const pendingRevenue = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  // Generate chart data from mock payments
  const paymentsByMonth: Record<string, { rent: number; water: number }> = {};
  
  // Initialize last 6 months
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthKey = format(d, 'MMM');
    paymentsByMonth[monthKey] = { rent: 0, water: 0 };
  }
  
  // Fill in data
  mockPayments.forEach(payment => {
    if (payment.status === 'completed') {
      const month = format(new Date(payment.date), 'MMM');
      if (paymentsByMonth[month]) {
        if (payment.type === 'rent') {
          paymentsByMonth[month].rent += payment.amount;
        } else if (payment.type === 'water') {
          paymentsByMonth[month].water += payment.amount;
        }
      }
    }
  });
  
  const chartData = Object.entries(paymentsByMonth).map(([month, data]) => ({
    name: month,
    rent: data.rent,
    water: data.water,
  }));

  // Render different dashboards based on user role
  if (currentUser.role === 'landlord') {
    return <LandlordDashboard 
      dashboard={dashboard} 
      isLoading={isLoading} 
      chartData={chartData}
    />;
  } else if (currentUser.role === 'caretaker') {
    return <CaretakerDashboard 
      dashboard={dashboard} 
      isLoading={isLoading}
    />;
  } else if (currentUser.role === 'tenant') {
    return <TenantDashboard 
      dashboard={dashboard} 
      isLoading={isLoading}
    />;
  }
  
  // Default case (admin)
  return <LandlordDashboard 
    dashboard={dashboard} 
    isLoading={isLoading} 
    chartData={chartData}
  />;
};

// Landlord Dashboard component
const LandlordDashboard = ({ 
  dashboard, 
  isLoading, 
  chartData 
}: { 
  dashboard: any; 
  isLoading: boolean;
  chartData: any[];
}) => {
  return (
    <Layout>
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
    </Layout>
  );
};

// Caretaker Dashboard component
const CaretakerDashboard = ({ 
  dashboard, 
  isLoading 
}: { 
  dashboard: any; 
  isLoading: boolean;
}) => {
  return (
    <Layout>
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
    </Layout>
  );
};

// Tenant Dashboard component 
const TenantDashboard = ({ 
  dashboard, 
  isLoading 
}: { 
  dashboard: any; 
  isLoading: boolean;
}) => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your tenant portal</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Today's date: {format(new Date(), 'PPP')}
            </p>
          </div>
        </div>
        
        {/* Stats Cards for Tenant */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 25,000</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-success flex items-center">
                  <span>Due on 1st of each month</span>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Water Bill</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KES 1,200</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-warning flex items-center">
                  <span>Due in 5 days</span>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Payment History</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="flex items-center">
                  <span>All payments on time</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Payments and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Recent Payments
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
                    {mockPayments.slice(0, 4).map((payment, index) => (
                      <div key={index} className="flex items-start p-3 rounded-lg border">
                        <div className={`flex-shrink-0 w-10 h-10 ${
                          payment.type === 'rent' ? 'bg-blue-100' : 'bg-green-100'
                        } rounded-full flex items-center justify-center mr-3`}>
                          {payment.type === 'rent' ? (
                            <Home className={`h-5 w-5 ${payment.type === 'rent' ? 'text-blue-500' : 'text-green-500'}`} />
                          ) : (
                            <Droplets className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{payment.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            KES {payment.amount.toLocaleString()} • {format(new Date(payment.date), 'PPP')}
                          </p>
                          <div className="mt-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              payment.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {payment.status === 'completed' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
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
        </div>
        
        {/* Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="h-5 w-5 mr-2" />
              Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 rounded-lg border">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                  <Wrench className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Bathroom Sink Leaking</h4>
                  <p className="text-sm text-muted-foreground">Reported on June 10, 2023</p>
                  <div className="mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">In Progress</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg border">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Wrench className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Light Bulb Replacement</h4>
                  <p className="text-sm text-muted-foreground">Reported on May 15, 2023</p>
                  <div className="mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
