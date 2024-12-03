import { Button } from "@/components/ui/Button";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
import { doctorApi } from "@/services/doctorsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI as toast } from "@/components/ui/Toastify";
import { FaRegCalendarAlt } from "react-icons/fa";

const ActionMenu = ({ row }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteDoctorMutation, isPending } = useMutation({
    mutationFn: (id) => doctorApi.deleteDoctors(id),
    onSuccess: () => {
      queryClient.invalidateQueries("doctors");
      toast("Xóa bác sĩ thành công.", "success");
    },
    onError: () => {
      toast("Xóa bác sĩ thất bại.");
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
              className="flex w-full items-center gap-2"
              onClick={ () =>
                navigate(`/admin/schedules/details/${row.original._id}`)
              }
            >
              <FaRegCalendarAlt className="text-[15px] text-yellow-600" />
              <span className="text-yellow-600">Thêm lịch làm việc</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex w-full items-center gap-2"
              onClick={ () => navigate(`/admin/doctor/edit/${row.original._id}`) }
            >
              <FiEdit className="text-[15px] text-primary-600" />
              <span className="text-primary-600">Chỉnh sửa</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex w-full items-center gap-2">
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
                      Bạn có chắc chắn muốn xóa bác sĩ này?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Hành động này không thể hoàn tác. Bác sĩ sẽ bị xóa vĩnh
                      viễn khỏi hệ thống.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={ () => deleteDoctorMutation(row.original._id) }
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
