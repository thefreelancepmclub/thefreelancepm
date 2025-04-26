"use client";

import type React from "react";

import { Search } from "lucide-react";
import { useState } from "react";

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

interface ContentTableProps {
  columns: {
    id: string;
    header: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cell: (item: any) => React.ReactNode;
    className?: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  showSearch?: boolean;
  showStatusFilter?: boolean;
  showPlanFilter?: boolean;
  addButtonLabel?: string;
  onAddClick?: () => void;
}

export function ContentTable({
  columns,
  data,
  showSearch = true,
  showStatusFilter = true,
  showPlanFilter = true,
  addButtonLabel,
  onAddClick,
}: ContentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [planFilter, setPlanFilter] = useState<string | undefined>();

  const itemsPerPage = 5;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page items
  const currentItems = data.slice(
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {showSearch && (
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
        )}
        <div className="flex flex-1 items-center gap-2 sm:justify-end">
          {showStatusFilter && (
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archive">Archive</SelectItem>
              </SelectContent>
            </Select>
          )}
          {showPlanFilter && (
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="freelancer-lite">Freelancer Lite</SelectItem>
                <SelectItem value="freelancer-pro">Freelancer Pro</SelectItem>
                <SelectItem value="freelancer-max">Freelancer Max</SelectItem>
              </SelectContent>
            </Select>
          )}
          {showSearch && <Button onClick={handleSearch}>Search</Button>}
          {addButtonLabel && onAddClick && (
            <Button className="ml-2" onClick={onAddClick}>
              {addButtonLabel} <span className="ml-1">+</span>
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={`${index}-${column.id}`}
                    className={column.className}
                  >
                    {column.cell(item)}
                  </TableCell>
                ))}
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
    </div>
  );
}
