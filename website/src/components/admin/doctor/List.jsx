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
import { doctorSchema } from "@/zods/doctor";
import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";

const doctorsData = [
  {
    id: 1,
    name: "BS.Hà Anh Tuấn",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Răng hàm mặt",
    phone: "09.321.123.321",
    email: "haanhtuan123@gmail.com",
    birthDate: "01/01/1999",
    gender: "Nam",
    address: "SQR/312, CVPM Quang Trung, Q12",
    status: "1",
  },
  {
    id: 2,
    name: "BS.Võ Đức Tài",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Tai chân miệng",
    phone: "09.432.234.432",
    email: "vductai234@gmail.com",
    birthDate: "15/02/1985",
    gender: "Nam",
    address: "Số 21, Đường Nguyễn Tri Phương, Q10",
    status: "1",
  },
  {
    id: 3,
    name: "BS.Trần Thị Mai",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Nội khoa",
    phone: "09.543.345.543",
    email: "tranmaimai@gmail.com",
    birthDate: "25/03/1992",
    gender: "Nữ",
    address: "Tòa nhà Central Plaza, Q7",
    status: "0",
  },
  {
    id: 4,
    name: "BS.Nguyễn Văn An",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Sản phụ khoa",
    phone: "09.654.456.654",
    email: "nguyenan654@gmail.com",
    birthDate: "30/04/1988",
    gender: "Nam",
    address: "Khu đô thị Phú Mỹ Hưng, Q7",
    status: "1",
  },
  {
    id: 5,
    name: "BS.Lê Thị Yến",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Tim mạch",
    phone: "09.765.567.765",
    email: "lethiyen765@gmail.com",
    birthDate: "10/05/1989",
    gender: "Nữ",
    address: "Chung cư Skyline, Q2",
    status: "1",
  },
  {
    id: 6,
    name: "BS.Nguyễn Minh Tuấn",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Da liễu",
    phone: "09.876.678.876",
    email: "nguyenminhtuan876@gmail.com",
    birthDate: "20/06/1991",
    gender: "Nam",
    address: "Số 56, Đường Lê Lợi, Q1",
    status: "0",
  },
  {
    id: 7,
    name: "BS.Trịnh Văn Hòa",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Y học cổ truyền",
    phone: "09.987.789.987",
    email: "trinhvanhoa987@gmail.com",
    birthDate: "05/07/1987",
    gender: "Nam",
    address: "Tòa nhà Garden Plaza, Q4",
    status: "1",
  },
  {
    id: 8,
    name: "BS.Hoàng Thị Lan",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Nhi khoa",
    phone: "09.098.890.098",
    email: "hoangthilan098@gmail.com",
    birthDate: "15/08/1990",
    gender: "Nữ",
    address: "Số 78, Đường Nguyễn Văn Cừ, Q5",
    status: "0",
  },
  {
    id: 9,
    name: "BS.Lương Văn Bình",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Chấn thương chỉnh hình",
    phone: "09.109.901.109",
    email: "luongvanbinh109@gmail.com",
    birthDate: "25/09/1986",
    gender: "Nam",
    address: "Khu dân cư An Phú, Q7",
    status: "1",
  },
  {
    id: 10,
    name: "BS.Trương Thị Ngọc",
    avatar: 'https://github.com/shadcn.png',
    specialty: "Hô hấp",
    phone: "09.210.012.210",
    email: "truongthinhoc210@gmail.com",
    birthDate: "30/10/1993",
    gender: "Nữ",
    address: "Chung cư Thái Bình, Q3",
    status: "1",
  }
];

export default function List() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctorName: "",
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
    data: doctorsData,
    columns: columnsSchedule,
    pageCount: Math.ceil(doctorsData.length / 8),
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
                placeholder="Tìm kiếm bác sĩ"
                name="doctorName"
                type="text"
                id="doctorName"
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
