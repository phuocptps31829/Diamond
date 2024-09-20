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
import { FaHourglassStart } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { FaRegHourglassHalf } from "react-icons/fa6";

export default function BottomLists() {
  const [timeLeft, setTimeLeft] = useState(2940);
  const totalTime = 7940;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <div className="mt-6 grid w-full grid-cols-[25%_72.8%] justify-between">
      <div className="w-full rounded-lg bg-white p-4">
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
                strokeDashoffset={251.2 - (251.2 * progress) / 100}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
              <div className="bg-[#edfffd] p-4 rounded-[99px]">
                <FaRegHourglassHalf size={30} color="#00E396" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600">
            Cuộc hẹn tiếp theo trong
          </p>
          <p className="text-3xl mt-2 font-bold text-primary-500">
            {formatTime(timeLeft)}
          </p>
        </div>
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
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(4)
              .fill()
              .map((_, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>Triệu Tiến Đạt</TableCell>
                  <TableCell>
                    <span
                      className={`${idx === 0 ? "text-green-500" : "text-yellow-400"} font-semibold`}
                    >
                      {idx === 0 ? "Đang diễn ra" : "Chưa diễn ra"}
                    </span>
                  </TableCell>
                  <TableCell>12.05.2022 lúc 7:00</TableCell>
                  <TableCell>Điện tim thường</TableCell>
                  <TableCell>
                    <Menubar className="border-none bg-transparent shadow-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                          <CiMenuKebab />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                            {idx === 0 ? (
                              <MdOutlineDone className="mr-1" />
                            ) : (
                              <FaHourglassStart className="mr-1" />
                            )}
                            <span>{idx === 0 ? "Hoàn thành" : "Bắt đầu"}</span>
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
    </div>
  );
}
