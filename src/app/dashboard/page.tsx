import { getContentPopularity } from "@/action/content-popularity";
import ActivityAction from "./_components/activity-action";
import ContentPopularity from "./_components/content-popularity";
import Stats from "./_components/stats";

export default async function Dashboard() {
  const contentPopularity = await getContentPopularity();

  return (
    <main className="flex-1 overflow-auto p-6">
      {/* Stats Cards */}
      <Stats />

      {/* Activity and Actions */}
      <ActivityAction />

      {/* Content Popularity */}
      <ContentPopularity data={contentPopularity} />
    </main>
  );
}
