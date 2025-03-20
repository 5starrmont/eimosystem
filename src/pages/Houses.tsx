
import { useState } from "react";
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import { mockHouses } from "@/utils/mockData";
import { House } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Houses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [houses, setHouses] = useState<House[]>(mockHouses);
  
  // Handle search
  const filteredHouses = houses.filter(house => {
    const matchesSearch = 
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.kplcMeterNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || house.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle property selection
  const handlePropertyClick = (property: House) => {
    console.log("Selected property:", property);
    // Would normally navigate to property details or open a modal
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">Manage your rental properties.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent-hover">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Property Name
                    </label>
                    <Input id="name" placeholder="e.g. Apartment 101" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">
                      Address
                    </label>
                    <Input id="address" placeholder="Full property address" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="kplcMeter" className="text-sm font-medium">
                        KPLC Meter Number
                      </label>
                      <Input id="kplcMeter" placeholder="e.g. KP12345678" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="rent" className="text-sm font-medium">
                        Monthly Rent (KES)
                      </label>
                      <Input 
                        id="rent" 
                        type="number" 
                        min="0" 
                        placeholder="e.g. 25000" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-accent text-white hover:bg-accent-hover">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Property
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                {statusFilter === "all" ? "All Properties" : 
                  statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <DropdownMenuRadioItem value="all">All Properties</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="occupied">Occupied</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="vacant">Vacant</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="maintenance">Maintenance</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.length > 0 ? (
            filteredHouses.map((property) => (
              <PropertyCard 
                key={property.id}
                property={property}
                onClick={() => handlePropertyClick(property)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No properties found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Houses;
