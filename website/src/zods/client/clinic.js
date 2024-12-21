import { z } from "zod";

export const clinicSchema = z.object({
  clinicName: z
    .string()
    .nonempty("Tên không được để trống!")
    .min(5, "Tên phải có ít nhất 5 ký tự!")
    .refine((val) => val.length <= 255, {
      message: "Tên không được quá 255 ký tự",
    }),

  branch: z.string().nonempty("Chi nhánh không được để trống"),
  specialty: z.string().nonempty("Chuyên khoa không được để trống"),
});
