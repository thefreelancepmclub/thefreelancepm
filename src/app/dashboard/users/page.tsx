import { UserTableContainer } from "./_components/user-table-continaer";
import { UserGraph } from "./_components/users-graph";
import UserStats from "./_components/users-stats";

const page = () => {
  return (
    <div className="flex-1 p-6">
      <UserStats />

      <UserGraph />

      <UserTableContainer />
    </div>
  );
};

export default page;
