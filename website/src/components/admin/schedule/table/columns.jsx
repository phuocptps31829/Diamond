import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { formatWeekday } from "@/utils/format";
import Action from "./action";

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
                <img src={ `${import.meta.env.VITE_IMAGE_API_URL}/${row.original.avatar}` } alt={ row.original.fullName } />
            </Avatar>
            <span className="w-full whitespace-nowrap">
                { row.original.fullName }
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
        cell: ({ row }) => <div className="">{ row.original.branch.name }</div>,
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
        cell: ({ row }) => <div className="font-medium flex items-center py-4 gap-1">
            { row.original.schedules.slice(0, 2).map((schedule, index) => (
                <span key={ schedule.day } className="capitalize">
                    { formatWeekday(schedule.day) }
                    { index < row.original.schedules.length - 1 && "," }
                    { index === 1 && row.original.schedules.length > 2 && "..." }
                </span>
            )) }
        </div>,
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
        cell: ({ row }) => <div className="lowercase flex items-center py-4 gap-1">
            { row.original.schedules.slice(0, 2).map((schedule, index) => (
                <span key={ schedule.day }>
                    { schedule.hour.startTime } - { schedule.hour.endTime }
                    { index < row.original.schedules.length - 1 && "," }
                    { index === 1 && row.original.schedules.length > 2 && "..." }
                </span>
            )) }
        </div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return <Action row={ row } />;
        },
    },
];