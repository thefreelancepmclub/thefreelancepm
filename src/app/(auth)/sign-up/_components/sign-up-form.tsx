"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { registeruser } from "@/action/authentication/registration";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema, SignUpFormValues } from "@/schemas/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") || undefined;

  // Initialize the form
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  async function onSubmit(data: SignUpFormValues) {
    startTransition(() => {
      registeruser(data).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        setLoading(true);
        toast.success(res.message);
        router.push("/sign-up/confirmation");
      });
    });
  }

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const isLoading = pending || loading;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-[24px]">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your Full Name"
                      type="text"
                      autoComplete="name"
                      className="border-primary border-[1px]  min-h-[45px] "
                      disabled={isLoading}
                      startIcon={User}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your Email"
                      type="email"
                      autoComplete="email"
                      className="border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Mail}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number field */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Enter your Phone Number"
                      type="tel"
                      autoComplete="tel"
                      className="border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Phone}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Create a Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className=" pr-10 border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Confirm a Password"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className=" pr-10 border-primary border-[1px]  min-h-[45px]"
                      disabled={isLoading}
                      startIcon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium text-gray-700"
                >
                  Remember me
                </label>
              </div>
            )}
          />

          {/* Submit button */}
          <Button
            type="submit"
            className=" min-h-[45px] w-full"
            effect="gooeyLeft"
            disabled={isLoading}
          >
            {pending
              ? "Signing Up..."
              : loading
                ? "Just a second..."
                : "Sign Up"}
          </Button>
        </form>
      </Form>

      {/* Login link */}
      <div className="text-center text-sm">
        <span className="text-gray-600">Already have Account?</span>{" "}
        <Link
          href={callback ? `/login?callback=${callback}` : "/login"}
          className="font-medium text-orange-500 hover:text-orange-600"
        >
          Sign In Here
        </Link>
      </div>
    </>
  );
}
