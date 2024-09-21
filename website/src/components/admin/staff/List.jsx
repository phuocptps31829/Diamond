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
import { staffSchema } from "@/zods/staff";
import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
// Staffs Data
const staffsData = [
  {
    id: 2,
    name: "NV.Trần Thị Mai",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.234.432.234",
    email: "tranthimai234@gmail.com",
    birthDate: "05/05/1990",
    gender: "Nữ",
    address: "Tầng 5, Tòa nhà Hưng Phú, Q7",
    status: "1",
  },
  {
    id: 3,
    name: "NV.Lê Văn An",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.345.543.345",
    email: "levanan345@gmail.com",
    birthDate: "10/10/1985",
    gender: "Nam",
    address: "Căn hộ 302, Khu đô thị Nam Thăng Long, Q9",
    status: "0",
  },
  {
    id: 4,
    name: "NV.Nguyễn Thị Hoa",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.456.654.456",
    email: "nguyenhoa456@gmail.com",
    birthDate: "20/12/1992",
    gender: "Nữ",
    address: "Số 12, Đường Nguyễn Huệ, Q1",
    status: "1",
  },
  {
    id: 5,
    name: "NV.Phạm Minh Tuấn",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.567.765.567",
    email: "phamminhtuan567@gmail.com",
    birthDate: "15/03/1988",
    gender: "Nam",
    address: "Tòa nhà Central Park, Q3",
    status: "1",
  },
  {
    id: 6,
    name: "NV.Bùi Thị Lan",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.678.876.678",
    email: "buithilan678@gmail.com",
    birthDate: "25/07/1994",
    gender: "Nữ",
    address: "Số 45, Đường Lê Lợi, Q5",
    status: "0",
  },
  {
    id: 7,
    name: "NV.Trần Văn Phúc",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.789.987.789",
    email: "tranvanphuc789@gmail.com",
    birthDate: "30/08/1982",
    gender: "Nam",
    address: "Khu dân cư Phú Mỹ Hưng, Q7",
    status: "1",
  },
  {
    id: 8,
    name: "NV.Hoàng Thị Bình",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.890.098.890",
    email: "hoangthibinh890@gmail.com",
    birthDate: "12/11/1989",
    gender: "Nữ",
    address: "Tầng 3, Tòa nhà Diamond Plaza, Q1",
    status: "1",
  },
  {
    id: 9,
    name: "NV.Võ Văn Hòa",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.901.109.901",
    email: "vovanhoa901@gmail.com",
    birthDate: "02/02/1995",
    gender: "Nam",
    address: "Căn hộ 405, Chung cư CT1, Q2",
    status: "0",
  },
  {
    id: 10,
    name: "NV.Lương Thị Ngọc",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.012.210.012",
    email: "luongthingoct012@gmail.com",
    birthDate: "18/06/1991",
    gender: "Nữ",
    address: "Số 78, Đường Phan Đăng Lưu, Q3",
    status: "1",
  },
  {
    id: 11,
    name: "NV.Nguyễn Đức Minh",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.123.321.321",
    email: "nguyenducminh123@gmail.com",
    birthDate: "27/09/1987",
    gender: "Nam",
    address: "Tòa nhà An Phú, Q7",
    status: "0",
  },
  {
    id: 12,
    name: "NV.Dương Thị Yến",
    avatar: 'https://github.com/shadcn.png',
    position: "#NV Y Tế",
    phoneNumber: "09.234.432.543",
    email: "duongthiyen234@gmail.com",
    birthDate: "23/04/1993",
    gender: "Nữ",
    address: "Khu biệt thự Thảo Điền, Q2",
    status: "1",
  },
];
export default function List() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      staffName: "",
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
    data: staffsData,
    columns: columnsSchedule,
    pageCount: Math.ceil(staffsData.length / 8),
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
    <div className="bg-white w-[100%] px-6 py-3 rounded-lg shadow-gray ">
      {/* Search */ }
      <div className="flex h-[80px]">
        <form onSubmit={ handleSubmit(onSubmit) } className="mr-1 flex">
          <div className="mb-2 ">
            <div className="relative w-[300px] mr-1">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm nhân viên"
                name="staffName"
                type="text"
                id="staffName"
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
    </div>
  );
}

