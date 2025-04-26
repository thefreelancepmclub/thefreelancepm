"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { loginFormSchema, LoginFormValues } from "@/schemas/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function loginAction(data: LoginFormValues) {
  const { success, data: parsedData, error } = loginFormSchema.safeParse(data);

  if (!success) {
    return {
      success: false,
      message: error.message,
    };
  }

  // Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.email as string,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User Not Found!",
    };
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(
    parsedData.password as string,
    user.password
  );

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Password mismatch!",
    };
  }

  try {
    await signIn("credentials", {
      email: parsedData.email,
      password: parsedData.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Login successful",
      role: user.role as Role,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message ?? "Something went wrong!",
    };
  }
}
