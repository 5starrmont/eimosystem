
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { format } from "date-fns";
import { mockDashboard, mockPayments } from "@/utils/mockData";
import { useAuth } from "@/contexts/AuthContext";

// Import our role-specific dashboard components
import LandlordDashboard from "@/components/dashboards/LandlordDashboard";
import CaretakerDashboard from "@/components/dashboards/CaretakerDashboard";
import TenantDashboard from "@/components/dashboards/TenantDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(mockDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole, isLoading: isAuthLoading } = useAuth();
  
  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
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

  // Show loading state while waiting for user role to be determined
  if (isAuthLoading) {
    return (
      <Layout>
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-32 mt-4 md:mt-0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      </Layout>
    );
  }

  // Render different dashboards based on user role
  switch (userRole) {
    case 'landlord':
      return (
        <Layout>
          <LandlordDashboard 
            dashboard={dashboard} 
            isLoading={isLoading} 
            chartData={chartData}
          />
        </Layout>
      );
    
    case 'caretaker':
      return (
        <Layout>
          <CaretakerDashboard 
            dashboard={dashboard} 
            isLoading={isLoading}
          />
        </Layout>
      );
    
    case 'tenant':
      return (
        <Layout>
          <TenantDashboard />
        </Layout>
      );
    
    case 'admin':
      return (
        <Layout>
          <AdminDashboard 
            dashboard={dashboard} 
            isLoading={isLoading} 
            chartData={chartData}
          />
        </Layout>
      );
    
    default:
      // Default loading state if role isn't recognized
      return (
        <Layout>
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700">Loading user information...</h2>
            <p className="text-muted-foreground">Please wait while we set up your dashboard.</p>
          </div>
        </Layout>
      );
  }
};

export default Dashboard;
