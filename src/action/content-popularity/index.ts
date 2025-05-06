"use server";

import { prisma } from "@/lib/prisma";

export async function getContentPopularity() {
  const now = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(now.getMonth() - 11); // Go back 11 months from now (total 12 including current)

  // Helper to format date as "Jan", "Feb", etc.
  const getMonthName = (date: Date) => {
    return date.toLocaleString("default", { month: "short" });
  };

  // Generate all 12 months starting from 11 months ago to current month
  const generateLastTwelveMonths = () => {
    const result = [];
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(currentDate);
      d.setMonth(currentDate.getMonth() - i);
      result.push(getMonthName(d));
    }

    return result;
  };

  const allMonths = generateLastTwelveMonths();

  // Fetch data from Prisma models
  const [courseData, jobData, templateData] = await Promise.all([
    prisma.userPurchasedCourse.findMany({
      where: {
        purchasedAt: {
          gte: twelveMonthsAgo,
        },
      },
      select: {
        purchasedAt: true,
      },
    }),
    prisma.userJobActivity.findMany({
      where: {
        appliedAt: {
          gte: twelveMonthsAgo,
        },
      },
      select: {
        appliedAt: true,
      },
    }),
    prisma.userPurchasedTemplate.findMany({
      where: {
        purchasedAt: {
          gte: twelveMonthsAgo,
        },
      },
      select: {
        purchasedAt: true,
      },
    }),
  ]);

  // Helper to count entries per month
  const getCountByMonth = (
    dates: { purchasedAt?: Date; appliedAt?: Date }[],
  ) => {
    const counts: Record<string, number> = {};
    dates.forEach((entry) => {
      const date = entry.purchasedAt || entry.appliedAt;
      if (!date) return;
      const month = getMonthName(date);
      counts[month] = (counts[month] || 0) + 1;
    });
    return counts;
  };

  const courseCounts = getCountByMonth(courseData);
  const jobCounts = getCountByMonth(jobData);
  const templateCounts = getCountByMonth(templateData);

  // Build final dataset
  const data = allMonths.map((month) => ({
    month,
    Courses: courseCounts[month] || 0,
    Jobs: jobCounts[month] || 0,
    Templates: templateCounts[month] || 0,
  }));

  return data;
}
