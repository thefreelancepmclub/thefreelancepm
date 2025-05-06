"use client";
import logo from "@/../public/vector-icon-1.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  // YAxis,
  CartesianGrid,
  Line,
  // BarChart,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  // Bar,
  XAxis,
} from "recharts";

import TopPerformingPlan from "./Top-performing-plan";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topPerformingPlan: any[];
}

const AnalyticsDashboard = ({ topPerformingPlan }: Props) => {
  const [overviewTimeframe, setOverviewTimeframe] = useState("weekly");
  const [performanceTimeframe, setPerformanceTimeframe] = useState("weekly");

  const days = [
    { day: "Sat", value: 30 },
    { day: "Sun", value: 70 },
    { day: "Mon", value: 30 },
    { day: "Tue", value: 50 },
    { day: "Wed", value: 15 },
    { day: "Thu", value: 80 },
    { day: "Fri", value: 60 },
  ];

  // Data for overview stats
  const overviewStats = [
    { title: "Total Revenue", value: "$123,456" },
    { title: "Active Subscriptions", value: "3,789" },
    { title: "New Users", value: "1,234" },
    { title: "Total Applications", value: "5,678" },
    { title: "Churn Rate", value: "2.3%" },
    { title: "ARPU", value: "$32.50" },
  ];

  // Data for Revenue Over Time chart
  const revenueTimeData = [
    { day: "Sat", value: 1000 },
    { day: "Sun", value: 1500 },
    { day: "Mon", value: 2000 },
    { day: "Tue", value: 2500 },
    { day: "Wed", value: 2300 },
    { day: "Thu", value: 2700 },
    { day: "Fri", value: 3000 },
  ];

  // Data for User Growth chart
  const userGrowthData = [
    { day: "Sat", lineValue: 500, barValue: 80 },
    { day: "Sun", lineValue: 300, barValue: 60 },
    { day: "Mon", lineValue: 600, barValue: 120 },
    { day: "Tue", lineValue: 400, barValue: 90 },
    { day: "Wed", lineValue: 500, barValue: 110 },
    { day: "Thu", lineValue: 450, barValue: 85 },
    { day: "Fri", lineValue: 400, barValue: 100 },
  ];

  return (
    <div className="w-full  space-y-[60px] p-4">
      {/* Analytics Header */}
      <div className="flex justify-between items-center my-[35px]">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            width={100}
            height={100}
            alt="logo"
            className="w-7 h-7"
          />
          <h1 className="text-[32px] font-bold text-[#004AAD]">Analytics</h1>
        </div>
        <Button
          variant="outline"
          className="flex items-center text-white gap-2 bg-[#004AAD]"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Top Performing Plans Section */}
      <TopPerformingPlan data={topPerformingPlan} />

      {/* Overview Stats */}
      <div className="w-full bg-[#FFFFFF] p-10 rounded-[15px] shadow-[0px_4px_12px_0px_#0000001A]">
        <div className="flex justify-between items-center mb-[35px]">
          <h2 className="text-[24px] font-medium text-[#004AAD]">
            Overview Stats
          </h2>
          <Select
            value={overviewTimeframe}
            onValueChange={setOverviewTimeframe}
          >
            <SelectTrigger className="w-32 bg-[#004AAD] text-white">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overviewStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6 bg-[#F5F7FA] text-center">
                <div className="text-[18px] font-medium text-[#000000] mb-[20px]">
                  {stat.title}
                </div>
                <div className="text-[40px] font-bold text-[#004AAD] mt-2">
                  ###
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="w-full bg-[#FFFFFF] p-10 rounded-[15px] mt-5 shadow-[0px_4px_12px_0px_#0000001A]">
        <div className="flex justify-between items-center mb-[30px]">
          <h2 className="text-[24px] text-[#004AAD] font-medium">
            Performance Charts
          </h2>
          <Select
            value={performanceTimeframe}
            onValueChange={setPerformanceTimeframe}
          >
            <SelectTrigger className="w-32 bg-[#004AAD] text-white">
              <SelectValue placeholder="Weekly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Revenue Over Time Chart */}
        <Card className="mb-4 shadow-[0px_4px_12px_0px_#0000001A]">
          <CardHeader className="pb-0">
            <div className="flex justify-between items-center mb-[20px]">
              <CardTitle className="text-md font-medium">
                Revenue Over Time
              </CardTitle>
              <div className="font-bold">$XXX</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueTimeData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  {/* <YAxis /> */}
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-[0px_4px_12px_0px_#0000001A]">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center mb-6">
                <CardTitle className="text-md font-medium">
                  User Growth
                </CardTitle>
                <div className="font-bold">##</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="lineValue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-500 font-bold">#################</div>
              <div className="text-gray-800">$xxx</div>
            </div>

            <div className="flex justify-between items-end h-64 w-full mt-4">
              {days.map((day, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div className="relative w-3 h-40 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-blue-600 rounded-full"
                      style={{ height: `${day.value}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-gray-700">{day.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-8">
          {/* Line Chart Card */}
          <Card className="shadow-[0px_4px_12px_0px_#0000001A] h-full">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center mb-6">
                <CardTitle className="text-md font-medium">
                  User Growth
                </CardTitle>
                <div className="font-bold">##</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    {/* <YAxis /> */}
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="lineValue"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Custom Bar Chart Box */}
          <div className="bg-white rounded-[15px] p-4 w-full h-full shadow-[0px_4px_12px_0px_#0000001A]">
            <div className="flex justify-between items-center mb-2">
              <div className="text-base font-normal">#################</div>
              <div className="text-black  text-base font-normal">$xxx</div>
            </div>

            <div className="flex justify-between items-end h-64 w-full mt-4">
              {days.map((day, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <div className="relative w-3 h-40 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-blue-600 rounded-full"
                      style={{ height: `${day.value}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-gray-700">{day.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
