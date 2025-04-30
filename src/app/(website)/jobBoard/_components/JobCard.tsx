import React from "react";

const JobCard = () => {
  return (
    <div className="bg-white border rounded-[15px] overflow-hidden shadow-sm">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-[#004AAD]">
          Senior Digital Project Manager
        </h3>
        <p className="text-[#009FFD] font-medium text-sm mb-3">Agency A</p>
        <p className="text-sm text-gray-700 mb-4">
          Lead cross-functional teams for digital marketing campaigns.
          Experience with agile methodologies required.
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">Freelance</span>
          <span className="text-xs text-gray-500">Remote</span>
          <span className="text-xs font-semibold">$80-100k+</span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-[90%] mx-auto">
          <button className="bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition w-full my-3 rounded-[8px]">
            Apply Now
          </button>
        </div>

        <div className="flex justify-between px-4 py-2 text-xs text-gray-500">
          <span>Posted 3 days ago</span>
          <span>New York (Remote)</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
