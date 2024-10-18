import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

import { ArrowUpDown } from "lucide-react";
import { getStatusPaymentStyle } from "../utils/StatusStyle";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import avatarDefault from "@/assets/images/avatar_default.png";
import Action from "./action";
// const useDeleteAppointment = () => {
//   const { toast } = useToast();

//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (newsId) => deleteAppointment(newsId),
//     onSuccess: () => {
//       queryClient.invalidateQueries("news");
//       toast({
//         variant: "success",
//         title: "Xóa tin tức thành công",
//         description: "Tin tức đã được xóa khỏi hệ thống",
//       });
//     },
//     onError: (error) => {
//       toast({
//         variant: "error",
//         title: "Xóa tin tức thất bại",
//         description: "Đã xảy ra lỗi khi xóa tin tức",
//       });
//       console.error("Error deleting news:", error);
//     },
//   });
// };

const statusOptions = [
  { value: "PENDING", label: "Chờ xác nhận" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "EXAMINED", label: "Đã khám" },
  { value: "CANCELLED", label: "Đã hủy" },
];
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
    accessorKey: "patient",
    header: ({ column }) => (
      <div className="ml-2 w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bệnh nhân
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const isValidAvatar = (avatar) => {
        const validExtensions = [".jpg", ".jpeg", ".png"];
        return validExtensions.some((ext) => avatar.endsWith(ext));
      };
      return (
        <div className="flex items-center gap-3 py-3 font-medium">
          <div className="ml-2 flex w-full items-center">
            <Avatar className="size-8">
              <AvatarImage
                src={
                  row.original.patient.avatar &&
                  isValidAvatar(row.original.patient.avatar)
                    ? `${import.meta.env.VITE_IMAGE_API_URL}/${row.original.patient.avatar}`
                    : avatarDefault
                }
                alt="@shadcn"
              />
            </Avatar>
            <span className="ml-2 w-full whitespace-nowrap">
              {row.original.patient.fullName || "Không có tên"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "doctor",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bác sĩ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="w-full">
          <span className="w-full whitespace-nowrap">
            {row.original.doctor.fullName || "Lỗi tên bác sĩ"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dịch vụ/Gói khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const isMedicalPackage = !!row.original.medicalPackage;

      return (
        <div className="w-fit p-2">
          <span
            className={`flex items-center justify-center whitespace-nowrap rounded-md p-1 px-2 text-center text-xs font-bold uppercase ${
              isMedicalPackage
                ? "bg-primary-500/20 text-primary-900"
                : "bg-[#13D6CB]/20 text-cyan-950"
            }`}
          >
            {row.original.service?.name ||
              row.original.medicalPackage?.name ||
              "Không có tên"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loại khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{row.original.type}</span>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thời gian khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          {new Date(row.original.time).toLocaleString() || "Không có thời gian"}
        </span>
      </div>
    ),
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
      <div className="w-full">
        <Select
          value={row.original.status}
          onValueChange={(value) => {
            row.original.status = value;
            // Thực hiện các hành động khác nếu cần, ví dụ: gọi API để cập nhật trạng thái
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Thanh toán
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const { stylePayment, textPayment } = getStatusPaymentStyle(row.original.payment.status);
      return (
        <div
          className={`flex items-center justify-center rounded-md py-1 text-center text-xs font-bold uppercase ${stylePayment}`}
        >
          <span className="whitespace-nowrap">{textPayment}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Action row={row} />;
    },
  },
];
