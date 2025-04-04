import { User, House, Tenant, Payment, WaterBill, Reminder, Notification, MaintenanceRequest, Dashboard } from './types';

// Mock user data with new tenants
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
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phoneNumber: "111-222-3333",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  // Generic tenant for demo login
  {
    id: "3",
    name: "Bob Tenant",
    email: "tenant@eimoinvestments.com",
    role: "tenant",
    phoneNumber: "555-123-4567",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  // New specific tenants
  {
    id: "5",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "tenant",
    phoneNumber: "555-123-4567",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "6",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    role: "tenant",
    phoneNumber: "555-987-6543",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "7",
    name: "Jennifer Lopez",
    email: "jennifer.lopez@example.com",
    role: "tenant",
    phoneNumber: "555-222-3344",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "8",
    name: "David Williams",
    email: "david.williams@example.com",
    role: "tenant",
    phoneNumber: "555-444-5566",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "9",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "tenant",
    phoneNumber: "555-777-8899",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Mock current user
export const currentUser = mockUsers[0];

// Updated houses from 101 to 120
export const mockHouses: House[] = [
  {
    id: "101",
    name: "House 101",
    kplcMeterNumber: "KPLC101",
    address: "123 Sunshine Ave",
    monthlyRent: 45000,
    status: "occupied",
    tenantId: "5", // Sarah Johnson
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "102",
    name: "House 102",
    kplcMeterNumber: "KPLC102",
    address: "456 Maple Rd",
    monthlyRent: 48000,
    status: "occupied",
    tenantId: "6", // Michael Chen
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "103",
    name: "House 103",
    kplcMeterNumber: "KPLC103",
    address: "789 Oak St",
    monthlyRent: 50000,
    status: "occupied",
    tenantId: "7", // Jennifer Lopez
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "104",
    name: "House 104",
    kplcMeterNumber: "KPLC104",
    address: "101 Pine Blvd",
    monthlyRent: 52000,
    status: "occupied",
    tenantId: "8", // David Williams
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "105",
    name: "House 105",
    kplcMeterNumber: "KPLC105",
    address: "202 Cedar Ln",
    monthlyRent: 47000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "106",
    name: "House 106",
    kplcMeterNumber: "KPLC106",
    address: "303 Willow Way",
    monthlyRent: 49000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "107",
    name: "House 107",
    kplcMeterNumber: "KPLC107",
    address: "404 Birch Rd",
    monthlyRent: 51000,
    status: "maintenance",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "108",
    name: "House 108",
    kplcMeterNumber: "KPLC108",
    address: "505 Elm St",
    monthlyRent: 53000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "109",
    name: "House 109",
    kplcMeterNumber: "KPLC109",
    address: "606 Acacia Dr",
    monthlyRent: 54000,
    status: "occupied",
    tenantId: "9", // Maria Garcia
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "110",
    name: "House 110",
    kplcMeterNumber: "KPLC110",
    address: "707 Magnolia Ave",
    monthlyRent: 55000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "111",
    name: "House 111",
    kplcMeterNumber: "KPLC111",
    address: "808 Palm St",
    monthlyRent: 56000,
    status: "maintenance",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "112",
    name: "House 112",
    kplcMeterNumber: "KPLC112",
    address: "909 Cypress Ln",
    monthlyRent: 57000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "113",
    name: "House 113",
    kplcMeterNumber: "KPLC113",
    address: "1010 Olive Rd",
    monthlyRent: 58000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "114",
    name: "House 114",
    kplcMeterNumber: "KPLC114",
    address: "1111 Juniper Ave",
    monthlyRent: 59000,
    status: "maintenance",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "115",
    name: "House 115",
    kplcMeterNumber: "KPLC115",
    address: "1212 Jasmine Blvd",
    monthlyRent: 60000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "116",
    name: "House 116",
    kplcMeterNumber: "KPLC116",
    address: "1313 Lily St",
    monthlyRent: 61000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "117",
    name: "House 117",
    kplcMeterNumber: "KPLC117",
    address: "1414 Rose Rd",
    monthlyRent: 62000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "118",
    name: "House 118",
    kplcMeterNumber: "KPLC118",
    address: "1515 Tulip Ave",
    monthlyRent: 63000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "119",
    name: "House 119",
    kplcMeterNumber: "KPLC119",
    address: "1616 Daisy Ln",
    monthlyRent: 64000,
    status: "vacant",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  },
  {
    id: "120",
    name: "House 120",
    kplcMeterNumber: "KPLC120",
    address: "1717 Orchid Blvd",
    monthlyRent: 66000,
    status: "maintenance",
    landlordId: "1",
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Updated tenant data
export const mockTenants: Tenant[] = [
  // Sarah Johnson - no rent balance, 500 KES water bill
  {
    id: "1",
    userId: "5",
    houseId: "101",
    moveInDate: "2023-06-01T08:00:00Z",
    status: "active",
    rentBalance: 0,
    waterBillBalance: 500,
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-06-01T08:00:00Z"
  },
  // Michael Chen - 5000 KES rent balance, 1200 KES water bill
  {
    id: "2",
    userId: "6",
    houseId: "102",
    moveInDate: "2023-04-15T08:00:00Z",
    status: "active",
    rentBalance: 5000,
    waterBillBalance: 1200,
    createdAt: "2023-04-15T08:00:00Z",
    updatedAt: "2023-04-15T08:00:00Z"
  },
  // Jennifer Lopez - no rent balance, 800 KES water bill
  {
    id: "3",
    userId: "7",
    houseId: "103",
    moveInDate: "2023-02-28T08:00:00Z",
    status: "active",
    rentBalance: 0,
    waterBillBalance: 800,
    createdAt: "2023-02-28T08:00:00Z",
    updatedAt: "2023-02-28T08:00:00Z"
  },
  // David Williams - 10000 KES rent balance, no water bill
  {
    id: "4",
    userId: "8",
    houseId: "104",
    moveInDate: "2023-07-10T08:00:00Z",
    status: "active",
    rentBalance: 10000,
    waterBillBalance: 0,
    createdAt: "2023-07-10T08:00:00Z",
    updatedAt: "2023-07-10T08:00:00Z"
  },
  // Maria Garcia - no balances (fully paid up)
  {
    id: "5",
    userId: "9",
    houseId: "109",
    moveInDate: "2023-03-15T08:00:00Z",
    status: "active",
    rentBalance: 0,
    waterBillBalance: 0,
    createdAt: "2023-03-15T08:00:00Z",
    updatedAt: "2023-03-15T08:00:00Z"
  },
  // Generic tenant for demo login
  {
    id: "6",
    userId: "3",
    houseId: "101", // Temporarily associated with House 101 (same as Sarah Johnson)
    moveInDate: "2023-01-01T08:00:00Z",
    status: "active",
    rentBalance: 0,
    waterBillBalance: 0,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-01-01T08:00:00Z"
  }
];

// Updated payment data to match new tenants
export const mockPayments: Payment[] = [
  {
    id: "1",
    tenantId: "1", // Sarah Johnson
    amount: 45000,
    type: "rent",
    status: "completed",
    date: "2023-06-05T08:00:00Z",
    description: "Rent payment for June 2023",
    createdAt: "2023-06-05T08:00:00Z",
    updatedAt: "2023-06-05T08:00:00Z"
  },
  {
    id: "2",
    tenantId: "1", // Sarah Johnson
    amount: 1000,
    type: "water",
    status: "completed",
    date: "2023-06-05T08:00:00Z",
    description: "Water bill payment for June 2023",
    createdAt: "2023-06-05T08:00:00Z",
    updatedAt: "2023-06-05T08:00:00Z"
  },
  {
    id: "3",
    tenantId: "2", // Michael Chen
    amount: 48000,
    type: "rent",
    status: "completed",
    date: "2023-06-03T08:00:00Z",
    description: "Rent payment for June 2023",
    createdAt: "2023-06-03T08:00:00Z",
    updatedAt: "2023-06-03T08:00:00Z"
  },
  {
    id: "4",
    tenantId: "2", // Michael Chen
    amount: 48000,
    type: "rent",
    status: "pending",
    date: "2023-07-03T08:00:00Z",
    description: "Rent payment for July 2023",
    createdAt: "2023-07-03T08:00:00Z",
    updatedAt: "2023-07-03T08:00:00Z"
  },
  {
    id: "5",
    tenantId: "3", // Jennifer Lopez
    amount: 50000,
    type: "rent",
    status: "completed",
    date: "2023-07-02T08:00:00Z",
    description: "Rent payment for July 2023",
    createdAt: "2023-07-02T08:00:00Z",
    updatedAt: "2023-07-02T08:00:00Z"
  },
  {
    id: "6",
    tenantId: "4", // David Williams
    amount: 42000,
    type: "rent",
    status: "completed",
    date: "2023-07-12T08:00:00Z",
    description: "Partial rent payment for July 2023",
    createdAt: "2023-07-12T08:00:00Z",
    updatedAt: "2023-07-12T08:00:00Z"
  },
  {
    id: "7",
    tenantId: "5", // Maria Garcia
    amount: 54000,
    type: "combined",
    status: "completed",
    date: "2023-07-05T08:00:00Z",
    description: "Combined payment for July 2023",
    createdAt: "2023-07-05T08:00:00Z",
    updatedAt: "2023-07-05T08:00:00Z"
  }
];

// Updated water bill data
export const mockWaterBills: WaterBill[] = [
  {
    id: "1",
    houseId: "101",
    tenantId: "1", // Sarah Johnson
    amount: 1500,
    month: "June",
    status: "paid",
    dueDate: "2023-06-15T08:00:00Z",
    paymentId: "2",
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-06-01T08:00:00Z"
  },
  {
    id: "2",
    houseId: "101",
    tenantId: "1", // Sarah Johnson
    amount: 500,
    month: "July",
    status: "pending",
    dueDate: "2023-07-15T08:00:00Z",
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-07-01T08:00:00Z"
  },
  {
    id: "3",
    houseId: "102",
    tenantId: "2", // Michael Chen
    amount: 1200,
    month: "July",
    status: "pending",
    dueDate: "2023-07-15T08:00:00Z",
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-07-01T08:00:00Z"
  },
  {
    id: "4",
    houseId: "103",
    tenantId: "3", // Jennifer Lopez
    amount: 800,
    month: "July",
    status: "pending",
    dueDate: "2023-07-15T08:00:00Z",
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-07-01T08:00:00Z"
  },
  {
    id: "5",
    houseId: "109",
    tenantId: "5", // Maria Garcia
    amount: 1000,
    month: "July",
    status: "paid",
    dueDate: "2023-07-15T08:00:00Z",
    paymentId: "7", // Part of combined payment
    createdAt: "2023-07-01T08:00:00Z",
    updatedAt: "2023-07-05T08:00:00Z"
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

// Update notifications to match new tenant IDs
export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1", // Landlord
    title: "New Tenant Added",
    message: "A new tenant, Sarah Johnson, has been added to House 101.",
    type: "info",
    read: false,
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-06-01T08:00:00Z"
  },
  {
    id: "2",
    userId: "1", // Landlord
    title: "Rent Payment Received",
    message: "Rent payment of KES 45000 received from Sarah Johnson.",
    type: "success",
    read: true,
    createdAt: "2023-06-05T08:00:00Z",
    updatedAt: "2023-06-05T08:00:00Z"
  },
  {
    id: "3",
    userId: "2", // Caretaker
    title: "Maintenance Request",
    message: "A new maintenance request has been created for House 107.",
    type: "warning",
    read: false,
    createdAt: "2023-06-10T08:00:00Z",
    updatedAt: "2023-06-10T08:00:00Z"
  },
  {
    id: "4",
    userId: "5", // Sarah Johnson
    title: "Water Bill Due Soon",
    message: "Your water bill payment of KES 500 is due on July 15th.",
    type: "info",
    read: false,
    createdAt: "2023-07-05T08:00:00Z",
    updatedAt: "2023-07-05T08:00:00Z"
  },
  {
    id: "5",
    userId: "1", // Landlord
    title: "Rent Overdue",
    message: "Rent payment of KES 5000 is overdue for Michael Chen.",
    type: "error",
    read: false,
    createdAt: "2023-07-06T08:00:00Z",
    updatedAt: "2023-07-06T08:00:00Z"
  },
  {
    id: "6",
    userId: "4", // Admin
    title: "System Update",
    message: "The system has been updated to the latest version.",
    type: "success",
    read: true,
    createdAt: "2023-07-07T08:00:00Z",
    updatedAt: "2023-07-07T08:00:00Z"
  },
  // Caretaker notifications for maintenance requests
  {
    id: "7",
    userId: "2", // caretaker ID
    title: "New Maintenance Request",
    message: "Urgent maintenance request: Electrical issue in House 107",
    type: "error",
    read: false,
    createdAt: "2023-07-08T08:45:00Z",
    updatedAt: "2023-07-08T08:45:00Z",
    relatedTo: "3", // maintenance request ID
    relatedType: "maintenance"
  },
  {
    id: "8",
    userId: "2", // caretaker ID
    title: "Maintenance Request Update",
    message: "Maintenance request for House 111 is now in progress",
    type: "info",
    read: true,
    createdAt: "2023-07-09T11:20:00Z",
    updatedAt: "2023-07-09T11:20:00Z",
    relatedTo: "2", // maintenance request ID
    relatedType: "maintenance"
  },
  {
    id: "9",
    userId: "2", // caretaker ID
    title: "New Maintenance Request",
    message: "Maintenance request: Plumbing issue in House 114",
    type: "warning",
    read: false,
    createdAt: "2023-07-10T14:30:00Z",
    updatedAt: "2023-07-10T14:30:00Z",
    relatedTo: "1", // maintenance request ID
    relatedType: "maintenance"
  },
  // Tenant-specific notifications
  {
    id: "10",
    userId: "6", // Michael Chen
    title: "Rent Due Reminder",
    message: "Your rent payment of KES 48000 is due on August 3rd.",
    type: "info",
    read: false,
    createdAt: "2023-07-25T09:00:00Z",
    updatedAt: "2023-07-25T09:00:00Z"
  },
  {
    id: "11",
    userId: "7", // Jennifer Lopez
    title: "Water Bill Due",
    message: "Your water bill payment of KES 800 is due on July 15th.",
    type: "warning",
    read: false,
    createdAt: "2023-07-10T10:15:00Z",
    updatedAt: "2023-07-10T10:15:00Z"
  },
  {
    id: "12",
    userId: "8", // David Williams
    title: "Rent Overdue",
    message: "Your rent payment of KES 10000 is now overdue.",
    type: "error",
    read: false,
    createdAt: "2023-07-20T14:30:00Z",
    updatedAt: "2023-07-20T14:30:00Z"
  }
];

// Updated maintenance requests
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    houseId: "114",
    reportedBy: "2", // Caretaker
    description: "Leaking bathroom faucet",
    status: "pending",
    priority: "medium",
    createdAt: "2023-07-10T14:30:00Z",
    updatedAt: "2023-07-10T14:30:00Z"
  },
  {
    id: "2",
    houseId: "111",
    reportedBy: "2", // Caretaker
    description: "Broken window in living room",
    status: "in_progress",
    priority: "low",
    createdAt: "2023-07-08T10:15:00Z",
    updatedAt: "2023-07-09T11:20:00Z"
  },
  {
    id: "3",
    houseId: "107",
    reportedBy: "2", // Caretaker
    description: "Electrical short circuit in kitchen",
    status: "pending",
    priority: "urgent",
    createdAt: "2023-07-08T08:45:00Z",
    updatedAt: "2023-07-08T08:45:00Z"
  },
  {
    id: "4",
    houseId: "120",
    reportedBy: "1", // Landlord
    description: "Major water damage on ceiling",
    status: "in_progress",
    priority: "urgent",
    createdAt: "2023-07-05T16:20:00Z",
    updatedAt: "2023-07-06T09:30:00Z"
  }
];

// Update dashboard stats based on new data
export const mockDashboard: Dashboard = {
  totalHouses: mockHouses.length,
  occupiedHouses: mockHouses.filter(house => house.status === 'occupied').length,
  vacantHouses: mockHouses.filter(house => house.status === 'vacant').length,
  maintenanceHouses: mockHouses.filter(house => house.status === 'maintenance').length,
  totalTenants: mockTenants.length,
  pendingRent: mockTenants.reduce((total, tenant) => total + tenant.rentBalance, 0),
  pendingWaterBills: mockTenants.reduce((total, tenant) => total + tenant.waterBillBalance, 0),
  recentPayments: mockPayments.slice(0, 5),
  recentNotifications: mockNotifications.slice(0, 5)
};
