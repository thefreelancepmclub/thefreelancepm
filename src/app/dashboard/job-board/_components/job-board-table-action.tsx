import { deleteJob } from "@/action/job/delete";
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
import { Job } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  job: Job;
}

const JobBordTableAction = ({ job }: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const onDelete = () => {
    startTransition(() => {
      deleteJob(job.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["job"] });
      });
    });
  };
  return (
    <div className="flex justify-end space-x-1">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Link href={`/dashboard/job-board/edit/${job.id}`}>
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Link>
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
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

export default JobBordTableAction;
