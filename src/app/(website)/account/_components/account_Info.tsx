"use client";

import { PersonStanding } from "lucide-react";
import PlanOverview from "./plan-overview";
import AccountInfoFrom from "./account_info_from";

export default function AccountInfo() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 mt-10">
      <div className="flex-1 rounded-2xl shadow-[0px_4px_12px_0px_#0000001A] p-6 bg-white">
        <h2 className="text-2xl font-semibold text-[#004AAD] flex items-center gap-2 mb-4">
          <PersonStanding /> Personal Info
        </h2>
        <AccountInfoFrom/>
      </div>
      <PlanOverview />
    </div>
  );
}
