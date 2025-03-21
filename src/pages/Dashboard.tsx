
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { format } from "date-fns";
import { mockDashboard, mockPayments, currentUser } from "@/utils/mockData";

// Import our role-specific dashboard components
import LandlordDashboard from "@/components/dashboards/LandlordDashboard";
import CaretakerDashboard from "@/components/dashboards/CaretakerDashboard";
import TenantDashboard from "@/components/dashboards/TenantDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(mockDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(currentUser.role);
  
  useEffect(() => {
    // Get role from localStorage and update state
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole as any);
      // Update currentUser.role for consistency
      currentUser.role = storedRole as any;
    }
    
    // Simulate loading
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

  // Render different dashboards based on user role (using state instead of directly from currentUser)
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
          <TenantDashboard 
            dashboard={dashboard} 
            isLoading={isLoading}
          />
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
      // Default to landlord dashboard if role is not recognized
      return (
        <Layout>
          <LandlordDashboard 
            dashboard={dashboard} 
            isLoading={isLoading} 
            chartData={chartData}
          />
        </Layout>
      );
  }
};

export default Dashboard;
