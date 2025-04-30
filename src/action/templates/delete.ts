"use server";

import { auth } from "@/auth";
import { edgeServer } from "@/lib/edgestore.config";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTemplate(templateId: string) {
  const cu = await auth();

  // Check if user is authenticated and is an admin
  if (!cu || cu.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Get the template first to access the file URL
    const template = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
    });

    if (!template) {
      return {
        success: false,
        message: "Template not found",
      };
    }

    // Step 1: Delete file from Edge Store
    if (template.file) {
      await edgeServer.publicFiles.deleteFile({
        url: template.file, // make sure this URL matches what Edge Store expects
      });
    }

    // Step 2: Delete template from the database
    await prisma.template.delete({
      where: {
        id: templateId,
      },
    });

    // Step 3: Revalidate cache
    revalidatePath("/dashboard/content"); // fix typo from "/dashboard/conten"

    return {
      success: true,
      message: "Template deleted successfully",
    };
  } catch (error) {
    console.error("Failed to delete template:", error);
    return {
      success: false,
      message: "An error occurred while deleting the template",
    };
  }
}
