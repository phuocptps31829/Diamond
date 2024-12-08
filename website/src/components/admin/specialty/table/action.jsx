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
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toastUI } from "@/components/ui/Toastify";
import { specialtyApi } from "@/services/specialtiesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => specialtyApi.deleteSpecialty(id),
    onSuccess: () => {
      queryClient.invalidateQueries("specialties");
      toastUI("Xóa chuyên khoa thành công.", "success");
    },
    onError: (error) => {
      toastUI("Xóa chuyên khoa thất bại.", "error");
      console.error("Error deleting specialty:", error);
    },
  });
};

const Action = ({ row }) => {
  const deleteMutation = useDeleteSpecialty();

  const handleDelete = () => {
    deleteMutation.mutate(row.original._id);
  };

  return (
    deleteMutation.isPending ? (
      <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
    ) : <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-end">
        <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-0">
        <Link to={ `/admin/specialties/edit/${row.original._id}` }>
          <DropdownMenuItem className="flex w-fit items-center gap-2">
            <FiEdit className="text-[15px] text-primary-600" />
            <span className="text-primary-600">Chỉnh sửa</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex w-full items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className="flex w-full cursor-pointer items-center gap-2"
                onClick={ (e) => e.stopPropagation() }
              >
                <RiDeleteBin6Line className="text-[15px] text-red-600" />
                <span className="text-red-600 flex-1">Xóa</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc chắn muốn xóa chuyên khoa này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Chuyên khoa sẽ bị xóa vĩnh
                  viễn khỏi hệ thống.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={ handleDelete }
                  disabled={ deleteMutation.isPending }
                >
                  Xóa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
