
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Houses from "./pages/Houses";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import { currentUser } from "./utils/mockData";

// Create React Query client
const queryClient = new QueryClient();

// Role-based redirect
const RoleBasedRedirect = () => {
  // Get user role from localStorage or use default
  const userRole = localStorage.getItem('userRole') || 'landlord';
  
  // Update mock data for demo purposes
  if (userRole) {
    currentUser.role = userRole as any;
  }
  
  // Redirect to appropriate page based on user role
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/" />;
};

const App = () => {
  // Force re-render when localStorage changes
  const [, setForceUpdate] = useState({});
  
  useEffect(() => {
    // Update currentUser role from localStorage when component mounts
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      currentUser.role = storedRole as any;
    }
    
    // Listen for storage changes to update the UI
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userRole') {
        // Update currentUser.role when userRole changes in localStorage
        if (event.newValue) {
          currentUser.role = event.newValue as any;
        }
        setForceUpdate({});
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/notifications" element={<Dashboard />} /> {/* Redirect to dashboard for now */}
            <Route path="/settings" element={<Dashboard />} /> {/* Redirect to dashboard for now */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
