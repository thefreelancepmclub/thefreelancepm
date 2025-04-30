import { deleteCourse } from "@/action/course/delete";
import AddCoursePage from "@/components/shared/models/add-course-modal";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Course, Subscription } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Course;
}

const CourseColumnAction = ({ data: course }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const queryClient = useQueryClient();
  const { data } = useQuery<Subscription[]>({
    queryKey: ["subscription"],
    queryFn: () =>
      fetch("/api/dashboard/subscription").then((res) => res.json()),
  });

  const onDelete = () => {
    startTransition(() => {
      deleteCourse(course.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      });
    });
  };
  return (
    <div className="flex justify-end space-x-2">
      <AddCoursePage
        subscription={data ?? []}
        trigger={
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        }
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="destructive" onClick={onDelete} disabled={pending}>
              Continue
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CourseColumnAction;
