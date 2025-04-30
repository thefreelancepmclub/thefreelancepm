import AddTestmonial from "@/components/shared/models/add-testmonial-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { TablePagination } from "@/components/ui/table-pagination";
import { Subscription, Testmonial } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { testimonialColumns } from "./testimonial";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Testmonial[];
  meta: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

interface TemplatetableContainerProps {
  subscripton: Subscription[];
}

const TestmonialtableContainer = ({
  subscripton,
}: TemplatetableContainerProps) => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<ApiResponse>({
    queryKey: ["testmonial", page],
    queryFn: () =>
      fetch(`/api/dashboard/content/testmonial?page=${page}`).then((res) =>
        res.json()
      ),
  });
  return (
    <div>
      <div className="flex items-center justify-end">
        <AddTestmonial
          trigger={
            <Button>
              Add Testmonial <span className="ml-1">+</span>
            </Button>
          }
        />
      </div>
      <TableContainer
        data={data?.data ?? []}
        columns={testimonialColumns}
        subscripton={subscripton}
        pagination={data?.meta ?? {}}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default TestmonialtableContainer;

interface Props {
  data: Testmonial[];
  columns: ColumnDef<Testmonial>[];
  subscripton: Subscription[];
  pagination: {
    totalPages?: number;
    totalItems?: number;
    currentPage?: number;
    itemsPerPage?: number;
  };

  setCurrentPage: (page: number) => void;
}

const TableContainer = ({
  columns,
  data,
  pagination,
  setCurrentPage,
}: Props) => {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div>
      <DataTable columns={columns} table={table} />
      <TablePagination
        currentPage={pagination.currentPage ?? 1}
        totalPages={pagination.totalPages ?? 0}
        totalItems={pagination.totalItems ?? 0}
        itemsPerPage={pagination.itemsPerPage ?? 10}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
};
