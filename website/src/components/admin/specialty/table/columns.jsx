import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Action from "./action";

// export const columns =
export const columns = (onDelete) =>
  [
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Tên chuyên khoa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.original.name;
        return (
          <div className="flex items-center gap-3 py-4">
            <span className="w-full whitespace-nowrap">{ name }</span>
          </div>
        );
      },
    },
    {
      accessorKey: "image",
      header: () => (
        <Button className="px-0 text-base" variant="ghost">
          Hình ảnh
        </Button>
      ),
      cell: ({ row }) => {
        const img = row.original.image;
        const [open, setOpen] = useState(false);

        return (
          <>
            <Dialog open={ open } onOpenChange={ setOpen }>
              <DialogTrigger asChild>
                <img
                  src={ `${import.meta.env.VITE_IMAGE_API_URL}/${img}` }
                  alt="thumbnail"
                  width={ 60 }
                  height={ 60 }
                  className="cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Hình ảnh lớn</DialogTitle>
                </DialogHeader>
                <img
                  src={ `${import.meta.env.VITE_IMAGE_API_URL}/${img}` }
                  alt="large-thumbnail w-full h-auto"
                />
              </DialogContent>
            </Dialog>
          </>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.isHidden;
        return (
          <div className={ status === false ? "text-green-500" : "text-red-500" }>
            { status === false ? "Đang hiển thị" : "Đang ẩn" }
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <Action row={ row } />;
      },
    },
  ];
