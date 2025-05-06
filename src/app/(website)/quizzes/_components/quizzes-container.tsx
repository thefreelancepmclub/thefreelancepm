import { Loader2 } from "lucide-react";
import QuizzesSearch from "./quizzes_Search";

const QuizzesContainer = () => {
  const quizData = [
    {
      id: 1,
      title: "The Ultimate PM Role Quiz - Where Do You Belong?",
      description:
        "This quiz is designed to guide individuals toward the project management role that fits their personality, skill set, and passions.",
    },
    {
      id: 2,
      title: "How Do You Lead? Discover Your Project Management Style!",
      description:
        "This quiz is designed to help project managers identify their leadership approach.",
    },
    {
      id: 3,
      title:
        "What's Your Passion? Discover the right industry for you as a project manager!",
      description:
        "This quiz ensures aspiring and current PMs can find the right industry based on their interests and skills.",
    },
    {
      id: 4,
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
      </div>
      <div className="flex justify-center mt-8">
        <button className="flex gap-4 justify-between items-center bg-blue-700 hover:bg-blue-800 text-white  py-4 px-8 text-[16px] font-medium rounded-lg">
          Load More
          <Loader2 width={15} />
        </button>
      </div>
    </div>
  );
};

export default QuizzesContainer;
