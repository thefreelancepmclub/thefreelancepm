"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import useDebounce from "@/hooks/useDebounce";
import useJobBoardStore from "@/zustand/website/jobBoard";
import { ExperiencesType, Job, JobType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import JobCard from "./JobCard";

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

const JobBoardContainer = () => {
  const {
    status,
    setStatus,
    localtionFilter,
    setLocationFilter,
    type,
    setType,
    query,
    setQuery,
  } = useJobBoardStore();

  const searchQuery = useDebounce(query, 500);

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["job", status, type, localtionFilter, searchQuery],
    queryFn: () =>
      fetch(
        `/api/dashboard/job?status=${status}&type=${type}&location=${localtionFilter}&searchQuery=${searchQuery}`,
      ).then((res) => res.json()),
  });

  let content;

  if (isLoading) {
    content = (
      <div className="min-h-[400px] flex justify-center items-center">
        Loading
      </div>
    );
  } else if (isError) {
    content = (
      <div className="min-h-[400px] flex justify-center items-center">
        Something went wrong: {error.message}
      </div>
    );
  } else if (data?.data?.length === 0) {
    content = (
      <div className="min-h-[400px] flex justify-center items-center">
        No jobs found
      </div>
    );
  } else if (data?.data && data.data.length > 0) {
    content = (
      <div className="bg-white lg:py-6 lg:px-4 flex-grow">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] container mx-auto">
            {data?.data?.map(({ id }) => <JobCard key={id} />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* Search Section */}
      <div className="my-[50px]">
        <div className="bg-white py-6 lg:px-4">
          <div className="lg:container lg:mx-auto">
            <div className="relative mb-[30px] shadow-[0px_4px_12px_0px_#0000001A] rounded-[15px]">
              <input
                type="text"
                placeholder="Search job titles, companies, or keywords..."
                className="w-full p-2 pl-3 pr-10 h-[52px] rounded-[15px] outline-[#004AAD] border-[1.5px] border-gray-500"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
              <Search className="absolute right-3 top-4 text-black" size={20} />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Left Filters */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select
                    value={localtionFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger className="w-full sm:w-[140px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
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

                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-full sm:w-[145px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(JobType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full sm:w-[203px] h-[39px] rounded-[30px]">
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(ExperiencesType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Sort By */}
              <div className="flex items-center gap-4 mx-auto lg:mx-0">
                <p className="text-lg font-medium whitespace-nowrap">
                  Sort By:
                </p>
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

      {content}

      <div className="flex items-center justify-center mt-[30px] mb-[50px]">
        <Button className="w-[175px] h-[52px] text-base text-white">
          Load More
        </Button>
      </div>
    </div>
  );
};

export default JobBoardContainer;
