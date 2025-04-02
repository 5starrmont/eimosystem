
import { Notification } from "@/utils/types";
import { formatDistanceToNow } from "date-fns";
import { Bell, Check, Info, AlertCircle, CheckCheck, Wrench, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationCard = ({ notification, onClick }: NotificationCardProps) => {
  const { title, message, type, read, createdAt, relatedType } = notification;
  
  // Format the time
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Define icon based on notification type and relatedType
  const getIcon = () => {
    if (relatedType === 'maintenance') {
      return <Wrench className="h-5 w-5 text-amber-500" />;
    }
    
    if (relatedType === 'payment') {
      return <CreditCard className="h-5 w-5 text-blue-500" />;
    }
    
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-danger" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-accent" />;
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-start p-4 rounded-lg transition-all duration-200 cursor-pointer",
        read ? "bg-white" : "bg-accent-muted",
        "hover:bg-eimo-50"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-4">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h4 className="text-base font-medium text-eimo-900">{title}</h4>
          {read && <CheckCheck className="h-4 w-4 text-eimo-400" />}
        </div>
        <p className="text-sm text-eimo-600 mt-1">{message}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-eimo-400">{timeAgo}</span>
          {relatedType && (
            <span className={cn(
              "px-2 py-1 text-xs rounded-full",
              relatedType === 'maintenance' ? "bg-amber-100 text-amber-700" :
              relatedType === 'payment' ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"
            )}>
              {relatedType.charAt(0).toUpperCase() + relatedType.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
