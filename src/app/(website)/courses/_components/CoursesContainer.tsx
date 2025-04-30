// import { useState } from 'react';
import { Search, ChevronDown, Clock } from "lucide-react";
import CourseHeader from "./CourseHeader";
import JobRightFit from "../../jobBoard/_components/JobRightFit";

export default function CoursesContainer() {
  // Array of course card data
  const courseCards = [
    {
      id: 1,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: null,
      hours: 8,
      difficulty: "POPULAR",
      difficultyColor: "bg-green-500",
      isNew: false,
      isHot: false,
    },
    {
      id: 2,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: "$49",
      hours: 10,
      difficulty: "ADVANCED",
      difficultyColor: "bg-red-500",
      isNew: true,
      isHot: false,
    },
    {
      id: 3,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: null,
      hours: 12,
      difficulty: "INTERMEDIATE",
      difficultyColor: "bg-yellow-500",
      isNew: true,
      isHot: false,
    },
    {
      id: 4,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: "$49",
      hours: 6,
      difficulty: "POPULAR",
      difficultyColor: "bg-green-500",
      isNew: false,
      isHot: true,
    },
    {
      id: 5,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: null,
      hours: 9,
      difficulty: "BEGINNER",
      difficultyColor: "bg-green-500",
      isNew: true,
      isHot: false,
    },
    {
      id: 6,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: "$49",
      hours: 11,
      difficulty: "BEGINNER",
      difficultyColor: "bg-green-500",
      isNew: true,
      isHot: false,
    },
    {
      id: 7,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: null,
      hours: 8,
      difficulty: "POPULAR",
      difficultyColor: "bg-green-500",
      isNew: false,
      isHot: false,
    },
    {
      id: 8,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: "$59",
      hours: 10,
      difficulty: "ADVANCED",
      difficultyColor: "bg-red-500",
      isNew: true,
      isHot: false,
    },
    {
      id: 9,
      title: "Course Title",
      description: "Explore advanced concepts in managing IoT networks",
      price: null,
      hours: 12,
      difficulty: "INTERMEDIATE",
      difficultyColor: "bg-yellow-500",
      isNew: true,
      isHot: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <CourseHeader />

      {/* Search Section */}
      <div className="bg-white py-6 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for courses, topics, or skills..."
              className="w-full p-2 pl-3 pr-10 border rounded-md"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="flex flex-wrap gap-2">
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                All Level <ChevronDown size={16} className="ml-1" />
              </button>
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                All Formats <ChevronDown size={16} className="ml-1" />
              </button>
              <button className="border rounded p-2 text-sm bg-white flex items-center">
                All Duration <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
            <button className="border rounded p-2 text-sm bg-white flex items-center">
              Sort By: Newest First <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="bg-gray-50 py-6 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseCards.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-md overflow-hidden shadow-sm"
              >
                {/* Course Image Placeholder */}
                <div className="bg-gray-200 h-36 relative">
                  {course.isNew && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {course.isHot && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      HOT
                    </span>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{course.title}</h3>
                    {course.price && (
                      <span className="text-sm text-blue-600 font-medium">
                        {course.price}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-4">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <span
                      className={`text-xs text-white px-2 py-1 rounded ${course.difficultyColor}`}
                    >
                      {course.difficulty}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{course.hours} hours</span>
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition w-full">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-blue-600 text-white py-2 px-6 rounded text-sm font-medium hover:bg-blue-700 transition inline-flex items-center">
              Load More <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer - Newsletter */}
      <JobRightFit />
    </div>
  );
}
