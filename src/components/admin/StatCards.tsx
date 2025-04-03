
import { Building2, Users, CreditCard, Shield, ArrowRight } from "lucide-react";
import StatsCard from "./StatsCard";
import { Button } from "@/components/ui/button";

interface StatCardsProps {
  totalHouses: number;
  totalUsers: number;
  totalRevenue: number;
  onViewAllUsers: () => void;
}

const StatCards = ({
  totalHouses,
  totalUsers,
  totalRevenue,
  onViewAllUsers,
}: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Properties"
        value={totalHouses}
        icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
        subtext={
          <span className="text-success flex items-center">
            <span>+2 added this month</span>
          </span>
        }
      />

      <StatsCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        subtext={
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              Across all user roles
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-xs font-medium"
              onClick={onViewAllUsers}
            >
              View all
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        }
      />

      <StatsCard
        title="Total Revenue"
        value={`KES ${totalRevenue.toLocaleString()}`}
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        subtext={
          <span className="text-success flex items-center">
            <span>+12% from last month</span>
          </span>
        }
      />

      <StatsCard
        title="System Status"
        value="Healthy"
        icon={<Shield className="h-4 w-4 text-purple-500" />}
        className="bg-purple-50"
        subtext={
          <span className="flex items-center">
            <span>All systems operational</span>
          </span>
        }
      />
    </div>
  );
};

export default StatCards;
