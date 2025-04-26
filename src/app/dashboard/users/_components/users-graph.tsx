"use client";

import { LineChart as LineChartIcon } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

export function UserGraph() {
  const data = [
    { month: "Feb", users: 180 },
    { month: "Mar", users: 170 },
    { month: "Apr", users: 160 },
    { month: "May", users: 150 },
    { month: "Jun", users: 130 },
    { month: "Jul", users: 110 },
    { month: "Aug", users: 100 },
    { month: "Sep", users: 90 },
    { month: "Oct", users: 85 },
    { month: "Nov", users: 80 },
    { month: "Dec", users: 75 },
    { month: "Jan", users: 70 },
  ];

  return (
    <Card className="mt-6 w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">User Growth</h3>
        </div>
        <div className="mt-6 h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#1e40af"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
