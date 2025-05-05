"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, Download } from "lucide-react";
import { useState } from "react";

const mockData = [
  {
    date: "November 16, 2014",
    amount: "$15",
    status: "Active",
    plan: "Freelancer Lite",
  },
  {
    date: "March 23, 2013",
    amount: "$15",
    status: "Active",
    plan: "Freelancer Lite",
  },
  {
    date: "May 10, 2022",
    amount: "$20",
    status: "Cancelled",
    plan: "Freelancer Pro",
  },
  {
    date: "June 5, 2021",
    amount: "$18",
    status: "Active",
    plan: "Freelancer Lite",
  },
  {
    date: "July 30, 2020",
    amount: "$25",
    status: "Expired",
    plan: "Freelancer Pro",
  },
];

// const statuses = ["All", "Active", "Cancelled", "Expired"];
// const plans = ["All", "Freelancer Lite", "Freelancer Pro"];

export default function BillingHistory() {
  const [search] = useState("");
  const [status] = useState("All");
  const [plan] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredData = mockData.filter((item) => {
    const matchSearch = item.date.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "All" || item.status === status;
    const matchPlan = plan === "All" || item.plan === plan;
    return matchSearch && matchStatus && matchPlan;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="p-6 bg-white shadow rounded-2xl ">
      <h2 className="text-xl font-semibold text-[#004AAD] flex items-center gap-2 mb-6">
        <Clock /> Billing History
      </h2>

      {/* Filters */}
      <div>
        {/* Search Input */}
        {/* <div className="relative w-full">
          <Search
            className="absolute z-10 left-3 top-2.5 text-[#595959]"
            size={18}
          />
          <Input
            placeholder="Search ......"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div> */}

        {/* Filters + Search Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          {/* <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full lg:items-center"> */}
          {/* <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              {plans.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
          {/* </div> */}

          {/* Button aligned right on large screens */}
          {/* <Button className="bg-[#004AAD] hover:bg-[#003b8e] w-full sm:w-auto lg:w-auto">
            Search
          </Button> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#E5E7EB] rounded-lg">
        <Table className="">
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="px-6 py-4 text-center">Date</TableHead>
              <TableHead className="px-6 py-4 text-center">Amount</TableHead>
              <TableHead className="px-6 py-4 text-center">Status</TableHead>
              <TableHead className="px-6 py-4 text-center">Plan</TableHead>
              <TableHead className="px-6 py-4 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, idx) => (
              <TableRow key={idx} className="border-t">
                <TableCell className="px-6 py-5  text-center">
                  {item.date}
                </TableCell>
                <TableCell className="px-6  py-5 text-center">
                  {item.amount}
                </TableCell>
                <TableCell className="px-6 py-5 text-center">
                  {item.status}
                </TableCell>
                <TableCell className="px-6  py-5 text-center">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {item.plan}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-5 text-cente flex flex-col items-center">
                  <Download
                    className="cursor-pointer text-[#004AAD]"
                    size={18}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 border-t py-4 px-6">
          <p className="text-sm text-gray-600">
            Showing {Math.min((page - 1) * pageSize + 1, filteredData.length)}{" "}
            to {Math.min(page * pageSize, filteredData.length)} of{" "}
            {filteredData.length} results
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              &lt;
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={page === i + 1 ? "default" : "outline"}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "bg-[#B7CEEC] text-[#004AAD]" : ""}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
