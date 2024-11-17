import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import { formatCurrency } from "@/utils/format";

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
    accessorKey: "invoiceCode",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mã hóa đơn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 font-medium">
        <span className="block">{row.original.invoiceCode}</span>
      </div>
    ),
  },
  {
    accessorKey: "patient.fullName",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên bệnh nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 font-medium">
        <span className="block">{row.original.patient.fullName}</span>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tổng tiền
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 font-medium">
        <span className="block">{formatCurrency(row.original.price)}</span>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 font-medium">
        <span className="block">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </span>
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
        Tệp hóa đơn
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <a
          href={`${import.meta.env.VITE_CUD_API_URL}/invoices/export?id=${row.original._id}`}
          download
          target="_blank"
          className="whitespace w-full text-blue-500 underline"
        >
          {row.original.invoiceCode}
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
