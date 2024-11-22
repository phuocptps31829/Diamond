import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { ArrowUpDown } from "lucide-react";
import { getStatusPaymentStyle } from "../utils/StatusStyle";
import avatarDefault from "@/assets/images/avatar_default.png";
import Action from "./action";
import StatusCell from "./StatusCell";
import { formatDateTimeLocale } from "@/utils/format";

export const getColumnsAppointments = (onChangeStatus, onDelete) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={ row.getIsSelected() }
        onCheckedChange={ (value) => row.toggleSelected(!!value) }
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
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
              { row.original.patient.fullName || "Không có tên" }
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Bác sĩ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          { row.original.doctor.fullName || "Lỗi tên bác sĩ" }
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Dịch vụ/Gói khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const isMedicalPackage = !!row.original.medicalPackage;
      return (
        <div className={ `py-1 px-2 rounded-md ${isMedicalPackage
          ? "bg-primary-500/20 text-primary-900"
          : "bg-[#13D6CB]/20 text-cyan-950"
          }` }>
          <span
            className={ `line-clamp-1 text-xs font-bold uppercase` }
          >
            { row.original.service?.name || row.original.medicalPackage?.name }
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Loại khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">{ row.original.type }</span>
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Thời gian khám
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-full">
        <span className="w-full whitespace-nowrap">
          { formatDateTimeLocale(row.original.time) || "Không có thời gian" }
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
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <StatusCell row={ row } onChangeStatus={ onChangeStatus } />,
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => (
      <div className="w-full text-left">
        <Button
          className="px-0 text-base"
          variant="ghost"
          onClick={ () => column.toggleSorting(column.getIsSorted() === "asc") }
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
          className={ `flex items-center justify-center rounded-md p-1 px-2 text-center text-xs font-bold uppercase ${stylePayment}` }
        >
          <span className="whitespace-nowrap">{ textPayment }</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Action row={ row } onDelete={ onDelete } />;
    },
  },
];
