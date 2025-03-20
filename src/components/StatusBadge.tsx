
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'outline';
  className?: string;
}

const StatusBadge = ({ status, variant = 'default', className }: StatusBadgeProps) => {
  // Define status configurations
  const statusConfig: Record<string, { label: string; className: string }> = {
    // House statuses
    occupied: { label: 'Occupied', className: 'badge-success' },
    vacant: { label: 'Vacant', className: 'badge-info' },
    maintenance: { label: 'Maintenance', className: 'badge-warning' },
    
    // Tenant statuses
    active: { label: 'Active', className: 'badge-success' },
    moving_out: { label: 'Moving Out', className: 'badge-warning' },
    moved_out: { label: 'Moved Out', className: 'badge-neutral' },
    
    // Payment statuses
    pending: { label: 'Pending', className: 'badge-warning' },
    completed: { label: 'Completed', className: 'badge-success' },
    failed: { label: 'Failed', className: 'badge-danger' },
    overdue: { label: 'Overdue', className: 'badge-danger' },
    paid: { label: 'Paid', className: 'badge-success' },
  };

  // Get configuration for current status or use default
  const config = statusConfig[status] || { label: status, className: 'badge-neutral' };
  
  return (
    <span 
      className={cn(
        config.className,
        variant === 'outline' && 'bg-transparent border border-current',
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
