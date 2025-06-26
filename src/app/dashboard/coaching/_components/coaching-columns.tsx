"use client";

import { Button }               from "@/components/ui/button";
import { ColumnDef }            from "@tanstack/react-table";
import { format }               from "date-fns";
import { Eye }                  from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Row shape = CoachingSession + User (fetched with include)
   ────────────────────────────────────────────────────────── */
   export type CoachingRow = import("@prisma/client").CoachingSession & {
    user: { name: string | null; email: string | null } | null;
  };
  

export const coachingColumns: ColumnDef<CoachingRow>[] = [
  /* ––––– Session ID ––––– */
  {
    accessorKey: "id",
    header: "Session ID",
    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },

  /* ––––– User name ––––– */
  {
    id: "user",
    header: "User",
    cell: ({ row }) => row.original.user?.name ?? "—",
  },

  /* ––––– User e-mail ––––– */
  {
    id: "email",
    header: "E-mail",
    cell: ({ row }) => row.original.user?.email ?? "—",
  },

  /* ––––– Date & time ––––– */
  {
    id: "dateTime",
    header: "Date & Time",
    cell: ({ row }) =>
      row.original.date
        ? format(new Date(row.original.date), "MMM dd, yyyy HH:mm")
        : "—",
  },

  /* ––––– Tier at booking ––––– */
  {
    accessorKey: "tierAtCreate",
    header: "Tier",
    cell: ({ row }) => row.original.tierAtCreate,
  },

  /* ––––– Status ––––– */
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status; // opened | paid | scheduled | completed …
      const color =
        {
          opened:     "bg-yellow-100 text-yellow-800",
          paid:       "bg-blue-100 text-blue-800",
          scheduled:  "bg-purple-100 text-purple-800",
          completed:  "bg-green-100 text-green-800",
          canceled:   "bg-red-100 text-red-800",  // US spelling
        cancelled:  "bg-red-100 text-red-800",  // UK spelling → same colour
        }[status] || "bg-gray-100 text-gray-800";

      return (
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
          {status}
        </span>
      );
    },
  },

  /* ––––– Row actions ––––– */
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="h-8">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
      </div>
    ),
  },
];
