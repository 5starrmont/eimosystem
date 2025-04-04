
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TenantStatsCards from "@/components/dashboard/TenantStatsCards";
import TenantPaymentsSection from "@/components/dashboard/TenantPaymentsSection";
import TenantNotificationsSection from "@/components/dashboard/TenantNotificationsSection";
import TenantMaintenanceSection from "@/components/dashboard/TenantMaintenanceSection";
import { mockPayments } from "@/utils/mockData";
import { getUserEmail } from "@/services/authService";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Fetch tenant dashboard data from Supabase instead of mock data
const fetchTenantDashboardData = async () => {
  try {
    // Get the current tenant's email from localStorage
    const tenantEmail = getUserEmail();
    if (!tenantEmail) {
      throw new Error("User email not found");
    }
    
    // First get the user data
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, full_name, email")
      .eq("email", tenantEmail)
      .single();
    
    if (userError) throw userError;
    if (!userData) throw new Error("User not found");
    
    // Then get the tenant data
    const { data: tenantData, error: tenantError } = await supabase
      .from("tenants")
      .select(`
        id, 
        status, 
        move_in_date,
        house_id
      `)
      .eq("user_id", userData.id)
      .single();
    
    if (tenantError) throw tenantError;
    if (!tenantData) throw new Error("Tenant record not found");
    
    // Get house data
    const { data: houseData, error: houseError } = await supabase
      .from("houses")
      .select("id, house_number, rent_amount, status")
      .eq("id", tenantData.house_id)
      .single();
    
    if (houseError) throw houseError;
    if (!houseData) throw new Error("House not found");
    
    // Get payments data
    const { data: paymentsData, error: paymentsError } = await supabase
      .from("payments")
      .select("*")
      .eq("tenant_id", tenantData.id)
      .order("payment_date", { ascending: false });
    
    if (paymentsError) throw paymentsError;
    
    // Calculate payment history stats
    const completedPayments = paymentsData ? 
      paymentsData.filter(p => p.status === 'completed') : [];
    const onTimePaymentsCount = completedPayments.length;
    
    // For now, use mock payments until we have actual payment data
    const payments = paymentsData && paymentsData.length > 0 ? 
      paymentsData : mockPayments.slice(0, 3);
    
    // Calculate water bill balance (pending implementation)
    // For now use a mock value
    const waterBillBalance = 500;
    
    return {
      user: userData,
      tenant: tenantData,
      house: {
        ...houseData,
        name: `House ${houseData.house_number}` // Create a display name from house number
      },
      payments,
      stats: {
        currentRent: houseData.rent_amount || 0,
        waterBillBalance: waterBillBalance,
        paymentsOnTime: onTimePaymentsCount,
        nextRentDue: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
      }
    };
  } catch (error: any) {
    console.error("Error fetching tenant dashboard data:", error);
    toast({
      title: "Error loading dashboard",
      description: error.message || "Failed to load dashboard data",
      variant: "destructive",
    });
    throw error;
  }
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

  // Extract tenant's name and house information
  const tenantName = dashboardData?.user?.full_name || "Tenant";
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
