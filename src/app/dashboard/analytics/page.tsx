import { getTopPerformingPlan } from "@/action/dashboard-analyze/top-performing-plan";
import AnalyticsDashboard from "./_components/AnalyticsDashboard";

const Page = async () => {
  const topPerformingPlan = await getTopPerformingPlan();

  return (
    <div className="bg-[#F5F7FA]">
      <AnalyticsDashboard topPerformingPlan={topPerformingPlan ?? []} />
    </div>
  );
};

export default Page;
