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
import { columnsSchedule } from "./columns";
import { useForm } from "react-hook-form";
import { clinicSchema } from "@/zods/clinic";
import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";

const clinicsData = [
  {
    name: "Phòng khám đa khoa Diamond",
    specialty: "Sức khỏe tổng quát",
    branch: "Đa khoa Diamond",
    address: "179 - 181 Võ Thị Sáu, P.Võ Thị Sáu, Q.3, HCM"
  },
  {
    name: "Phòng khám đa khoa Hòa Hảo",
    specialty: "Tim mạch",
    branch: "Đa khoa Hòa Hảo",
    address: "254 Hòa Hảo, P.4, Q.10, HCM"
  },
  {
    name: "Phòng khám Quốc tế Vinmec",
    specialty: "Nhi khoa",
    branch: "Vinmec Central Park",
    address: "208 Nguyễn Hữu Cảnh, P.22, Q.Bình Thạnh, HCM"
  },
  {
    name: "Phòng khám đa khoa Medic",
    specialty: "Chẩn đoán hình ảnh",
    branch: "Đa khoa Medic",
    address: "42 Hoàng Văn Thụ, P.9, Q.Phú Nhuận, HCM"
  },
  {
    name: "Phòng khám đa khoa Phước An",
    specialty: "Tai mũi họng",
    branch: "Đa khoa Phước An",
    address: "133 - 135 Lý Chính Thắng, P.7, Q.3, HCM"
  }
];

export default function List() {
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
    data: clinicsData,
    columns: columnsSchedule,
    pageCount: Math.ceil(clinicsData.length / 8),
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
                  colSpan={ columnsSchedule.length }
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
