
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TenantStatsCards from "@/components/dashboard/TenantStatsCards";
import TenantPaymentsSection from "@/components/dashboard/TenantPaymentsSection";
import TenantNotificationsSection from "@/components/dashboard/TenantNotificationsSection";
import TenantMaintenanceSection from "@/components/dashboard/TenantMaintenanceSection";
import { mockTenants, mockUsers, mockHouses, mockPayments } from "@/utils/mockData";
import { getUserEmail } from "@/services/authService";

// Mock function to fetch tenant dashboard data
const fetchTenantDashboardData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get the current tenant's email from localStorage
  const tenantEmail = getUserEmail();
  
  // Find the tenant based on email
  const tenantUser = mockUsers.find(user => user.email === tenantEmail);
  const tenant = mockTenants.find(t => t.userId === tenantUser?.id);
  const house = tenant ? mockHouses.find(h => h.id === tenant.houseId) : null;
  const payments = tenant 
    ? mockPayments.filter(p => p.tenantId === tenant.id)
    : [];
  
  // Calculate payment history stats
  const completedPayments = payments.filter(p => p.status === 'completed');
  const onTimePaymentsCount = completedPayments.length;
  
  return {
    tenant,
    house,
    payments,
    stats: {
      currentRent: house?.monthlyRent || 0,
      waterBillBalance: tenant?.waterBillBalance || 0,
      paymentsOnTime: onTimePaymentsCount,
      nextRentDue: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    }
  };
};

const TenantDashboard = () => {
  const { 
    data: dashboardData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['tenantDashboard'],
    queryFn: fetchTenantDashboardData,
  });

  if (error) {
    return (
      <div className="p-6 bg-destructive/10 rounded-lg">
        <h2 className="text-xl font-bold text-destructive">Error loading dashboard</h2>
        <p className="text-muted-foreground">Please try again later or contact support.</p>
      </div>
    );
  }

  // Get tenant's name to display in welcome message
  const tenantEmail = getUserEmail();
  const tenantUser = mockUsers.find(user => user.email === tenantEmail);
  const tenantName = tenantUser?.name || "Tenant";
  const houseName = dashboardData?.house?.name || "";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {tenantName}</h1>
          <p className="text-muted-foreground">
            {houseName ? `${houseName} Dashboard` : "Tenant Dashboard"}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm text-muted-foreground">
            Today's date: {format(new Date(), 'PPP')}
          </p>
        </div>
      </div>
      
      {/* Stats Cards for Tenant */}
      <TenantStatsCards 
        isLoading={isLoading} 
        stats={dashboardData?.stats}
      />
      
      {/* Recent Payments and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TenantPaymentsSection isLoading={isLoading} />
        <TenantNotificationsSection isLoading={isLoading} />
      </div>
      
      {/* Maintenance Requests */}
      <TenantMaintenanceSection />
    </div>
  );
};

export default TenantDashboard;
