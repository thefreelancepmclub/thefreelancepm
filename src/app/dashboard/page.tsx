import ActivityAction from "./_components/activity-action";
import ContentPopularity from "./_components/content-popularity";
import Stats from "./_components/stats";

export default async function Dashboard() {
  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Stats Cards */}
      <Stats />

      {/* Activity and Actions */}
      <ActivityAction />

      {/* Content Popularity */}
      <ContentPopularity />
    </main>
  );
}
