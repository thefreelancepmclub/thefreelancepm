"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format as fmt } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";

import { InlineWidget } from "react-calendly";

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
import { needsDateTime } from "@/lib/booking/logic";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { coachingSchema, CoachingSchema } from "@/schemas/coaching";
import { toast } from "sonner";
import { createCoaching } from "@/action/coaching/create-coaching";
import type { Resolver } from "react-hook-form";

/*****************************************************************
 * Helpers
 *****************************************************************/

async function fetchFreeRemaining(): Promise<boolean> {
  try {
    const r = await fetch("/api/coaching/freeRemaining");
    if (!r.ok) throw new Error();
    const { freeRemaining } = await r.json();
    return !!freeRemaining;
  } catch {
    return false; // safe default
  }
}

const toDateStr = (d?: Date | null) => (d ? fmt(d, "yyyy-MM-dd") : undefined);

/*****************************************************************
 * Static data
 *****************************************************************/

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const focusAreas = [
  { id: "career-guidance", label: "Career Guidance" },
  { id: "resume-interview", label: "Resume & Interview Prep" },
  { id: "freelance-strategy", label: "Freelance Strategy" },
];

type Tier = "lite" | "pro" | "elite" | "free";
type Sess = "consultation" | "coaching";

/*****************************************************************
 * Component
 *****************************************************************/

export default function CoachingSubmissionForm() {
  /* ─── Remote state ───────────────────────────── */
  const [userTier, setUserTier] = useState<Tier | null>(null);
  const [tierLoaded, setTierLoaded] = useState(false);
  const [freeRemaining, setFreeRemaining] = useState(false);
  const [freeLoaded, setFreeLoaded] = useState(false);

  /* ─── UI state ───────────────────────────────── */
  const [showScheduler, setShowScheduler] = useState(false);
  const [calUrl, setCalUrl] = useState<string | null>(null);
  const calWrapperRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  /* ─── Get tier + free flag on mount ──────────── */
  useEffect(() => {
    (async () => {
      try {
        const sub = await fetch("/api/currentSubscription").then(r => r.json());
        const tier = (sub?.data?.tier as Tier) ?? "lite";
        setUserTier(tier);

        if (tier === "elite") setFreeRemaining(await fetchFreeRemaining());
      } finally {
        setTierLoaded(true);
        setFreeLoaded(true); // non-elite immediately true
      }
    })();
  }, []);

  /* ─── Form setup ─────────────────────────────── */
   const form = useForm<CoachingSchema>({
       resolver: zodResolver(coachingSchema) as Resolver<CoachingSchema>,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      time: "",
      focusAreas: [],
      notes: "",
      sessionType: "consultation",
    },
  });

  const sessionType: Sess = form.watch("sessionType");

  /* ─── Refresh free flag when needed ──────────── */
  useEffect(() => {
    if (userTier === "elite" && sessionType === "coaching") {
      fetchFreeRemaining().then(setFreeRemaining);
    }
  }, [userTier, sessionType, showScheduler]);

  /* ─── Do we need date/time pickers? ──────────── */
  const needsSlot = useMemo(
    () => needsDateTime(userTier ?? "lite", sessionType, freeRemaining, false),
    [userTier, sessionType, freeRemaining],
  );

  /* ─── Scroll Calendly into view ─────────────── */
  useEffect(() => {
    if (showScheduler && calWrapperRef.current) {
      calWrapperRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showScheduler]);

  /* ─── Submit handler ─────────────────────────── */
  async function onSubmit(values: CoachingSchema) {
    setApiError(null);
    setLoading(true);

    const needsSlotNow = needsDateTime(userTier ?? "lite", sessionType, freeRemaining, false);
      // user might click “Confirm” without picking slot → stop here
  if (needsSlotNow && (!values.date || !values.time)) {
    toast.error("Please select a date and time.");
    return;
  }

  const payload: Record<string, unknown> = { ...values };
    if (needsSlotNow) {
      payload.date = toDateStr(values.date);
      payload.time = values.time;
    } else {
      delete payload.date;
      delete payload.time;
    }
    console.log({ needsSlotNow, freeRemaining, payload });
    try {
      console.log("▶ payload leaving browser", payload);
      const res = await createCoaching(payload as any);

      if (!res.success) {
        setApiError(res.message);
        return;
      }

      toast.success(res.message);

      if (res.calendlyUrl) {
        setCalUrl(res.calendlyUrl);
        setShowScheduler(true);
        if (userTier === "elite") setFreeRemaining(false); // consume free slot
        return;
      }

      if (res.checkoutUrl) window.location.href = res.checkoutUrl;
    } catch (err) {
      setApiError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  /* ─── Guard render until remote data ready ───── */
  if (!(tierLoaded && freeLoaded)) {
    return <p className="py-8 text-center">Loading subscription…</p>;
  }

  /*****************************************************************
   * Render
   *****************************************************************/
  return (
    <div className="lg:container mx-auto p-4 py-8 lg:p-12 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-[#004AAD] mb-6">
        Book Your Coaching Session
      </h1>

      {apiError && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {apiError}
        </p>
      )}

      {/* ─────── FORM ─────── */}
      {!showScheduler && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
            {/* PERSONAL */}
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
                      <Input placeholder="First name" className="py-3 px-4" {...field} />
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

            {/* EMAIL */}
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

            {/* PHONE */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-inter text-sm font-medium text-[#344054]">
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder="Enter your phone number"
                      defaultCountry="TR"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DATE */}
            {needsSlot && (
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
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? fmt(field.value, "MM/dd/yyyy")
                              : "mm/dd/yyyy"}
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
            )}

            {/* SESSION TYPE */}
            <FormField
              control={form.control}
              name="sessionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#344054] font-medium text-sm">
                    Session Type *
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Session Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consultation">
                        Free Consultation&nbsp;(30&nbsp;min)
                      </SelectItem>
                      <SelectItem value="coaching">
                        Coaching&nbsp;Session&nbsp;(60&nbsp;min&nbsp;– $50)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TIME */}
            {needsSlot && (
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#344054] font-medium text-sm">
                      Time *
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* FOCUS AREA */}
            <div>
              <FormLabel className="text-[#344054] font-medium text-sm">
                Focus Area * (Select at least one)
              </FormLabel>
              <div className="flex md:flex-row flex-col mt-4 gap-4 md:gap-8">
                {focusAreas.map((area) => (
                  <FormField
                    key={area.id}
                    control={form.control}
                    name="focusAreas"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 mb-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(area.id)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...(field.value || []), area.id])
                                : field.onChange(
                                    field.value?.filter((v) => v !== area.id),
                                  )
                            }
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {area.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage>
                {form.formState.errors.focusAreas?.message}
              </FormMessage>
            </div>

            {/* NOTES */}
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

            {/* CTA */}
            <div className="flex justify-center gap-4 pt-2">
              <Button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6"
                disabled={loading}
              >
                {loading ? "Booking…" : "Confirm Booking"}
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
      )}

      {/* ─────── CALENDLY ─────── */}
      {showScheduler && calUrl && (
        <div ref={calWrapperRef} role="region">
          <InlineWidget
            url={calUrl}
            styles={{ height: "700px" }}
            prefill={{
              name: `${form.getValues("firstName") ?? ""} ${
                form.getValues("lastName") ?? ""
              }`.trim(),
              email: form.getValues("email") ?? "",
            }}
          />
        </div>
      )}
    </div>
  );
}
