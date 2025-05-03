// components/AccountInfo.tsx

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PersonStanding,
  Phone,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";

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

          <div >
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
      <div className="flex-1 rounded-2xl shadow-[0px_4px_12px_0px_#0000001A] p-6 bg-white">
        <h2 className="text-2xl font-semibold text-[#004AAD] flex items-center gap-2 mb-[30px]">
          <span>
            <Star />
          </span>{" "}
          Plan Overview
        </h2>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl  font-semibold text-[#004AAD]">
            Freelancer Pro
          </h3>
          <button className="bg-[#004AAD] text-white px-[16px] py-[10px] rounded-full text-sm">
            Active
          </button>
        </div>
        <p className="mb-4 text-[18px] font-normal">Renews on 2025-05-15</p>

        <ul className=" text-[#004AAD] space-y-[15px] mt-8 mb-4 text-sm font-normal">
          <li className="flex gap-4">
            <Check /> 100+ PM Templates ($1,000 value)
          </li>
          <li className="flex gap-4">
            <Check /> 5 Premium Courses ($160 value)
          </li>
          <li className="flex gap-4">
            <Check /> Exclusive Job Board Access
          </li>
          <li className="flex gap-4">
            <Check /> Resume Templates for PM roles
          </li>
          <li className="flex gap-4">
            <Check />
            Slack Community
          </li>
          <li className="flex gap-4">
            <Check />
            Personalized Account Portal
          </li>
        </ul>

        <div className="flex justify-between items-center">
          <button className="bg-[#004AAD] text-white px-4 text-sm font-medium py-2 rounded-full hover:bg-blue-700">
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
