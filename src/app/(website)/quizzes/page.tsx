import Header from "@/components/header";
import JobRightFit from "../jobBoard/_components/JobRightFit";
import QuizzesContainer from "./_components/quizzes-container";

const page = () => {
  return (
    <div className="">
      <Header subtitile="Find the path that works for you!">
        Discover Your Project{" "}
        <span className="text-[#FFA400] underline"> Management</span> {"  "}Path
      </Header>
      <div className="container mx-auto mb-10">
        <QuizzesContainer />
      </div>
      <JobRightFit />
    </div>
  );
};

export default page;
