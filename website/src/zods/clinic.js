import { z } from "zod";

export const clinicSchema = z.object({
  name: z.string().min(1, "Tên phòng không được để trống"),
  branchID: z.string().nonempty("Chi nhánh không được để trống"),
  specialtyID: z.string().nonempty("Chuyên khoa không được để trống"),
  address: z.string().min(1, "Địa chỉ phòng khám không được để trống"),
});
