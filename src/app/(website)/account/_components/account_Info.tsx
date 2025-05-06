"use client";

import { User } from "@prisma/client";
import { PersonStanding } from "lucide-react";
import AccountInfoFrom from "./account_info_from";
import PlanOverview from "./plan-overview";

interface Props {
  user: User;
}

export default function AccountInfo({ user }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 mt-10">
      <div className="flex-1 rounded-2xl shadow-[0px_4px_12px_0px_#0000001A] p-6 bg-white">
        <h2 className="text-2xl font-semibold text-[#004AAD] flex items-center gap-2 mb-4">
          <PersonStanding /> Personal Info
        </h2>
        <AccountInfoFrom user={user} />
      </div>
      <PlanOverview />
    </div>
  );
}
