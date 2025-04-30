"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { ReactNode, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { editTestimonial } from "@/action/testmonial/edit";
import { createTestimonial } from "@/action/testmonial/testmonial";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  testimonialCreateSchema,
  TestimonialCreateType,
} from "@/schemas/testmonial";
import { Testmonial } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  trigger: ReactNode;
  initialData?: Testmonial;
}

export default function AddTestmonial({ trigger, initialData }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  // Initialize the form
  const form = useForm<TestimonialCreateType>({
    resolver: zodResolver(testimonialCreateSchema),
    defaultValues: {
      fullName: initialData?.fullName ?? "",
      jobTitle: initialData?.jobTitle ?? "",
      message: initialData?.message ?? "",
      rating: initialData?.rating.toString() ?? "",
      active: initialData?.active ?? false,
    },
  });

  // Handle form submission
  async function onSubmit(values: TestimonialCreateType) {
    startTransition(() => {
      if (initialData) {
        editTestimonial(initialData.id, values).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          toast.success(res.message);
          form.reset();
          setOpen(false);

          queryClient.invalidateQueries({ queryKey: ["testmonial"] });
        });
      } else {
        createTestimonial(values).then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          toast.success(res.message);
          form.reset();
          setOpen(false);

          queryClient.invalidateQueries({ queryKey: ["testmonial"] });
        });
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-blue-600">
            Add Testmonial
          </AlertDialogTitle>
          <AlertDialogCancel className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <FormLabel className="text-right">Full Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <FormLabel className="text-right">Job Title:</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[100px_1fr] items-start gap-4">
                  <FormLabel className="text-right pt-2">Message:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Your testimonial message..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="grid grid-cols-[100px_1fr] items-center gap-4">
                  <FormLabel className="text-right">Rating:</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                          {value} Star{value > 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 ml-[100px]">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Publish Now</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <AlertDialogCancel asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-amber-500 hover:bg-amber-600 text-white border-0"
                >
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={pending}
              >
                {initialData ? "Save" : "Create"}{" "}
                {pending && <Loader2 className="animate-spin ml-2" />}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
