import { auth } from "@/auth";
import { getCurrentSubscription } from "@/helper/subscription";
import { redirect } from "next/navigation";
import AccountInfo from "./_components/account_Info";
import BillingHistory from "./_components/billing_History";
import BillingInformation from "./_components/billing_Information";

const page = async () => {
  const cu = await auth();

  if (!cu) redirect("/login");
  const subscriptionData = await getCurrentSubscription(cu.user.id as string);

  console.log("subscriptionData", subscriptionData);
  console.log("total templates", subscriptionData?.getFeature("templates"));

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
            <BillingInformation />
            <BillingHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
