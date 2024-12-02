import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import { Checkbox } from "@/components/ui/Checkbox";

export const columns = [
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
    id: "stt",
    header: ({ column }) => (
      <Button
        className="w-fit px-0 text-left"
        variant="ghost"
        onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
      >
        STT
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full pl-5 text-left">{ row.index + 1 }</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên hợp đồng
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{row.original.title}</span>
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bác sĩ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          {row.original.doctor?.fullName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "hospital",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên chi nhánh
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full max-w-[270px]">
        <span className="w-full whitespace-nowrap">
          {row.original.hospital?.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "contractPeriod",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Thời gian hợp đồng
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          {new Date(row.original.startDate).toLocaleDateString()} -{" "}
          {new Date(row.original.endDate).toLocaleDateString()}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Địa chỉ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{row.original.address}</span>
      </div>
    ),
  },

  {
    accessorKey: "file",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tệp hợp đồng
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <a
          href={`${import.meta.env.VITE_CUD_API_URL}/contracts/export/${row.original._id}`}
          download
          target="_blank"
          className="whitespace w-full text-blue-500 underline"
        >
          {row.original.file}
        </a>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
