
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";
import { mockPayments } from "@/utils/mockData";

interface TenantPaymentsSectionProps {
  isLoading: boolean;
}

const TenantPaymentsSection = ({ isLoading }: TenantPaymentsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Payment Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton Loader
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex items-start p-4 rounded-lg">
                <div className="h-5 w-5 rounded-full bg-eimo-200 mr-4"></div>
                <div className="flex-grow">
                  <div className="h-4 bg-eimo-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-eimo-200 rounded w-full mb-2"></div>
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-4">
              {mockPayments.slice(0, 4).map((payment, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg border">
                  <div className={`flex-shrink-0 w-10 h-10 ${
                    payment.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                  } rounded-full flex items-center justify-center mr-3`}>
                    {payment.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium capitalize">
                      {payment.type} Payment
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(payment.date), 'PPP')}
                    </p>
                    <div className="mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {payment.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantPaymentsSection;
