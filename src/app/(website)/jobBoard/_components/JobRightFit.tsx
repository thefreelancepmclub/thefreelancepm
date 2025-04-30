import React from "react";

const JobRightFit = () => {
  return (
    <div className="bg-blue-600 text-white py-6 px-4 text-center">
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
    </div>
  );
};

export default JobRightFit;
