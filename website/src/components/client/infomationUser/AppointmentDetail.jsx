import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { appointmentApi } from "@/services/appointmentsApi";
import { useQuery } from "@tanstack/react-query";

const AppointmentDetail = ({ props }) => {
  const appointmentData = {
    serviceName: "Dịch vụ Tầm soát ung thư phổi",
    doctor: "Ths.Bs Trần Thị Hồng Lê",
    specialty: "Phổi - Hô hấp",
    clinic: "Phòng khám 234",
    hospital: "Bệnh viện 175, Gò Vấp, Hồ Chí Minh",
    date: "13:00 02/07/2024",
    type: "Tái khám",
    status: "Đã khám",
    payment: "Chuyển khoản ngân hàng",
    result: "Ung thư giai đoạn giữa",
  };

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["allAppointments"],
    queryFn: appointmentApi.getAllAppointments
  });

  if (isLoading) {
    return;
  }

  return (
    <div className="p-3 md:p-6">
      <h2 className="mb-3 text-xl font-bold">{ appointmentData.serviceName }</h2>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Nơi khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.doctor }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Bác sĩ
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.doctor }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Chuyên khoa
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.specialty }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Ngày giờ khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.date }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Loại khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.type }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Trạng thái
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.status }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Phương thức thanh toán
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.payment }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Hình ảnh chuẩn đoán
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.result }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 w-1/5 whitespace-nowrap border-r">
              Kết quả khám
            </TableCell>
            <TableCell className="px-4 whitespace-nowrap">
              { appointmentData.result }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentDetail;
