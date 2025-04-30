import { prisma } from "@/lib/prisma";
import TabContainer from "./_components/tab-container";

const Page = async () => {
  const subscripton = await prisma.subscription.findMany();
  const templates = await prisma.template.findMany();
  return (
    <div className="p-6">
      <TabContainer subscription={subscripton ?? []} templates={templates} />
    </div>
  );
};

export default Page;
