"use client";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";

const SuccessStoriesCard = () => {
  return (
    <section className="w-[390px] p-5 border border-[#004AAD] rounded-xl felx items-center">
      <div className="flex gap-4">
        <Rating
          style={{ maxWidth: 200 }}
          value={2}
          itemStyles={{
            itemShapes: Star,
            itemStrokeWidth: 2,
            activeFillColor: "#004AAD",
            activeStrokeColor: "#004AAD",
            inactiveFillColor: "#ffffff",
            inactiveStrokeColor: "#004AAD",
          }}
          readOnly
        />
      </div>
      <p className="font-normal leading-[120%] text-[18px] pt-[15px] pb-[32px]">
        The Freelance PM Club templates saved me countless hours of preparation.
        Within three months of joining, I landed my first major client and
        haven&apos;t looked back since.
      </p>
      <div className="flex items-center gap-x-[15px]">
        <div className="h-[60px] w-[60px] object-cover relative">
          <Image
            src="https://res.cloudinary.com/drdztqgcx/image/upload/v1745577685/success_g9lyu9.png"
            alt="reviewer image"
            className="h-full w-full object-cover"
            fill
          />
        </div>
        <div>
          <h4 className="text-[#004AAD] text-[18px] font-medium leading-[120%]">
            Sarah K.
          </h4>
          <p>Digital Project Manager</p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesCard;
