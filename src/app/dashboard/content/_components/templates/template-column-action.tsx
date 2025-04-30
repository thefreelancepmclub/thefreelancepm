import { deleteTemplate } from "@/action/templates/delete";
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
import { Template } from "@prisma/client";
import { Eye, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Template;
}

const TemplateColumnAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    startTransition(() => {
      deleteTemplate(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
      });
    });
  };
  return (
    <div>
      <div className="flex justify-end space-x-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <a href={data.file} target="_blank">
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </a>
        </Button>

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
              <Button
                variant="destructive"
                disabled={pending}
                onClick={onDelete}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TemplateColumnAction;
