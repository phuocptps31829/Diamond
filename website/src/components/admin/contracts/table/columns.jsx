import { Button } from "@/components/ui/Button";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";
import { Link } from "react-router-dom";

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
        <Link
          to={`${import.meta.env.VITE_CUD_API_URL}/contracts/export/${row.original._id}`}
        >
          <Button variant="primary" className="w-fit">
            Tải xuống
            <svg
              className="ml-1 size-4"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>{" "}
          </Button>
        </Link>
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <Action row={row} />,
  },
];
