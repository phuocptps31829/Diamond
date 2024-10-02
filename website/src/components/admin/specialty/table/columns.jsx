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
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

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
    id: "stt",
    header: ({column}) => 
    (
      <Button
      className="px-0 text-left w-fit "
      variant="ghost"
      onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
    >
      STT
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full pl-5 text-left ">
        {row.index + 1}
      </div>
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
      <div className="flex items-center py-4 gap-3">

        <span className="w-full whitespace-nowrap">
          { name }
        </span>
      </div>
    );
    }
  },
  {
    accessorKey: "image",
    header: () => (
        <Button
            className="px-0 text-base"
            variant="ghost"
        >
            Hình ảnh
        </Button>
    ),
    cell: ({ row }) => {
        const img = row.original.image;
        return (
          <Avatar className="size-8 rounded-sm  w-[80px] h-[80px]">
            <AvatarImage  className=""  src={ img } alt={ row.getValue("name") }/>
        </Avatar>
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
            <div className={ status === true ? "text-green-500" : "text-red-500" }>
                { status === true ? "Đang hiển thị" : "Đang ẩn" }
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
            <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="flex w-full items-center gap-2">
              <FiEdit className="text-[15px]" />
              <span>Sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full items-center gap-2">
              <RiDeleteBin6Line className="text-[15px]" />
              <span>Xóa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
