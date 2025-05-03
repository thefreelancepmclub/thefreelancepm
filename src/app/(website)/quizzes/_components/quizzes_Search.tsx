import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

const QuizzesSearch = () => {
  return (
    <div className="my-[50px]">
      <div className="bg-white py-6 lg:px-4">
        <div className="lg:container lg:mx-auto">
          <div className="relative mb-[30px] shadow-[0px_4px_12px_0px_#0000001A] rounded-[15px]">
            <input
              type="text"
              placeholder="Search for quizzes (e.g., leadership, skills)"
              className="w-full p-2 pl-3 pr-10 h-[52px] rounded-[15px] outline-[#004AAD] border-[1.5px] "
            />
            <Search className="absolute right-3 top-4 text-black" size={20} />
          </div>

          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Left Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                <Select>
                  <SelectTrigger className="w-full sm:w-[140px] h-[39px] rounded-[30px]">
                    <SelectValue placeholder="All Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Type one</SelectItem>
                    <SelectItem value="dark">Type two</SelectItem>
                    <SelectItem value="system">Type three</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                <Select>
                  <SelectTrigger className="w-full sm:w-[145px] h-[39px] rounded-[30px]">
                    <SelectValue placeholder="All Level " />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Type one</SelectItem>
                    <SelectItem value="dark">Type two</SelectItem>
                    <SelectItem value="system">Type three</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Sort By */}
            <div className="flex items-center gap-4 mx-auto lg:mx-0">
              <p className="text-lg font-medium whitespace-nowrap">Sort By:</p>
              <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                <Select>
                  <SelectTrigger className="w-[200px] h-[39px] rounded-[30px]">
                    <SelectValue placeholder="Newest First" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Type one</SelectItem>
                    <SelectItem value="dark">Type two</SelectItem>
                    <SelectItem value="system">Type three</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizzesSearch;
