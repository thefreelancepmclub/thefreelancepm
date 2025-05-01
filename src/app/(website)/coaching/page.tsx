import Header from "@/components/header";
import CoachingSubmissionForm from "./_components/coaching-submission-form";
import CoachingHeaders from "./_components/coachingHeaders";

const Page = async () => {
  return (
    <div className="mb-20">
      <Header subtitile="Personalized career guidance to elevate your project management and freelance success.">
        1-on-1 Coaching with{" "}
        <span className="text-[#FFA400] underline">Ashanti Johnson</span>, PMP!{" "}
      </Header>
      <CoachingHeaders />
      <div className="mt-10">
        <CoachingSubmissionForm />
      </div>
    </div>
  );
};

export default Page;
