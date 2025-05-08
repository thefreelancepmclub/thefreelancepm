import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import CoachingStats from "./_components/coaching-stats";
import { CoachingTableContainer } from "./_components/coaching-table-container";

export default async function CoachingPage() {
  const cu = await auth();

  if (cu?.user.role !== "admin") redirect("/login");

  return (
    <div className=" p-6 ">
      <div className="mb-16 flex items-center justify-between ">
        <div className="flex items-center gap-5">
          <Image
            src="/coaching.png"
            width={500}
            height={500}
            alt="coaching"
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold">Coaching</h1>
        </div>
        {/* <Button variant="default" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button> */}
      </div>

      {/* Coaching Stats Component */}
      <CoachingStats />

      {/* Coaching Table Container Component */}
      <CoachingTableContainer />
    </div>
  );
}
