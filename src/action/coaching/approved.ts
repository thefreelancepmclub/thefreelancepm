"use server";

import { auth } from "@/auth";
import { getGrantInfo } from "@/helper/calendar";
import { prisma } from "@/lib/prisma";
import { parseISO, setHours, setMinutes } from "date-fns";

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

  console.log(
    { startTime, endTime, firstName, lastName, email },
    "startTime and endTime",
  );

  // const event = await nylas.events.create({
  //   identifier: grantId,
  //   requestBody: {
  //     title: `1:1 Session with Ashanti Johnson`,
  //     description: `This is a 30-minute  session between ${firstName} and Ashanti Johnson.
  //   Feel free to prepare any questions or topics in advance. Looking forward to meeting you!`,

  //     when: {
  //       startTime: startTime, // ✅ Correct key
  //       endTime: endTime, // ✅ Correct key
  //     },
  //     conferencing: {
  //       autocreate:true,
  //       provider: "Zoom Meeting",
  //     },
  //     participants: [
  //       {
  //         name: `${firstName} ${lastName}`,
  //         email: email,
  //         status: "yes",
  //       },
  //     ],
  //     calendarId: "primary",
  //     visibility: "private",
  //   },

  //   queryParams: {
  //     calendarId: grantEmail as string,
  //     notifyParticipants: true,
  //   },
  // });

  console.log(event, "event");

  if (!event) {
    return {
      success: false,
      message: "Failed to generate zoom link",
    };
  }

  // send email to user with zoom link

  // save zoom link to coaching session

  return {
    success: true,
    message: "Coaching session approved successfully.",
  };
}
