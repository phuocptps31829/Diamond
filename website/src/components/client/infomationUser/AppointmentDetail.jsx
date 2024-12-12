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
      return { stylePayment: "bg-green-500/20 text-green-900", textPayment: "Đã thanh toán" };
    default:
      return { stylePayment: "bg-gray-500/20 text-gray-900", textPayment: "Không xác định" };
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
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">{ product?.name }</h2>
      </div>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">🏨</span> Nơi khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.clinic?.name + " - Chi nhánh " + appointment?.branch?.name }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">🧑‍⚕️</span> Bác sĩ
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.doctor?.fullName }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">🕒</span> Ngày giờ khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { formatDateTimeLocale(appointment?.time) }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">⚙️</span> Loại khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.type }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">📌</span>Trạng thái
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              <Badge variant={ getStatusVariant(appointment?.status) }>
                { getStatusLabel(appointment?.status) }
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">💵</span>Tổng tiền
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap flex gap-3 items-center">
              { formatCurrency(appointment?.invoice?.price) } -
              <span className={ `px-2 py-1 rounded-md ${getStatusPaymentStyle(appointment?.payment?.status).stylePayment}` }>
                { getStatusPaymentStyle(appointment?.payment?.status).textPayment }
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">🫰</span> Phương thức thanh toán
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.payment?.method === "COD"
                ? "Thanh toán trực tiếp"
                : appointment?.payment?.method }
            </TableCell>
          </TableRow>
          {
            appointment?.status === "EXAMINED" && <>
              <TableRow>
                <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                  <span className="me-2">📰</span>Kết quả khám
                </TableCell>
                <TableCell className="px-4 whitespace-nowrap">
                  <ResultDialog
                    trigger={
                      <p className="text-blue-500 underline cursor-pointer">Xem kết quả</p>
                    }
                    appointment={ appointment }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
                  <span className="me-2">📜</span>Chi tiết bệnh án
                </TableCell>
                <TableCell className="px-4 whitespace-nowrap">
                  <Link to='/profile/medical-records' className="text-blue-500 underline cursor-pointer">
                    Xem chi tiết
                  </Link>
                </TableCell>
              </TableRow>
            </>
          }
        </TableBody>
      </Table>
      { appointment?.status === "PENDING" && <Dialog open={ openDialog } onOpenChange={ setOpenDialog }>
        <DialogTrigger asChild >
          <Button
            disabled={ isPending }
            variant="primary"
            onClick={ (e) => e.stopPropagation() }
            className="mt-4 float-end bg-red-500 hover:bg-red-600 p-1 text-xs text-white md:px-5 md:py-4 md:text-[15px]"
          >
            Hủy lịch
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitleTrigger className="text-center pt-6">
              <img src={ cancelImage } alt="cancel-appointment" className="w-16 h-16 mx-auto" />
              <span className="pt-4 inline-block text-[18px] font-semibold">
                Bạn có chắc chắn muốn hủy lịch khám này?
              </span>
            </DialogTitleTrigger>
            <DialogDescription className="text-center">
              Hành động này không thể hoàn tác. Lịch khám sẽ bị hủy khỏi hệ thống.
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
              disabled={ isPending }
              variant="secondary"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={ cancelAppointment }
            >
              { isPending
                ? <SpinLoader />
                : <span className="flex items-center">
                  <MdCancel className="mr-2" />
                  Xác nhận
                </span> }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> }
    </div>
  );
};

export default AppointmentDetail;
