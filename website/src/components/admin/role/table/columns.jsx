import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import Action from "./action";

export const getColumnsRoles = () =>
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
            accessorKey: "#",
            header: () => {
                return (
                    <Button
                        className="px-5 text-base"
                        variant="ghost"
                    >

                        #
                    </Button>
                );
            },
            cell: ({ row }) => <div className="flex px-5 items-center w-16 gap-3">
                <span className="w-full">
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
                <span className="w-full">
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
                return <Action row={ row } />;
            },
        },
    ];
