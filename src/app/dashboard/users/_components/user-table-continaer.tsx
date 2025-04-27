"use client";

import { MoreHorizontal, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";

interface User {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  status: "Active" | "Inactive";
  plan: "Freelancer Lite" | "Freelancer Pro" | "Freelancer Max";
}

const users: User[] = [
  {
    id: "XXXXX",
    name: "Cooper, Kristin",
    email: "michelle.rivera@example.com",
    lastActive: "01/15/23 01:16AM EST",
    status: "Active",
    plan: "Freelancer Lite",
  },
  {
    id: "XXXXX",
    name: "Henry, Arthur",
    email: "sara.cruz@example.com",
    lastActive: "01/15/23 09:34AM EST",
    status: "Inactive",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    name: "Miles, Esther",
    email: "anna.diaz@example.com",
    lastActive: "01/15/23 12:14PM EST",
    status: "Active",
    plan: "Freelancer Max",
  },
  {
    id: "XXXXX",
    name: "Nguyen, Shane",
    email: "debbie.baker@example.com",
    lastActive: "01/12/23 04:10PM EST",
    status: "Inactive",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    name: "Black, Marvin",
    email: "alicia.hall@example.com",
    lastActive: "01/12/23 02:32PM EST",
    status: "Active",
    plan: "Freelancer Lite",
  },
  {
    id: "XXXXX",
    name: "Henry, Arthur",
    email: "sara.cruz@example.com",
    lastActive: "01/15/23 09:34AM EST",
    status: "Inactive",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    name: "Miles, Esther",
    email: "anna.diaz@example.com",
    lastActive: "01/15/23 12:14PM EST",
    status: "Active",
    plan: "Freelancer Max",
  },
  {
    id: "XXXXX",
    name: "Nguyen, Shane",
    email: "debbie.baker@example.com",
    lastActive: "01/12/23 04:10PM EST",
    status: "Inactive",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    name: "Black, Marvin",
    email: "alicia.hall@example.com",
    lastActive: "01/12/23 02:32PM EST",
    status: "Active",
    plan: "Freelancer Lite",
  },
];

export function UserTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [planFilter, setPlanFilter] = useState<string | undefined>();

  const itemsPerPage = 5;

  // Apply filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesPlan = !planFilter || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  // Get badge color based on status
  const getStatusBadgeClass = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  // Get badge color based on plan
  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case "Freelancer Lite":
        return "bg-blue-100 text-blue-800";
      case "Freelancer Pro":
        return "bg-yellow-100 text-yellow-800";
      case "Freelancer Max":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-1 items-center gap-2 sm:justify-end">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Freelancer Lite">Freelancer Lite</SelectItem>
                <SelectItem value="Freelancer Pro">Freelancer Pro</SelectItem>
                <SelectItem value="Freelancer Max">Freelancer Max</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="w-[80px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id + user.email}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getPlanBadgeClass(
                        user.plan
                      )}`}
                    >
                      {user.plan}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
