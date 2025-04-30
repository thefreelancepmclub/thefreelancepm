"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import SuccessStoriesCard from "../success-stories/_components/SuccessStoriesCard";

export function TestimonialCard() {

  const items = Array.from({ length: 5 });


  return (
    <div className="flex flex-col justify-center">
      <Carousel className="w-full mb-4">
        <CarouselContent>
          {items.map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <Card className="p-0 shadow-none border border-[#004AAD] ">
                  <CardContent className="flex aspect-square items-center justify-center ">
                    <SuccessStoriesCard />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>

    </div>
  );
}
