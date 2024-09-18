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
                    className="px-0"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Họ và tên
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{ row.getValue("name") }</div>,
    },
    {
        accessorKey: "branch",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Chi nhánh
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{ row.getValue("branch") }</div>,
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0"
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Ngày làm việc
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{ row.getValue("date") }</div>,
    },
    {
        accessorKey: "time",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0"
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
                        <DropdownMenuItem className="w-fit flex items-center gap-2">
                            <BsCalendarDate className="text-[15px]" />
                            <span>
                                Chi tiết
                            </span>
                        </DropdownMenuItem>
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
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Nguyễn Văn A",
        branch: "Chi nhánh Hà Nội",
        date: "Monday",
        time: "8 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Trần Thị B",
        branch: "Chi nhánh TP. Hồ Chí Minh",
        date: "Tuesday",
        time: "7 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Lê Văn C",
        branch: "Chi nhánh Đà Nẵng",
        date: "Wednesday",
        time: "6 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Phạm Thị D",
        branch: "Chi nhánh Cần Thơ",
        date: "Thursday",
        time: "8 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Hoàng Văn E",
        branch: "Chi nhánh Hải Phòng",
        date: "Friday",
        time: "5 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Vũ Thị F",
        branch: "Chi nhánh Nha Trang",
        date: "Monday",
        time: "4 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Đỗ Văn G",
        branch: "Chi nhánh Huế",
        date: "Tuesday",
        time: "7 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Ngô Thị H",
        branch: "Chi nhánh Vũng Tàu",
        date: "Wednesday",
        time: "6 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Bùi Văn I",
        branch: "Chi nhánh Bình Dương",
        date: "Thursday",
        time: "5 hours",
    },
    {
        id: Date.now(),
        // avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Lý Thị K",
        branch: "Chi nhánh Đồng Nai",
        date: "Friday",
        time: "4 hours",
    }
];

