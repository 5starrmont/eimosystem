
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import StatCards from "@/components/admin/StatCards";
import SystemAlerts from "@/components/admin/SystemAlerts";
import RecentActivities from "@/components/admin/RecentActivities";

interface AdminDashboardProps {
  dashboard: any;
  isLoading: boolean;
  chartData: any[];
}

const AdminDashboard = ({ dashboard, isLoading, chartData }: AdminDashboardProps) => {
  const navigate = useNavigate();
  
  const handleViewAllUsers = () => {
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
      <StatCards 
        totalHouses={dashboard.totalHouses} 
        totalUsers={dashboard.totalTenants + 5}
        totalRevenue={dashboard.pendingRent * 3}
        onViewAllUsers={handleViewAllUsers}
      />
      
      {/* System Alerts - Main Section */}
      <SystemAlerts isLoading={isLoading} />
      
      {/* Recent System Activities */}
      <RecentActivities isLoading={isLoading} />
    </div>
  );
};

export default AdminDashboard;
