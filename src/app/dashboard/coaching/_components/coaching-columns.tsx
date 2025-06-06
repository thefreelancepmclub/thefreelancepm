"use client";

import { Button } from "@/components/ui/button";
import { Coaching } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export const coachingColumns: ColumnDef<Coaching>[] = [
  {
    accessorKey: "id",
    header: "Session ID",
    cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
  },
  {
    header: "User",
    cell: ({ row }) => (
      <p>
        {row.original.firstName} {row.original.lastName}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "User Email",
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <div className="whitespace-pre-line">{row.getValue("dateTime")}</div>
    ),
  },
  {
    accessorKey: "focusArea",
    header: "Focus Area",
  },
  // {
  //   accessorKey: "confirmed",
  //   header: "Confirmation",
  //   cell: ({ row }) => {
  //     const session = row.original;
  //     return (
  //       <Switch
  //         checked={session.}
  //         onCheckedChange={(checked: boolean) => {
  //           // you can lift this up if you want to update global state
  //           console.log("Switch toggled for", session.id, "to", checked);
  //         }}
  //       />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status = row.getValue("status") as CoachingSession["status"];
  //     const badgeClass =
  //       {
  //         Completed: "bg-green-100 text-green-800",
  //         Scheduled: "bg-blue-100 text-blue-800",
  //         Canceled: "bg-red-100 text-red-800",
  //       }[status] || "bg-gray-100 text-gray-800";

  //     return (
  //       <span
  //         className={`rounded-full px-2 py-1 text-xs font-medium ${badgeClass}`}
  //       >
  //         {status}
  //       </span>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({}) => {
      return (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="h-8">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      );
    },
  },
];
