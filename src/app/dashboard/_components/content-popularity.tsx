"use client";
import { PieChart } from "lucide-react";
import { useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  {
    month: "Feb",
    Courses: 200,
    Jobs: 210,
    Templates: 220,
  },
  {
    month: "Mar",
    Courses: 180,
    Jobs: 200,
    Templates: 215,
  },
  {
    month: "Apr",
    Courses: 190,
    Jobs: 190,
    Templates: 210,
  },
  {
    month: "May",
    Courses: 170,
    Jobs: 180,
    Templates: 205,
  },
  {
    month: "Jun",
    Courses: 150,
    Jobs: 170,
    Templates: 200,
  },
  {
    month: "Jul",
    Courses: 130,
    Jobs: 160,
    Templates: 195,
  },
  {
    month: "Aug",
    Courses: 110,
    Jobs: 150,
    Templates: 190,
  },
  {
    month: "Sep",
    Courses: 90,
    Jobs: 140,
    Templates: 185,
  },
];

const ContentPopularity = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <Card className="mt-6 w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-primary">
              Content Popularity
            </h3>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Courses"
                stroke="#1e40af"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Jobs"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Templates"
                stroke="#fbbf24"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPopularity;
