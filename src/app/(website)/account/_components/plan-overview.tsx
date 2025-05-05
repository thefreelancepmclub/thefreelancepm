import { Check, Star } from "lucide-react";

const PlanOverview = () => {
  return (
    <div className="flex-1 rounded-2xl shadow-[0px_4px_12px_0px_#0000001A] p-6 bg-white">
      <h2 className="text-2xl font-semibold text-[#004AAD] flex items-center gap-2 mb-[30px]">
        <span>
          <Star />
        </span>{" "}
        Plan Overview
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl  font-semibold text-[#004AAD]">Name</h3>
        <button className="bg-[#004AAD] text-white px-[16px] py-[10px] rounded-full text-sm">
          Active
        </button>
      </div>
      <p className="mb-4 text-[18px] font-normal">Renews on 2025-05-15</p>

      <ul className=" text-[#004AAD] space-y-[15px] mt-8 mb-4 text-sm font-normal">
        <li className="flex gap-4">
          <Check /> 100+ PM Templates ($1,000 value)
        </li>
        <li className="flex gap-4">
          <Check /> 5 Premium Courses ($160 value)
        </li>
        <li className="flex gap-4">
          <Check /> Exclusive Job Board Access
        </li>
        <li className="flex gap-4">
          <Check /> Resume Templates for PM roles
        </li>
        <li className="flex gap-4">
          <Check />
          Slack Community
        </li>
        <li className="flex gap-4">
          <Check />
          Personalized Account Portal
        </li>
      </ul>

      <div className="flex justify-between items-center">
        <button className="bg-[#004AAD] text-white px-4 text-sm font-medium py-2 rounded-full hover:bg-blue-700">
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

export default PlanOverview;
