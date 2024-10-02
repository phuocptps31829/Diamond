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
                Tên phòng khám
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-medium flex items-center py-4 gap-3">
                {row.original.name}
        </div>,
    },
    {
        accessorKey: "specialtyName",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Chuyên khoa
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="">{row.original.specialtyName}</div>,
    },
    {
        accessorKey: "branchName",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Chi nhánh
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            return <div className="">{row.original.branchName}</div>;
            
        },
    },
    {
        accessorKey: "branchAddress",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Địa chỉ
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="">{row.original.branchAddress}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => {
        // cell: ({ row }) => {
            // const payment = row.original;
            // console.log(payment);
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 rotate-90">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-fit min-w-0">
                        <DropdownMenuItem className="w-fit flex items-center gap-2">
                            <FiEdit className="text-[15px]" />
                            <span>Sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-fit flex items-center gap-2">
                            <RiDeleteBin6Line className="text-[15px]" />
                            <span>Xóa</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];


