"use client";

import { createCheckoutLink } from "@/action/subscription/create";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Subscription } from "@prisma/client";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface PricingCardProps {
  plan: Subscription;
}

export default function PricingCard({ plan }: PricingCardProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onPurchase = () => {
    startTransition(() => {
      createCheckoutLink(
        plan.stripePriceId,
        plan.stripeProductId,
        plan.id
      ).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        router.push(res.checkoutUrl as string);
      });
    });
  };
  return (
    <div
      className={cn(
        "flex flex-col p-6 py-10 rounded-lg border max-w-[373px]",
        plan.isActive ? "border-blue-500 shadow-lg" : "border-gray-200"
      )}
    >
      <h3
        className={cn(
          "text-lg font-medium mb-2",
          plan.isActive ? "text-brand" : ""
        )}
      >
        {plan.title}
      </h3>

      <div className="flex items-baseline mb-6">
        <span className="text-[35px] md:text-[60px] font-bold text-[#004AAD]">
          ${plan.price}
        </span>
        <span className="text-sm text-gray-500 ml-1">{plan.type}</span>
      </div>

      <ul className="space-y-3 mb-6 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-white bg-[#004AAD] mr-2 flex-shrink-0 mt-0.5 rounded-full p-1" />
            <span className="text-sm font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        className={cn("mt-auto w-full bg-brand relative")}
        onClick={onPurchase}
        disabled={pending}
      >
        Choose Plan{" "}
        {pending && <Loader2 className="animate-spin ml-2 absolute right-3" />}
      </Button>
    </div>
  );
}
