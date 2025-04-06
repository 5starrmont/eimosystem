
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LoginCredentials {
  email: string;
  password: string;
}

// Demo accounts for quick access
const DEMO_ACCOUNTS = [
  { email: 'landlord@eimoinvestments.com', role: 'landlord' },
  { email: 'caretaker@eimoinvestments.com', role: 'caretaker' },
  { email: 'admin@eimoinvestments.com', role: 'admin' }
];

export async function signIn({ email, password }: LoginCredentials) {
  try {
    console.log("Attempting to sign in with:", email);
    
    // Check if this is a demo account
    const isDemoAccount = DEMO_ACCOUNTS.some(account => account.email === email);
    
    if (isDemoAccount && password === 'password') {
      console.log("Using demo login for:", email);
      // For demo purposes, extract role from email and set up mock session
      const role = DEMO_ACCOUNTS.find(account => account.email === email)?.role || 'tenant';
      
      // Store the role in localStorage
      localStorage.setItem('userRole', role);
      
      // Store the email to identify specific tenant
      localStorage.setItem('userEmail', email);
      
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
    
    // If not a demo account - check the database for actual tenant users
    // First check if the email exists in our users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, role, full_name")
      .eq("email", email)
      .single();
      
    if (userData) {
      console.log("Found user in database:", userData);
      
      // For simplicity in this demo app, we'll use a fixed password "tenant123" for all tenant accounts
      if (password === "tenant123") {
        // Store role and email in localStorage
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userEmail', userData.email);
        
        // Create user session
        const user = {
          id: userData.id,
          email: userData.email,
          user_metadata: { 
            role: userData.role,
            full_name: userData.full_name
          }
        };
        
        toast({
          title: "Login successful",
          description: `Welcome to your ${userData.role} dashboard!`,
        });
        
        return {
          user,
          session: { user },
          error: null
        };
      } else {
        toast({
          title: "Login failed",
          description: "Incorrect password for tenant account. Use 'tenant123'",
          variant: "destructive",
        });
        return { 
          user: null, 
          session: null, 
          error: { message: "Invalid password" } 
        };
      }
    }
    
    // If still not found, try actual Supabase auth
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
    
    // First clear all authentication data from localStorage
    console.log("Clearing localStorage auth data");
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Then sign out from Supabase
    console.log("Calling Supabase signOut");
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
    
    // Force reload to ensure all auth state is reset
    window.location.href = '/';
    
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
    
    // First check localStorage for demo accounts and tenant accounts
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
    
    // Check in our users table
    if (user.email) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single();
        
      if (!userError && userData) {
        return userData.role;
      }
    }
    
    // Fallback check based on email patterns
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

// Get tenant's email
export function getUserEmail() {
  return localStorage.getItem('userEmail') || null;
}
