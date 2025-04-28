"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const phoneRegex = /^\+\d{1,4}\s$$\d{3}$$\s\d{3}-\d{4}$/;

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().regex(phoneRegex, {
    message:
      "Please enter a valid phone number in the format: +1 (555) 555-5555",
  }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time" }),
  focusAreas: z.array(z.string()).refine((value) => value.length >= 1, {
    message: "Please select at least one focus area",
  }),
  notes: z.string().optional(),
});

export default function CoachingSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // In a real application, you would submit the form data to your backend
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
    }, 2000);
  }

  return (
    <div className="w-full max-w-[600px] mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Book Your Coaching Session
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">First name *</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
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
                  <FormLabel className="text-sm">Last name *</FormLabel>
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
                <FormLabel className="text-sm">Email *</FormLabel>
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
                <FormLabel className="font-inter text-[14px] font-medium leading-[16.94px] text-[#111827]">
                  Phone
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
                <FormLabel className="text-sm">Date *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
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
                <FormLabel className="text-sm">Time *</FormLabel>
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
            <FormLabel className="text-sm">
              Focus Area * (Select at least one)
            </FormLabel>
            <div className="mt-2">
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
                                      (value) => value !== area.id
                                    )
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
                <FormLabel className="text-sm">Additional Notes</FormLabel>
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm Booking"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="px-6"
            >
              Cancel Form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
