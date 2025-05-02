"use client";

import { Button } from "@/components/ui/button";
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
import useCoachingStore from "@/zustand/dashboard/coaching";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ApiRes {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pagination: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

const item_per_page = 10;

export function CoachingTableContainer() {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const { searchQuery, setSearchQuery, status, setStatus } = useCoachingStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, isError, error, refetch, isRefetching } =
    useQuery<ApiRes>({
      queryKey: ["Users", currentPage, item_per_page],
      queryFn: () =>
        fetch(
          `/api/dashboard/coaching?status=${status}&query=${searchQuery}&page=${currentPage}&limit=${item_per_page}`
        ).then((res) => res.json()),
    });

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "scheduled":
        return "text-blue-600 bg-blue-100";
      case "canceled":
        return "text-red-600 bg-red-100";
      case "opened":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-500">{(error as Error).message}</p>
      </div>
    );
  }
console.log(data?.data, "coaching data");
  return (
    <div>
      <div className="my-14 shadow-[0px_4px_12px_0px_#0000001A] py-6 px-6 rounded-lg">
        <div className="flex flex-col  gap-4 sm:flex-row sm:items-center sm:justify-between">
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
            <Select value={status} onValueChange={setStatus}>
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
            <Button onClick={() => refetch()} disabled={isRefetching}>
              Search
            </Button>
          </div>
        </div>
      </div>
      {/* <Card className="mt-6 ">
        <CardContent > */}
      <div className="flex flex-col rounded-lg gap-4 shadow-[0px_4px_12px_0px_#0000001A]">
        <div className="rounded-lg overflow-hidden w-full ">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E5E7EB] text-[#004AAD] *:px-8">
                <TableHead className="">Session ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>User Email</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Focus Area</TableHead>
                <TableHead>Confirmation </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((coaching) => (
                <TableRow className="border-none  *:px-8 *:py-8" key={coaching.id}>
                  <TableCell className="font-medium">{coaching?.id}</TableCell>
                  <TableCell className="font-medium">
                    {coaching?.firstName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {coaching?.email}
                  </TableCell>
                  <TableCell className="font-medium">
                    {coaching?.date}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-wrap gap-1">
                      {coaching?.focusArea.map((area: string) => (
                        <span
                          key={area}
                          className="inline-block rounded  px-2 py-0.5 text-xs"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={coaching?.confirmation || false}
                        readOnly
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004AAD]"></div>
                    </label>
                  </TableCell>
                  <TableCell className="font-medium">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        coaching?.status
                      )}`}
                    >
                      {coaching?.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={coaching?.meetingLink || "/"}
                      className="inline-block rounded-md bg-[#004AAD] px-3 py-1 text-sm text-white"
                    >
                      Join Meeting
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={data?.pagination?.totalPages ?? 0}
          totalItems={data?.pagination?.totalItems ?? 0}
          itemsPerPage={item_per_page}
          onPageChange={(p) => setCurrentPage(p)}
        />
      </div>
      {/* </CardContent>
      </Card> */}
    </div>
  );
}
