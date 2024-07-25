import { useState } from "react";
import DoctorProduct from "../product/Doctor";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  disableScrollLock: true, // Không ẩn scroll của trình duyệt khi mở menu
};

const ListDepartmentName = [
  "Khoa mắt",
  "Khoa tai mũi họng",
  "Khoa nội tiết",
  "Khoa nhi",
  "Khoa sản",
  "Khoa tim mạch",
  "Khoa da liễu",
  "Khoa nha khoa",
  "Khoa phục hồi chức năng",
  "Khoa phẫu thuật",
  "Khoa phụ sản",
  "Khoa thần kinh",
  "Khoa thẩm mỹ",
  "Khoa tiêu hóa",
  "Khoa ung bướu",
  "Khoa xương khớp",
  "Khoa y học cổ truyền",
];

const listDoctorsName = [
  "Nguyễn Kim Chung",
  "Trần Thị Hương",
  "Lê Thị Thu",
  "Nguyễn Văn A",
  "Trần Văn B",
  "Lê Thị C",
  "Nguyễn Văn D",
  "Trần Thị E",
  "Lê Văn F",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ListDoctors() {
  const theme = useTheme();
  const [departmentName, setDepartmentName] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const handleChangeDepartmentName = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValue = typeof value === "string" ? value.split(",") : value;
    setDepartmentName(selectedValue);
    setDoctorName("");
  };

  const handleChangeDoctorName = (event) => {
    const {
      target: { value },
    } = event;
    const selectedValue = typeof value === "string" ? value.split(",") : value;
    setDoctorName(selectedValue);
    setDepartmentName("");
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl p-5 md:p-10">
      <div className="mb-7 flex flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
        <h2 className="text-xl font-semibold">Tìm kiếm bác sĩ phù hợp theo:</h2>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <FormControl sx={{ width: 300 }}>
            <Select
              displayEmpty
              value={departmentName}
              onChange={handleChangeDepartmentName}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Chọn chuyên khoa</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              className="bg-white"
            >
              <MenuItem disabled value="">
                <em>Chọn chuyên khoa</em>
              </MenuItem>
              {ListDepartmentName.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, departmentName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 300 }}>
            <Select
              displayEmpty
              value={doctorName}
              onChange={handleChangeDoctorName}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Chọn bác sĩ</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              className="bg-white"
            >
              <MenuItem disabled value="">
                <em>Chọn bác sĩ</em>
              </MenuItem>
              {listDoctorsName.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, doctorName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <DoctorProduct key={index} />
        ))}
      </div>
      <Stack spacing={2} className="my-6 flex items-center justify-center">
        <Pagination count={10} shape="rounded" color="primary" />
      </Stack>
    </div>
  );
}
