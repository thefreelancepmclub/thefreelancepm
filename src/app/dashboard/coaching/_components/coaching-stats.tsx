// import { Calendar, Users, Video } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Calendar, Users, Video } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-start justify-between p-6">
      <div>
        <p className=" text-[18px] font-medium">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
      </div>
      <div className="rounded-full bg-blue-50 p-3">
        <div className="text-primary">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export default async function CoachingStats() {
  const totalSessions = await prisma.coaching.count();
  const upcomingSessions = await prisma.coaching.count({
    where: {
      date: {
        gte: new Date(),
      },
    },
  });

  const todaySessions = await prisma.coaching.count({
    where: {
      date: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Sessions"
        value={totalSessions.toString()}
        icon={<Video className="h-6 w-6" />}
      />
      <StatCard
        title="Upcoming Sessions"
        value={upcomingSessions.toString()}
        icon={<Calendar className="h-6 w-6" />}
      />
      <StatCard
        title="Today's Sessions"
        value={todaySessions.toString()}
        icon={<Users className="h-6 w-6" />}
      />
    </div>
  );
}
