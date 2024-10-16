import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../ui/Table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../ui/Menubar";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";

export default function BottomLists({ dataUpcomingAppointments }) {
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [closestPatients, setClosestPatients] = useState([]);
  useEffect(() => {
    if (!dataUpcomingAppointments) return;
    const now = new Date();
    const upcomingAppointments = dataUpcomingAppointments
      .filter((appointment) => {
        const appointmentTime = new Date(appointment.time);
        return appointmentTime >= now;
      })
      .sort((a, b) => new Date(a.time) - new Date(b.time));

    setFilteredAppointments(upcomingAppointments.slice(0, 5));

    const closestPatientsList = dataUpcomingAppointments
      .filter((appointment) => {
        const appointmentEndTime = new Date(appointment.time);
        return appointmentEndTime <= now;
      })
      .sort((a, b) => new Date(b.time) - new Date(a.time));

    setClosestPatients(closestPatientsList.slice(0, 5));
  }, [dataUpcomingAppointments]);

  return (
    <div className="mt-6 grid w-full grid-cols-[35%_62.8%] justify-between">
      <div className="w-full rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Bệnh nhân gần đây</h3>
          <a href="#" className="text-[14px] text-blue-600 hover:underline">
            Hiển thị tất cả
          </a>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Chẩn đoán</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {closestPatients.map((appointment, index) => (
              <TableRow key={index} className="p-0 text-[13px]">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{appointment.patient.fullName}</TableCell>
                <TableCell>{appointment.result.diagnose}</TableCell>
                <TableCell>
                  <Menubar className="border-none bg-transparent shadow-none">
                    <MenubarMenu>
                      <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                        <CiMenuKebab />
                      </MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                          <FaEdit className="mr-2" size={18} />{" "}
                          <span>Xem chi tiết</span>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="w-full rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Lịch hẹn sắp tới</h3>
          <a href="#" className="text-[14px] text-blue-600 hover:underline">
            Hiển thị tất cả
          </a>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên bệnh nhân</TableHead>
              <TableHead>Bác sĩ</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow className="h-14 text-center text-[13px]">
                <TableCell colSpan={6}>Không có lịch hẹn nào !</TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <TableRow key={index} className="h-12 text-[13px]">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{appointment.user?.[0].fullName}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <img
                        src={
                          appointment.user.avatar ||
                          "https://github.com/shadcn.png"
                        }
                        alt="Doctor"
                        className="h-6 w-6 rounded-full"
                      />
                      <span>{appointment["user-doctor"]?.[0].fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.time).toLocaleString("vi-VN", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{appointment.service?.[0].name}</TableCell>
                  <TableCell>
                    <Menubar className="border-none bg-transparent shadow-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                          <CiMenuKebab />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                            <FaEdit className="mr-2" size={18} />{" "}
                            <span>Xem chi tiết</span>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
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
