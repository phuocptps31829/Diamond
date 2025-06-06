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
import { contractApi } from "@/services/contractApi";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

const useDeleteContract = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contractId) => contractApi.deleteContract(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
      toastUI("Xóa hợp đồng thành công.", "success");
    },
    onError: (error) => {
      toastUI(
        error?.response?.data?.message || "Xóa hợp đồng thất bại.",
        "error"
      );
    },
  });
};

const Action = ({ row }) => {
  const deleteMutation = useDeleteContract();

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
        <DropdownMenuItem className="flex w-fit items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <RiDeleteBin6Line className="text-[15px] text-red-600" />
                <span className="text-red-600">Xóa hợp đồng</span>
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
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Đang xóa...
                    </span>
                  ) : (
                    "Xóa"
                  )}
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
