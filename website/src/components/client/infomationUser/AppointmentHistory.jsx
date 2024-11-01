import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import CustomPagination from "@/components/ui/CustomPagination";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLocation, useNavigate } from "react-router-dom";
import { appointmentApi } from "@/services/appointmentsApi";
import { useQuery } from "@tanstack/react-query";
import { formatDateTimeLocale } from "@/utils/format";
import AppointmentHistorySkeleton from "./skeletons/AppointmentHistorySkeleton";
import { useEffect, useState } from "react";

export const status = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  CANCELED: "Đã hủy",
  EXAMINED: "Đã khám",
};

const RECORD_PER_PAGE = 10;

const AppointmentHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [curPage, setCurPage] = useState(
    () => parseInt(queryParams.get("page")) || 1
  );
  const [appointments, setAppointments] = useState([]);

  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["patientAppointments", parseInt(curPage)],
    queryFn: () => appointmentApi.getAppointmentByPatient({
      limit: RECORD_PER_PAGE,
      page: curPage,
    })
  });

  useEffect(() => {
    if (!isLoading && appointmentsData) {
      setAppointments(appointmentsData);
    }
  }, [appointmentsData, isLoading, curPage]);

  const handleViewDetail = (id) => {
    navigate(`detail/${id}`);
  };
  const handlePageChange = (page) => {
    setCurPage(page);
    navigate(`/profile/appointments?page=${page}`);
  };


  const totalPages = Math.ceil(appointments?.totalRecords / RECORD_PER_PAGE);

  if (isLoading || !appointments?.data?.length) {
    return <AppointmentHistorySkeleton />;
  }

  return (
    <div className="p-3 md:p-6">
      <div className="flex items-start justify-between mb-6 ">
        <h2 className="text-xl font-bold">Dịch vụ đã đặt</h2>
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <div className="flex items-center gap-3 md:flex-row">
            <div className="relative items-center justify-center md:flex">
              <span className="mr-2 text-sm md:text-base">Từ ngày</span>
              <Input className="md:w-40" type="date" />
            </div>
            <div className="relative items-center justify-center md:flex">
              <span className="mx-2 text-sm md:text-base">Đến ngày</span>
              <Input className="md:w-40" type="date" />
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              #
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Gói khám/Dịch vụ
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Thời gian khám
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Loại khám
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Trạng thái
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { appointments.data.map((appointment, index) => (
            <TableRow key={ index }>
              <TableCell className="text-xs md:text-sm">
                { RECORD_PER_PAGE * (curPage - 1) + index + 1 }
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                { appointment?.service?.name || appointment?.medicalPackage?.name }
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                { formatDateTimeLocale(appointment.time) }
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                { appointment.type }
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                { status[appointment.status] }
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={ () => handleViewDetail(appointment._id) }
                  className="bg-primary-500 p-1 text-[9px] text-white md:p-3 md:text-xs"
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
      <CustomPagination
        currentPage={ curPage }
        totalPages={ totalPages }
        onPageChange={ handlePageChange }
      />
    </div>
  );
};

export default AppointmentHistory;
