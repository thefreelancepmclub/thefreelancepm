"use client";

import { Eye, Pencil, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Subscription } from "./subscription-column";

// Sample subscription data
const subscriptions: Subscription[] = [
  {
    id: "XXXXX",
    title: "Freelancer Light",
    status: "Active",
    publishedDate: "10/05/2025",
    amount: "Free",
    renewalType: "Free",
    totalUsers: 10,
  },
  {
    id: "XXXXX",
    title: "Freelancer Elite",
    status: "Active",
    publishedDate: "10/05/2025",
    amount: "$##",
    renewalType: "Auto",
    totalUsers: 50,
  },
  {
    id: "XXXXX",
    title: "Freelancer Pro",
    status: "Active",
    publishedDate: "10/05/2025",
    amount: "$##",
    renewalType: "Manual",
    totalUsers: 75,
  },
];

export function SubscriptionTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const itemsPerPage = 5;

  // Apply filters
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      searchQuery === "" ||
      subscription.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.renewalType
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      statusFilter === "all" ||
      subscription.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalItems = filteredSubscriptions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const currentSubscriptions = filteredSubscriptions.slice(
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

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
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
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
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
                <TableHead>Plan Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Renewal Type</TableHead>
                <TableHead>Total User</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentSubscriptions.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell className="font-medium">
                    {subscription.id}
                  </TableCell>
                  <TableCell>{subscription.title}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                        subscription.status
                      )}`}
                    >
                      {subscription.status}
                    </span>
                  </TableCell>
                  <TableCell>{subscription.publishedDate}</TableCell>
                  <TableCell>{subscription.amount}</TableCell>
                  <TableCell>{subscription.renewalType}</TableCell>
                  <TableCell>{subscription.totalUsers}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
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
