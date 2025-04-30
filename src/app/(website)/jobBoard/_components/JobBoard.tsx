// import { useState } from 'react';
import NextGig from "./NextGig";
import JobFilter from "./JobFilter";
import JobRightFit from "./JobRightFit";

export default function JobBoard() {
  // Array of job card data
  const jobCards = [
    {
      id: 1,
      title: "Senior Digital Project Manager",
      agency: "Agency A",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 3 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 2,
      title: "Senior Digital Project Manager",
      agency: "Agency B",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 2 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 3,
      title: "Senior Digital Project Manager",
      agency: "Agency C",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 3 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 4,
      title: "Senior Digital Project Manager",
      agency: "Agency D",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 2 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 5,
      title: "Senior Digital Project Manager",
      agency: "Agency E",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 2 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 6,
      title: "Senior Digital Project Manager",
      agency: "Agency F",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 3 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 7,
      title: "Senior Digital Project Manager",
      agency: "Agency X",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 3 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 8,
      title: "Senior Digital Project Manager",
      agency: "Agency Y",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 2 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
    {
      id: 9,
      title: "Senior Digital Project Manager",
      agency: "Agency Z",
      description:
        "Lead cross-functional teams for digital marketing campaigns. Experience with agile methodologies required.",
      location: "Remote",
      timePosted: "Posted 3 days ago",
      isNew: true,
      salary: "$80-100k+",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <NextGig />

      {/* Search Section */}
      <JobFilter />

      {/* Job Cards Grid */}
      <div className="bg-gray-50 py-6 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobCards.map((job) => (
              <div
                key={job.id}
                className="bg-white border rounded-md overflow-hidden shadow-sm"
              >
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-3">
                    {job.agency}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {job.description}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-500">Freelance</span>
                    <span className="text-xs text-gray-500">Remote</span>
                    <span className="text-xs font-semibold">{job.salary}</span>
                  </div>
                </div>

                <div className="flex flex-col border-t">
                  <button className="bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition">
                    Apply Now
                  </button>

                  <div className="flex justify-between px-4 py-2 text-xs text-gray-500">
                    <span>{job.timePosted}</span>
                    <span>New York (Remote)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Newsletter */}
      <JobRightFit />
    </div>
  );
}
