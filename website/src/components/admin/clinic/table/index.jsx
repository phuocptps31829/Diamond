"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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

export default function DataTable({
  data,
  columns,
  pageCount,
  pageSize,
  pageIndex,
  onPageChange,
  isLoading,
  total,
}) {
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
    pageCount,
    pageSize,
    manualPagination: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPageIndex = updater({
          pageIndex,
          pageSize,
        }).pageIndex;
        onPageChange(newPageIndex);
      }
    },
  });
  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearchValue);
  }, [debouncedSearchValue, table]);
  const handleRefresh = () => {
    queryClient.invalidateQueries("clinics");
  };
  return (
    <div className="hidden-content flex h-[calc(100vh-140px)] w-[100%] flex-col overflow-hidden rounded-lg bg-white px-5 py-2">
      <div className="mb-2 flex">
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
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center py-10">
              <div className="pyramid-loader">
                <div className="wrapper">
                  <span className="side side1"></span>
                  <span className="side side2"></span>
                  <span className="side side3"></span>
                  <span className="side side4"></span>
                  <span className="top"> </span>
                  <span className="corner corner1"></span>
                  <span className="corner corner2"></span>
                  <span className="corner corner3"></span>
                  <span className="corner corner4"></span>
                  <span className="shadow"></span>
                </div>
              </div>
            </div>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="h-[80px]"
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Không có kết quả.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-end justify-end space-x-2 pb-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <span className="pr-1">Đã chọn</span>
          {table.getFilteredSelectedRowModel().rows.length} trên {total} trong
          danh sách.
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
          {Array.from({ length: pageCount }, (_, index) => {
            const currentPage = pageIndex;
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
                  onClick={() => onPageChange(index)}
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
