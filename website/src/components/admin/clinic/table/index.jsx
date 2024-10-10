"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { useForm } from "react-hook-form";
import { clinicSchema } from "@/zods/clinic";
import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/ui/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clinicsApi } from "@/services/clinicApi";
import { toastUI } from "@/components/ui/Toastify";

export default function DataTable({data, columns}) {
  const queryClient = useQueryClient();

  const { mutate: deleteClinics, isPending } = useMutation({
    mutationFn: clinicsApi.deleteClinics,
    onSuccess: () => {
        toastUI("Xóa phòng khám thành công", "success");
        queryClient.invalidateQueries('roles');
    },
    onError: (err) => {
        console.log(err);
        toastUI("Xóa phòng khám không thành công", "error");
    },
});

const handleDeleteClinic = (id) => {
  if (!confirm("Chắc chắn muốn xóa?")) return;

  deleteClinics(id);
};

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      roomName: "",
    },
  });
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState(
    []
  );
  const onSubmit = () => {
  };
  const [columnVisibility, setColumnVisibility] =
    React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns: columns(handleDeleteClinic),
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
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });
  if (isPending) {
    return <Loading />;
}
  return (
    <div className="bg-white w-[100%] px-6 py-3 rounded-lg ">
      {/* Search */ }
      <div className="flex h-[80px]">
        <form onSubmit={ handleSubmit(onSubmit) } className="mr-1 flex">
          <div className="mb-2 ">
            <div className="relative w-[300px] mr-1">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm phòng"
                name="roomName"
                type="text"
                id="roomName"
                icon={ <FaSearch></FaSearch> }
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
          <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
            <FaPlus className="text-primary-500"></FaPlus>
          </Button>
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
                  className=""
                  key={ row.id }
                  data-state={ row.getIsSelected() && "selected" }
                >
                  { row.getVisibleCells().map((cell) => (
                    <TableCell key={ cell.id }>
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
                  colSpan={ columns.length }
                  className="h-24 text-center "
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
