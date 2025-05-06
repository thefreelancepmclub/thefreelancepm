"use client";
import logo from "@/../public/vector-icon-1.png";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

import TopPerformingPlan from "./Top-performing-plan";
import OverviewStats from "./overview-stats";
import RevenueOverTime from "./revenue-over-time";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topPerformingPlan: any[];
}

const AnalyticsDashboard = ({ topPerformingPlan }: Props) => {
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
      <OverviewStats />

      {/* Performance Charts */}
      <div className="w-full bg-[#FFFFFF] p-10 rounded-[15px] mt-5 shadow-[0px_4px_12px_0px_#0000001A]">
        <RevenueOverTime />

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

          {/* Custom Bar Chart Box */}
          {/* <div className="bg-white rounded-[15px] p-4 w-full h-full shadow-[0px_4px_12px_0px_#0000001A]">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
