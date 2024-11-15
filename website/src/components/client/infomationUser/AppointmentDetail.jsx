import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { appointmentApi } from "@/services/appointmentsApi";
import { formatCurrency, formatDateTimeLocale } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { status } from "./AppointmentHistory";
import ResultDialog from "./dialogs/ResultDialog";
import AppointmentDetailSkeleton from "./skeletons/AppointmentDetailSkeleton";

const paymentStatus = {
  "PENDING": "Chờ thanh toán",
  "PAID": "Đã thanh toán",
};

const AppointmentDetail = () => {
  const { id } = useParams();

  const { data: appointment, isLoading } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => appointmentApi.getAppointmentById(id),
    enabled: !!id,
  });

  console.log(appointment);

  const product = appointment?.service || appointment?.medicalPackage;

  if (isLoading) {
    return <AppointmentDetailSkeleton />;
  }

  return (
    <div className="p-3 md:p-6">
      <h2 className="mb-3 text-xl font-bold">{ product?.name }</h2>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">🏨</span> Nơi khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.clinic?.name + " - " + appointment?.branch?.name }
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
              { status[appointment?.status] }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              <span className="me-2">💵</span>Tổng tiền
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { formatCurrency(appointment?.invoice?.price) } - { paymentStatus[appointment?.invoice?.status] }
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
    </div>
  );
};

export default AppointmentDetail;
