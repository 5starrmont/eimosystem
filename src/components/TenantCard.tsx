
import { Tenant, User } from "@/utils/types";
import { User as UserIcon, Phone, Mail, Home, CalendarDays } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { format } from "date-fns";

interface TenantCardProps {
  tenant: Tenant;
  user: User;
  houseName: string;
  onClick?: () => void;
}

const TenantCard = ({ tenant, user, houseName, onClick }: TenantCardProps) => {
  const { moveInDate, status, rentBalance, waterBillBalance } = tenant;
  const { name, email, phoneNumber } = user;
  
  return (
    <div 
      className="card hover:shadow-md transition-all duration-200 cursor-pointer animate-scale-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-eimo-100 flex items-center justify-center text-eimo-700 mr-3">
            <UserIcon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold text-eimo-900">{name}</h3>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-eimo-600">
          <Phone className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">{phoneNumber}</span>
        </div>
        
        <div className="flex items-center text-eimo-600">
          <Mail className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">{email}</span>
        </div>
        
        <div className="flex items-center text-eimo-600">
          <Home className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">{houseName}</span>
        </div>
        
        <div className="flex items-center text-eimo-600">
          <CalendarDays className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">Since: {format(new Date(moveInDate), 'dd MMM yyyy')}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 border-t pt-3">
        <div className="text-center">
          <div className="text-xs text-eimo-500 mb-1">Rent Balance</div>
          <div className={`font-semibold ${rentBalance > 0 ? 'text-danger' : 'text-success'}`}>
            KES {rentBalance.toLocaleString()}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-eimo-500 mb-1">Water Bill Balance</div>
          <div className={`font-semibold ${waterBillBalance > 0 ? 'text-danger' : 'text-success'}`}>
            KES {waterBillBalance.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
