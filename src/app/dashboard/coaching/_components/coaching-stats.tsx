// import { Calendar, Users, Video } from "lucide-react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";


interface StatCardProps {
  title: string;
  value: string;
  // icon: React.ReactNode;
}

const StatCard = ({ title, value,  }: StatCardProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-start justify-center p-6">
      <div>
        <p className=" text-[18px] font-medium">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
      </div>
      {/* <div className="rounded-full bg-blue-50 p-3">
        <div className="text-primary">{icon}</div>
      </div> */}
    </CardContent>
  </Card>
);

export function CoachingStats() {
 
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Sessions"
        value="###"
        // icon={<Video className="h-6 w-6" />}
      />
      <StatCard
        title="Upcoming Sessions"
        value="###"
        // icon={<Calendar className="h-6 w-6" />}
      />
      <StatCard
        title="Active Coaches"
        value="###"
        // icon={<Users className="h-6 w-6" />}
      />
    </div>
  );
}
