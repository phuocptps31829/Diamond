import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBranch } from "@/services/branchesApi";
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
import { useToast } from "@/hooks/useToast";
import { toastUI } from "@/components/ui/Toastify";
const useDeleteBranch = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (branchId) => deleteBranch(branchId),
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toastUI(
        "Xóa chi nhánh thành công.",
        "success",
      );
    },
    onError: (error) => {
      toastUI(
        "Xóa chi nhánh thất bại.",
        "error",
      );
      console.error("Error deleting branch:", error);
    },
  });
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên chi nhánh
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full max-w-[270px]">
        <span className="w-full whitespace-nowrap">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "workingTime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giờ làm việc
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          {row.original.workingTime}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "hotline",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hotline
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full max-w-[270px] text-primary-500">
        {row.original.hotline}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Địa chỉ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{row.original.address}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="px-0 text-base"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hình ảnh
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img
                src={row.original.image}
                alt="thumbnail"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hình ảnh lớn</DialogTitle>
              </DialogHeader>
              <img
                src={row.original.image}
                alt="large-thumbnail w-full h-auto"
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full max-w-[270px] rounded-md p-2">
        <span
          className={`w-full whitespace-nowrap ${row.original.isHidden ? "text-red-500" : "text-green-500"}`}
        >
          {row.original.isHidden ? "Đang ẩn" : "Đang hiện"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deleteMutation = useDeleteBranch();

      const handleDelete = () => {
        deleteMutation.mutate(row.original._id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem className="flex w-fit items-center gap-2">
              <FiEdit className="text-[15px]" />
              <Link to={`/admin/branches/edit/${row.original._id}`}>Sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-fit items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className="flex cursor-pointer items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RiDeleteBin6Line className="text-[15px]" />
                    <span>Xóa</span>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn xóa chi nhánh này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Chi nhánh sẽ bị xóa vĩnh
                      viễn khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
