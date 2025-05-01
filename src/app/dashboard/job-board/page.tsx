import { Briefcase, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JobBoardStats } from "./_components/job-board-stats";
import { JobBoardTableContainer } from "./_components/job-board-table-container";

export default function JobBoardPage() {
  return (
    <div className=" p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Job Board</h1>
        </div>
        <Button className="gap-1" asChild>
          <Link href="/dashboard/job-board/new">
            <Plus className="h-4 w-4" />
            Add Job
          </Link>
        </Button>
      </div>

      {/* Job Board Stats Component */}
      <JobBoardStats />

      {/* Job Board Table Container Component */}
      <JobBoardTableContainer />
    </div>
  );
}
