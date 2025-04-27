"use client";

import { Eye, Pencil, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Job } from "./job-board-column";

// Sample job data
const jobs: Job[] = [
  {
    id: "XXXXX",
    title: "Agile Coach",
    company: "#######",
    category: "Leadership",
    type: "Contract",
    location: "New York",
    status: "Published",
    startDate: "10/05/2023",
    endDate: "10/06/2025",
    applications: 10,
  },
  {
    id: "XXXXX",
    title: "Scrum Master",
    company: "#######",
    category: "Agile",
    type: "Part-Time",
    location: "Hybrid",
    status: "Draft",
    startDate: "10/05/2023",
    endDate: "10/06/2025",
    applications: 55,
  },
  {
    id: "XXXXX",
    title: "PM Consultant",
    company: "#######",
    category: "Consulting",
    type: "Full-Time",
    location: "London",
    status: "Published",
    startDate: "10/05/2023",
    endDate: "10/06/2025",
    applications: 75,
  },
  {
    id: "XXXXX",
    title: "Senior Project Manager",
    company: "#######",
    category: "Agile",
    type: "Freelance",
    location: "Remote",
    status: "Draft",
    startDate: "10/05/2023",
    endDate: "10/06/2025",
    applications: 33,
  },
  {
    id: "XXXXX",
    title: "Lead PM",
    company: "#######",
    category: "Leadership",
    type: "Contract",
    location: "On-Site",
    status: "Expired",
    startDate: "10/05/2023",
    endDate: "10/06/2025",
    applications: 64,
  },
];

export function JobBoardTableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [locationFilter, setLocationFilter] = useState<string | undefined>();
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();

  const itemsPerPage = 5;

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      !statusFilter || statusFilter === "all" || job.status === statusFilter;
    const matchesLocation =
      !locationFilter ||
      locationFilter === "all" ||
      job.location === locationFilter;
    const matchesType =
      !typeFilter || typeFilter === "all" || job.type === typeFilter;
    const matchesCategory =
      !categoryFilter ||
      categoryFilter === "all" ||
      job.category === categoryFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation &&
      matchesType &&
      matchesCategory
    );
  });

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="On-Site">On-Site</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="London">London</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Leadership">Leadership</SelectItem>
                <SelectItem value="Agile">Agile</SelectItem>
                <SelectItem value="Consulting">Consulting</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="w-[80px] text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.map((job) => (
                <TableRow key={job.id + job.title}>
                  <TableCell className="font-medium">{job.id}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                        job.status
                      )}`}
                    >
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{job.startDate}</div>
                      <div>{job.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
}
