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
import { useLocation, useNavigate } from "react-router-dom";
import { appointmentApi } from "@/services/appointmentsApi";
import { useQuery } from "@tanstack/react-query";
import { formatDateTimeLocale } from "@/utils/format";
import AppointmentHistorySkeleton from "./skeletons/AppointmentHistorySkeleton";
import { useEffect, useState } from "react";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
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

const RECORD_PER_PAGE = 10;

const AppointmentHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [curPage, setCurPage] = useState(
    () => parseInt(queryParams.get("page")) || 1
  );
  const [appointments, setAppointments] = useState([]);
  const [skeletonRows, setSkeletonRows] = useState(5);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(new Date()
      .setFullYear(new Date().getFullYear() - 1))
      .toISOString().slice(0, 10),
    to: (() => {
      let now = new Date();
      now.setMonth(now.getMonth() + 1);
      return now.toISOString().slice(0, 10);
    })()
  });

  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["patientAppointments", [curPage, selectedDate]],
    queryFn: () => appointmentApi.getAppointmentByPatient({
      limit: RECORD_PER_PAGE,
      page: curPage,
      startDay: selectedDate.from,
      endDay: selectedDate.to
    })
  });

  useEffect(() => {
    if (!isLoading && appointmentsData) {
      setAppointments(appointmentsData);
      const totalPages = Math.ceil(appointmentsData?.totalRecords / RECORD_PER_PAGE);
      setSkeletonRows(totalPages > 1 ? RECORD_PER_PAGE : appointmentsData?.totalRecords);
    }
  }, [appointmentsData, isLoading, curPage]);

  const handleViewDetail = (id) => {
    navigate(`detail/${id}`);
  };

  const handlePageChange = (page) => {
    setCurPage(page);
    navigate(`/profile/appointments?page=${page}`);
  };

  const handleDateChange = (values) => {
    const objDate = {
      from: new Date(values.range.from).toISOString().slice(0, 10),
      to: new Date(values.range.to).toISOString().slice(0, 10),
    };
    setSelectedDate(objDate);
  };

  const totalPages = Math.ceil(appointments?.totalRecords / RECORD_PER_PAGE);

  return (
    <div className="p-3 md:p-6 !pb-0">
      <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start justify-between mb-6 ">
        <h2 className="text-xl font-bold">Dịch vụ đã đặt</h2>
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <div className="flex items-center gap-3 md:flex-row">
            <div className="relative items-center justify-center md:flex">
              <DateRangePicker
                onUpdate={ handleDateChange }
                initialDateFrom={ selectedDate?.from }
                initialDateTo={ selectedDate?.to }
                align="start"
                locale="vi-VN"
                showCompare={ false }
              />
            </div>
          </div>
        </div>
      </div>
      { isLoading
        ? <AppointmentHistorySkeleton
          numRows={ skeletonRows }
          totalPages={ totalPages }
        />
        : <Table>
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
            { appointments?.data?.length ? appointments.data.map((appointment, index) => (
              <TableRow key={ index }>
                <TableCell className="text-xs md:text-sm">
                  { RECORD_PER_PAGE * (curPage - 1) + index + 1 }
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                  <div
                    className={ `inline-block rounded-md px-2 py-1 ${appointment?.medicalPackage?.services?.length > 0
                      ? "bg-primary-500/20 text-primary-900"
                      : "bg-[#13D6CB]/20 text-cyan-950"
                      }` }
                  >
                    <span className={ `line-clamp-1 text-xs font-bold uppercase` }>
                      { appointment?.service?.name || appointment?.medicalPackage?.name }
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                  { formatDateTimeLocale(appointment.time) }
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                  { appointment.type }
                </TableCell>
                <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                  <Badge variant={ getStatusVariant(appointment?.status) }>
                    { getStatusLabel(appointment?.status) }
                  </Badge>
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
            )) : (
              <TableRow className="hover:bg-none">
                <TableCell colSpan="6" className="hover:bg-none text-center pt-20 text-sm">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table> }
      {
        appointments.totalRecords > 0 && (
          <CustomPagination
            totalPages={ totalPages }
            currentPage={ curPage }
            onPageChange={ handlePageChange }
          />
        )
      }
    </div>
  );
};

export default AppointmentHistory;
