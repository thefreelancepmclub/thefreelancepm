import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq = () => {
  const data = [
    {
      labale: "Question 1",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
    {
      labale: "Question 2",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
    {
      labale: "Question 3",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
    {
      labale: "Question 4",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
    {
      labale: "Question 5",
      description:
        "Lorem ipsum dolor sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
    {
      labale: "Question 6",
      description:
        "Lorem ipsum dolor lorem hello sit amet consectetur. Et velit cursus hendrerit nisi convallis pellentesque mi aliquet. Quis pretium mauris metus consectetur faucibus tellus sed neque. Neque amet consectetur scelerisque diam. Urna elementum aenean lorem natoque enim leo velit volutpat.",
    },
  ];

  return (
    <div className="container mt-12">
      <Accordion type="single" collapsible className="flex flex-col gap-7">
        {data.map((data, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="shadow-lg">
            <div>
              <AccordionTrigger className="text-[#FFA400] bg-[#004AAD] py-[18px] px-4 rounded-tl-lg rounded-tr-lg m font-semibold text-[20px]">
                {data.labale}
              </AccordionTrigger>
              <AccordionContent className="py-8 px-4 ">
                {data.description}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
