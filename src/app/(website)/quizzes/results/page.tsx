"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { leadershipData } from "../_components/data/leadership-data";
import { roleData } from "../_components/data/role-data";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get("role");
  const quizType = searchParams.get("type") || "role";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (roleId) {
      if (quizType === "leadership") {
        // Handle special cases for leadership quiz
        const answerCounts = JSON.parse(searchParams.get("counts") || "{}");
        // const entries = Object.entries(answerCounts);

        // Check if there's a tie or no majority
        const needsBalancedLeadership =
          checkForBalancedLeadership(answerCounts);

        if (needsBalancedLeadership) {
          // Use Balanced Leadership for ties or no clear majority
          const balancedStyle = leadershipData.find(
            (style) => style.id === "balanced",
          );
          setResult(balancedStyle);
        } else {
          // Find the leadership style based on the roleId
          const leadershipStyle = leadershipData.find(
            (style) => style.id === roleId,
          );
          setResult(leadershipStyle);
        }
      } else {
        // Find the role data based on the roleId for the role quiz
        const roleInfo = roleData.find((r) => r.id === roleId);
        setResult(roleInfo);
      }
    }
  }, [roleId, quizType, searchParams]);

  // Function to check if we need to use Balanced Leadership
  const checkForBalancedLeadership = (counts: Record<string, number>) => {
    const entries = Object.entries(counts);

    // If there are no entries, return balanced leadership
    if (entries.length === 0) return true;

    // Sort by count (highest first)
    entries.sort((a, b) => b[1] - a[1]);

    // Check for tie at the highest count
    if (entries.length > 1 && entries[0][1] === entries[1][1]) {
      return true;
    }

    // Check for no majority (all answers appear the same number of times)
    const allSameCounts = entries.every((entry) => entry[1] === entries[0][1]);
    if (allSameCounts && entries.length > 1) {
      return true;
    }

    return false;
  };

  if (!result) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading results...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-[100px]">
      <div className="bg-white rounded-lg shadow-none p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          {quizType === "leadership"
            ? "Your Ideal Leadership Style:"
            : "Your Ideal PM-Related Role:"}
        </h1>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            {result.name}
          </h2>
          <p className="text-lg text-gray-700">{result.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {quizType === "leadership"
              ? "Style Description"
              : "Role Description"}
          </h3>
          <p className="text-gray-700 mb-4">{result.longDescription}</p>
        </div>

        {quizType === "leadership" && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Best For</h3>
            <p className="text-gray-700">{result.bestFor}</p>
          </div>
        )}

        {quizType === "leadership" ? (
          <>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Pros</h3>
              <ul className="list-disc pl-5 space-y-2">
                {result.pros.map((pro: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Cons</h3>
              <ul className="list-disc pl-5 space-y-2">
                {result.cons.map((con: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-4">Common Industries</h3>
            <div className="flex flex-wrap gap-2">
              {result.industries.map((industry: string) => (
                <span
                  key={industry}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
