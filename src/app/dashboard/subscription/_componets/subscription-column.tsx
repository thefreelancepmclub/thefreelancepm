import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";

// Define the Subscription type
export interface Subscription {
  id: string;
  title: string;
  status: "Active" | "Inactive" | "Expired";
  publishedDate: string;
  amount: string;
  renewalType: "Free" | "Auto" | "Manual";
  totalUsers: number;
}

// Define the columns for the subscription table
export const subscriptionColumns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Plan Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

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
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "publishedDate",
    header: "Published Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "renewalType",
    header: "Renewal Type",
  },
  {
    accessorKey: "totalUsers",
    header: "Total User",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({}) => {
      return (
        <div className="flex justify-end space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View details</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </div>
      );
    },
  },
];
