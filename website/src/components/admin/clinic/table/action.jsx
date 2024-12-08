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
import SpinLoader from "@/components/ui/SpinLoader";
import { toastUI } from "@/components/ui/Toastify";
import { clinicsApi } from "@/services/clinicApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const useDeleteClinic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clinicId) => clinicsApi.deleteClinic(clinicId),
    onSuccess: () => {
      queryClient.invalidateQueries("clinics");
      toastUI("Xóa phòng khám thành công.", "success");
    },
    onError: (error) => {
      toastUI(error?.response?.data?.message || "Xóa phòng khám thất bại.", "error");
    },
  });
};

const Action = ({ row }) => {
  const deleteMutation = useDeleteClinic();

  const handleDelete = () => {
    deleteMutation.mutate(row.original._id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-end">
        <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-0">
        <Link to={ `/admin/clinics/edit/${row.original._id}` }>
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
                <RiDeleteBin6Line className="text-[15px] text-red-500" />
                <span className="text-red-600">Xóa</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc chắn muốn xóa phòng khám này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Phòng khám sẽ bị xóa vĩnh
                  viễn khỏi hệ thống.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={ handleDelete }
                  disabled={ deleteMutation.isPending }
                >
                  { deleteMutation.isPending ? <SpinLoader /> : "Xóa" }
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
