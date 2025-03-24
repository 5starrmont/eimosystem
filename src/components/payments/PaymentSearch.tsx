
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PaymentSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const PaymentSearch = ({ searchTerm, onSearchChange }: PaymentSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search payments..."
        className="pl-9"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default PaymentSearch;
