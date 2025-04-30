import Image from "next/image";
import React from "react";

const MissionBenefitsCard = () => {
  const data = [
    {
      labale: "Premium Templates",
      description:
        "Save time with professionally crafted PM templates for every project type.",
      icon: "/Vector.png",
    },
    {
      labale: "Expert-Led Courses",
      description:
        "Enhance your skills with specialized courses designed for freelance PMs.",
      icon: "/Vector1.png",
    },
    {
      labale: "Exclusive Job Board",
      description:
        "Access curated freelance opportunities from trusted organizations.",
      icon: "/Vector2.png",
    },
    {
      labale: "Supportive Community",
      description:
        "Connect with like-minded professionals in our active Slack community.",
      icon: "/Vector3.png",
    },
  ];

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-7 ">
        {data.map((data, i) => (
          <div
            key={i}
            className="shadow-[0px_4px_12px_0px_#0000001A] py-5 px-5 rounded-lg"
          >
            <div className="flex flex-col items-center">
              <Image
                src={data.icon}
                alt="icon"
                width={500}
                height={500}
                className="w-10 h-10 mb-7"
              />
              <h3 className="mb-4 text-[20px] font-semibold">{data.labale}</h3>
              <p className="font-normal text-[16px] text-center">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionBenefitsCard;
