import { Download, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CoachingStats } from "./_components/coaching-stats";
import { CoachingTableContainer } from "./_components/coaching-table-container";

export default function CoachingPage() {
  return (
    <div className="   p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Video className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Coaching</h1>
        </div>
        <Button variant="default" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Coaching Stats Component */}
      <CoachingStats />

      {/* Coaching Table Container Component */}
      <CoachingTableContainer />
    </div>
  );
}
