"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
  email: z.string().email("Please enter a valid email address"),
});

type OTPSchemaType = z.infer<typeof otpSchema>;
const OTPForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchparams = useSearchParams();

  const email = searchparams.get("email");

  useEffect(() => {
    if (!email) {
      setLoading(true);
      router.push("/reset-request");
    }
  }, [email, router]);

  const form = useForm<OTPSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      email: "",
    },
  });

  const handleSubmit = (values: OTPSchemaType) => {
    console.log({ values });
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 !mt-[36px]"
      >
        <div className="flex justify-between">
          {[...Array(6)].map((_, i) => (
            <Input
              key={i}
              id={`otp-input-${i}`}
              type="text"
              maxLength={1}
              value={form.watch("otp")[i] || ""}
              onChange={(e) => {
                form.clearErrors("otp");
                const value = e.target.value;
                if (!/^[0-9]*$/.test(value)) return;

                const currentOtp = form.getValues("otp");
                const updatedOtp =
                  currentOtp.substring(0, i) +
                  value.slice(-1) +
                  currentOtp.substring(i + 1);

                form.setValue("otp", updatedOtp);

                // Move focus to the next input
                if (value && i < 5) {
                  const nextInput = document.getElementById(
                    `otp-input-${i + 1}`
                  );
                  if (nextInput) (nextInput as HTMLInputElement).focus();
                }
              }}
              onKeyDown={(e) => {
                // Handle Backspace key to focus on the previous input
                if (e.key === "Backspace" && !form.watch("otp")[i] && i > 0) {
                  const prevInput = document.getElementById(
                    `otp-input-${i - 1}`
                  );
                  if (prevInput) {
                    (prevInput as HTMLInputElement).focus();
                    const currentOtp = form.getValues("otp");
                    const updatedOtp =
                      currentOtp.substring(0, i - 1) +
                      " " + // Clear the previous input value if needed
                      currentOtp.substring(i);
                    form.setValue("otp", updatedOtp.trim());
                  }
                }
              }}
              className={`!text-[30px] text-[#4E4E4E] !font-medium !leading-[45px] w-[43.83px] 
              lg:w-[70px] h-[70px] lg:h-[90px] text-center text-xl rounded-[12px] lg:rounded-[20px] 
              focus:outline-none  border-[1px] 
              ${
                form.formState.errors.otp
                  ? "bg-red-200/50 border-red-500/50"
                  : form.watch("otp")[i]
                  ? "border-orange-500 "
                  : "border-[#121D42] bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-base text-[#444444] font-normal leading-[19.2px]">
            Didn’t receive OTP?
          </span>
          <Button
            type="button"
            variant="link"
            className="text-gradient text-base font-normal leading-[19.2px] disabled:opacity-80 disabled:text-gray-500"
            onClick={() => {
              if (!email) {
                toast.warning(
                  "Unable to retrieve your email from the provided parameters. Please verify and try again.",
                  {
                    position: "bottom-right",
                    richColors: true,
                  }
                );
                return;
              }
              //   resendOtp({ email: email });
            }}
          >
            {true ? `Resend in ${15}s` : "Resend"}
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full min-h-[45px]"
          disabled={loading}
          effect="gooeyLeft"
        >
          {loading ? "Wait a second..." : "Verify"}
        </Button>
      </form>
    </div>
  );
};

export default OTPForm;
