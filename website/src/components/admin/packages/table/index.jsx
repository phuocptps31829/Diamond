import { FaSearch, FaPlus } from "react-icons/fa";
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
import { useDebounce } from "use-debounce";
import InputCustomSearch from "@/components/ui/InputCustomSearch";
import { useNavigate } from "react-router-dom";

export default function DataTable({ columns, allPackages }) {
  const navigate = useNavigate();
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
  const onSubmit = () => {};
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  const handleResetSearch = () => {
    setSearchValue("");
    table.getColumn("title")?.setFilterValue("");
  };

  const table = useReactTable({
    data: allPackages,
    columns,
    pageCount: Math.ceil(allPackages.length / 8),
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

  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearchValue);
  }, [debouncedSearchValue, table]);

  return (
    <div className="w-[100%] rounded-lg bg-white px-6 py-3">
      {/* Search */}
      <div className="flex h-[80px]">
        <form onSubmit={handleSubmit(onSubmit)} className="mr-1 flex">
          <div className="mb-2">
            <div className="relative mr-1 w-[300px]">
              <InputCustomSearch
                value={table.getColumn("name")?.getFilterValue() ?? ""}
                onChange={(event) => setSearchValue(event.target.value)}
                className="col-span-1 sm:col-span-1"
                placeholder="Tìm kiếm gói sản phẩm"
                name="packageName"
                type="text"
                id="packageName"
                icon={<FaSearch />}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <Button
            size="icon"
            variant="outline"
            className="mr-1 mt-2 h-11 w-11"
            onClick={() => navigate(`/admin/packages/create`)}
          >
            <FaPlus className="text-primary-500"></FaPlus>
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="mr-1 mt-2 h-11 w-11"
            onClick={handleResetSearch}
          >
            <FaArrowsRotate className="text-primary-500" />
          </Button>
        </form>
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
                            header.getContext(),
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu nào.
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
    </div>
  );
}
