import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import ActionMenu from "./actionMenu";

export const columnsSchedule = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
          {row.index + 1}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "medicineCode",
    header: ({ column }) => (
      <Button
        className="px-0"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Mã Thuốc
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="gap-3 py-4">
        <span className="w-full whitespace-nowrap text-center">
          {row.original.medicineCode}
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
        Tên thuốc
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
    accessorKey: "medicineCategory._id",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Danh mục
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="">{row.original?.medicineCategory.name || "null"}</div>
    ),
  },
  {
    accessorKey: "unit",
    header: () => (
      <Button className="px-0 text-base" variant="ghost">
        Dạng thuốc
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.unit} - {row.original.type}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionMenu row={row} />,
  },
];
