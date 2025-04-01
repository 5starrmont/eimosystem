
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function signIn({ email, password }: LoginCredentials) {
  try {
    console.log("Attempting to sign in with:", email);
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
