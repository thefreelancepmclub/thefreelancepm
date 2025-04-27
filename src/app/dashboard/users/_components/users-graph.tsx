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

interface Props {
  data: {
    month: string;
    users: number;
  }[];
}

export function UserGraph({ data }: Props) {
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
