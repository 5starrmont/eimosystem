
import { format } from "date-fns";
import TenantStatsCards from "@/components/dashboard/TenantStatsCards";
import TenantPaymentsSection from "@/components/dashboard/TenantPaymentsSection";
import TenantNotificationsSection from "@/components/dashboard/TenantNotificationsSection";
import TenantMaintenanceSection from "@/components/dashboard/TenantMaintenanceSection";
import { getUserEmail } from "@/services/authService";

const TenantDashboard = () => {
  const tenantEmail = getUserEmail();
  const tenantName = tenantEmail?.split('@')[0] || "Tenant";
  const isLoading = false;

  const stats = {
    currentRent: 15000,
    waterBillBalance: 500,
    paymentsOnTime: 5,
    nextRentDue: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {tenantName}</h1>
          <p className="text-muted-foreground">Tenant Dashboard</p>
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
        stats={stats}
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
