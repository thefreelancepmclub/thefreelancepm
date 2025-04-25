"use server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signUpFormSchema, SignUpFormValues } from "@/schemas/auth";

export async function registeruser(data: SignUpFormValues) {
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
