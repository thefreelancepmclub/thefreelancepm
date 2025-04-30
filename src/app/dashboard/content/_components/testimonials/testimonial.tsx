"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Testmonial } from "@prisma/client";
import TestmonialAction from "./testmonial-action";

// Get badge color based on status
const getStatusBadgeClass = (status: string) => {
  return status === "Published"
    ? "bg-green-100 text-green-800"
    : "bg-gray-100 text-gray-800";
};

export const testimonialColumns: ColumnDef<Testmonial>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "jobTitle",
    header: "Job Title",
  },
  {
    accessorKey: "star",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Star
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stars = row.original.rating;
      return (
        <div className="flex justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.active ? "Published" : "Draft";
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
    id: "actions",
    cell: ({ row }) => <TestmonialAction data={row.original} />,
  },
];
