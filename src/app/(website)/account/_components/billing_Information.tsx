"use client";

import { Button } from "@/components/ui/button";
import { removeCard } from "@/helper/stripe";
import { File, Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface BillingInformationProps {
  cardId: string;
}

const BillingInformation: React.FC<BillingInformationProps> = ({ cardId }) => {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(() => {
      removeCard(cardId).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  };

  return (
    <div className="shadow-[0px_4px_12px_0px_#0000001A] rounded-lg">
      <div className="p-[30px]">
        <div className="flex flex-col items-center lg:flex-row gap-4 mb-7 ">
          <File className="text-[#004AAD]" />
          <h1 className="text-[#004AAD] font-semibold text-[24px]">
            Billing Information
          </h1>
        </div>
        <div className="bg-[#EFF6FF] rounded-xl">
          <div className=" flex justify-between items-center py-[22px] px-4 ">
            <h3 className="text-2xl font-semibold text-[#004AAD]">
              Payment Card
            </h3>
            <Button
              className="py-3 px-6 bg-[#004AAD] hover:bg-[#004bade0] rounded-xl text-white text-[16px] font-medium"
              onClick={handleRemove}
              disabled={isPending}
            >
              Remove Card {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
