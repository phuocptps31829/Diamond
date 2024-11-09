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
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

export const columnsSchedule = [
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
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >

                    Họ và tên
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="flex items-center gap-3">
            <Avatar className="size-8">
                <img src={ row.original.avatar } alt={ row.getValue("name") } />
            </Avatar>
            <span className="w-full whitespace-nowrap">
                { row.getValue("name") }
            </span>
        </div>,
    },
    {
        accessorKey: "branch",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Chi nhánh
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{ row.getValue("branch") }</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Ngày làm việc
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="font-medium flex items-center py-4 gap-3">{ row.getValue("date") }</div>,
    },
    {
        accessorKey: "time",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 text-base"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Giờ làm việc
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{ row.getValue("time") }</div>,
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
        avatar: 'https://github.com/shadcn.png',
        name: "Nguyễn Văn Phước",
        branch: "Chi nhánh Gò Vấp",
        date: "Thứ 2 - Thứ 7",
        time: "8 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Trần Thị Tín",
        branch: "Chi nhánh Tân Bình",
        date: "Thứ 2 - Thứ 5",
        time: "7 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Lê Văn Tám",
        branch: "Chi nhánh Thủ Đức",
        date: "Thứ 2 - Thứ 5",
        time: "6 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Phạm Thị Lệ",
        branch: "Chi nhánh Thủ Đức",
        date: "Thứ 2, Thứ 4",
        time: "8 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Hoàng Văn E",
        branch: "Chi nhánh Gò Vấp",
        date: "Thứ 2, Thứ 4, Thứ 7",
        time: "5 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Vũ Thị Định",
        branch: "Chi nhánh Gò Vấp",
        date: "Thứ 2",
        time: "4 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Nguyễn Văn Đạt",
        branch: "Chi nhánh Gò Vấp",
        date: "Thứ 2 - Thứ 7",
        time: "8 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Vũ Thị Tín",
        branch: "Chi nhánh Tân Bình",
        date: "Thứ 2 - Thứ 5",
        time: "7 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Lê Quang Bảy",
        branch: "Chi nhánh Thủ Đức",
        date: "Thứ 2 - Thứ 5",
        time: "6 tiếng",
    },
    {
        id: Date.now(),
        avatar: 'https://github.com/shadcn.png',
        name: "Phạm Út Chi",
        branch: "Chi nhánh Thủ Đức",
        date: "Thứ 2, Thứ 4",
        time: "8 tiếng",
    },
];

