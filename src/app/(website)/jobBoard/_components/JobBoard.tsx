// import { useState } from 'react';
import NextGig from "./NextGig";
// import JobFilter from "./JobFilter";
import JobRightFit from "./JobRightFit";
import { Search } from "lucide-react";
import JobCard from "./JobCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobBoard() {
  // Array of job card data

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <NextGig />

      {/* Search Section */}
      <div className="my-[50px]">
        <div className="bg-white py-6 px-4">
          <div className="container mx-auto">
            <div className="relative mb-4 shadow-[0px_4px_12px_0px_#0000001A] rounded-[15px]">
              <input
                type="text"
                placeholder="Search job titles, companies, or keywords..."
                className="w-full p-2 pl-3 pr-10 h-[52px] rounded-[15px]"
              />
              <Search
                className="absolute right-3 top-4 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex flex-wrap gap-2">
                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select>
                    <SelectTrigger className="w-[140px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select>
                    <SelectTrigger className="w-[145px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select>
                    <SelectTrigger className="w-[203px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-lg font-medium">Sort By: </p>
                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select>
                    <SelectTrigger className="w-[200px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Newest First" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="bg-white py-6 px-4 flex-grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      </div>

      {/* Footer - Newsletter */}
      <JobRightFit />
    </div>
  );
}
