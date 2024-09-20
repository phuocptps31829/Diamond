import InputCustom from "@/components/ui/InputCustom";
import { FaSearch, FaPlus} from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { patientSchema } from "@/zods/patient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { columnsSchedule } from "./columns";
// Patient Data
const patientsData = [
    {
      id: 1,
      name: "BN.Nguyễn Văn A",
      patientCode: "#BN0401",
      job: "Sinh viên",
      nation: "Kinh",
      email: "nguyenvana@example.com",
      birthDate: "02/01/2000",
      gender: "Nam",
      address: "Số 10, Đường B, Quận 1",
      status: "1",
    },
    {
      id: 2,
      name: "BN.Trần Thị B",
      patientCode: "#BN0402",
      job: "Nhân viên bán hàng",
      nation: "Kinh",
      email: "tranthib@example.com",
      birthDate: "15/03/1998",
      gender: "Nữ",
      address: "Số 20, Đường C, Quận 2",
      status: "0",
    },
    {
      id: 3,
      name: "BN.Lê Văn C",
      patientCode: "#BN0403",
      job: "Kỹ sư",
      nation: "Kinh",
      email: "levanc@example.com",
      birthDate: "25/05/1995",
      gender: "Nam",
      address: "Số 30, Đường D, Quận 3",
      status: "1",
    },
    {
      id: 4,
      name: "BN.Pham Thi D",
      patientCode: "#BN0404",
      job: "Giáo viên",
      nation: "Kinh",
      email: "phamthid@example.com",
      birthDate: "10/07/1993",
      gender: "Nữ",
      address: "Số 40, Đường E, Quận 4",
      status: "1",
    },
    {
      id: 5,
      name: "BN.Nguyễn Minh E",
      patientCode: "#BN0405",
      job: "Nhà báo",
      nation: "Kinh",
      email: "nguyenmine@example.com",
      birthDate: "30/08/1992",
      gender: "Nam",
      address: "Số 50, Đường F, Quận 5",
      status: "0",
    },
    {
      id: 6,
      name: "BN.Hoang Thi F",
      patientCode: "#BN0406",
      job: "Chuyên viên",
      nation: "Kinh",
      email: "hoangthif@example.com",
      birthDate: "20/09/1991",
      gender: "Nữ",
      address: "Số 60, Đường G, Quận 6",
      status: "1",
    },
    {
      id: 7,
      name: "BN.Bui Van G",
      patientCode: "#BN0407",
      job: "Chủ doanh nghiệp",
      nation: "Kinh",
      email: "buivang@example.com",
      birthDate: "12/10/1990",
      gender: "Nam",
      address: "Số 70, Đường H, Quận 7",
      status: "1",
    },
    {
      id: 8,
      name: "BN.Dang Thi H",
      patientCode: "#BN0408",
      job: "Lập trình viên",
      nation: "Kinh",
      email: "dangthih@example.com",
      birthDate: "05/11/1989",
      gender: "Nữ",
      address: "Số 80, Đường I, Quận 8",
      status: "0",
    },
    {
      id: 9,
      name: "BN.Vu Van I",
      patientCode: "#BN0409",
      job: "Nhà thiết kế",
      nation: "Kinh",
      email: "vuvani@example.com",
      birthDate: "18/12/1988",
      gender: "Nam",
      address: "Số 90, Đường J, Quận 9",
      status: "1",
    },
    {
      id: 10,
      name: "BN.Do Thi J",
      patientCode: "#BN0410",
      job: "Công nhân",
      nation: "Kinh",
      email: "dothij@example.com",
      birthDate: "25/01/1987",
      gender: "Nữ",
      address: "Số 100, Đường K, Quận 10",
      status: "0",
    }
  
];
export default function List (){
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
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const table = useReactTable({
        data: patientsData,
        columns: columnsSchedule,
        pageCount: Math.ceil(patientsData.length / 8),
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
        {/* Search */}
        <div className="flex h-[80px]">
            <h1 className="mr-2 bg-white h-fit mt-4 text-lg">Danh sách bệnh nhân</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mr-1 flex">
            <div className="mb-2 ">
                <div className="relative w-[300px] mr-1">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Tìm kiếm bệnh nhân"
                    name="patientName"
                    type="text"
                    id="patientName"
                    icon={<FaSearch></FaSearch>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                <FaPlus className="text-primary-500"></FaPlus>
            </Button>
            <Button size="icon" variant="outline" className="w-11 h-11 mr-1 mt-2">
                <FaArrowsRotate className="text-primary-500"/>
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
                {table.getFilteredSelectedRowModel().rows.length} trên{" "}
                {table.getFilteredRowModel().rows.length} bác sĩ có trong danh sách.
              </div>
              <div className="space-x-2 flex items-center">
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
      </div>
    );
}

