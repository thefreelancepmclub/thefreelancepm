import { Users } from "lucide-react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-start justify-between p-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
      </div>
      <div className="rounded-full bg-blue-50 p-3">{icon}</div>
    </CardContent>
  </Card>
);

interface Props {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
}

export default function UserStats({
  totalUsers,
  newUsers,
  activeUsers,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="h-6 w-6 text-primary" />}
      />
      <StatCard
        title="New Users"
        value={newUsers}
        icon={<Users className="h-6 w-6 text-primary" />}
      />
      <StatCard
        title="Active Users"
        value={activeUsers}
        icon={<Users className="h-6 w-6 text-primary" />}
      />
    </div>
  );
}
