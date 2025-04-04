
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LoginCredentials {
  email: string;
  password: string;
}

const DEMO_ACCOUNTS = [
  { email: 'landlord@eimoinvestments.com', role: 'landlord' },
  { email: 'caretaker@eimoinvestments.com', role: 'caretaker' },
  { email: 'tenant@eimoinvestments.com', role: 'tenant' },
  { email: 'admin@eimoinvestments.com', role: 'admin' }
];

export async function signIn({ email, password }: LoginCredentials) {
  try {
    console.log("Attempting to sign in with:", email);
    
    // Check if this is a demo account
    const isDemoAccount = DEMO_ACCOUNTS.some(account => account.email === email);
    
    if (isDemoAccount && password === 'password') {
      console.log("Using demo login for:", email);
      // For demo purposes, just extract role from email and set up mock session
      const role = DEMO_ACCOUNTS.find(account => account.email === email)?.role || 'tenant';
      
      // Store the role in localStorage
      localStorage.setItem('userRole', role);
      
      // Create mock user and session
      const mockUser = {
        id: `demo-${Date.now()}`,
        email: email,
        user_metadata: { role }
      };
      
      toast({
        title: "Demo Login successful",
        description: `Welcome to the ${role} dashboard!`,
      });
      
      return { 
        user: mockUser, 
        session: { user: mockUser }, 
        error: null 
      };
    }
    
    // If not a demo account or incorrect demo password, try actual Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { user: null, session: null, error };
    }

    if (data.user) {
      console.log("Login successful for:", data.user.email);
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
    console.error("Unexpected login error:", error);
    toast({
      title: "Login failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
    return { user: null, session: null, error };
  }
}

export async function signOut() {
  try {
    console.log("Attempting to sign out");
    
    // Check if this is a demo login by looking for userRole in localStorage
    const isDemo = localStorage.getItem('userRole') !== null;
    
    if (isDemo) {
      // For demo logins, just clear localStorage
      localStorage.removeItem('userRole');
      
      toast({
        title: "Signed out",
        description: "You have been signed out from the demo account",
      });
      
      return { error: null };
    }
    
    // For actual Supabase auth
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    console.log("Sign out successful");
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    
    return { error: null };
  } catch (error: any) {
    console.error("Unexpected sign out error:", error);
    toast({
      title: "Sign out failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
    return { error };
  }
}

export async function getUserRole() {
  try {
    console.log("Fetching user role");
    
    // First check localStorage for demo accounts
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      console.log("Found role in localStorage:", storedRole);
      return storedRole;
    }
    
    // If no stored role, check Supabase auth
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("No user found when getting role");
      return null;
    }
    
    console.log("User email for role check:", user.email);
    
    // For demo purposes - check if email contains role indicators
    // In a real app, you would query a profiles or roles table
    if (user.email?.includes('tenant')) {
      return 'tenant';
    } else if (user.email?.includes('caretaker')) {
      return 'caretaker';
    } else if (user.email?.includes('admin')) {
      return 'admin';
    } else {
      return 'landlord'; // Default role
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}
