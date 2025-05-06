"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Assuming you have a prisma client setup
import { ProfileSchemaType } from "@/schemas/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(id: string) {
  try {
    const cu = await auth();

    if (cu?.user.role !== "admin") {
      return {
        success: false,
        message: "You don't have access to delete the user",
      };
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
}

export async function updateUser(data: ProfileSchemaType) {
  const cu = await auth();

  if (!cu?.user.id) {
    redirect("/login");
  }

  await prisma.user.update({
    where: {
      id: cu.user.id,
    },
    data: {
      ...data,
    },
  });

  return {
    success: true,
    message: "Profile updated successfully",
  };
}
