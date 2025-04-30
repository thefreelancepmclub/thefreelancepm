import { Search } from 'lucide-react';

import React from "react";

const JobFilter = () => {
  return (
    <div>
      <div className="bg-white py-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search job titles, companies, or keywords..."
              className="w-full p-2 pl-3 pr-10 border rounded-md"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <select className="border rounded p-2 text-sm bg-white">
                <option>Location</option>
              </select>
              <select className="border rounded p-2 text-sm bg-white">
                <option>Job Type</option>
              </select>
              <select className="border rounded p-2 text-sm bg-white">
                <option>Experience Level</option>
              </select>
            </div>
            <select className="border rounded p-2 text-sm bg-white">
              <option>Sort By: Newest First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
