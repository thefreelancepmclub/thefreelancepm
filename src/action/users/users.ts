"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Assuming you have a prisma client setup
import { revalidatePath } from "next/cache";

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
