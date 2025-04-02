import { User, House, Tenant, Payment, WaterBill, Reminder, Notification, MaintenanceRequest } from './types';

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Landlord",
    email: "john.landlord@example.com",
    role: "landlord",
    phoneNumber: "123-456-7890",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    name: "Alice Caretaker",
    email: "alice.caretaker@example.com",
    role: "caretaker",
    phoneNumber: "987-654-3210",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "3",
    name: "Bob Tenant",
    email: "bob.tenant@example.com",
    role: "tenant",
    phoneNumber: "555-123-4567",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phoneNumber: "111-222-3333",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock current user
export const currentUser = mockUsers[0];

// Mock house data
export const mockHouses: House[] = [
  {
    id: "1",
    name: "House A",
    kplcMeterNumber: "KPLC001",
    address: "123 Main St",
    monthlyRent: 50000,
    status: "occupied",
    tenantId: "3",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    name: "House B",
    kplcMeterNumber: "KPLC002",
    address: "456 Elm St",
    monthlyRent: 60000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "3",
    name: "House C",
    kplcMeterNumber: "KPLC003",
    address: "789 Oak St",
    monthlyRent: 70000,
    status: "maintenance",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock tenant data
export const mockTenants: Tenant[] = [
  {
    id: "1",
    userId: "3",
    houseId: "1",
    moveInDate: "2023-01-01T08:00:00Z",
    status: "active",
    rentBalance: 10000,
    waterBillBalance: 1000,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock payment data
export const mockPayments: Payment[] = [
  {
    id: "1",
    tenantId: "1",
    amount: 51000,
    type: "combined",
    status: "completed",
    date: "2023-01-05T08:00:00Z",
    description: "Rent and water bill payment",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    tenantId: "1",
    amount: 50000,
    type: "rent",
    status: "completed",
    date: "2023-02-05T08:00:00Z",
    description: "Rent payment",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "3",
    tenantId: "1",
    amount: 1000,
    type: "water",
    status: "completed",
    date: "2023-02-05T08:00:00Z",
    description: "Water bill payment",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "4",
    tenantId: "1",
    amount: 50000,
    type: "rent",
    status: "pending",
    date: "2023-03-05T08:00:00Z",
    description: "Rent payment",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock water bill data
export const mockWaterBills: WaterBill[] = [
  {
    id: "1",
    houseId: "1",
    tenantId: "1",
    amount: 1000,
    month: "January",
    status: "paid",
    dueDate: "2023-01-05T08:00:00Z",
    paymentId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    houseId: "1",
    tenantId: "1",
    amount: 1000,
    month: "February",
    status: "paid",
    dueDate: "2023-02-05T08:00:00Z",
    paymentId: "3",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "3",
    houseId: "1",
    tenantId: "1",
    amount: 1000,
    month: "March",
    status: "pending",
    dueDate: "2023-03-05T08:00:00Z",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Update the reminders data to use the correct types
export const mockReminders = [
  {
    id: "1",
    type: "combined_payment",
    dayOfMonth: 5,
    messageTemplate: "Your rent and water bill payment of KES {{amount}} is due on the 5th of this month. Please make payment to avoid penalties.",
    enabled: true,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    type: "payment_late",
    dayOfMonth: 10,
    messageTemplate: "Your rent and water bill payment of KES {{amount}} is now late. A penalty of 10% will be applied if payment is not made within 5 days.",
    enabled: true,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock notification data
export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    title: "New Tenant Added",
    message: "A new tenant has been added to House A.",
    type: "info",
    read: false,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "2",
    userId: "1",
    title: "Rent Payment Received",
    message: "Rent payment of KES 50000 received from Bob Tenant.",
    type: "success",
    read: true,
    createdAt: "2023-01-05T08:00:00Z",
    updatedAt: "2023-01-05T08:00:00Z"
  },
  {
    id: "3",
    userId: "2",
    title: "Maintenance Request",
    message: "A new maintenance request has been created for House C.",
    type: "warning",
    read: false,
    createdAt: "2023-01-10T08:00:00Z",
    updatedAt: "2023-01-10T08:00:00Z"
  },
  {
    id: "4",
    userId: "3",
    title: "Rent Due Soon",
    message: "Your rent payment of KES 50000 is due on March 5th.",
    type: "info",
    read: false,
    createdAt: "2023-03-01T08:00:00Z",
    updatedAt: "2023-03-01T08:00:00Z"
  },
  {
    id: "5",
    userId: "1",
    title: "Water Bill Overdue",
    message: "Water bill payment of KES 1000 is overdue for House A.",
    type: "error",
    read: false,
    createdAt: "2023-03-06T08:00:00Z",
    updatedAt: "2023-03-06T08:00:00Z"
  },
  {
    id: "6",
    userId: "4",
    title: "System Update",
    message: "The system has been updated to the latest version.",
    type: "success",
    read: true,
    createdAt: "2023-03-07T08:00:00Z",
    updatedAt: "2023-03-07T08:00:00Z"
  },
  
  // Add maintenance request notifications for caretakers
  {
    id: "7",
    userId: "2", // caretaker ID
    title: "New Maintenance Request",
    message: "Urgent maintenance request: Electrical short circuit in living room for House #3",
    type: "error",
    read: false,
    createdAt: "2025-03-28T08:45:00Z",
    updatedAt: "2025-03-28T08:45:00Z",
    relatedTo: "3", // maintenance request ID
    relatedType: "maintenance"
  },
  {
    id: "8",
    userId: "2", // caretaker ID
    title: "Maintenance Request Update",
    message: "Maintenance request for Broken bathroom door lock is now in progress",
    type: "info",
    read: true,
    createdAt: "2025-03-22T11:20:00Z",
    updatedAt: "2025-03-22T11:20:00Z",
    relatedTo: "2", // maintenance request ID
    relatedType: "maintenance"
  },
  {
    id: "9",
    userId: "2", // caretaker ID
    title: "New Maintenance Request",
    message: "Maintenance request: Leaking kitchen faucet for House #1",
    type: "warning",
    read: false,
    createdAt: "2025-03-25T14:30:00Z",
    updatedAt: "2025-03-25T14:30:00Z",
    relatedTo: "1", // maintenance request ID
    relatedType: "maintenance"
  }
];

// Add mock maintenance requests to be used in the caretaker notifications
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    houseId: "1",
    reportedBy: "3", // tenant ID
    description: "Leaking kitchen faucet",
    status: "pending",
    priority: "medium",
    createdAt: "2025-03-25T14:30:00Z",
    updatedAt: "2025-03-25T14:30:00Z"
  },
  {
    id: "2",
    houseId: "2",
    reportedBy: "3",
    description: "Broken bathroom door lock",
    status: "in_progress",
    priority: "low",
    createdAt: "2025-03-20T10:15:00Z",
    updatedAt: "2025-03-22T11:20:00Z"
  },
  {
    id: "3",
    houseId: "3",
    reportedBy: "5",
    description: "Electrical short circuit in living room",
    status: "pending",
    priority: "urgent",
    createdAt: "2025-03-28T08:45:00Z",
    updatedAt: "2025-03-28T08:45:00Z"
  }
];
