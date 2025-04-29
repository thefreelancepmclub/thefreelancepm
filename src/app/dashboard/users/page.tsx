import { prisma } from "@/lib/prisma";
import { getUserCountByMonth } from "./_components/data";
import { UserTableContainer } from "./_components/user-table-continaer";
import { UserGraph } from "./_components/users-graph";
import UserStats from "./_components/users-stats";

const page = async () => {
  // Calculate the date 7 days ago from today
  const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));

  const totalUser = await prisma.user.count();
  const activeUsers = await prisma.user.count({
    where: {
      isActive: true,
    },
  });
  const newUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
  });

  const usersByMonth = await getUserCountByMonth();

  const plans = await prisma.subscription.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return (
    <div className="flex-1 p-6">
      <UserStats
        totalUsers={totalUser}
        newUsers={newUsers}
        activeUsers={activeUsers}
      />

      <UserGraph data={usersByMonth} />

      <UserTableContainer plans={plans} />
    </div>
  );
};

export default page;
