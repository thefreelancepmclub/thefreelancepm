import { auth } from "@/auth";
import { getSavedCards } from "@/helper/stripe";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AccountInfo from "./_components/account_Info";
import BillingInformation from "./_components/billing_Information";

const page = async () => {
  const cu = await auth();

  if (!cu?.user.id) redirect("/login");

  const user = await prisma.user.findFirst({
    where: {
      id: cu.user.id,
    },
  });

  if (!user) redirect("/login");

  const savedCards = await getSavedCards(cu.user.id);

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
            <AccountInfo user={user} />
            {savedCards.length > 0 && (
              <BillingInformation cardId={savedCards[0].id} />
            )}

            {/* <BillingHistory /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
