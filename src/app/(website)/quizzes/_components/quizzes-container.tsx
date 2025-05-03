import React from "react";
import QuizzesSearch from "./quizzes_Search";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const QuizzesContainer = () => {
  const quizData = [
    {
        id:1,
      title: "The Ultimate PM Role Quiz - Where Do You Belong?",
      description:
        "This quiz is designed to guide individuals toward the project management role that fits their personality, skill set, and passions.",
    },
    {
        id:2,
      title: "How Do You Lead? Discover Your Project Management Style!",
      description:
        "This quiz is designed to help project managers identify their leadership approach.",
    },
    {
        id:3,
      title:
        "What's Your Passion? Discover the right industry for you as a project manager!",
      description:
        "This quiz ensures aspiring and current PMs can find the right industry based on their interests and skills.",
    },
    {
        id:4,
      title:
        "Get Certified! Determine what project management certification is right for you",
      description:
        "This quiz is designed to help project managers determine the best certification based on their background, experience, and industry.",
    },
  ];
  return (
    <div>
      <QuizzesSearch />
      <div className="flex flex-col lg:flex-row gap-7">
        {/* Quiz Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
          {quizData.map((quiz, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="bg-gray-300 h-40 rounded-t-lg"></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 break-words">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {quiz.description}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg w-full">
                  TAKE QUIZ
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Right Section */}
        <div className="bg-[#F5F5F5] rounded-lg lg:w-[240px] w-full h-[300px] p-4">
          <h2 className="text-[#003366] font-semibold text-[16px] ">
            Your Progress
          </h2>
          <div>
            <div className="mt-6 flex items-center gap-2">
              <Image
                src="/progress.png"
                alt="progress.png"
                width={1000}
                height={1000}
                className="w-4 h-4"
              />
              <h3 className="text-[#333333] text-[16px] font-semibold">
                In Progress
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-[#FFFFFF] shadow-[0px_0px_0px_0px_#00000000] rounded-lg">
              <p className="py-3 px-4 text-[#666666] font-normal text-sm">
                Advanced IoT Network Security
              </p>
            </div>
          </div>
          <div>
            <div className="mt-6 flex items-center gap-2">
              <Image
                src="/progress1.png"
                alt="progress.png"
                width={1000}
                height={1000}
                className="w-4 h-4"
              />
              <h3 className="text-[#333333] text-[16px] font-semibold">
                Completed
              </h3>
            </div>
            <div className="flex items-center gap-2 mt-3 bg-[#FFFFFF] shadow-[0px_0px_0px_0px_#00000000] rounded-lg">
              <p className="py-3 px-4 text-[#666666] font-normal text-sm">
                Privacy in Smart Homes
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="flex gap-4 justify-between items-center bg-blue-700 hover:bg-blue-800 text-white  py-4 px-8 text-[16px] font-medium rounded-lg">
          Load More
          <Loader2 width={15}/>
        </button>
      </div>
    </div>
  );
};

export default QuizzesContainer;
