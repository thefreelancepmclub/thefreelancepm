// import { useState } from 'react';
import { Search } from "lucide-react";
import CourseHeader from "./CourseHeader";
import JobRightFit from "../../jobBoard/_components/JobRightFit";
import CoursesCard from "./CoursesCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CoursesContainer() {
  // Array of course card data
  // const courseCards = [
  //   {
  //     id: 1,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: null,
  //     hours: 8,
  //     difficulty: "POPULAR",
  //     difficultyColor: "bg-green-500",
  //     isNew: false,
  //     isHot: false,
  //   },
  //   {
  //     id: 2,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: "$49",
  //     hours: 10,
  //     difficulty: "ADVANCED",
  //     difficultyColor: "bg-red-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: null,
  //     hours: 12,
  //     difficulty: "INTERMEDIATE",
  //     difficultyColor: "bg-yellow-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  //   {
  //     id: 4,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: "$49",
  //     hours: 6,
  //     difficulty: "POPULAR",
  //     difficultyColor: "bg-green-500",
  //     isNew: false,
  //     isHot: true,
  //   },
  //   {
  //     id: 5,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: null,
  //     hours: 9,
  //     difficulty: "BEGINNER",
  //     difficultyColor: "bg-green-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  //   {
  //     id: 6,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: "$49",
  //     hours: 11,
  //     difficulty: "BEGINNER",
  //     difficultyColor: "bg-green-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  //   {
  //     id: 7,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: null,
  //     hours: 8,
  //     difficulty: "POPULAR",
  //     difficultyColor: "bg-green-500",
  //     isNew: false,
  //     isHot: false,
  //   },
  //   {
  //     id: 8,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: "$59",
  //     hours: 10,
  //     difficulty: "ADVANCED",
  //     difficultyColor: "bg-red-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  //   {
  //     id: 9,
  //     title: "Course Title",
  //     description: "Explore advanced concepts in managing IoT networks",
  //     price: null,
  //     hours: 12,
  //     difficulty: "INTERMEDIATE",
  //     difficultyColor: "bg-yellow-500",
  //     isNew: true,
  //     isHot: false,
  //   },
  // ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <CourseHeader />

      {/* Search Section */}
      <div className="my-[50px]">
        <div className="bg-white py-6 lg:px-4">
          <div className="lg:container lg:mx-auto">
            <div className="relative mb-[30px] shadow-[0px_4px_12px_0px_#0000001A] rounded-[15px]">
              <input
                type="text"
                placeholder="Search job titles, companies, or keywords..."
                className="w-full p-2 pl-3 pr-10 h-[52px] rounded-[15px] outline-[#004AAD] border-[1.5px] border-gray-500"
              />
              <Search className="absolute right-3 top-4 text-black" size={20} />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Left Filters */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-[30px]">
                  <Select>
                    <SelectTrigger className="w-full sm:w-[140px] h-[39px] rounded-[30px]">
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
                    <SelectTrigger className="w-full sm:w-[145px] h-[39px] rounded-[30px]">
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
                    <SelectTrigger className="w-full sm:w-[203px] h-[39px] rounded-[30px]">
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

      {/* Course Cards Grid */}
      <div className="lg:py-6 lg:px-4 lg:flex-grow">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
            <CoursesCard />
          </div>

          {/* Load More Button */}
          <div className="flex items-center justify-center mt-[30px] mb-[50px]">
            <Button className="w-[175px] h-[52px] text-base text-white">
              Load More
            </Button>
          </div>
        </div>
      </div>

      {/* Footer - Newsletter */}
      <JobRightFit />
    </div>
  );
}
