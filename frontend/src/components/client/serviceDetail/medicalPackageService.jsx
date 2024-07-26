import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>STT</TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Danh mục khám
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Thực hiện
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.stt}>
                  <TableCell component="th" scope="row">
                    {row.stt}
                  </TableCell>
                  <TableCell align="left">{row.danhMucKham}</TableCell>
                  <TableCell align="center">
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
        </TableContainer>
      </div>
    </div>
  );
};

export default MedicalPackageService;
