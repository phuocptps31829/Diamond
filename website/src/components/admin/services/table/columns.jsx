import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import { useQuery } from "@tanstack/react-query";
import { getSpecialtyById } from "@/services/specialtiesApi";

import Action from "./action";
import { AlertDialogHeader } from "@/components/ui/AlertDialog";

const useSpecialtyName = (specialtyID) => {
  return useQuery({
    queryKey: ["specialty", specialtyID],
    queryFn: () => getSpecialtyById(specialtyID),
    enabled: !!specialtyID,
  });
};

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
        <span className="w-full whitespace-nowrap">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
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
                src={`${import.meta.env.VITE_IMAGE_API_URL}/${row.original.image}`}
                alt="thumbnail"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <AlertDialogHeader>
                <DialogTitle>Hình ảnh lớn</DialogTitle>
              </AlertDialogHeader>
              <img
                src={`${import.meta.env.VITE_IMAGE_API_URL}/${row.original.image}`}
                className="h-auto w-full"
                alt=" "
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
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
          <span className="block w-[90px]">{row.original.specialty?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-primary-500">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá khuyến mãi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-red-500">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.discountPrice)}
      </div>
    ),
  },
  {
    accessorKey: "shortDescription",
    header: "Mô tả ngắn",
    cell: ({ row }) => <div className="">{row.original.shortDescription}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Action row={row} />;
    },
  },
];
