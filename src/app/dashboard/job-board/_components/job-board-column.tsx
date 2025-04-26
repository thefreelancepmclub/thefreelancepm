import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the Job type
export interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  type: string;
  location: string;
  status: "Published" | "Draft" | "Expired";
  startDate: string;
  endDate: string;
  applications: number;
}

// Define the columns for the job board table
export const jobBoardColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const getStatusBadgeClass = (status: string) => {
        switch (status) {
          case "Published":
            return "bg-green-100 text-green-800";
          case "Draft":
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
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="text-sm">
          <div>{job.startDate}</div>
          <div>{job.endDate}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "applications",
    header: "Applications",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({}) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit job</DropdownMenuItem>
              <DropdownMenuItem>Delete job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
