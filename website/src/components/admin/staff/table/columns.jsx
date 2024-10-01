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
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"

                onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
            >
                Tên nhân viên
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase flex items-center py-4 gap-3">
            <Avatar className="size-8">
                <img src={ row.original.avatar } alt={ row.getValue("name") } />
            </Avatar>
            <span className="w-full whitespace-nowrap">
                { row.getValue("name") }
            </span>
        </div>
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
            >
                Chức vụ
                <ArrowUpDown className="ml-2 h-4 w-4 " />
            </Button>
        ),
        cell: ({ row }) => <div className="">{ row.original.position }</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
            >
                Số điện thoại
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="text-primary-500 pl-3">{ row.original.phoneNumber }</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                className="px-0 text-base"
                variant="ghost"
                onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="">{ row.original.email }</div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                className="px-0 text-base "
                variant="ghost"
                onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
            >
                Trạng thái
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <div className={ status === "1" ? "text-green-500" : "text-red-500" }>
                    { status === "1" ? "Đang hoạt động" : "Đang khóa" }
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


