import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import Action from "./action";
import { Skeleton } from "@/components/ui/Skeleton";
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
      <div className="w-full pl-5 text-left">{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: () => (
      <Button className="w-full px-0 text-center text-base" variant="ghost">
        Hình ảnh
      </Button>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(true);

      const handleImageLoad = () => {
        setLoading(false);
      };

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center justify-center gap-3 py-2 lowercase">
                {loading && (
                  <Skeleton className="h-14 w-20 animate-pulse rounded-sm bg-gray-300" />
                )}
                <div className={`${loading ? "hidden" : "block"} h-14 w-20`}>
                  <img
                    src={URL_IMAGE + "/" + row.original.image}
                    alt={row.original.image}
                    className={`${loading ? "hidden" : "block"} h-full w-full cursor-pointer rounded-sm border border-primary-200 object-cover`}
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
                src={URL_IMAGE + "/" + row.original.image}
                alt="large-thumbnail w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên dịch vụ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 uppercase">
        <span
          title={row.getValue("name")}
          className="w-full max-w-[300px] truncate"
        >
          {row.getValue("name")}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "special",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chuyên khoa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full max-w-[270px]">
          <span className="block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {row.original.specialty?.name}
          </span>
        </div>
      );
    },
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
    accessorKey: "isHidden",
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
      const status = row.original.isHidden;
      return (
        <div className={!status ? "text-green-500" : "text-red-500"}>
          {!status ? "Hiển thị" : "Ẩn"}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Action row={row} />;
    },
  },
];
