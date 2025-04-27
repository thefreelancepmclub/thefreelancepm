import { CreditCard, DollarSign, Package } from "lucide-react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card className="overflow-hidden">
    <CardContent className="flex items-center justify-between p-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="mt-2 text-3xl font-bold text-primary">{value}</h3>
      </div>
      <div className="rounded-full bg-blue-50 p-3">
        <div className="text-primary">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export function SubscriptionStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Plan"
        value="###"
        icon={<Package className="h-6 w-6" />}
      />
      <StatCard
        title="Active Plan"
        value="###"
        icon={<CreditCard className="h-6 w-6" />}
      />
      <StatCard
        title="Revenue (Monthly)"
        value="###"
        icon={<DollarSign className="h-6 w-6" />}
      />
    </div>
  );
}
