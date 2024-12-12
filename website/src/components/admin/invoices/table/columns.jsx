import { Button } from "@/components/ui/Button";

import { ArrowUpDown } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { getStatusPaymentStyle } from "../../appointments/utils/StatusStyle";

export const columns = (pageIndex, pageSize) => [
  {
    id: "stt",
    header: ({ column }) => (
      <Button
        className="w-fit px-0 text-left"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        STT
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full pl-5 text-left">
        {pageIndex * pageSize + row.index + 1}
      </div>
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
    accessorKey: "invoiceStatus",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const { stylePayment, textPayment } = getStatusPaymentStyle(
        row.original.status
      );
      return (
        <div
          className={`flex w-fit items-center justify-center rounded-md p-1 px-2 text-center text-xs font-bold uppercase ${stylePayment}`}
        >
          <span className="whitespace-nowrap">{textPayment}</span>
        </div>
      );
    },
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
      <div className="w-full text-center">
        <Link
          target="blank"
          to={`${import.meta.env.VITE_CUD_API_URL}/invoices/export/${row.original._id}`}
        >
          <Button variant="primary" className="flex w-fit items-center">
            Xem 
            <IoEyeSharp className="ml-1" />
          </Button>
        </Link>
      </div>
    ),
  },
];
