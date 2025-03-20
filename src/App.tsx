
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  // Redirect to appropriate page based on user role
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/" />;
};

const App = () => (
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

export default App;
