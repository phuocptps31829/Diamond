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
import formatDate from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/format";
import Empty from "../../ui/Empty";
import { CiMenuKebab } from "react-icons/ci";

export default function BottomLists({ allInvoices }) {
  const [latestInvoices, setLatestInvoices] = useState([]);
  const [unpaidInvoices, setUnpaidInvoices] = useState([]);

  useEffect(() => {
    if (allInvoices) {
      const latestInvoices = allInvoices.slice(0, 4);
      const unpaidInvoices = allInvoices
        .filter((invoice) => invoice.status === "PENDING")
        .slice(0, 4);
      setLatestInvoices(latestInvoices);
      setUnpaidInvoices(unpaidInvoices);
    }
  }, [allInvoices]);

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
              <TableHead className="text-center">STT</TableHead>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestInvoices.length > 0 ? (
              latestInvoices.map((invoice, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell>{invoice.invoiceCode || "-"}</TableCell>
                  <TableCell>{invoice.patient.fullName || "-"}</TableCell>
                  <TableCell>{formatDate(invoice.updatedAt)}</TableCell>
                  <TableCell>{formatPrice(invoice.price)}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="">
                  <div className="flex justify-center items-center h-24">
                    <Empty />
                  </div>
                </TableCell>
              </TableRow>
            )}
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
              <TableHead className="text-center">STT</TableHead>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Họ và tên</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unpaidInvoices.length > 0 ? (
              unpaidInvoices.map((invoice, idx) => (
                <TableRow key={idx} className="h-12 text-[13px]">
                  <TableCell className="text-center">{idx + 1}</TableCell>
                  <TableCell>{invoice.invoiceCode || "-"}</TableCell>
                  <TableCell>{invoice.patient.fullName || "-"}</TableCell>
                  <TableCell>{formatPrice(invoice.price)}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="">
                  <div className="flex justify-center items-center h-24">
                    <Empty />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
