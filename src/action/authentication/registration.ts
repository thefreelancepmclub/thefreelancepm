"use server";
import bcrypt from "bcryptjs";

import EmailVerification from "@/email-templates/email-verification";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { signUpFormSchema, SignUpFormValues } from "@/schemas/auth";
import { manageRememberMeCookies } from "./login";

export async function registeruser(data: SignUpFormValues, callback?: string) {
  const { success, data: parsedData, error } = signUpFormSchema.safeParse(data);

  if (!success) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Check if the user already exists
  const exist = await prisma.user.findFirst({
    where: {
      email: parsedData.email,
    },
  });

  if (exist) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(parsedData.password, 10);

  try {
    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email: parsedData.email,
        password: hashedPassword,
        name: parsedData.name, // Assuming name is part of registrationSchema
        phone: parsedData.phoneNumber,
      },
    });

    const lite = await prisma.subscription.findFirst({
      where: { title: "Freelancer Lite" },
    });
    
    if (!lite) throw new Error("Lite plan not found");
    
    await prisma.userSubscription.create({
      data: {
        userId: newUser.id,
        subscriptionId: lite.id,
        status: "active",
      },
    });
    

    // Manage "Remember Me" cookies using the reusable function
    await manageRememberMeCookies(
      !!data.rememberMe,
      data.rememberMe ? data.email : undefined,
      data.rememberMe ? data.password : undefined,
    );

    // send email to the student
    await resend.emails.send({
      from: "FreelancePM Club <support@thefreelancepmclub.com>",
      to: [newUser.email as string],
      subject: "Please verify your email address",
      react: EmailVerification({
        username: newUser?.name ?? "",
        verificationUrl: `${process.env.AUTH_URL}/email-verification/${newUser.id}?callback=${callback ?? ""}`,
      }),
    });

    return {
      success: true,
      message: "Registration successfully!",
      data: newUser,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}
