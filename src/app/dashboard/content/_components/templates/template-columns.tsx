"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Template } from "@prisma/client";
import TemplateColumnAction from "./template-column-action";

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
    accessorKey: "download",
    header: "Downloads",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.published ? "Published" : "Draft";
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
    cell: ({ row }) => <TemplateColumnAction data={row.original} />,
  },
];
