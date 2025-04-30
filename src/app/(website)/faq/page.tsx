import Header from "@/components/header";
import Faq from "./_components/faq";
import CommunityAction from "@/components/action/community-action";

const page = () => {
  return (
    <main className="pt-12">
      <Header subtitile="Have questions? We’ve got answers. Here’s everything you need to know about how our quiz and recommendation system works.">
        Frequently Asked PM{" "}
        <span className="text-[#FFA400] underline">Questions</span>
      </Header>
      <section className="">
        <Faq />
      </section>
      <div className="mt-44">
      <CommunityAction/>
      </div>
    </main>
  );
};

export default page;
