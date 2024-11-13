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

export default function BottomLists() {
  return (
    <div className="mt-6 grid w-full grid-cols-[55.8%_42%] justify-between">
      <div className="w-full rounded-lg border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Hóa đơn gần đây</h3>
          <a href="#" className="text-[14px] text-blue-600 hover:underline">
            Hiển thị tất cả
          </a>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(4)
              .fill()
              .map((_, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>HD19NK03</TableCell>
                  <TableCell>Triệu Tiến Đạt</TableCell>
                  <TableCell>12.05.2022 lúc 7:00</TableCell>
                  <TableCell>1.000.000</TableCell>
                  <TableCell>
                    <Menubar className="border-none bg-transparent shadow-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                          <CiMenuKebab />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                            Xem chi tiết
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
          <h3 className="font-semibold">Hóa đơn chưa thanh toán</h3>
          <a href="#" className="text-[14px] text-blue-600 hover:underline">
            Hiển thị tất cả
          </a>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(4)
              .fill()
              .map((_, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>HD19NK03</TableCell>
                  <TableCell>Triệu Tiến Đạt</TableCell>
                  <TableCell>1.000.000</TableCell>
                  <TableCell>
                    <Menubar className="border-none bg-transparent shadow-none">
                      <MenubarMenu>
                        <MenubarTrigger className="cursor-pointer rounded-sm bg-[#F1F1F1] p-2">
                          <CiMenuKebab />
                        </MenubarTrigger>
                        <MenubarContent>
                          <MenubarItem className="flex cursor-pointer items-center text-[13px]">
                            Xem chi tiết
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
