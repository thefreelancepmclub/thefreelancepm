import { Package, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SubscriptionStats } from "./_componets/subscription-stats";
import { SubscriptionTableContainer } from "./_componets/subscription-table-container";

export default function SubscriptionPage() {
  return (
    <div className=" p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Subscription Plan</h1>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>

      {/* Subscription Stats Component */}
      <SubscriptionStats />

      {/* Subscription Table Container Component */}
      <SubscriptionTableContainer />
    </div>
  );
}
