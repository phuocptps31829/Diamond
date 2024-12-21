import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../ui/Table";
import { Link } from "react-router-dom";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { formatDateTimeLocale } from "@/utils/format";
import { Skeleton } from "@/components/ui/Skeleton";

export default function BottomLists({ dataAppointmentsByDoctor, loading }) {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (loading || !dataAppointmentsByDoctor || dataAppointmentsByDoctor.length === 0) {
      setTotalTime(0);
      setTimeLeft(0);
      return;
    }

    const upcomingAppointments = dataAppointmentsByDoctor.data.filter(
      (item) => item.status !== "EXAMINED"
    ).sort((a, b) => new Date(a.time) - new Date(b.time)).slice(0, 4);
    setUpcomingAppointments(upcomingAppointments);
    const currentTime = new Date();
    const targetTime = new Date(upcomingAppointments?.[0]?.time);
    const secondsDifference = Math.floor((targetTime - currentTime) / 1000);

    if (secondsDifference < 0) {
      setTotalTime(0);
      setTimeLeft(0);
    } else {
      setTotalTime(secondsDifference);
      setTimeLeft(secondsDifference);
    }

  }, [dataAppointmentsByDoctor, loading]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 100;
  return (
    <div className="mt-6 grid w-full grid-cols-[25%_72.8%] justify-between">
      <div className="w-full rounded-lg bg-white p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="h-44 w-44 rounded-full mx-auto" />
            <Skeleton className="h-6 w-36 mt-3" />
            <Skeleton className="h-6 w-28 mt-3" />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white p-4">
            <div className="relative h-44 w-44">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-current text-gray-200"
                  strokeWidth="12"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="progress-ring__circle stroke-current text-blue-600"
                  strokeWidth="12"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={ 251.2 - (251.2 * progress) / 100 }
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                <div className="bg-[#edfffd] p-4 rounded-[99px]">
                  <FaRegHourglassHalf size={ 30 } color="#00E396" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600">
              Cuộc hẹn tiếp theo trong
            </p>
            <p className="text-3xl mt-2 font-bold text-primary-500">
              { formatTime(timeLeft) }
            </p>
          </div>
        )}
      </div>
      <div className="w-full rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Lịch hẹn sắp tới</h3>
          {loading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <Link to="/" className="text-[14px] text-blue-600 hover:underline">
            Hiển thị tất cả
            </Link>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">STT</TableHead>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Dịch vụ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {loading
              ? Array(4)
                  .fill(null)
                  .map((_, idx) => (
                    <TableRow key={idx} className="h-14">
                      <TableCell className="text-center">
                        <div className="w-full flex justify-center items-center">
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <div className="w-full flex justify-center items-center">
                          <Skeleton className="h-6 w-6" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              :
              upcomingAppointments.length === 0 ? (
                <TableRow className="h-14 text-center text-[13px]">
                  <TableCell colSpan={ 6 }>Không có lịch hẹn nào !</TableCell>
                </TableRow>
            ) : (
              upcomingAppointments.map((item, idx) => (
                <TableRow key={ idx } className={ `${(idx === 0 && new Date(item.time) < new Date()) && "bg-green-100"} h-12 text-[13px]` }>
                  <TableCell className="text-center">{ idx + 1 }</TableCell>
                  <TableCell>{ item.patient.fullName }</TableCell>
                  <TableCell>
                    <span
                      className={ `${new Date(item.time) > new Date()
                        ? "text-yellow-400"
                        : "text-red-500"
                        } font-semibold` }
                    >
                      { new Date(item.time) > new Date()
                        ? "Chưa diễn ra"
                        : "Tới hẹn chờ khám" }
                    </span>
                  </TableCell>
                  <TableCell>{ formatDateTimeLocale(item.time, true) }</TableCell>
                  <TableCell>
                    <span className="max-w-[300px] truncate block">
                        { item.service?.name || item.medicalPackage?.name }
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
