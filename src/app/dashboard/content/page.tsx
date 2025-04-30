import { prisma } from "@/lib/prisma";
import TabContainer from "./_components/tab-container";

const Page = async () => {
  const subscripton = await prisma.subscription.findMany();
  return (
    <div className="p-6">
      <TabContainer subscription={subscripton ?? []} />
    </div>
  );
};

export default Page;
