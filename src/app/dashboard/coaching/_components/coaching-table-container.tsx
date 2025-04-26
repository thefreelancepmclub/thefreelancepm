"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table"; // assuming you have it from shadcn!
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { coachingColumns, CoachingSession } from "./coaching-columns";

const coachingSessions: CoachingSession[] = [
  {
    id: "12345",
    user: "Freelancer Light",
    email: "example@gmail.com",
    dateTime: "12/12/2025\n10:00 AM",
    focusArea: "Career Guidance",
    confirmed: true,
    status: "Completed",
  },
  {
    id: "67890",
    user: "Freelancer Elite",
    email: "example@gmail.com",
    dateTime: "12/12/2025\n2:00 PM",
    focusArea: "Freelance Strategy",
    confirmed: true,
    status: "Scheduled",
  },
  {
    id: "ABCDE",
    user: "Freelancer Pro",
    email: "example@gmail.com",
    dateTime: "12/12/2025\n11:00 AM",
    focusArea: "Resume Prep",
    confirmed: true,
    status: "Canceled",
  },
];

export function CoachingTableContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();

  const filteredSessions = coachingSessions.filter((session) => {
    const matchesSearch =
      searchQuery === "" ||
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.focusArea.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      !statusFilter ||
      statusFilter === "all" ||
      session.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <Button>Search</Button>
          </div>
        </div>

        <div className="mt-6">
          <DataTable columns={coachingColumns} data={filteredSessions} />
        </div>
      </CardContent>
    </Card>
  );
}
