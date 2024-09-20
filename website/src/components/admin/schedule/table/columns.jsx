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
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

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
        cell: ({ row }) => <div className="lowercase">Hi</div>,
    },
    {
        accessorKey: "branch",
        header: ({ column }) => {
            return (
                <Button
                    className="px-0 "
                    
                    variant="ghost"
                    onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
                >
                    Chi nhánh
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">x</div>,
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
        cell: ({ row }) => <div className="lowercase">Hi</div>,
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
        cell: ({ row }) => <div className="lowercase">Hi</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost" className="h-8 w-8 p-0 rotate-90">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-fit min-w-0">
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
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Nguyễn Văn A",
        branch: "Chi nhánh Hà Nội",
        days: "Monday",
        hours: "8 hours",
        details: "Nhân viên làm việc chăm chỉ và đúng giờ."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Trần Thị B",
        branch: "Chi nhánh TP. Hồ Chí Minh",
        days: "Tuesday",
        hours: "7 hours",
        details: "Có kỹ năng làm việc nhóm tốt."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Lê Văn C",
        branch: "Chi nhánh Đà Nẵng",
        days: "Wednesday",
        hours: "6 hours",
        details: "Được đánh giá cao về hiệu suất công việc."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Phạm Thị D",
        branch: "Chi nhánh Cần Thơ",
        days: "Thursday",
        hours: "8 hours",
        details: "Luôn hoàn thành công việc trước thời hạn."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Hoàng Văn E",
        branch: "Chi nhánh Hải Phòng",
        days: "Friday",
        hours: "5 hours",
        details: "Có thái độ làm việc tích cực và nhiệt tình."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Vũ Thị F",
        branch: "Chi nhánh Nha Trang",
        days: "Monday",
        hours: "4 hours",
        details: "Thường xuyên tham gia các hoạt động đào tạo."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Đỗ Văn G",
        branch: "Chi nhánh Huế",
        days: "Tuesday",
        hours: "7 hours",
        details: "Có khả năng lãnh đạo và quản lý nhóm."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Ngô Thị H",
        branch: "Chi nhánh Vũng Tàu",
        days: "Wednesday",
        hours: "6 hours",
        details: "Luôn được đồng nghiệp yêu mến."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Bùi Văn I",
        branch: "Chi nhánh Bình Dương",
        days: "Thursday",
        hours: "5 hours",
        details: "Có tinh thần trách nhiệm cao trong công việc."
    },
    {
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJA32WU4rBpx7maglqeEtt3ot1tPIRWptxA&s',
        name: "Lý Thị K",
        branch: "Chi nhánh Đồng Nai",
        days: "Friday",
        hours: "4 hours",
        details: "Thường xuyên đóng góp ý tưởng cải tiến."
    }
];

