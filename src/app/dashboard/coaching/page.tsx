import { Calendar, Download, } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CoachingStats } from "./_components/coaching-stats";
import { CoachingTableContainer } from "./_components/coaching-table-container";
import Image from "next/image";

export default async function CoachingPage() {
  const cu = await auth();

  if (cu?.user.role !== "admin") redirect("/login");
  const admin = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  });
  if (admin?.grantEmail || admin?.grantId) {
    return (
      <div className="bg-[#F5F7FA]  p-6 ">
        <div className="mb-16 flex items-center justify-between ">
          <div className="flex items-center gap-5">
            <Image src="/coaching.png" width={500} height={500} alt="coaching" className="w-8 h-8"/>
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
  return (
    <div className="min-h-[600px] flex flex-col justify-center items-center gap-y-5">
      <h1 className="text-primary text-3xl font-bold">Connect Your Calendar</h1>
      <p className="max-w-2xl text-center text-muted-foreground">
        Easily integrate your calendar to sync events, schedule meetings, and
        stay organized. Click the button below to securely connect your calendar
        via OAuth.
      </p>
      <Button>
        <Link href="/api/auth/nylas" className="flex items-center gap-x-2">
          <Calendar /> Connect Calendar
        </Link>
      </Button>
    </div>
  );
}
