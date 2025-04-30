"use client";

import { CustomTabs, Tab } from "@/components/ui/custom-tab";
import { Subscription } from "@prisma/client";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ContentStats } from "./content-stats";
import TemplatetableContainer from "./templates/template-table-container";

const tabs = [
  {
    id: "1",
    label: "Template",
  },
] as Tab[];

interface Props {
  subscription: Subscription[];
}

const TabContainer = ({ subscription }: Props) => {
  const [currenttab, setCurrenttab] = useState("1");
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-primary">
            Content Management
          </h1>
        </div>
        <CustomTabs
          tabs={tabs}
          defaultActiveTab="1"
          onTabChange={(p) => setCurrenttab(p)}
        />
      </div>

      {currenttab === "1" && (
        <div className="w-full">
          <ContentStats
            stats={[
              {
                title: "Total Template",
                value: "100",
              },
              {
                title: "Published",
                value: "100",
              },
              {
                title: "Download",
                value: "100",
              },
            ]}
          />

          <div className="mt-5">
            <TemplatetableContainer subscripton={subscription} data={[]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContainer;
