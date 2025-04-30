// import { useState } from 'react';
import { Search } from "lucide-react";
import RadyToUse from "./RadyToUse";
import TemplateCard from "./TemplateCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TemplatesContainer() {
  // Array of template card data

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <RadyToUse />
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

      {/* Template Cards Grid */}
      <div className="lg:py-6 lg:px-4 flex-grow">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] lg:container lg:mx-auto">
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard />
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
      <footer className="bg-blue-600 text-white py-6 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">
            Dont See The <span className="text-yellow-300">Right Fit?</span>
          </h2>
          <p className="mb-4 text-sm">
            We update our job board every week with fresh opportunities. Set up
            job alerts to get notified when new roles match your criteria.
          </p>

          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-2 rounded text-gray-800"
            />
            <button className="bg-yellow-400 text-blue-800 font-medium py-2 px-4 rounded hover:bg-yellow-300 transition">
              Get Started
            </button>
          </div>
        </div>
      </footer><div className=""></div>
    </div>
  );
}
