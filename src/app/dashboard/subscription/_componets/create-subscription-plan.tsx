"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { createSubscription } from "@/action/subscription/create";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SubscriptionCreateFormValues,
  subscriptionSchema,
} from "@/schemas/subscription";
import { ReactNode, useState, useTransition } from "react";
import { toast } from "sonner";

interface iAppProps {
  trigger: ReactNode;
}

export function AddPlanForm({ trigger }: iAppProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  // Initialize the form with default values
  const form = useForm<SubscriptionCreateFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      title: "",
      features: [""],
      price: undefined,
    },
  });

  // Handle form submission
  const handleSubmit = (data: SubscriptionCreateFormValues) => {
    startTransition(() => {
      createSubscription(data).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        setOpen(false);
        toast.success(res.message);
      });
    });
  };

  // Add a new feature field
  const addFeature = () => {
    const currentFeatures = form.getValues("features");
    form.setValue("features", [...currentFeatures, ""]);
  };

  // Remove a feature field
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features");
    if (currentFeatures.length > 1) {
      form.setValue(
        "features",
        currentFeatures.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600">
            Add New Plan
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <h3 className="text-lg font-medium">Plan Details</h3>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Plan Title:</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input placeholder="Plan Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-4 items-start gap-4">
              <FormLabel className="text-right mt-2">Features:</FormLabel>
              <div className="col-span-3 space-y-2">
                {form.watch("features").map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1 space-y-0">
                          <FormControl>
                            <Input placeholder="Feature" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={form.watch("features").length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-orange-500" />
                      <span className="sr-only">Remove feature</span>
                    </Button>
                    {index === form.watch("features").length - 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={addFeature}
                      >
                        <Plus className="h-4 w-4 text-blue-500" />
                        <span className="sr-only">Add feature</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Amount:</FormLabel>
                  <div className="col-span-3">
                    <FormControl>
                      <Input placeholder="Amount" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600"
                disabled={pending}
              >
                Save {pending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
