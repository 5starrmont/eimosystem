
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 to-eimo-100 p-4">
      <div className="max-w-md w-full text-center">
        <div className="animate-float mb-6">
          <h1 className="text-8xl font-bold text-accent">404</h1>
        </div>
        <h2 className="text-2xl font-bold text-eimo-900 mb-4">Page Not Found</h2>
        <p className="text-eimo-600 mb-8">
          We couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="w-full sm:w-auto bg-accent text-white hover:bg-accent-hover"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
