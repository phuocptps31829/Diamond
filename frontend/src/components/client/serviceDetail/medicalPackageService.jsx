import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function createData(stt, danhMucKham, thucHien) {
  return { stt, danhMucKham, thucHien };
}

const rows = [
  createData(1, "Bệnh sử", true),
  createData(2, "Tư vấn và khám lâm sàng với BS chuyên khoa", false),
  createData(3, "X-Quang tim phổi", true),
  createData(4, "X-Quang tim phổi", true),
  createData(5, "X-Quang tim phổi", false),
  createData(6, "X-Quang tim phổi", true),
  createData(7, "X-Quang tim phổi", false),
  createData(8, "X-Quang tim phổi", false),
  createData(9, "X-Quang tim phổi", true),
];

const MedicalPackageService = () => {
  return (
    <div className="mx-auto max-w-screen-2xl pb-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="my-4 font-semibold">
          Hiện tại, Phòng Khám Đa Khoa Diamond cung cấp dịch vụ gói khám sức
          khỏe tiền sản cho nữ gồm:
        </h1>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-primary-500 text-white hover:bg-primary-500">
                <TableCell className="whitespace-nowrap p-3 text-center font-semibold">
                  STT
                </TableCell>
                <TableCell className="whitespace-nowrap p-3 text-left font-semibold">
                  Danh mục khám
                </TableCell>
                <TableCell className="whitespace-nowrap p-3 text-center font-semibold">
                  Thực hiện
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.stt}>
                  <TableCell className="text-center font-normal">
                    {row.stt}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-left font-normal">
                    {row.danhMucKham}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center font-normal">
                    <div>
                      <label className="text-white">
                        <input
                          checked={row.thucHien}
                          className="h-8 w-8 rounded-md bg-primary-500 transition-all duration-500 ease-in-out"
                          type="checkbox"
                        />
                      </label>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MedicalPackageService;
