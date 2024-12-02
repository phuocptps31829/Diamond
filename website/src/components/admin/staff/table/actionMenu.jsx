import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
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
import { MoreHorizontal } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toastUI as toast } from "@/components/ui/Toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import staffApi from "@/services/staffApi.js";

const ActionMenu = ({ row }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteStaffMutation, isPending } = useMutation({
    mutationFn: (id) => staffApi.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries("staffs");
      toast("Xóa nhân viên thành công.", "success");
    },
    onError: () => {
      toast("Xóa nhân viên thất bại.", "error");
    },
  });

  return (
    <>
      { isPending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit min-w-0">
            <DropdownMenuItem
              className="flex w-fit items-center gap-2"
              onClick={ () => navigate(`/admin/staffs/edit/${row.original._id}`) }
            >
              <FiEdit className="text-[15px] text-primary-600" />
              <span className="text-primary-600">Chỉnh sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-fit items-center gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div
                    className="flex w-full cursor-pointer items-center gap-2"
                    onClick={ (e) => e.stopPropagation() }
                  >
                    <RiDeleteBin6Line className="text-[15px] text-red-600" />
                    <span className="text-red-600">Xóa</span>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Bạn có chắc chắn muốn xóa người dùng này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Người dùng sẽ bị xóa
                      vĩnh viễn khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={ () => deleteStaffMutation(row.original._id) }
                    >
                      Xóa
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) }
    </>
  );
};

export default ActionMenu;
