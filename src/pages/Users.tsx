
import Layout from "@/components/Layout";
import { useState } from "react";
import { User } from "@/utils/types";
import { mockUsers } from "@/utils/mockData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to render role badge with appropriate color
  const renderRoleBadge = (role: string) => {
    const badgeStyles = {
      admin: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      landlord: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      caretaker: "bg-green-100 text-green-800 hover:bg-green-200",
      tenant: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };
    
    return (
      <Badge 
        className={badgeStyles[role as keyof typeof badgeStyles] || "bg-gray-100 text-gray-800"} 
        variant="outline"
      >
        {role}
      </Badge>
    );
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                List of all registered users in the system
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{renderRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Users;
