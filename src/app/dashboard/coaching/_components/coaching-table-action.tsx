import { approveCoaching } from "@/action/coaching/approved";
import { Button } from "@/components/ui/button";
import { Coaching } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Coaching;
}
const CoachingTableAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleApprove = async () => {
    startTransition(() => {
      approveCoaching(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["Coaching"] });
      });
    });
  };

  if (data.start_url) {
    return (
      <a
        href={data.start_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Start Meeting
      </a>
    );
  }
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleApprove}
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : <Check />}
    </Button>
  );
};

export default CoachingTableAction;
