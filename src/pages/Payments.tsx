
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import LandlordPayments from "@/components/payments/LandlordPayments";
import TenantPayments from "@/components/payments/TenantPayments";
import { useAuth } from "@/contexts/AuthContext";

const Payments = () => {
  const { userRole } = useAuth();
  
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
