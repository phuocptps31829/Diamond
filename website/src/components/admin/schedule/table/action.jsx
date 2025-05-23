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
import { serviceApi } from "@/services/servicesApi";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BiDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (serviceId) => serviceApi.deleteService(serviceId),
        onSuccess: () => {
            queryClient.invalidateQueries("service");
            toastUI("Xóa lịch làm việc thành công.", "success");
        },
        onError: (error) => {
            toastUI(error?.response?.data?.message || 'Xóa lịch làm việc thất bại.', "error");
        },
    });
};

const Action = ({ row }) => {
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
            <DropdownMenuContent align="end" className="w-full min-w-0">
                <Link to={ `/admin/schedules/details/${row.original._id}` }>
                    <DropdownMenuItem className="flex w-full items-center gap-2">
                        <BiDetail className="text-[15px] text-yellow-600" />
                        <span className="text-yellow-600"> Chi tiết</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="flex w-full items-center gap-2">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div
                                className="flex cursor-pointer items-center gap-2"
                                onClick={ (e) => e.stopPropagation() }
                            >
                                <RiDeleteBin6Line className="text-[15px] text-red-600" />
                                <span className="text-red-600">Xóa</span>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Bạn có chắc chắn muốn xóa dịch vụ này?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Hành động này không thể hoàn tác. Dịch vụ sẽ bị xóa vĩnh viễn
                                    khỏi hệ thống.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction onClick={ handleDelete }>
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
