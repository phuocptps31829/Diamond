import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
function createData(stt, nameService, price) {
  return { stt, nameService, price };
}
const services = [
  {
    serviceName: "DA LIỄU",
    rows: [
      createData(1, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(2, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(3, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(4, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(5, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(6, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(7, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(8, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(9, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
      createData(10, "Điều trị u mềm lây bằng nạo thương tổn", "120.000 VND"),
    ],
  },
  {
    serviceName: "RĂNG HÀM MẶT",
    rows: [createData(1, "Nhổ răng số 8", "500.000 VND")],
  },
  {
    serviceName: "XƯƠNG KHỚP",
    rows: [createData(1, "Chụp X-quang khớp gối", "200.000 VND")],
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#007BBB",
    color: theme.palette.common.white,
    fontSize: 20,
    fontWeight: "600",
  },
}));
const StyledTableCellSTT = styled(TableCell)({
  width: "50px",
});

const StyledTableCellNameService = styled(TableCell)({
  minWidth: "170px",
});

const StyledTableCellPrice = styled(TableCell)({
  width: "170px",
});

const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 15,
  },
}));
const PriceServiceContainer = () => {
  return (
    <div className="mx-auto max-w-screen-2xl p-10">
      {services.map((service, index) => (
        <div key={service.serviceName} className=" my-7 mx-auto max-w-7xl">
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 300 }}
              aria-label={`${service.serviceName.toLowerCase()} table`}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" colSpan={3}>
                    {service.serviceName}
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              {index === 0 && (
                <TableHead>
                  <TableRow>
                    <StyledTableCellBody align="left">STT</StyledTableCellBody>
                    <StyledTableCellBody align="left">
                      Tên dịch vụ
                    </StyledTableCellBody>
                    <StyledTableCellBody align="center">
                      Giá
                    </StyledTableCellBody>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {service.rows.map((row) => (
                  <TableRow
                    key={row.stt}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCellSTT align="left" component="th" scope="row">
                      {row.stt}
                    </StyledTableCellSTT>
                    <StyledTableCellNameService align="left">
                      {row.nameService}
                    </StyledTableCellNameService>
                    <StyledTableCellPrice align="center">
                      {row.price}
                    </StyledTableCellPrice>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default PriceServiceContainer;
