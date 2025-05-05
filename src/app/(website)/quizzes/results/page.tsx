"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roleData } from "../_components/data/role-data";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get("role");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [role, setRole] = useState<any>(null);

  useEffect(() => {
    if (roleId) {
      // Find the role data based on the roleId
      const roleInfo = roleData.find((r) => r.id === roleId);
      if (roleInfo) {
        setRole(roleInfo);
      }
    }
  }, [roleId]);

  if (!role) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading results...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full mt-[100px]">
      <div className="bg-white rounded-lg shadow-none p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Your Ideal PM-Related Role:
        </h1>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">{role.name}</h2>
          <p className="text-lg text-gray-700">{role.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Role Description</h3>
          <p className="text-gray-700 mb-4">{role.longDescription}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Common Industries</h3>
          <div className="flex flex-wrap gap-2">
            {role.industries.map((industry: string) => (
              <span
                key={industry}
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
