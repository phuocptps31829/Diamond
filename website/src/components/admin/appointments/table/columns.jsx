import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { ArrowUpDown } from "lucide-react";
import { getStatusPaymentStyle } from "../utils/StatusStyle";
import avatarDefault from "@/assets/images/avatar_default.png";
import Action from "./action";
import { formatDateTimeLocale } from "@/utils/format";
import { Badge } from "@/components/ui/Badge";
const statusOptions = [
  { value: "PENDING", label: "Chờ xác nhận", variant: "pending" },
  { value: "CONFIRMED", label: "Chờ khám", variant: "confirmed" },
  { value: "EXAMINED", label: "Đã khám", variant: "examined" },
  { value: "CANCELLED", label: "Đã hủy", variant: "cancelled" },
];

const getStatusLabel = (status) => {
  const statusOption = statusOptions.find((option) => option.value === status);
  return statusOption ? statusOption.label : "";
};

const getStatusVariant = (status) => {
  const statusOption = statusOptions.find((option) => option.value === status);
  return statusOption ? statusOption.variant : "default";
};
export const getColumnsAppointments = (pageIndex, pageSize) => [
  {
    id: "stt",
    header: ({ column }) => (
      <Button
        className="w-fit px-0 text-left"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        STT
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="w-full pl-5 text-left">
        {pageIndex * pageSize + row.index + 1}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "patient",
    accessorFn: (row) => row.patient.fullName,
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
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          {row.original.doctor.fullName || "Lỗi tên bác sĩ"}
        </span>
      </div>
    ),
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
        <div
          className={`inline-block rounded-md px-2 py-1 ${
            isMedicalPackage
              ? "bg-primary-500/20 text-primary-900"
              : "bg-[#13D6CB]/20 text-cyan-950"
          }`}
        >
          <span className={`line-clamp-1 text-xs font-bold uppercase`}>
            {row.original.service?.name || row.original.medicalPackage?.name}
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
          {formatDateTimeLocale(row.original.time) || "Không có thời gian"}
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
        <span className="w-full whitespace-nowrap">
          <Badge variant={getStatusVariant(row.original.status)}>
            {getStatusLabel(row.original.status)}
          </Badge>
        </span>
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
      const { stylePayment, textPayment } = getStatusPaymentStyle(
        row.original.payment.status
      );
      return (
        <div
          className={`flex items-center justify-center rounded-md p-1 px-2 text-center text-xs font-bold uppercase ${stylePayment}`}
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
