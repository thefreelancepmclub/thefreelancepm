import AddTemplatesPage from "@/components/shared/models/add-template-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Subscription, Template } from "@prisma/client";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { templateColumns } from "./template-columns";

interface TemplatetableContainerProps {
  data: Template[];
  subscripton: Subscription[];
}

const TemplatetableContainer = ({
  data,
  subscripton,
}: TemplatetableContainerProps) => {
  return (
    <div>
      <TableContainer
        data={data}
        columns={templateColumns}
        subscripton={subscripton}
      />
    </div>
  );
};

export default TemplatetableContainer;

interface Props {
  data: Template[];
  columns: ColumnDef<Template>[];
  subscripton: Subscription[];
}

const TableContainer = ({ data, columns, subscripton }: Props) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-3">
          <Input
            placeholder="Search..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <AddTemplatesPage
          subscription={subscripton}
          trigger={
            <Button>
              Add Template <span className="ml-1">+</span>
            </Button>
          }
        />
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  );
};
