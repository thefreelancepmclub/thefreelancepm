"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Template } from "@prisma/client";

// Get badge color based on status
const getStatusBadgeClass = (status: string) => {
  return status === "Published"
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

export const templateColumns: ColumnDef<Template>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "downloads",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Downloads
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
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
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.getValue("plan") as string;
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getPlanBadgeClass(
            plan
          )}`}
        >
          {plan}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
