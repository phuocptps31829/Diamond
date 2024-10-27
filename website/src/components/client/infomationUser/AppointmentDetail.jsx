import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { appointmentApi } from "@/services/appointmentsApi";
import { formatCurrency, formatDateTimeLocale } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { status } from "./AppointmentHistory";

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
    return;
  }

  return (
    <div className="p-3 md:p-6">
      <h2 className="mb-3 text-xl font-bold">{ product?.name }</h2>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Nơi khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.clinic?.name + " - " + appointment?.branch?.name }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Bác sĩ
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.doctor?.fullName }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Ngày giờ khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { formatDateTimeLocale(appointment?.time) }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Loại khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.type }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Trạng thái
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { status[appointment?.status] }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Tổng tiền
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { formatCurrency(appointment?.invoice?.price) }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Phương thức thanh toán
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointment?.payment?.method === "COD"
                ? "Thanh toán trực tiếp"
                : appointment?.payment?.method }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Hình ảnh chuẩn đoán
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              <p className="text-blue-500 underline cursor-pointer">
                Xem hình ảnh
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Kết quả khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              <p className="text-blue-500 underline cursor-pointer">
                Xem kết quả
              </p>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentDetail;
