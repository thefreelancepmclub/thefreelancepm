import React from "react";
import MissionBenefitsCard from "./Mission&BenefitsCard";

const OurMisson = () => {
 
  return (
    <div className="container mx-auto">
      <div className="mt-12">
        <h3 className="text-[32px] text-center pb-[15px]">
          Our{" "}
          <span className="text-[#004AAD]  underline leading-[120%] font-semibold">
            Mission
          </span>{" "}
          & Benefits
        </h3>
        <p className="text-[18px] font-primary text-center leading-[120%] font-normal">
          We empower project managers to thrive as freelancers through
          resources, community, and expert guidance.
        </p>
      </div>
      <div className="mt-14">
        <MissionBenefitsCard/>
      </div>
    </div>
  );
};

export default OurMisson;
