import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ (value) => row.toggleSelected(!!value) }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "patient",
    header: ({ column }) => (
      <div className="w-full text-left ml-2">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Bệnh nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium flex items-center py-3 gap-3">
        <div className="ml-2 flex w-full items-center">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
          <span className="ml-2 w-full whitespace-nowrap">
            { row.original.patient }
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Bác sĩ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.doctor }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Dịch vụ/Gói khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.service }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "examType",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Loại khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.examType }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "examTime",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Thời gian khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.examTime }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.status }
        </span>
      </div>
    ),
  },
  {
    accessorKey: "payment",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className=" w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.payment }
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-0 text-base"
              variant="ghost" className="h-8 w-8 p-0 rotate-90">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="w-full flex items-center gap-2">
              <BiDetail className="text-[15px]" />
              <Link to="/admin/appointments/detail/123">Chi tiết</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full flex items-center gap-2">
              <FiEdit className="text-[15px]" />
              <Link to="/admin/appointments/edit/123">Sửa</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="w-full flex items-center gap-2">
              <RiDeleteBin6Line className="text-[15px]" />
              <span>Xóa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const mockData = [
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
  {
    patient: "Lêo Văn Tèo",
    doctor: "Trần Thị Hồng Lê",
    service: "Tầm soát sức khỏe...",
    examType: "Khám lần 1",
    examTime: "09:00 22/06/2024",
    status: "Chờ xác nhận",
    payment: "Chưa thanh toán",
  },
];
