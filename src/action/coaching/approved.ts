"use server";

import { auth } from "@/auth";
import { getGrantInfo } from "@/helper/calendar";
import { nylas } from "@/lib/nylas";
import { prisma } from "@/lib/prisma";
import { parseISO, setHours, setMinutes } from "date-fns";
import { revalidatePath } from "next/cache";

export async function approveCoaching(coachingId: string) {
  const cu = await auth();

  if (cu?.user.role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to approve this coaching session.",
    };
  }

  const coaching = await prisma.coaching.findFirst({
    where: {
      id: coachingId,
    },
  });

  if (!coaching) {
    return {
      success: false,
      message: "Coaching session not found.",
    };
  }

  const { date, time, firstName, lastName, email } = coaching;

  const { grantEmail, grantId } = await getGrantInfo();

  if (!grantEmail || !grantId) {
    return {
      success: false,
      message: "Admin calendar credentials not found.",
    };
  }

  // Combine date and time, assume `date` and `time` are strings like '2025-05-02' and '14:00'
  const coachingDate =
    typeof date === "string" ? parseISO(date) : new Date(date);

  // If time is a string like "14:30"
  const [hourStr, minuteStr] = time.split(":");
  const startDateTime = setMinutes(
    setHours(coachingDate, parseInt(hourStr)),
    parseInt(minuteStr),
  );
  const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const startTime = Math.floor(startDateTime.getTime() / 1000);
  const endTime = Math.floor(endDateTime.getTime() / 1000);

  const event = await nylas.events.create({
    identifier: grantId,
    requestBody: {
      title: `1:1 Session with Ashanti Johnson`,
      description: `This is a 30-minute  session between ${firstName} and Ashanti Johnson.
    Feel free to prepare any questions or topics in advance. Looking forward to meeting you!`,

      when: {
        startTime: startTime, // ✅ Correct key
        endTime: endTime, // ✅ Correct key
      },
      conferencing: {
        autocreate: { enabled: true },
        provider: "Google Meet",
      },
      participants: [
        {
          name: `${firstName} ${lastName}`,
          email: email,
          status: "yes",
        },
      ],
    },

    queryParams: {
      calendarId: grantEmail as string,
      notifyParticipants: true,
    },
  });

  if (!event) {
    return {
      success: false,
      message: "Failed to generate zoom link",
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conferencing: any = event.data.conferencing;

  const meetLink = conferencing.details.url;

  // send email to user with meet link

  // save zoom link to coaching session

  await prisma.coaching.update({
    where: {
      id: coachingId as string,
    },
    data: {
      meetingLink: meetLink,
    },
  });

  revalidatePath("/dashboard/coaching");

  return {
    success: true,
    message: "Coaching session approved successfully.",
  };
}
