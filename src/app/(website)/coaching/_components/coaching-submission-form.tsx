"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { createCoaching } from "@/action/coaching/create-coaching";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { coachingSchema, CoachingSchemaType } from "@/schemas/coaching";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const focusAreas = [
  { id: "career-guidance", label: "Career Guidance" },
  { id: "resume-interview", label: "Resume & Interview Prep" },
  { id: "freelance-strategy", label: "Freelance Strategy" },
];

export default function CoachingSubmissionForm() {
  const [pending, startTransition] = useTransition();

  const form = useForm<CoachingSchemaType>({
    resolver: zodResolver(coachingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      time: "",
      focusAreas: [],
      notes: "",
    },
  });

  function onSubmit(values: CoachingSchemaType) {
    startTransition(() => {
      createCoaching(values).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        form.reset();
        if (res.checkoutUrl) {
          window.location.href = res.checkoutUrl;
        }
      });
    });
  }

  return (
    <div className="lg:container  mx-auto p-4 py-8 lg:p-12 bg-white rounded-lg shadow-[0px_4px_12px_0px_#0000001A]">
      <h1 className="text-2xl font-bold  text-[#004AAD] mb-6">
        Book Your Coaching Session
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#344054] font-medium text-sm">
                    First name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First name "
                      className="py-3 px-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#344054] font-medium text-sm">
                    Last name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#344054] font-medium text-sm">
                  Email *
                </FormLabel>
                <FormControl>
                  <Input placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#344054]">
                  Phone Number *
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter your phone number"
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[#344054] font-medium text-sm">
                  Date *
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy")
                        ) : (
                          <span>mm/dd/yyyy</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#344054] font-medium text-sm">
                  Time *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-[#344054] font-medium text-sm">
              Focus Area * (Select at least one)
            </FormLabel>
            <div className=" flex md:flex-row flex-col  mt-4 gap-4 md:gap-8">
              {focusAreas.map((area) => (
                <FormField
                  key={area.id}
                  control={form.control}
                  name="focusAreas"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={area.id}
                        className="flex flex-row items-start space-x-3 space-y-0 mb-1"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(area.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, area.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== area.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {area.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage>
              {form.formState.errors.focusAreas?.message}
            </FormMessage>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#344054] font-medium text-sm">
                  Additional Notes
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    className="resize-none h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center gap-4 pt-2">
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6"
              disabled={pending}
            >
              {pending ? "Submitting..." : "Confirm Booking"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="px-6 text-[#004AAD] border border-[#004AAD]"
            >
              Cancel Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
