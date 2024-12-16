import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { appointmentApi } from "@/services/appointmentsApi";
import { formatCurrency, formatDateTimeLocale } from "@/utils/format";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import ResultDialog from "./dialogs/ResultDialog";
import AppointmentDetailSkeleton from "./skeletons/AppointmentDetailSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import SpinLoader from "@/components/ui/SpinLoader";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle as DialogTitleTrigger,
  DialogTrigger,
} from "@/components/ui/Dialog";
import cancelImage from "../../../assets/images/xxx-icon.png";

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

const getStatusPaymentStyle = (status) => {
  switch (status) {
    case "PENDING":
      return {
        stylePayment: "bg-yellow-500/20 text-yellow-900",
        textPayment: "Chưa thanh toán",
      };
    case "PAID":
      return {
        stylePayment: "bg-green-500/20 text-green-900",
        textPayment: "Đã thanh toán",
      };
    default:
      return {
        stylePayment: "bg-gray-500/20 text-gray-900",
        textPayment: "Không xác định",
      };
  }
};

const AppointmentDetail = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => appointmentApi.getAppointmentById(id),
    enabled: !!id,
  });
  const product = appointment?.service || appointment?.medicalPackage;

  const { mutate: cancelAppointment, isPending } = useMutation({
    mutationFn: () => appointmentApi.cancelAppointment(id),
    onSuccess: (data) => {
      setAppointment({
        ...appointment,
        status: data?.data?.status,
      });
      setOpenDialog(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setAppointment(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <AppointmentDetailSkeleton />;
  }

  return (
    <div className="p-3 md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold">{product?.name}</h2>
      </div>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">🏨</span> Nơi khám
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              {appointment?.clinic?.name +
                " - Chi nhánh " +
                appointment?.branch?.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">🧑‍⚕️</span> Bác sĩ
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              {appointment?.doctor?.fullName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">🕒</span> Ngày giờ khám
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              {formatDateTimeLocale(appointment?.time)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">⚙️</span> Loại khám
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              {appointment?.type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">📌</span>Trạng thái
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              <Badge variant={getStatusVariant(appointment?.status)}>
                {getStatusLabel(appointment?.status)}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">💵</span>Tổng tiền
            </TableCell>
            <TableCell className="flex items-center gap-3 whitespace-nowrap px-4">
              {formatCurrency(appointment?.invoice?.price)} -
              <span
                className={`rounded-md px-2 py-1 ${getStatusPaymentStyle(appointment?.payment?.status).stylePayment}`}
              >
                {
                  getStatusPaymentStyle(appointment?.payment?.status)
                    .textPayment
                }
              </span>
              {appointment?.payment?.status === "PAID" && (
                <a
                  target="_blank"
                  href={
                    import.meta.env.VITE_CUD_API_URL +
                    "/invoices/export/" +
                    appointment?.invoice?._id
                  }
                  className="inline-block cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-xs text-white"
                >
                  📜 Xem hóa đơn
                </a>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
              <span className="me-2">🫰</span> Phương thức thanh toán
            </TableCell>
            <TableCell className="whitespace-nowrap px-4">
              {appointment?.payment?.method === "COD"
                ? "Thanh toán trực tiếp"
                : appointment?.payment?.method}
            </TableCell>
          </TableRow>
          {appointment?.status === "EXAMINED" && (
            <>
              <TableRow>
                <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
                  <span className="me-2">📰</span>Kết quả khám
                </TableCell>
                <TableCell className="whitespace-nowrap px-4">
                  <ResultDialog
                    trigger={
                      <p className="cursor-pointer text-blue-500 underline">
                        Xem kết quả
                      </p>
                    }
                    appointment={appointment}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-1/5 whitespace-nowrap border-r px-4 py-3">
                  <span className="me-2">📜</span>Chi tiết bệnh án
                </TableCell>
                <TableCell className="whitespace-nowrap px-4">
                  <Link
                    to="/profile/medical-records"
                    className="cursor-pointer text-blue-500 underline"
                  >
                    Xem chi tiết
                  </Link>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
      {appointment?.status === "PENDING" && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              disabled={isPending}
              variant="primary"
              onClick={(e) => e.stopPropagation()}
              className="float-end mt-4 bg-red-500 p-1 text-xs text-white hover:bg-red-600 md:px-5 md:py-4 md:text-[15px]"
            >
              Hủy lịch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <DialogTitleTrigger className="pt-6 text-center">
                <img
                  src={cancelImage}
                  alt="cancel-appointment"
                  className="mx-auto h-16 w-16"
                />
                <span className="inline-block pt-4 text-[18px] font-semibold">
                  Bạn có chắc chắn muốn hủy lịch khám này?
                </span>
              </DialogTitleTrigger>
              <DialogDescription className="text-center">
                Hành động này không thể hoàn tác. Lịch khám sẽ bị hủy khỏi hệ
                thống.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Hủy
                </Button>
              </DialogClose>
              <Button
                type="button"
                disabled={isPending}
                variant="secondary"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={cancelAppointment}
              >
                {isPending ? (
                  <SpinLoader />
                ) : (
                  <span className="flex items-center">
                    <MdCancel className="mr-2" />
                    Xác nhận
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AppointmentDetail;
