"use server";

import { auth } from "@/auth";
import MeetingInvite from "@/email-templates/meeting-invite";
import { generateZoomMeeting } from "@/helper/zoom";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { parseISO } from "date-fns";
import moment from "moment";
import { revalidatePath } from "next/cache";

export async function approveCoaching(coachingId: string) {
  const cu = await auth();

  if (cu?.user.role !== "admin") {
    return {
      success: false,
      message: "You are not authorized to approve this coaching session.",
    };
  }

  const coaching = await prisma.coachingSession.findFirst({
    where: { id: coachingId },
    include: { user: true },     // <- add this line
  });

  if (!coaching) {
    return {
      success: false,
      message: "Coaching session not found.",
    };
  }

  const { date: rawDate, user } = coaching;
  const email      = user.email!;                // always present in your schema
  const [firstName = "", ...rest] = (user.name ?? "").split(" ");
  const lastName   = rest.join(" ");
  

  if (!rawDate) {
    return {
      success: false,
      message:
        "This coaching record has no date and/or time. Approve it only after the slot is chosen.",
    };
  }

    /* rawDate already contains the exact start-time.
       Ensure it’s a JS Date object in case Prisma is configured
       to return strings. */
    const startDateTime =
      typeof rawDate === "string" ? parseISO(rawDate) : rawDate;

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

  const { joinUrl, passcode } = zoom;

  // send email to user with meet link
  await resend.emails.send({
    from: "FreelancePM Club  <support@thefreelancepmclub.com>",
    to: [email],
    subject: "Zoom Invitation:  Discussion with Ashanti Johnson, PMP",
    react: MeetingInvite({
            meetingDate: moment(startDateTime).format("MMMM Do, YYYY"),
      meetingTime: moment(startDateTime).format("HH:mm"),
      meetingId:   passcode,   // ← from Zoom response
      meetingLink: joinUrl,    // ← from Zoom response
    }),
  });

  // save meet link to coaching session

  await prisma.coachingSession.update({
    where: {
      id: coachingId as string,
    },
    data: {
      status: "paid",
    },
  });

  revalidatePath("/dashboard/coaching");

  return {
    success: true,
    message: "Coaching session approved successfully.",
  };
}
