import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSpecialtyById } from "@/services/specialtiesApi";
import { serviceApi } from "@/services/servicesApi";
import { toastUI } from "@/components/ui/Toastify";
 
const useSpecialtyName = (specialtyID) => {
  return useQuery({
    queryKey: ["specialty", specialtyID],
    queryFn: () => getSpecialtyById(specialtyID),
    enabled: !!specialtyID,
  });
};
const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (serviceId) => serviceApi.deleteService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries("service");
      toastUI("Xóa dịch vụ thành công.", "success");
    },
    onError: (error) => {
      toastUI("Xóa dịch vụ thất bại.", "error");
      console.error("Error deleting service:", error);
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
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên dịch vụ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 py-4 uppercase">
        <span className="w-full whitespace-nowrap">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hình ảnh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <img
                src={`${import.meta.env.VITE_IMAGE_API_URL}/${row.original.image}`}
                alt="thumbnail"
                width={60}
                height={60}
                className="cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent>
              <AlertDialogHeader>
                <DialogTitle>Hình ảnh lớn</DialogTitle>
              </AlertDialogHeader>
              <img
                src={`${import.meta.env.VITE_IMAGE_API_URL}/${row.original.image}`}
                className="h-auto w-full"
                alt=" "
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
  {
    accessorKey: "special",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chuyên khoa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const {
        data: specialty,
        error,
        isLoading,
      } = useSpecialtyName(row.original.specialtyID);

      if (isLoading) return <span>Đang tải..</span>;
      if (error) return <span>Không có chuyên khoa</span>;

      return (
        <div className="w-full max-w-[270px]">
          <span className="block w-[90px]">{specialty?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-primary-500">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.price)}
      </div>
    ),
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => (
      <Button
        className="px-0 text-base"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá khuyến mãi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-red-500">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.original.discountPrice)}
      </div>
    ),
  },
  {
    accessorKey: "shortDescription",
    header: "Mô tả ngắn",
    cell: ({ row }) => <div className="">{row.original.shortDescription}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const deleteMutation = useDeleteService();

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
            <DropdownMenuItem className="flex w-full items-center gap-2">
              <Link
                to={`/admin/services/edit/${row.original._id}`}
                className="flex w-full gap-2"
              >
                <FiEdit className="text-[15px]" />
                <span>Sửa</span>
              </Link>
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
                      Bạn có chắc chắn muốn xóa dịch vụ này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Dịch vụ sẽ bị xóa vĩnh
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
