
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getUserRole, getUserEmail } from "@/services/authService";
import { mockUsers } from "@/utils/mockData";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  userEmail: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  userRole: null,
  userEmail: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle demo login first
    const storedRole = localStorage.getItem('userRole');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (storedRole) {
      // Mock data for demo login
      const mockUser = {
        id: `demo-user-${Date.now()}`,
        email: storedEmail || `${storedRole}@eimoinvestments.com`,
        role: storedRole
      } as any;
      
      setSession({ user: mockUser } as any);
      setUser(mockUser);
      setUserRole(storedRole);
      setUserEmail(storedEmail);
      setIsLoading(false);
      return;
    }
    
    // Set up auth state listener for real authentication
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid Supabase deadlock
          setTimeout(async () => {
            try {
              const role = await getUserRole();
              console.log("User role from service:", role);
              setUserRole(role);
              
              // Update localStorage role for compatibility
              if (role) {
                localStorage.setItem('userRole', role);
              }
            } catch (error) {
              console.error("Error getting user role:", error);
            }
          }, 0);
        } else {
          setUserRole(null);
          localStorage.removeItem('userRole');
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session:", currentSession ? "exists" : "none");
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          try {
            const role = await getUserRole();
            console.log("Initial user role:", role);
            setUserRole(role);
            
            // Update localStorage role for compatibility
            if (role) {
              localStorage.setItem('userRole', role);
            }
          } catch (error) {
            console.error("Error getting initial user role:", error);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        userEmail,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
