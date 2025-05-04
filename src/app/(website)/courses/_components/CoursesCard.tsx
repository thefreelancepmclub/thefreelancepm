import { courseDownload } from "@/action/course/downloadReq";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/helper/downloadFile";
import { cn, truncate } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ChartNoAxesColumnIncreasing, Clock } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface CoursesCardProps {
  data: Course;
}

const CoursesCard = ({ data }: CoursesCardProps) => {
  const [pending, startTransition] = useTransition();
  const desc = truncate(data.description, 117);

  const handleDownload = () => {
    startTransition(() => {
      courseDownload(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        } else if (res.success && res.url) {
          console.log(res);
          toast.success(res.message);
          window.location.href = res.url;
        }

        if (res.file) {
          downloadFile(res.file, data.title);
        }
      });
    });
  };
  return (
    <div className="bg-white rounded-[10px] overflow-hidden shadow-sm  border-input border-[1px]">
      {/* Course Image Placeholder */}
      {/* <div className="bg-gray-200 lg:h-[180px] h-36 relative">
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          <CircleCheckBig size={12} />
        </span>
      </div> */}

      {/* Course Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-base mb-[25px] mt-[15px]">
            {data.title}
          </h3>

          <span className="text-sm text-blue-600 font-medium"></span>
        </div>
        <p className="text-sm text-gray-700 mb-4">{desc}</p>

        <div className="flex justify-between items-center my-[50px]">
          <div
            className={cn(
              "flex items-center justify-center gap-1 px-2 py-1 rounded-full ",
              data.type === "Beginner"
                ? "bg-[#DCFCE7]"
                : data.type == "Intermediate"
                  ? "bg-[#FEF9C3]"
                  : "bg-[#FEE2E2]",
            )}
          >
            <p>
              <ChartNoAxesColumnIncreasing size={14} />
            </p>
            <p
              className={cn(
                "text-xs",
                data.type === "Beginner"
                  ? "text-[#166534]"
                  : data.type === "Intermediate"
                    ? "text-[#854D0E]"
                    : "text-[#991B1B]",
              )}
            >
              {data.type}
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={14} className="mr-1" />
            <span> 8 hours</span>
          </div>
        </div>

        <Button
          className="bg-blue-600 text-white h-[40px] py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition w-full"
          onClick={handleDownload}
          disabled={pending}
        >
          {pending ? "Downloading..." : "Download"}
        </Button>
      </div>
    </div>
  );
};

export default CoursesCard;
