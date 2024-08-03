import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import PropTypes from "prop-types";
const MedicalPackageService = ({ medicalPackage, isLoading }) => {
  const { name, services } = medicalPackage;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto max-w-screen-2xl pb-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="my-4 font-semibold">
          Hiện tại, Phòng Khám Đa Khoa Diamond cung cấp dịch vụ{" "}
          {name.toLowerCase()} cho nữ gồm:
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
              {services.map((row) => (
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
MedicalPackageService.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.shape({
    name: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        stt: PropTypes.number.isRequired,
        danhMucKham: PropTypes.string.isRequired,
        thucHien: PropTypes.bool.isRequired,
      }),
    ),
  }),
};

export default MedicalPackageService;
