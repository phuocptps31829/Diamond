import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";
import { getColumnsRoles } from "./columns";

import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import InputCustom from "@/components/ui/InputCustom";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "@/zods/patient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { roleApi } from "@/services/roleApi";
import { toastUI } from "@/components/ui/Toastify";
import Loading from "@/components/ui/Loading";
import { Link } from "react-router-dom";

export default function DataTableRole({ data }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        useState({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const queryClient = useQueryClient();

    const { mutate: deleteRole, isPending } = useMutation({
        mutationFn: roleApi.deleteRole,
        onSuccess: () => {
            toastUI("Xóa vai trò thành công", "success");
            queryClient.invalidateQueries('roles');
        },
        onError: (err) => {
            console.log(err);
            toastUI("Xóa vai trò không thành công", "error");
        },
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            patientName: "",
        },
    });
    const onSubmit = () => {
    };

    const handleDeleteRole = (id) => {
        deleteRole(id);
    };

    const table = useReactTable({
        data,
        columns: getColumnsRoles(handleDeleteRole),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            pagination,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isPending) {
        return <Loading />;
    }

    return (
        <div className="w-full p-4 bg-white rounded-sm">
            <div className="flex h-[80px]">
                <form className="mr-1 flex">
                    <div className="mb-2 ">
                        <div className="relative w-[300px] mr-1">
                            <InputCustom
                                className="col-span-1 sm:col-span-1"
                                placeholder="Tìm kiếm vai trò"
                                name="patientName"
                                type="text"
                                id="patientName"
                                icon={ <FaSearch></FaSearch> }
                                control={ control }
                                errors={ errors }
                            />
                        </div>
                    </div>
                    <Link to="/admin/roles/create">
                        <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                            <FaPlus className="text-primary-500"></FaPlus>
                        </Button>
                    </Link>
                    <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                        <FaArrowsRotate className="text-primary-500" />
                    </Button>
                </form>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        { table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={ headerGroup.id }>
                                { headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={ header.id }>
                                            { header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                ) }
                                        </TableHead>
                                    );
                                }) }
                            </TableRow>
                        )) }
                    </TableHeader>
                    <TableBody>
                        { table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={ row.id }
                                    data-state={ row.getIsSelected() && "selected" }
                                >
                                    { row.getVisibleCells().map((cell) => (
                                        <TableCell className="h-16" key={ cell.id }>
                                            { flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            ) }
                                        </TableCell>
                                    )) }
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={ data.length }
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <span className="pr-1">Đã chọn</span>
                    { table.getFilteredSelectedRowModel().rows.length } trên{ " " }
                    { table.getFilteredRowModel().rows.length } trong danh sách.
                </div>
                <div className="space-x-2 flex items-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={ () => table.previousPage() }
                        disabled={ !table.getCanPreviousPage() }
                    >
                        Trước
                    </Button>
                    { Array.from({ length: table.getPageCount() }, (_, index) => {
                        const currentPage = table.getState().pagination.pageIndex;
                        const pageCount = table.getPageCount();
                        if (
                            index === 0 ||
                            index === pageCount - 1 ||
                            index === currentPage ||
                            index === currentPage - 1 ||
                            index === currentPage + 1
                        ) {
                            return (
                                <Button
                                    key={ index }
                                    variant={ currentPage === index ? "solid" : "outline" }
                                    size="sm"
                                    onClick={ () => table.setPageIndex(index) }
                                >
                                    { index + 1 }
                                </Button>
                            );
                        }
                        if (
                            (index === currentPage - 2 && currentPage > 2) ||
                            (index === currentPage + 2 && currentPage < pageCount - 3)
                        ) {
                            return <span key={ index }>...</span>;
                        }
                        return null;
                    }) }
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={ () => table.nextPage() }
                        disabled={ !table.getCanNextPage() }
                    >
                        Sau
                    </Button>
                </div>
            </div>
        </div>
    );
}
