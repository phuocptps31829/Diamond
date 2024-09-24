import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Avatar } from "@/components/ui/Avatar";

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
    accessorKey: "userID.fullName",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên bệnh nhân
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 lowercase">
        <Avatar className="size-8">
          <img
            src="https://github.com/shadcn.png"
            alt={row.original.userID.fullName}
          />
        </Avatar>
        <span className="w-full whitespace-nowrap">
          {row.original.userID.fullName}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "patientCode",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Mã BN
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.patientCode}</div>,
  },

  {
    accessorKey: "userID.phoneNumber",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Số điện thoại
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="pl-3 text-primary-500">
        {row.original.userID.phoneNumber}
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
      const date = new Date(row.original.userID.createdAt);
      const formattedDate = date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trạng thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.original.userID.isActivated;
      return (
        <div className={status ? "text-green-500" : "text-red-500"}>
          {status ? "Đang hoạt động" : "Đang khóa"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      console.log(payment);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="flex w-fit items-center gap-2">
              <FiEdit className="text-[15px]" />
              <span>Sửa</span>
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
