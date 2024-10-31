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
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/AlertDialog";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustomSearch from "@/components/ui/InputCustomSearch";
import { useDebounce } from "use-debounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getColumnsAppointments } from "./columns";
import { invoicesApi } from "@/services/invoicesApi";
import { toastUI } from "@/components/ui/Toastify";
import Loading from "@/components/ui/Loading";

export default function DataTable({ data }) {
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
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: ({ id, status }) => invoicesApi.updateStatus(id, status),
    onSuccess: () => {
      toastUI("Chỉnh sửa trạng thái thành công", "success");
      queryClient.invalidateQueries("appointments");
    },
    onError: (err) => {
      console.log(err);
      toastUI("Chỉnh sửa trạng thái không thành công", "error");
    },
  });
  const handleChangeStatus = (id, status) => {
    updateStatus({ id, status });
  };
  const { mutate: deleteAppointment } = useMutation({
    mutationFn: invoicesApi.deleteInvoice,
    onSuccess: () => {
      toastUI("Xóa lịch khám thành công", "success");
      queryClient.invalidateQueries("appointments");
    },
    onError: (err) => {
      console.log(err);
      toastUI("Xóa lịch khám không thành công", "error");
    },
  });
  const handleDeleteAppointment = (id) => {
    deleteAppointment(id);
  };

  const table = useReactTable({
    data,
    columns: getColumnsAppointments(
      handleChangeStatus,
      handleDeleteAppointment
    ),
    pageCount: Math.ceil(data.length / 6),

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
        pageSize: 6,
      },
    },
  });

  React.useEffect(() => {
    table.getColumn("patient")?.setFilterValue(debouncedSearchValue);
  }, [debouncedSearchValue, table]);
  const handleRefresh = () => {
    queryClient.invalidateQueries("appointments");
  };
  const { mutate: deleteAppointmentMultiple } = useMutation({
    mutationFn: invoicesApi.deleteInvoiceMultiple,
    onSuccess: () => {
      toastUI("Xóa lịch khám thành công", "success");
      queryClient.invalidateQueries("appointments");
    },
    onError: (err) => {
      console.log(err);
      toastUI("Xóa lịch khám không thành công", "error");
    },
  });

  const handleDeleteAppointmentMultiple = (ids) => {
    deleteAppointmentMultiple(ids);
    console.log(ids);
  };
  const selectedRowIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original._id);

  if (isPending) {
    return <Loading />;
  }
  return (
    <div className="w-[100%] rounded-lg bg-white px-6 py-3">
      {/* Search */}
      <div className="mb-10 flex w-full justify-between">
        <form
          className="mr-1 flex items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <div className="relative mr-1 w-[300px]">
              <InputCustomSearch
                value={table.getColumn("patient")?.getFilterValue() ?? ""}
                onChange={(event) => setSearchValue(event.target.value)}
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm lịch khám"
                name="newsName"
                type="text"
                id="newsName"
                icon={<FaSearch />}
                control={control}
                errors={errors}
              />
            </div>
          </div>

          <Link to="/admin/appointments/create">
            <Button size="icon" variant="outline" className="mr-1 h-11 w-11">
              <FaPlus className="text-primary-500"></FaPlus>
            </Button>
          </Link>
          <Button
            onClick={handleRefresh}
            size="icon"
            variant="outline"
            className="mr-1 h-11 w-11"
          >
            <FaArrowsRotate className="text-primary-500" />
          </Button>
          {selectedRowIds.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11"
                  onClick={(e) => e.stopPropagation()}
                >
                  Xóa tất cả
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Bạn có chắc chắn muốn xóa tất cả các lịch khám đã chọn?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Các lịch khám sẽ bị xóa
                    vĩnh viễn khỏi hệ thống.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      handleDeleteAppointmentMultiple(selectedRowIds)
                    }
                  >
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </form>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-blue-500/40"></div>
            <span className="text-blue-900">Dịch vụ</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-[#13D6CB]/40"></div>
            <span className="text-cyan-950">Gói khám</span>
          </div>
        </div>
      </div>
      <div>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="h-16" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
