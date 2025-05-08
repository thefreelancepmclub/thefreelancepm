"use server";

import { auth } from "@/auth";
import { getGrantInfo } from "@/helper/calendar";
import { generateZoomMeeting } from "@/helper/zoom";
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

  const zoom = await generateZoomMeeting({
    topic: `1:1 Session between ${firstName} & Ashanti Johnson`,
    agenda: `This is a 30-minute  session between ${firstName} ${lastName} and Ashanti Johnson.
    Feel free to prepare any questions or topics in advance. Looking forward to meeting you!`,
    duration: 30,
    customerEmail: email,
    startTime: startDateTime,
  });

  if (!zoom) {
    return {
      success: false,
      message: "Failed to generate zoom link",
    };
  }

  const { startUrl, joinUrl, passcode } = zoom;

  // send email to user with meet link
  // await resend.emails.send({
  //   from: "FreelanceClub PM <monir@monirhrabby.com>",
  //   to: [coaching.email as string],
  //   subject: "Google Meet Invitation:  Discussion with Ashanti Johnson, PMP",
  //   react: MeetingInvite({
  //     meetingDate: moment(coaching.date).format("MMMM Do, YYYY"),
  //     meetingTime: coaching.time,
  //     meetingId: coaching.meetingCode || undefined,
  //     meetingLink: coaching.meetingLink || undefined,
  //   }),
  // });

  // save meet link to coaching session

  await prisma.coaching.update({
    where: {
      id: coachingId as string,
    },
    data: {
      start_url: startUrl,
      join_url: joinUrl,
      pass_code: passcode,
      status: "scheduled",
    },
  });

  revalidatePath("/dashboard/coaching");

  return {
    success: true,
    message: "Coaching session approved successfully.",
  };
}
