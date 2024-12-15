import { FaSearch, FaPlus } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { patientSchema } from "@/zods/client/patient";
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
} from "@/components/ui/Table";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import InputCustomSearch from "@/components/ui/InputCustomSearch";
import Loading from "@/components/ui/Loading";

export default function DataTable({
  data,
  columns,
  pageCount,
  pageSize,
  pageIndex,
  onPageChange,
  total,
  isLoading,
  searchValue,
  setSearchValue,
}) {
  const queryClient = useQueryClient();

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
    data,
    pageCount,
    pageSize,
    manualPagination: true,
    columns,
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
    queryClient.invalidateQueries("specialties");
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-5 py-2 overflow-hidden h-[calc(100vh-140px)] flex flex-col hidden-content">
      {/* Search */ }
      <div className="flex mb-2">
        <form onSubmit={ handleSubmit(onSubmit) } className="mr-1 flex">
          <div className="mb-2">
            <div className="relative mr-1 w-[300px]">
              <InputCustomSearch
                value={ searchValue }
                onChange={ (event) => setSearchValue(event.target.value) }
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm chuyên khoa"
                name="specialtyName"
                type="text"
                id="specialtyName"
                icon={ <FaSearch /> }
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
          <Link to={ "/admin/specialties/create" }>
            <Button
              onClick={ handleRefresh }
              size="icon"
              variant="outline"
              className="mr-1 mt-2 h-11 w-11"
            >
              <FaPlus className="text-primary-500"></FaPlus>
            </Button>
          </Link>
          <Button size="icon" variant="outline" className="mr-1 mt-2 h-11 w-11">
            <FaArrowsRotate className="text-primary-500" />
          </Button>
        </form>
      </div>
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
          { isLoading
            ? <Loading ScaleMini={ true } />
            : table.getRowModel().rows?.length ? (
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
                  className="h-full text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            ) }
        </TableBody>
      </Table>
      <div className="flex items-end justify-end space-x-2 pb-2 pt-4">
        <div className="flex-1 text-sm text-muted-foreground">
          { `Hiển thị từ ` }
          <span className="font-bold text-primary-500">
            { table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 }
          </span>
          { ` đến ` }
          <span className="font-bold text-primary-500">
            { Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              total
            ) }
          </span>
          { ` trong tổng số ` }
          <span className="font-bold text-primary-500">{ total }</span>
          { ` mục.` }
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            Trước
          </Button>
          { Array.from({ length: pageCount }, (_, index) => {
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
                  key={ index }
                  variant={ currentPage === index ? "solid" : "outline" }
                  size="sm"
                  onClick={ () => onPageChange(index) }
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
