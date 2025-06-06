import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import ActionMenu from "./actionMenu";

export const columnsSchedule = (pageIndex, pageSize) => [
  {
    accessorKey: "index",
    header: () => (
      <Button className="w-full px-0 text-center text-base" variant="ghost">
        STT
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 lowercase">
        <span className="w-full whitespace-nowrap text-center">
          {pageIndex * pageSize + row.index + 1}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên danh mục thuốc
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4">
        <span className="w-full whitespace-nowrap font-medium">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ngày tạo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return <div className="whitespace-nowrap">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "totalMedicines",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số lượng thuốc
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="">{row.original?.totalMedicines}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionMenu row={row} />,
  },
];
