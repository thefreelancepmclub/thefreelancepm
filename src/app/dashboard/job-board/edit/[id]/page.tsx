import JobForm from "@/components/shared/models/add-job-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!job) notFound();
  return (
    <div>
      <JobForm initialData={job} />
    </div>
  );
};

export default Page;
