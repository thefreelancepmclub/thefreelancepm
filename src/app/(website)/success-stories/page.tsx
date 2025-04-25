import SuccessStoriesCard from "./_components/SuccessStoriesCard";

const page = () => {
  return (
    <main className="py-12">
      <section className="container mx-auto">
        <div className="">
          <h3 className="text-[32px] text-center pb-[15px]">
            Success{" "}
            <span className="text-[#004AAD]  underline leading-[120%] font-semibold">
              Stories
            </span>
          </h3>
          <p className="text-[18px] font-primary text-center leading-[120%] font-normal">
            Hear from project managers who transformed their careers with our
            resources.
          </p>
        </div>
        <div className="grid grid-cols-3 py-[60px]">
          <SuccessStoriesCard />
          <SuccessStoriesCard />
          <SuccessStoriesCard />
        </div>
      </section>
    </main>
  );
};

export default page;
