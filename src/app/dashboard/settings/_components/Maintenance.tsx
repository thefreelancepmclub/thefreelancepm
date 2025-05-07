/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ChangeMaintenance } from "@/action/site/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { maintenanceForm, MaintenanceFormType } from "@/schemas/site";
import { zodResolver } from "@hookform/resolvers/zod";
import { Setting } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Define Zod schema

interface Props {
  initialData?: Setting;
}

export default function MaintenanceForm({ initialData }: Props) {
  const [isReady, setReady] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<MaintenanceFormType>({
    resolver: zodResolver(maintenanceForm),
    defaultValues: {
      maintenanceMode: initialData?.isMaintenance ?? false,
    },
  });

  const onSubmit: any = async (values: MaintenanceFormType) => {
    startTransition(() => {
      ChangeMaintenance(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setReady(false);
      });
    });
  };

  return (
    <div className="w-full p-6 mt-[60px] shadow-[0px_4px-12px_0px_#0000001A]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="bg-white rounded-[15px]">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="text-blue-700 text-xl font-semibold">
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium text-gray-700">
                  Maintenance Mode
                </FormLabel>
                <FormField
                  control={form.control}
                  name="maintenanceMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#FFA400]"
                          aria-label="Toggle maintenance mode"
                          disabled={pending || !isReady}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-[30px] pt-[50px]">
                <Button
                  type="button"
                  className="px-4 py-2 bg-[#FFA400] text-white rounded-md"
                  onClick={() => setReady((p) => !p)}
                  disabled={pending}
                >
                  {isReady ? "Cancel" : "Update"}
                </Button>
                {isReady && (
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-[#004AAD] text-white rounded-md"
                    disabled={pending}
                  >
                    {pending ? "Saving..." : "Save"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
