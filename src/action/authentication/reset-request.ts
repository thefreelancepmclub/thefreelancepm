"use server";

import { prisma } from "@/lib/prisma";

// Helper to generate a 6-digit OTP
function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtp(email: string) {
  try {
    // Check if there is an existing reset request
    const exist = await prisma.resetReq.findFirst({
      where: {
        email,
      },
    });

    if (exist) {
      // Delete old request to avoid duplicates
      await prisma.resetReq.delete({
        where: {
          id: exist.id,
        },
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Create new reset request
    const newReq = await prisma.resetReq.create({
      data: {
        email,
        otp: Number(otp),
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // OTP valid for 10 minutes
      },
    });

    // Send OTP via email
    // await sendEmail({
    //   to: email,
    //   subject: "Password Reset OTP",
    //   html: `<p>Your OTP for resetting your password is: <strong>${otp}</strong></p>`,
    // });

    return {
      success: true,
      message: "OTP sent successfully.",
      otpId: newReq.id,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
