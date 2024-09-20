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
import { FaEye } from "react-icons/fa";

export default function BottomLists() {
  return (
    <div className="mt-6 grid w-full grid-cols-[30%_67.8%] justify-between">
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
            {Array(5)
              .fill()
              .map((_, idx) => (
                <TableRow key={idx} className="p-0 text-[13px]">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>Triệu Tiến Đạt</TableCell>
                  <TableCell>Đau dạ dày</TableCell>
                  <TableCell>
                    <Menubar className="border-none bg-transparent shadow-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                          <CiMenuKebab />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                            <FaEye className="mr-2" size={18} />{" "}
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
            {Array(5)
              .fill()
              .map((_, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>Triệu Tiến Đạt</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://github.com/shadcn.png"
                        alt="Doctor"
                        className="h-6 w-6 rounded-full"
                      />
                      <span>Vũ Đức Tín</span>
                    </div>
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
                            <FaEye className="mr-2" size={18} />{" "}
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
    </div>
  );
}
