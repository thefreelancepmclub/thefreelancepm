"use client";

import { CustomTabs } from "@/components/ui/custom-tab";
import { DataTable } from "@/components/ui/data-table";
import { FileText } from "lucide-react";
import { useState } from "react";
import { ContentStats } from "./_components/content-stats";
import { Course, courseColumns } from "./_components/courses/course-columns";
import {
  Template,
  templateColumns,
} from "./_components/templates/template-columns";
import {
  Testimonial,
  testimonialColumns,
} from "./_components/testimonials/testimonial";

// Mock data for templates
const templateData: Template[] = [
  {
    id: "XXXXX",
    title: "######",
    category: "######",
    downloads: 185,
    status: "Archive",
    plan: "Freelancer Lite",
  },
  {
    id: "XXXXX",
    title: "######",
    category: "######",
    downloads: 177,
    status: "Published",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    title: "######",
    category: "######",
    downloads: 994,
    status: "Archive",
    plan: "Freelancer Max",
  },
  {
    id: "XXXXX",
    title: "######",
    category: "######",
    downloads: 522,
    status: "Published",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    title: "######",
    category: "######",
    downloads: 154,
    status: "Archive",
    plan: "Freelancer Lite",
  },
];

// Mock data for courses
const courseData: Course[] = [
  {
    id: "XXXXX",
    title: "Product Design and Development",
    instructor: "Chris Sparks",
    enrollments: 185,
    status: "Archive",
    plan: "Freelancer Lite",
  },
  {
    id: "XXXXX",
    title: "Neuroscience",
    instructor: "Marwa Muhammad",
    enrollments: 177,
    status: "Published",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    title: "Innovation Bootcamp: Pivot to Success",
    instructor: "Fernie",
    enrollments: 994,
    status: "Archive",
    plan: "Freelancer Max",
  },
  {
    id: "XXXXX",
    title: "Japanese Popular Culture in Cultural Globalization",
    instructor: "Rich Mironov",
    enrollments: 522,
    status: "Published",
    plan: "Freelancer Pro",
  },
  {
    id: "XXXXX",
    title: "Risk Analysis for Financial Engineering",
    instructor: "Dominick Lim, Jonathan Huang, and Armaan Shah",
    enrollments: 154,
    status: "Archive",
    plan: "Freelancer Lite",
  },
];

// Mock data for testimonials
const testimonialData: Testimonial[] = [
  {
    id: "XXXXX",
    name: "######",
    jobTitle: "######",
    star: 5,
    status: "Archive",
  },
  {
    id: "XXXXX",
    name: "######",
    jobTitle: "######",
    star: 3,
    status: "Published",
  },
  {
    id: "XXXXX",
    name: "######",
    jobTitle: "######",
    star: 2,
    status: "Archive",
  },
  {
    id: "XXXXX",
    name: "######",
    jobTitle: "######",
    star: 4,
    status: "Published",
  },
  {
    id: "XXXXX",
    name: "######",
    jobTitle: "######",
    star: 3,
    status: "Archive",
  },
];

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("templates");

  const tabs = [
    {
      id: "templates",
      label: "Templates",
      href: "/dashboard/content?tab=templates",
    },
    { id: "courses", label: "Courses", href: "/dashboard/content?tab=courses" },
    {
      id: "testimonials",
      label: "Testimonials",
      href: "/dashboard/content?tab=testimonials",
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAddContent = () => {
    console.log(`Add ${activeTab}`);
  };

  return (
    <div className=" p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-primary">
            Content Management
          </h1>
        </div>
        <CustomTabs
          tabs={tabs}
          defaultActiveTab="templates"
          onTabChange={handleTabChange}
        />
      </div>

      {activeTab === "templates" && (
        <>
          <ContentStats
            stats={[
              { title: "Total Templates", value: "###" },
              { title: "Published", value: "###" },
              { title: "Downloads", value: "###" },
            ]}
          />
          <div className="mt-6">
            <DataTable
              columns={templateColumns}
              data={templateData}
              searchKey="title"
              addButtonLabel="Add Templates"
              onAddClick={handleAddContent}
            />
          </div>
        </>
      )}

      {activeTab === "courses" && (
        <>
          <ContentStats
            stats={[
              { title: "Total Courses", value: "###" },
              { title: "Active", value: "###" },
              { title: "Enrollments", value: "###" },
            ]}
          />
          <div className="mt-6">
            <DataTable
              columns={courseColumns}
              data={courseData}
              searchKey="title"
              addButtonLabel="Add Course"
              onAddClick={handleAddContent}
            />
          </div>
        </>
      )}

      {activeTab === "testimonials" && (
        <div className="mt-6">
          <DataTable
            columns={testimonialColumns}
            data={testimonialData}
            searchKey="name"
            addButtonLabel="Add Testimonials"
            onAddClick={handleAddContent}
          />
        </div>
      )}
    </div>
  );
}
