import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const MedicalRecords = () => {
  let count = 1;
  const records = [
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },

    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-xl font-bold">Hồ sơ bệnh án</h2>
      <Table>
        <TableHeader className="!rounded-2xl bg-bg-gray">
          <TableRow>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Ngày giờ khám
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Tình trạng
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Thanh toán
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Bác sĩ phụ trách
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Dịch vụ/ Gói khám
            </TableHead>
            <TableHead className="whitespace-normal font-bold text-black">
              Chi tiết bệnh án
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">{record.id}</TableCell>
              <TableCell className="whitespace-nowrap">{record.date}</TableCell>
              <TableCell className="whitespace-nowrap">
                {record.status}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.payment}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.doctor}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.service}
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-primary-500 text-white px-6"
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => paginate(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MedicalRecords;
