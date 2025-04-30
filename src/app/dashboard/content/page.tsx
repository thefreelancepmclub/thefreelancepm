import { prisma } from "@/lib/prisma";
import TabContainer from "./_components/tab-container";

const Page = async () => {
  const subscripton = await prisma.subscription.findMany();
  const templates = await prisma.template.findMany();
  const course = await prisma.course.findMany();
  return (
    <div className="p-6">
      <TabContainer
        subscription={subscripton ?? []}
        templates={templates}
        courses={course}
      />
    </div>
  );
};

export default Page;
