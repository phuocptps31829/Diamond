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
import { BsCalendarDate } from "react-icons/bs";
import { Link } from "react-router-dom";

export const columnsRoles = [
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
        accessorKey: "#",
        header: () => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                >

                    #
                </Button>
            );
        },
        cell: ({ row }) => <div className="flex items-center w-16 gap-3">
            <span className="w-full whitespace-nowrap">
                { row.index + 1 }
            </span>
        </div>,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >

                    Tên vai trò
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="flex w-32 items-center gap-3">
            <span className="w-full whitespace-nowrap">
                { row.getValue("name") }
            </span>
        </div>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Mô tả
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{ row.getValue("description") }</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="text-end">
                        <Button
                            variant="ghost" className="h-8 w-8 p-0 rotate-90">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-fit min-w-0">
                        <Link to="/admin/schedules/details">
                            <DropdownMenuItem className="w-fit flex items-center gap-2">
                                <BsCalendarDate className="text-[15px]" />
                                Chi tiết
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="w-fit flex items-center gap-2">
                            <FiEdit className="text-[15px]" />
                            <span>
                                Sửa
                            </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-fit flex items-center gap-2">
                            <RiDeleteBin6Line className="text-[15px]" />
                            <span>
                                Xóa
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const mockData = [
    {
        id: Date.now(),
        name: "Super Admin",
        description: "Quyền quản trị cao cấp nhâts",
    },
    {
        id: Date.now(),
        name: "Super Admin",
        description: "Quyền quản trị cao cấp nhâts",
    },
    {
        id: Date.now(),
        name: "Super Admin",
        description: "Quyền quản trị cao cấp nhâts",
    },
    {
        id: Date.now(),
        name: "Super Admin",
        description: "Quyền quản trị cao cấp nhâts",
    },
    {
        id: Date.now(),
        name: "Super Admin",
        description: "Quyền quản trị cao cấp nhâts",
    },
];

