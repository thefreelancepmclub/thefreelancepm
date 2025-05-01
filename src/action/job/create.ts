"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { jobFormSchema } from "@/schemas/job";
import { ExperiencesType, JobType } from "@prisma/client";
import { z } from "zod";

export async function createJob(data: z.infer<typeof jobFormSchema>) {
  const session = await auth();

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "admin") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // Parse and validate the input data
    const validatedData = jobFormSchema.parse(data);

    // Convert skills string to array
    const skillsArray = validatedData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    // Create the job in the database
    const newJob = await prisma.job.create({
      data: {
        title: validatedData.title,
        company: validatedData.company,
        type: validatedData.type as JobType,
        location: validatedData.location,
        salary: validatedData.salary,
        description: validatedData.description,
        url: validatedData.url,
        expiration: validatedData.expiration,
        skills: skillsArray,
        experienc: validatedData.experienc as ExperiencesType,
        education: validatedData.education,
        published: validatedData.published,
      },
    });

    return {
      success: true,
      message: "Job created successfully",
      data: newJob,
    };
  } catch (error) {
    console.error("Failed to create job:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation error",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "An error occurred while creating the job",
    };
  }
}
