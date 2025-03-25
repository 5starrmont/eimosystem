
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { getUserRole } from "@/services/authService";

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  userRole: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          const role = await getUserRole();
          setUserRole(role);
          
          // Update localStorage role for compatibility with existing code
          if (role) {
            localStorage.setItem('userRole', role);
          }
        } else {
          setUserRole(null);
          localStorage.removeItem('userRole');
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const role = await getUserRole();
        setUserRole(role);
        
        // Update localStorage role for compatibility with existing code
        if (role) {
          localStorage.setItem('userRole', role);
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userRole,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
