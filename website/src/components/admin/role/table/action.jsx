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
import { roleApi } from "@/services/roleApi";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => roleApi.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries("roles");
      toastUI(
        "Xóa vai trò thành công.",
        "success",
      );
    },
    onError: (error) => {
      toastUI(
        "Xóa vai trò thất bại.",
        "error",
      );
      console.error("Error deleting role:", error);
    },
  });
};

const Action = ({ row }) => {
  const deleteMutation = useDeleteRole();
  console.log(deleteMutation.isPending);
  const handleDelete = () => {
    deleteMutation.mutate(row.original._id);
  };

  return (
    deleteMutation.isPending ? (
      <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
    ) : !row.original.isSystem ? <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-end">
        <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-0">
        <Link to={ `/admin/roles/edit/${row.original._id}` }>
          <DropdownMenuItem className="flex w-fit items-center gap-2">
            <FiEdit className="text-[15px]" />
            <span>Sửa</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex w-fit items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={ (e) => e.stopPropagation() }
              >
                <RiDeleteBin6Line className="text-[15px]" />
                <span>Xóa</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc chắn muốn xóa vai trò này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Vai trò sẽ bị xóa vĩnh viễn
                  khỏi hệ thống.
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
    </DropdownMenu> : ''
  );
};

export default Action;
