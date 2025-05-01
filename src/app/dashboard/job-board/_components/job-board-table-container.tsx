"use client";

import { Loader2, Search } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
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
import { countries } from "@/data/countries";
import useDebounce from "@/hooks/useDebounce";
import { Job, JobType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import JobBordTableAction from "./job-board-table-action";

interface ApiResponse {
  success: true;
  data: Job[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function JobBoardTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "all">("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<JobType | "all">("all");

  const query = useDebounce(searchQuery, 500);

  const itemsPerPage = 5;

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["job", statusFilter, typeFilter, locationFilter, query],
    queryFn: () =>
      fetch(
        `/api/dashboard/job?status=${statusFilter}&type=${typeFilter}&location=${locationFilter}&searchQuery=${query}`
      ).then((res) => res.json()),
  });

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get badge color based on status
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

  let content;

  if (isLoading) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="w-full h-[400px] flex justify-center items-center">
        <p className="max-w-[500px] text-red-500">{error.message}</p>
      </div>
    );
  } else if (data && data.success) {
    content = (
      <div className="mt-6 overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expire Date</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="w-[80px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((job) => (
              <TableRow key={job.id + job.title}>
                <TableCell className="font-medium">{job.id}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                      job.published ? "Published" : "Draft"
                    )}`}
                  >
                    {job.published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{moment(job.expiration).format()}</div>
                  </div>
                </TableCell>
                <TableCell>{0}</TableCell>
                <TableCell className="text-right">
                  <JobBordTableAction job={job} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

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
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="true">Published</SelectItem>
                <SelectItem value="false">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={(v) => setTypeFilter(v as JobType | "all")}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.values(JobType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={locationFilter}
              onValueChange={(v) => setLocationFilter(v)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectGroup>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {content}
        <TablePagination
          currentPage={currentPage}
          totalPages={data?.meta?.totalPages ?? 1}
          totalItems={data?.meta?.total ?? 1}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
