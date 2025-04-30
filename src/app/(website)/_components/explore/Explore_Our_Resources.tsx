import React from "react";
import ExploreResourcesCard from "./ExploreResourcesCard";

const ExploreOurResources = () => {
  return (
    <div className="container mx-auto">
      <div className=" ">
        <div className="mt-12">
          <h3 className="text-[32px] text-center pb-[15px]">
            Explore Our{" "}
            <span className="text-[#004AAD]  underline leading-[120%] font-semibold">
              Resources
            </span>
          </h3>
          <p className="text-[18px] font-primary text-center leading-[120%] font-normal">
            Everything you need to succeed as a freelance project manager, all
            in one place.
          </p>
        </div>
        <div className="mt-14">
          <ExploreResourcesCard />
        </div>
      </div>
    </div>
  );
};

export default ExploreOurResources;
