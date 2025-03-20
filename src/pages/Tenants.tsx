
import { useState } from "react";
import Layout from "@/components/Layout";
import TenantCard from "@/components/TenantCard";
import { mockTenants, mockUsers, mockHouses } from "@/utils/mockData";
import { Tenant, User } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, RotateCcw, XCircle, CheckCircle } from "lucide-react";
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

const Tenants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  
  // Helper to get user details from tenant
  const getUserFromTenant = (tenant: Tenant): User => {
    return mockUsers.find(user => user.id === tenant.userId) || mockUsers[2]; // Default to first tenant if not found
  };
  
  // Helper to get house name from tenant
  const getHouseFromTenant = (tenant: Tenant): string => {
    const house = mockHouses.find(house => house.id === tenant.houseId);
    return house ? house.name : 'Unknown Property';
  };
  
  // Handle search
  const filteredTenants = tenants.filter(tenant => {
    const user = getUserFromTenant(tenant);
    const houseName = getHouseFromTenant(tenant);
    
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm) ||
      houseName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Handle tenant selection
  const handleTenantClick = (tenant: Tenant) => {
    console.log("Selected tenant:", tenant);
    // Would normally navigate to tenant details or open a modal
  };
  
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Tenants</h1>
            <p className="text-muted-foreground">Manage your tenants and leases.</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-accent text-white hover:bg-accent-hover">
                <Plus className="h-4 w-4 mr-2" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Tenant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="fullName" placeholder="Tenant's Full Name" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="tenant@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input id="phone" placeholder="+254712345678" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="property" className="text-sm font-medium">
                      Assign Property
                    </label>
                    <select 
                      id="property" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select a property</option>
                      {mockHouses
                        .filter(house => house.status === 'vacant')
                        .map(house => (
                          <option key={house.id} value={house.id}>
                            {house.name} - {house.address}
                          </option>
                        ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="moveInDate" className="text-sm font-medium">
                        Move-in Date
                      </label>
                      <Input id="moveInDate" type="date" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="initialRent" className="text-sm font-medium">
                        Initial Rent (KES)
                      </label>
                      <Input id="initialRent" type="number" min="0" placeholder="e.g. 25000" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button className="bg-accent text-white hover:bg-accent-hover">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Tenant
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
              placeholder="Search tenants..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                {statusFilter === "all" ? "All Tenants" : 
                  statusFilter === "active" ? "Active" :
                  statusFilter === "moving_out" ? "Moving Out" : "Moved Out"
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <DropdownMenuRadioItem value="all">All Tenants</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="moving_out">Moving Out</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="moved_out">Moved Out</DropdownMenuRadioItem>
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
        
        {/* Tenants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => (
              <TenantCard
                key={tenant.id}
                tenant={tenant}
                user={getUserFromTenant(tenant)}
                houseName={getHouseFromTenant(tenant)}
                onClick={() => handleTenantClick(tenant)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No tenants found</h3>
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

export default Tenants;
