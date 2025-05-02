import { approveCoaching } from "@/action/coaching/approved";
import { Button } from "@/components/ui/button";
import { Coaching } from "@prisma/client";
import { Check, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: Coaching;
}
const CoachingTableAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();

  const handleApprove = async () => {
    startTransition(() => {
      approveCoaching(data.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
      });
    });
  };

  if (data.meetingLink) {
    return (
      <a
        href={data.meetingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Join Meeting
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
