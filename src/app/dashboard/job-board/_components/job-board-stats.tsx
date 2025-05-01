import { Briefcase } from "lucide-react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  variant?: "default" | "published" | "expired";
}

const StatCard = ({
  title,
  value,
  icon,
  variant = "default",
}: StatCardProps) => {
  const getIconClass = () => {
    switch (variant) {
      case "published":
        return "text-green-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
        </div>
        <div className="rounded-full bg-blue-50 p-3">
          <div className={getIconClass()}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function JobBoardStats() {
  const totalJobs = await prisma.job.count();
  const totalPublished = await prisma.job.count({
    where: {
      published: true,
    },
  });
  const totalexpired = await prisma.job.count({
    where: {
      expiration: {
        lt: new Date(),
      },
    },
  });
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Jobs"
        value={totalJobs.toString()}
        icon={<Briefcase className="h-6 w-6" />}
      />
      <StatCard
        title="Published"
        value={totalPublished.toString()}
        icon={<Briefcase className="h-6 w-6" />}
        variant="published"
      />
      <StatCard
        title="Expired"
        value={totalexpired.toString()}
        icon={<Briefcase className="h-6 w-6" />}
        variant="expired"
      />
    </div>
  );
}
