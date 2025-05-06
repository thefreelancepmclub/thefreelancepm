import Image from "next/image";
import Link from "next/link";
import React from "react";

const ExploreResourcesCard = () => {
  const data = [
    {
      labale: "Job Board",
      description:
        "Find high-quality freelance PM opportunities vetted by our team.",
      icon: "/explore.png",
      button: "Explore Jobs",
      link: "/jobBoard",
    },
    {
      labale: "PM Templates",
      description:
        "Download ready-to-use templates for project documentation and reporting.",
      icon: "/explore1.png",
      button: "Browse Templates",
      link: "/templates",
    },
    {
      labale: "PM Courses",
      description:
        "Enhance your skills with specialized courses taught by industry experts.",
      icon: "/explore2.png",
      button: "View Courses",
      link: "/courses",
    },
    {
      labale: "Skill Quizzes",
      description:
        "Test your project management knowledge and identify areas for growth.",
      icon: "/explore3.png",
      button: "Take a Quiz",
      link: "/quizzes",
    },
  ];

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 ">
        {data.map((data, i) => (
          <div
            key={i}
            className="shadow-[0px_4px_12px_0px_#0000001A] py-5 px-5 rounded-lg"
          >
            <div className="flex flex-col items-start">
              <Image
                src={data.icon}
                alt="icon"
                width={500}
                height={500}
                className="w-10 h-10 mb-7 "
              />
              <h3 className="mb-3 text-[24px] text-[#004AAD] font-semibold">
                {data.labale}
              </h3>
              <p className="font-normal text-[20px] text-[#004AAD] ">
                {data.description}
              </p>
              <Link href={data.link} className="w-full">
                <button className="bg-[#004AAD] py-3 w-full rounded-lg text-white mt-16">
                  {data.button}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreResourcesCard;
