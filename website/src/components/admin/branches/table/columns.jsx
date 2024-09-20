import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import {  DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    accessorKey: "branch_name",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên chi nhánh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full max-w-[270px]">
        <span className="w-full whitespace-nowrap">
          {row.original.branch_name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "working_hours",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giờ làm việc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full">
        <span className="w-full whitespace-nowrap">
          {row.original.working_hours}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "hotline",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hotline
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full max-w-[270px] text-primary-500">
        {row.original.hotline}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa chỉ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 w-full">
        <span className="w-full whitespace-nowrap">{row.original.address}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          variant="ghost"
          className="p-0 text-sm text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img
                src={row.original.image}
                alt="thumbnail"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hình ảnh lớn</DialogTitle>
              </DialogHeader>
              <img
                src={row.original.image}
                alt="large-thumbnail w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="flex w-fit items-center gap-2">
              <FiEdit className="text-[15px]" />
              <Link to="/admin/branches/edit/123">Sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-fit items-center gap-2">
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
    branch_name: "DA KHOA DIAMOND",
    working_hours: "7:30-11:30; 13:00-17:00 (Mon - Sat)",
    hotline: "098.7654.321",
    address: "179-181 Võ Thị Sáu, P.6, Q.3, HCM",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
  },
  {
    branch_name: "Da Khoa 179",
    working_hours: "7:30-11:30; 13:00-17:00 (Mon - Sat)",
    hotline: "098.7654.321",
    address: "179-181 Võ Thị Sáu, P.6, Q.3, HCM",
    image:
      "https://vcdn1-suckhoe.vnecdn.net/2024/05/03/Screen-Shot-2024-05-03-at-10-3-1328-5066-1714707559.png?w=0&h=0&q=100&dpr=1&fit=crop&s=tqdKpDUrqWCFbWL4sT_DPg",
  },
];
