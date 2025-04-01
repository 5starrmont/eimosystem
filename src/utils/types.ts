
export type UserRole = 'admin' | 'landlord' | 'tenant' | 'caretaker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface House {
  id: string;
  name: string;
  kplcMeterNumber: string;
  address: string;
  monthlyRent: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  tenantId?: string;
  landlordId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  userId: string;
  houseId: string;
  moveInDate: string;
  moveOutDate?: string;
  status: 'active' | 'moving_out' | 'moved_out';
  rentBalance: number;
  waterBillBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  amount: number;
  type: 'rent' | 'water' | 'combined' | 'other';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description?: string;
  receiptUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WaterBill {
  id: string;
  houseId: string;
  tenantId: string;
  amount: number;
  month: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reminder {
  id: string;
  type: 'combined_payment' | 'payment_late';
  dayOfMonth: number;
  messageTemplate: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Dashboard {
  totalHouses: number;
  occupiedHouses: number;
  vacantHouses: number;
  maintenanceHouses: number;
  totalTenants: number;
  pendingRent: number;
  pendingWaterBills: number;
  recentPayments: Payment[];
  recentNotifications: Notification[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
