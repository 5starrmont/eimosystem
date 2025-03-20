
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SideNav from "./SideNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-full flex">
      <SideNav />
      
      <main 
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out overflow-auto",
          isMobile ? "ml-0" : "ml-16 md:ml-16",
          className
        )}
      >
        <div className="container p-4 md:p-8 mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
