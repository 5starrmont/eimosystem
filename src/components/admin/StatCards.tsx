
import { Building2, Users, Activity } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";

interface StatCardsProps {
  totalHouses: number;
  totalUsers: number;
  onViewAllUsers: () => void;
}

const StatCards = ({ totalHouses, totalUsers, onViewAllUsers }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        title="Total Properties"
        value={totalHouses}
        icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
        subtext={`${Math.round(totalHouses * 0.8)} Occupied`}
        className=""
      />
      
      <StatsCard
        title="System Users"
        value={totalUsers}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        subtext={
          <span className="flex items-center cursor-pointer text-primary" onClick={onViewAllUsers}>
            View all users
          </span>
        }
        className=""
      />
      
      <StatsCard
        title="System Activity"
        value="Normal"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        subtext="All systems operational"
        className=""
      />
    </div>
  );
};

export default StatCards;
