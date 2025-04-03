
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import LandlordPayments from "@/components/payments/LandlordPayments";
import TenantPayments from "@/components/payments/TenantPayments";

const Payments = () => {
  const [userRole, setUserRole] = useState<string>('landlord');
  
  // Read user role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
    
    // Listen for storage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'userRole' && event.newValue) {
        setUserRole(event.newValue);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        {userRole === 'tenant' ? (
          <TenantPayments />
        ) : (
          <LandlordPayments isAdmin={userRole === 'admin'} />
        )}
      </div>
    </Layout>
  );
};

export default Payments;
