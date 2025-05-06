import CommunityAction from "@/components/action/community-action";
import Header from "@/components/header";
import TestomonialBoady from "./_components/testomonialBoady";

const page = () => {
  return (
    <div className="mt-20">
      <Header subtitile="Real stories from project managers who leveled up their careers">
        What Our <span className="text-[#FFA400] underline">Members</span>{" "}
        Say{" "}
      </Header>
      <TestomonialBoady />
      <CommunityAction />
    </div>
  );
};

export default page;
