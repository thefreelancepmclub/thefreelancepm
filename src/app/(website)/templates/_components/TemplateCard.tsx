import React from "react";

const TemplateCard = () => {
  return (
    <div className="bg-[#FFFFFF] rounded-[15px] overflow-hidden border-[1px_solid_#F2F2F2]">
      {/* Template Image Placeholder */}
      <div className="bg-gray-200 h-[216px] relative">
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          HOT
        </span>
      </div>

      {/* Template Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-xl my-[15px]">Template Title</h3>
        </div>
        <p className="text-base text-[#2A2A2A] font-normal">
          Lead cross-functional teams for digital marketing campaigns.
          Experience with agile methodologies required.
        </p>

        <div className="flex w-[75%] gap-2 mt-[30px]">
          <button className="bg-white border w-[127px] h-[37px] border-blue-600 text-blue-600 py-1 px-4 rounded text-sm font-medium hover:bg-blue-50 transition flex-1">
            Preview
          </button>
          <button className="bg-blue-600 text-white py-1 px-4 rounded text-sm font-medium hover:bg-blue-700 transition flex-1">
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
