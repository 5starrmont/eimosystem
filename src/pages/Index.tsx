
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      
      // Just for demo
      if (email.includes('@eimoinvestments.com')) {
        toast({
          title: "Login successful",
          description: "Welcome back to EIMO Investments",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left Section - Hero Image/Background */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-accent to-accent-hover items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-64 w-64 rounded-full bg-white/20 top-10 -left-20 animate-float" />
          <div className="absolute h-48 w-48 rounded-full bg-white/20 bottom-40 right-10 animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute h-32 w-32 rounded-full bg-white/20 bottom-10 left-40 animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="z-10 text-white max-w-md animate-fade-in">
          <div className="flex items-center mb-6">
            <Building className="h-10 w-10 mr-3" />
            <h1 className="text-4xl font-bold">EIMO INVESTMENTS</h1>
          </div>
          <h2 className="text-2xl font-medium mb-4">Rental Management System</h2>
          <p className="text-lg opacity-90 mb-8">
            A modern, intuitive platform designed to streamline property management, 
            tenant communication, and payment tracking.
          </p>
          
          <div className="space-y-4">
            {['landlord@eimoinvestments.com', 'caretaker@eimoinvestments.com', 'admin@eimoinvestments.com'].map((account, index) => (
              <div key={index} className="flex items-center">
                <span className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <User className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">{account}</p>
                  <p className="text-sm opacity-80">Use with password: "password"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Section - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 md:p-12 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2 text-eimo-900">Welcome Back</h2>
            <p className="text-eimo-600">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-eimo-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-eimo-400">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-eimo-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-accent hover:text-accent-hover">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-eimo-400">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className={cn(
                "w-full bg-accent hover:bg-accent-hover text-white",
                isLoading && "opacity-80"
              )}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-eimo-600">
              © {new Date().getFullYear()} EIMO Investments. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
