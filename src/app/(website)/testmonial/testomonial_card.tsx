"use client";

import { Testmonial } from "@prisma/client";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import SuccessStoriesCard from "../success-stories/_components/SuccessStoriesCard";

interface Props {
  data: Testmonial[];
}

export default function TestimonialCard({ data }: Props) {
  return (
    <div className="">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper pb-[100px]"
      >
        {data.map((test) => (
          <SwiperSlide key={test.id} className="mb-10">
            <SuccessStoriesCard data={test} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
