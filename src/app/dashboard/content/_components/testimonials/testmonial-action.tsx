import AddTestmonial from "@/components/shared/models/add-testmonial-modal";
import { Button } from "@/components/ui/button";
import { Testmonial } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";

interface Props {
  data: Testmonial;
}

const TestmonialAction = ({ data }: Props) => {
  return (
    <div className="flex justify-end space-x-2">
      <AddTestmonial
        initialData={data}
        trigger={
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">View</span>
          </Button>
        }
      />
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Trash className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
};

export default TestmonialAction;
