"use server";

import { prisma } from "@/lib/prisma";

export async function getUserCountByMonth() {
  // Step 1: Retrieve all users with their `createdAt` timestamps
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Only consider users created this year
      },
    },
    select: {
      createdAt: true, // Retrieve only the createdAt field
    },
  });

  // Step 2: Group users by month and count them
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedData = users.reduce((acc: any, user) => {
    const month = user.createdAt.toLocaleString("default", { month: "short" }); // Extract the short month name (e.g., "Jan", "Feb")
    acc[month] = (acc[month] || 0) + 1; // Increment the count for the corresponding month
    return acc;
  }, {});

  // Step 3: Convert the grouped data into the desired format
  const formattedData = Object.keys(groupedData)
    .map((month) => ({
      month,
      users: groupedData[month],
    }))
    .sort((a, b) => {
      // Sort the months chronologically
      const monthsOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    });

  return formattedData;
}
