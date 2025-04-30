import React from "react";

const JobCard = () => {
  return (
    <div className="bg-white border rounded-[15px] overflow-hidden shadow-sm lg:w-[394px] w-full">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-4 text-[#004AAD]">
          Senior Digital Project Manager
        </h3>
        <p className="text-[#009FFD] font-medium text-sm mb-3">Agency A</p>
        <div className="bg-[#EAF6FF] rounded-[10px] p-[10px] my-[15px]">
          <p className="text-lg text-[#2A2A2A]">
            Lead cross-functional teams for digital marketing campaigns.
            Experience with agile methodologies required.
          </p>
        </div>

        <div className="flex gap-[30px] items-center">
          <span className="text-sm text-[#000000] bg-[#EAF6FF] py-[5px] px-[10px] rounded-full">Freelance</span>
          <span className="text-sm text-[#000000] bg-[#EAF6FF] py-[5px] px-[10px] rounded-full">Remote</span>
          <span className="text-sm text-[#000000] bg-[#EAF6FF] py-[5px] px-[10px] rounded-full">$80-100k+</span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-[90%] mx-auto">
          <button className="bg-[#004AAD] text-white py-2 px-4 font-medium hover:bg-blue-700 transition w-full my-3 rounded-[8px]">
            Apply Now
          </button>
        </div>

        <div className="flex justify-between px-4 py-2 text-base text-[#595959] mb-2">
          <span>Posted 3 days ago</span>
          <span>New York (Remote)</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
