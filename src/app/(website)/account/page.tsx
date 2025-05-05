import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AccountInfo from "./_components/account_Info";

const page = async () => {
  const cu = await auth();

  if (!cu) redirect("/login");

  return (
    <div>
      <div className="mt-32 container">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-[#004AAD]  font-semibold text-5xl">
            {" "}
            My Account
          </h1>
          <p className="text-[20px] font-normal">
            Manage your profile, subscription, saved content, and more.
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-5 mb-14">
            <AccountInfo />
            {/* <BillingInformation /> */}
            {/* <BillingHistory /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
