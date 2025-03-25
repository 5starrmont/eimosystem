
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Droplets, Receipt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface TenantStats {
  currentRent: number;
  waterBillBalance: number;
  paymentsOnTime: number;
  nextRentDue: Date;
}

interface TenantStatsCardsProps {
  isLoading: boolean;
  stats?: TenantStats;
}

const TenantStatsCards = ({ isLoading, stats }: TenantStatsCardsProps) => {
  // Calculate days until rent is due
  const daysUntilRentDue = stats?.nextRentDue 
    ? Math.max(0, Math.ceil((stats.nextRentDue.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  
  // Determine rent status text and styling
  const getRentStatusText = () => {
    if (!stats?.nextRentDue) return "Due date unavailable";
    
    if (daysUntilRentDue === 0) {
      return "Due today";
    } else if (daysUntilRentDue === 1) {
      return "Due tomorrow";
    } else if (daysUntilRentDue <= 5) {
      return `Due in ${daysUntilRentDue} days`;
    } else {
      return `Due on ${format(stats.nextRentDue, 'MMM do')}`;
    }
  };

  // Determine water bill status text
  const getWaterBillStatusText = () => {
    if (!stats) return "Status unavailable";
    
    if (stats.waterBillBalance === 0) {
      return "Fully paid";
    } else {
      return daysUntilRentDue <= 5 
        ? `Due in ${daysUntilRentDue} days` 
        : `Due with next rent`;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Current Rent</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                KES {stats?.currentRent.toLocaleString() || "N/A"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className={`flex items-center ${daysUntilRentDue <= 2 ? 'text-warning' : 'text-success'}`}>
                  <span>{getRentStatusText()}</span>
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Water Bill</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                KES {stats?.waterBillBalance.toLocaleString() || "N/A"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className={`flex items-center ${stats?.waterBillBalance ? 'text-warning' : 'text-success'}`}>
                  <span>{getWaterBillStatusText()}</span>
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Payment History</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {stats?.paymentsOnTime || 0}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="flex items-center">
                  <span>{stats?.paymentsOnTime ? "All payments on time" : "No payment history"}</span>
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantStatsCards;
