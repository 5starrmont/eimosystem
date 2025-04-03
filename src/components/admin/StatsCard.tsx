
import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtext?: ReactNode;
  className?: string;
}

const StatsCard = ({ title, value, icon, subtext, className = "" }: StatsCardProps) => {
  return (
    <Card className={`transition-all hover:shadow-md ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtext && (
          <div className="text-xs text-muted-foreground mt-1">
            {subtext}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
