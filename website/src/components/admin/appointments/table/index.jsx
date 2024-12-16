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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustomSearch from "@/components/ui/InputCustomSearch";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/Loading";

export default function DataTable({
  data,
  columns,
  pageCount,
  pageSize,
  pageIndex,
  onPageChange,
  isLoading,
  total,
  searchValue,
  setSearchValue,
}) {
  const queryClient = useQueryClient();

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(),
    defaultValues: {},
  });
  const onSubmit = () => {};
  // const { mutate: updateStatus, isPending } = useMutation({
  //   mutationFn: ({ id, status }) => invoicesApi.updateStatus(id, status),
  //   onSuccess: () => {
  //     toastUI("Chỉnh sửa trạng thái thành công", "success");
  //     queryClient.invalidateQueries("appointments");
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     toastUI("Chỉnh sửa trạng thái không thành công", "error");
  //   },
  // });

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

  const handleRefresh = () => {
    queryClient.invalidateQueries("appointments");
  };

  // const selectedRowIds = table
  //   .getSelectedRowModel()
  //   .rows.map((row) => row.original._id);

  return (
    <div className="hidden-content flex h-[calc(100vh-140px)] w-[100%] flex-col overflow-hidden rounded-lg bg-white px-5 py-2">
      {/* Search */}
      <div className="mb-2 flex w-full justify-between">
        <form
          className="mr-1 flex items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-2">
            <div className="relative mr-1 w-[300px]">
              <InputCustomSearch
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm lịch khám"
                name="appointmentCode"
                type="text"
                id="appointmentCode"
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
          {/* { selectedRowIds.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-11"
                  onClick={ (e) => e.stopPropagation() }
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
                    onClick={ () =>
                      handleDeleteAppointmentMultiple(selectedRowIds)
                    }
                  >
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) } */}
        </form>
        <div className="flex gap-4">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-blue-500/40"></div>
            <span className="text-blue-900">Gói khám</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 bg-[#13D6CB]/40"></div>
            <span className="text-cyan-950">Dịch vụ</span>
          </div>
        </div>
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
            <Loading ScaleMini={true} />
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
          {`Hiển thị từ `}
          <span className="font-bold text-primary-500">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
          </span>
          {` đến `}
          <span className="font-bold text-primary-500">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              total
            )}
          </span>
          {` trong tổng số `}
          <span className="font-bold text-primary-500">{total}</span>
          {` mục.`}
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
