"use client";

import { subscribeToJobAlert } from "@/action/job/job-alert";
import { useRef, useTransition } from "react";
import { toast } from "sonner";

const JobRightFit = () => {
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      toast.warning("Please enter a valid email address.");
      return;
    }

    startTransition(() => {
      subscribeToJobAlert(email).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);

        if (formRef.current) {
          formRef.current.reset(); // ✅ Safe access
        }
      });
    });
  };

  return (
    <div className="bg-[#004AAD] text-white py-8 px-4 lg:h-[287px]">
      <div>
        <div className="mb-[60px]">
          <h2 className="text-[32px] font-semibold mb-[15px] text-center">
            Ready to{" "}
            <span className="text-[#ffa400] border-b-2 border-b-[#ffa400]">
              Transform
            </span>{" "}
            Your PM Career?
          </h2>
          <p className="mb-4 text-base text-center">
            We update our job board every week with fresh opportunities. Set up
            job alerts to get notified when new roles match your criteria.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="max-w-[500px] mx-auto"
        >
          <div className="lg:flex flex-row lg:gap-[30px] items-center">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="flex-grow lg:p-4 p-2.5 text-gray-800 lg:h-[52px] rounded-[15px] min-w-[300px] outline-none w-full mb-3 lg:mb-0"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#FFFFFF] w-full text-blue-800 font-medium lg:p-4 p-2.5 px-4 rounded-[15px] hover:bg-yellow-300 transition disabled:opacity-70"
            >
              {isPending ? "Subscribing..." : "Get Started"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobRightFit;
