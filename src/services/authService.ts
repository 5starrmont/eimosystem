
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function signIn({ email, password }: LoginCredentials) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { user: null, session: null, error };
    }

    if (data.user) {
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
    }

    return { user: data.user, session: data.session, error: null };
  } catch (error: any) {
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    
    return { error: null };
  } catch (error: any) {
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
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    // For demo purposes - check if email contains role indicators
    // In a real app, you would query a profiles or roles table
    if (user.email?.startsWith('tenant')) {
      return 'tenant';
    } else if (user.email?.startsWith('caretaker')) {
      return 'caretaker';
    } else if (user.email?.startsWith('admin')) {
      return 'admin';
    } else {
      return 'landlord'; // Default role
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}
