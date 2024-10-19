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
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputCustomSearch from "@/components/ui/InputCustomSearch";
import { useDebounce } from "use-debounce";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DataTable({ data, columns }) {
  const queryClient = useQueryClient();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(),
    defaultValues: {},
  });

  const onSubmit = () => {};

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / 5),
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
        pageSize: 5,
      },
    },
  });
  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearchValue);
  }, [debouncedSearchValue, table]);
  const handleRefresh = () => {
    queryClient.invalidateQueries("clinics");
  };
  return (
    <div className="w-[100%] rounded-lg bg-white px-5 py-2">
      <div className="flex h-[80px]">
        <form className="mr-1 flex" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <div className="relative mr-1 w-[300px]">
              <InputCustomSearch
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) => setSearchValue(event.target.value)}
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm phòng khám"
                name="newsName"
                type="text"
                id="newsName"
                icon={<FaSearch />}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <Link to="/admin/clinics/create">
            <Button
              size="icon"
              variant="outline"
              className="mr-1 mt-2 h-11 w-11"
            >
              <FaPlus className="text-primary-500"></FaPlus>
            </Button>
          </Link>
          <Button
            onClick={handleRefresh}
            size="icon"
            variant="outline"
            className="mr-1 mt-2 h-11 w-11"
          >
            <FaArrowsRotate className="text-primary-500" />
          </Button>
        </form>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className=""
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns ? columns.length : 1}
                className="h-24 text-center"
              >
                Không có kết quả.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <span className="pr-1">Đã chọn</span>
          {table.getFilteredSelectedRowModel().rows.length} trên{" "}
          {table.getFilteredRowModel().rows.length} trong danh sách.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          {Array.from({ length: table.getPageCount() }, (_, index) => {
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
                  key={index}
                  variant={currentPage === index ? "solid" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(index)}
                >
                  {index + 1}
                </Button>
              );
            }
            if (
              (index === currentPage - 2 && currentPage > 2) ||
              (index === currentPage + 2 && currentPage < pageCount - 3)
            ) {
              return <span key={index}>...</span>;
            }
            return null;
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
