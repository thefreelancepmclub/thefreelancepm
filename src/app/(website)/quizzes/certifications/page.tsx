"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Certification,
  getRecommendedCertifications,
} from "../_components/data/certification-data";

export default function CertificationsPage() {
  const searchParams = useSearchParams();

  const pmExperience = searchParams.get("exp") || "0-1";
  const industry = searchParams.get("industry") || "technology";

  const [recommendations, setRecommendations] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentCertifications = searchParams.get("certs")?.split(",") || [];
    // Get certification recommendations
    const recommendedCerts = getRecommendedCertifications(
      industry,
      pmExperience,
      currentCertifications,
    );
    setRecommendations(recommendedCerts);
    setLoading(false);
  }, [searchParams, pmExperience, industry]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading recommendations...
      </div>
    );
  }

  // If no recommendations (they already have all relevant certifications)
  if (recommendations.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-6">
            Your Certification Recommendations
          </h1>

          <div className="mb-8">
            <p className="text-lg">
              We have no recommendations at this time. You&apos;re already
              making great strides in your project management journey—keep
              building your skills, and the perfect certification will come your
              way soon!
            </p>
          </div>

          <div className="mt-8">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Take Another Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Your certification recommendations are here!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.slice(0, 2).map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{cert.name}</h2>

              <div className="flex flex-wrap gap-2 mb-4">
                {cert.industries.map((ind) => (
                  <span
                    key={ind}
                    className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {ind}
                  </span>
                ))}
              </div>

              <p className="font-medium mb-2">Ideal for: {cert.idealFor}</p>

              <p className="text-gray-700 mb-4">{cert.description}</p>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Prerequisites:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {cert.prerequisites.map((prereq, index) => (
                    <li key={index} className="text-gray-700 text-sm">
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-600 p-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/">
          <Button variant="outline" className="mr-4">
            Take Another Quiz
          </Button>
        </Link>
        <Link href="/quiz/certification-match">
          <Button variant="outline">Retake Quiz</Button>
        </Link>
      </div>
    </div>
  );
}
