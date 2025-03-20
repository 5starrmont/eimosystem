
import { useState, useEffect } from "react";
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
  Menu,
  X,
  User
} from "lucide-react";
import { currentUser } from "@/utils/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

interface SideNavProps {
  className?: string;
}

const SideNav = ({ className }: SideNavProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  // Close the sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Update isOpen state when screen size changes
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
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
  
  const filteredLinks = navLinks.filter(link => 
    link.roles.includes(currentUser.role)
  );
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 right-4 z-50 bg-accent text-white p-2 rounded-md md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Sidebar Overlay - Mobile Only */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0 md:w-16",
          className
        )}
      >
        <div className="h-full flex flex-col overflow-hidden">
          {/* Logo */}
          <div className={cn(
            "h-16 flex items-center px-4",
            !isOpen && "md:justify-center"
          )}>
            {isOpen ? (
              <h1 className="text-xl font-bold tracking-tight text-white">
                EIMO <span className="text-accent">INVESTMENTS</span>
              </h1>
            ) : (
              <div className="hidden md:flex h-8 w-8 rounded-md bg-accent text-white items-center justify-center font-bold">
                E
              </div>
            )}
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {filteredLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                      !isOpen && "md:justify-center"
                    )}
                  >
                    <span className="flex-shrink-0">{link.icon}</span>
                    {isOpen && <span className="ml-3">{link.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile */}
          <div className={cn(
            "border-t border-sidebar-border p-4",
            !isOpen && "md:p-2"
          )}>
            <div className={cn(
              "flex items-center",
              !isOpen && "md:justify-center"
            )}>
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
              
              {isOpen && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate">{currentUser.name}</p>
                  <p className="text-xs text-sidebar-foreground/70 truncate capitalize">{currentUser.role}</p>
                </div>
              )}
            </div>
            
            {isOpen && (
              <button className="mt-4 flex items-center text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground w-full">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
