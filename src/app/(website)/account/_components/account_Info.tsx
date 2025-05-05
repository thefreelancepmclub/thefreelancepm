// components/AccountInfo.tsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  PersonStanding,
  Phone,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PlanOverview from "./plan-overview";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AccountInfo() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 mt-10">
      {/* Personal Info */}
      <div className="flex-1 rounded-2xl shadow-[0px_4px_12px_0px_#0000001A] p-6 bg-white ">
        <h2 className="text-2xl font-semibold text-[#004AAD] flex items-center gap-2 mb-4">
          <span>
            <PersonStanding />
          </span>{" "}
          Personal Info
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Name"
              className="text-[16px] font-normal text-[#004AAD]"
            >
              Name
            </label>
            <div className="relative flex items-center">
              <User
                className="absolute text-[#999999] ml-3"
                width={17}
                hanging={17}
              />
              <input
                {...register("name")}
                placeholder="Enter your Full Name"
                className="w-full border pl-10  border-[#004AAD] outline-none rounded-md px-3 py-2"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Eamil"
              className="text-[16px] font-normal text-[#004AAD]"
            >
              Email
            </label>
            <div className="relative flex items-center">
              <Mail
                className="absolute text-[#999999] ml-3"
                width={17}
                hanging={17}
              />
              <input
                {...register("email")}
                placeholder="Enter your Email"
                className="w-full border pl-10  border-[#004AAD] outline-none rounded-md px-3 py-2"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Phone"
              className="text-[16px] font-normal text-[#004AAD]"
            >
              Phone Number
            </label>
            <div className="relative flex items-center">
              <Phone
                className="absolute text-[#999999] ml-3"
                width={17}
                hanging={17}
              />
              <input
                {...register("phone")}
                placeholder="Enter your Phone Number"
                className="w-full border pl-10  border-[#004AAD] outline-none rounded-md px-3 py-2"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="Password"
              className="text-[16px] font-normal text-[#004AAD]"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <Lock
                className="absolute text-[#999999] ml-3"
                width={17}
                height={17}
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Create a Password"
                className="w-full border pl-10 pr-10 border-[#004AAD] outline-none rounded-md px-3 py-2"
              />
              <div
                className="absolute right-3 cursor-pointer text-[#999999]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#004AAD] text-sm font-medium text-white px-4 py-2  rounded-full hover:bg-blue-700"
          >
            Update Info
          </button>
        </form>
      </div>

      {/* Plan Overview */}
      <PlanOverview />
    </div>
  );
}
