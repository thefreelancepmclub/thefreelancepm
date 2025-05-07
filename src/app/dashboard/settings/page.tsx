import { prisma } from "@/lib/prisma";
import GeneralForm from "./_components/GeneralFrom";
import MaintenanceForm from "./_components/Maintenance";
import SecurityForm from "./_components/SecurityFrom";

const Page = async () => {
  const settings = await prisma.setting.findFirst();
  return (
    <div className="bg-[#F5F7FA]">
      <GeneralForm initialData={settings || undefined} />
      <SecurityForm />
      <MaintenanceForm />
      {/* Add more forms as needed */}
    </div>
  );
};

export default Page;
