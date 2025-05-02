import GeneralForm from "./_components/GeneralFrom";
import MaintenanceForm from "./_components/Maintenance";
import SecurityForm from "./_components/SecurityFrom";

const Page = () => {
  return (
    <div className="bg-[#F5F7FA]">
      <GeneralForm />
      <SecurityForm />
      <MaintenanceForm />
      {/* Add more forms as needed */}
    </div>
  );
};

export default Page;
