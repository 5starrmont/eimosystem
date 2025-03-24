
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Droplets, Receipt } from "lucide-react";

const TenantStatsCards = () => {
  return (
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
  );
};

export default TenantStatsCards;
