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
import { newsApi } from "@/services/newsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

// const useDeleteNews = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (newsId) => newsApi.deleteNews(newsId),
//     onSuccess: () => {
//       queryClient.invalidateQueries("news");
//         toastUI("Xóa tin tức thành công.", "success");
//     },
//     onError: (error) => {
//         toastUI("Xóa tin tức thất bại.", "error");
//       console.error("Error deleting news:", error);
//     },
//   });
// };

const Action = ({ row }) => {
  // const deleteMutation = useDeleteNews();

  // const handleDelete = () => {
  //   deleteMutation.mutate(row.original._id);
  // };
  console.log(row);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-end">
        <Button variant="ghost" className="h-8 w-8 rotate-90 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full min-w-0">
        <Link to={ `/admin/news/detail/${row.original._id}` }>
          <DropdownMenuItem className="flex w-full items-center gap-2">
            <BiDetail className="text-[15px] text-yellow-600" />
            <span className="text-yellow-600">Chi tiết</span>
          </DropdownMenuItem>
        </Link>
        {/* <Link to={`/admin/news/edit/${row.original._id}`}>
          <DropdownMenuItem className="flex w-full items-center gap-2 text-primary-600">
            <FiEdit className="text-[15px] text-primary-600" />
            <span>Chỉnh sửa</span>
          </DropdownMenuItem>
        </Link> */}
        {/* <DropdownMenuItem className="flex w-full items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div
                className="flex w-full cursor-pointer items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <RiDeleteBin6Line className="text-[15px] text-red-500" />
                <span className="text-red-600">Xóa</span>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc chắn muốn xóa hóa đơn này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác. Hóa đơnsẽ bị xóa vĩnh viễn
                  khỏi hệ thống.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Action;
