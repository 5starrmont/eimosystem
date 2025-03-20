
import { House } from "@/utils/types";
import { Home, MapPin, CreditCard } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface PropertyCardProps {
  property: House;
  onClick?: () => void;
}

const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const { name, kplcMeterNumber, address, monthlyRent, status } = property;
  
  return (
    <div 
      className="card hover:shadow-md transition-all duration-200 cursor-pointer animate-scale-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-eimo-900">{name}</h3>
        <StatusBadge status={status} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-eimo-600">
          <MapPin className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">{address}</span>
        </div>
        
        <div className="flex items-center text-eimo-600">
          <Home className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">KPLC Meter: {kplcMeterNumber}</span>
        </div>
        
        <div className="flex items-center text-eimo-600">
          <CreditCard className="h-4 w-4 mr-2 text-eimo-400" />
          <span className="text-sm">Monthly Rent: KES {monthlyRent.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
