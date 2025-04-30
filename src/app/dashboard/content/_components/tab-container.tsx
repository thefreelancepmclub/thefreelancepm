"use client";

import { CustomTabs, Tab } from "@/components/ui/custom-tab";
import { Course, Subscription, Template } from "@prisma/client";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ContentStats } from "./content-stats";
import CoursetableContainer from "./courses/course-table-container";
import TemplatetableContainer from "./templates/template-table-container";

const tabs = [
  {
    id: "1",
    label: "Template",
  },
  {
    id: "2",
    label: "Courses",
  },
] as Tab[];

interface Props {
  subscription: Subscription[];
  templates: Template[];
  courses: Course[];
}

const TabContainer = ({ subscription, templates, courses }: Props) => {
  const [currenttab, setCurrenttab] = useState("1");
  const totalTemplateDownload = templates.reduce((acc, template) => {
    return acc + template.download;
  }, 0);

  const totalEnrolled = courses.reduce((acc, course) => {
    return acc + course.enrolled;
  }, 0);
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
                value: templates.length.toString(),
              },
              {
                title: "Published",
                value: templates.filter((i) => i.published).length.toString(),
              },
              {
                title: "Download",
                value: totalTemplateDownload.toString(),
              },
            ]}
          />

          <div className="mt-5">
            <TemplatetableContainer subscripton={subscription} />
          </div>
        </div>
      )}
      {currenttab === "2" && (
        <div className="w-full">
          <ContentStats
            stats={[
              {
                title: "Total Courses",
                value: courses.length.toString(),
              },
              {
                title: "Active",
                value: courses.filter((i) => i.published).length.toString(),
              },
              {
                title: "Enrolled",
                value: totalEnrolled.toString(),
              },
            ]}
          />

          <div className="mt-5">
            <CoursetableContainer subscripton={subscription} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContainer;
