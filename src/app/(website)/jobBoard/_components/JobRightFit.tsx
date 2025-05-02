import React from "react";

const JobRightFit = () => {
  return (
    <div className="bg-[#004AAD] text-white py-8 px-4 lg:h-[287px]">
      <div className="">
        <div className="mb-[60px]">
        <h2 className="text-[32px] font-semibold mb-[15px] text-center">
          Dont See The <span className="text-[#ffa400] border-b-2 border-b-[#ffa400]">Right Fit?</span>
        </h2>
        <p className="mb-4 text-base text-center">
          We update our job board every week with fresh opportunities. Set up
          job alerts to get notified when new roles match your criteria.
        </p>
        </div>

        <div className="lg:flex max-w-md flex-row mx-auto lg:gap-[30px]">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow lg:p-4 p-2.5  text-gray-800 lg:h-[52px] rounded-[15px] outline-none mr-3 lg:mr-0"
          />
          <button className="bg-[#FFFFFF] mt-3 lg:mt-0 text-blue-800 font-medium py-2 px-4 rounded-[15px] hover:bg-yellow-300 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobRightFit;
