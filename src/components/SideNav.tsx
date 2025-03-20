
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  HomeIcon, 
  Users, 
  Building2, 
  CreditCard, 
  Bell, 
  Settings, 
  LogOut,
  User,
  Menu
} from "lucide-react";
import { currentUser } from "@/utils/mockData";
import { useState } from "react";

interface SideNavProps {
  className?: string;
}

// Sidebar navigation links based on user role
const navLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    roles: ["admin", "landlord", "caretaker", "tenant"],
  },
  {
    title: "Properties",
    href: "/houses",
    icon: <Building2 className="h-5 w-5" />,
    roles: ["admin", "landlord", "caretaker"],
  },
  {
    title: "Tenants",
    href: "/tenants",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin", "landlord", "caretaker"],
  },
  {
    title: "Payments",
    href: "/payments",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["admin", "landlord", "tenant"],
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: <Bell className="h-5 w-5" />,
    roles: ["admin", "landlord", "caretaker", "tenant"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin", "landlord"],
  },
];

// Filter links based on user role
const filteredLinks = navLinks.filter(link => 
  link.roles.includes(currentUser.role)
);

const SideNav = ({ className }: SideNavProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </button>
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground w-64 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:static md:z-0",
        className
      )}>
        {/* Header */}
        <div className="border-b border-sidebar-border p-4">
          <h1 className="text-xl font-bold tracking-tight text-white">
            EIMO <span className="text-accent">INVESTMENTS</span>
          </h1>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto pt-4">
          <nav className="flex flex-col gap-1 px-2">
            {filteredLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                {link.icon}
                <span>{link.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Footer with user info */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
              <User className="h-4 w-4" />
            </div>
            
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate capitalize">{currentUser.role}</p>
            </div>
          </div>
          
          <button className="mt-4 flex items-center text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground w-full">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile - closes sidebar when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideNav;
