
import { useEffect } from "react";
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
  User
} from "lucide-react";
import { currentUser } from "@/utils/mockData";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";

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

const SideNavContent = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="p-2">
          <h1 className="text-xl font-bold tracking-tight text-white">
            EIMO <span className="text-accent">INVESTMENTS</span>
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="pt-4">
        <SidebarMenu>
          {filteredLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === link.href}
                tooltip={link.title}
              >
                <NavLink to={link.href}>
                  {link.icon}
                  <span>{link.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
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
      </SidebarFooter>
    </Sidebar>
  );
};

const SideNav = ({ className }: SideNavProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <SideNavContent />
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <SidebarTrigger />
      </div>
    </SidebarProvider>
  );
};

export default SideNav;
