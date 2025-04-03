
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AlertCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  colorClasses: {
    border: string;
    bg: string;
    iconBg: string;
    iconColor: string;
    buttonBg: string;
    buttonText: string;
    buttonHover: string;
  };
  onClick?: () => void;
}

const AlertCard = ({
  icon,
  title,
  description,
  buttonText,
  colorClasses,
  onClick,
}: AlertCardProps) => {
  return (
    <div className={`flex items-start p-4 rounded-lg border ${colorClasses.border} ${colorClasses.bg}`}>
      <div className={`flex-shrink-0 w-12 h-12 ${colorClasses.iconBg} rounded-full flex items-center justify-center mr-4`}>
        <div className={colorClasses.iconColor}>{icon}</div>
      </div>
      <div>
        <h4 className="font-medium text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            className={`${colorClasses.buttonBg} ${colorClasses.buttonText} hover:${colorClasses.buttonHover} ${colorClasses.border}`}
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
