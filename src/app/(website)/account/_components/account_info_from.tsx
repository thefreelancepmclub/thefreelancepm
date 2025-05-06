"use client";

import { updateUser } from "@/action/users/users";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema, ProfileSchemaType } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User as LoggedInUser } from "@prisma/client";
import { Loader2, Mail, Phone, User } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  user: LoggedInUser;
}

const AccountInfoFrom = ({ user }: Props) => {
  const [isUpdateReady, setIUpdateReady] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user?.email ?? "",
      phone: user.phone ?? "",
    },
  });

  const onSubmit = (data: ProfileSchemaType) => {
    startTransition(() => {
      updateUser(data).then((res) => {
        if (res.success) {
          toast.success(res.message);
          setIUpdateReady(false);
        }
      });
    });
  };

  const isDisabled = !isUpdateReady;

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
                    className="absolute left-3 top-2.5 z-30 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Full Name"
                      className="pl-10 border-[#004AAD]"
                      disabled={isDisabled}
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
                    className="absolute left-3 top-2.5 z-30 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Email"
                      className="pl-10 border-[#004AAD]"
                      disabled={isDisabled}
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
                    className="absolute left-3 top-2.5 z-30 text-[#999999]"
                    size={17}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your Phone Number"
                      className="pl-10 border-[#004AAD]"
                      disabled={isDisabled}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isUpdateReady && (
            <div className="flex justify-start">
              <Button
                type="button"
                className="rounded-full bg-[#004AAD] hover:bg-blue-700"
                onClick={() => setIUpdateReady((p) => !p)}
                disabled={pending}
              >
                Update Info
              </Button>
            </div>
          )}

          {isUpdateReady && (
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-full bg-[#004AAD] hover:bg-blue-700"
                disabled={pending}
              >
                Save {pending && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AccountInfoFrom;
