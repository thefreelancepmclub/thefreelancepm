"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const AccountInfoFrom = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#004AAD]">Name</FormLabel>
                <div className="relative">
                  <User
                    className="absolute left-3 top-2.5 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Full Name"
                      className="pl-10 border-[#004AAD]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#004AAD]">Email</FormLabel>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Email"
                      className="pl-10 border-[#004AAD]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#004AAD]">Phone Number</FormLabel>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-2.5 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Phone Number"
                      className="pl-10 border-[#004AAD]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#004AAD]">Password</FormLabel>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-2.5 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a Password"
                      className="pl-10 pr-10 border-[#004AAD]"
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer text-[#999999]"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="rounded-full bg-[#004AAD] hover:bg-blue-700"
          >
            Update Info
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountInfoFrom;
