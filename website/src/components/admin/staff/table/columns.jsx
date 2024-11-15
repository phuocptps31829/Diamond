import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import ActionMenu from "./actionMenu";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

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
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên nhân viên
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(true);

      const handleImageLoad = () => {
        setLoading(false);
      };
      return (
        <div className="flex items-center gap-3 py-4">
          <div className="mr-3 block h-[40px] min-w-[40px]">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div className="flex items-center justify-center gap-3 lowercase">
                  {loading && (
                    <Skeleton className="h-10 w-10 animate-pulse rounded-[999px] bg-gray-300" />
                  )}
                  <div
                    className={`${loading ? "hidden" : "block"} h-10 min-w-10 max-w-10`}
                  >
                    <img
                      src={URL_IMAGE + "/" + row.original.avatar}
                      alt={row.original.avatar}
                      className={`${loading ? "hidden" : "block"} h-full w-full cursor-pointer rounded-[999px] border border-primary-200 object-cover`}
                      onLoad={handleImageLoad}
                    />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hình ảnh lớn</DialogTitle>
                </DialogHeader>
                <img
                  src={URL_IMAGE + "/" + row.original.avatar}
                  alt="large-thumbnail w-full h-auto"
                />
              </DialogContent>
            </Dialog>
          </div>
          <span className="w-full whitespace-nowrap">
            {row.getValue("fullName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role.name",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Chức vụ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.role.name}</div>,
  },
  {
    accessorKey: "phoneNumber",
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
      <div className="pl-3 text-primary-500">{row.original.phoneNumber}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="">{row.original.email}</div>,
  },
  {
    accessorKey: "isActivated",
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
      const status = row.original.isActivated;
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
    cell: ({ row }) => <ActionMenu row={row} />,
  },
];
