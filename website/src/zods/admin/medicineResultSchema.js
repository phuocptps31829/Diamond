import { z } from "zod";

const medicineSchema = z.object({
  medicineCategoryID: z.string().nonempty("Danh mục thuốc không được để trống"),
  medicineID: z.string().nonempty("Thuốc không được để trống"),
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  usage: z.string().nonempty("Hướng dẫn dùng thuốc không được để trống"),
});

const medicineResultSchema = z.object({
  diagnosis: z.string().nonempty("Chuẩn đoán không được để trống"),
  detail: z.string().nonempty("Chi tiết chẩn đoán không được để trống"),
  advice: z.string().nonempty("Lời khuyên không được để trống"),
  medicines: z.array(medicineSchema)
  .refine(
    (medicines) => {
      if (medicines.length > 0) {
        return medicines.every(
          (medicine) =>
            medicine.medicineCategoryID !== "" &&
            medicine.medicineID !== "" &&
            medicine.quantity > 0 &&
            medicine.usage !== ""
        );
      }
      return true; 
    },
    { message: "Vui lòng nhập đầy đủ thông tin cho các thuốc" }
  ),
  images: z.array(z.instanceof(File)).optional(),
});

export default medicineResultSchema;
export const validateData = (data) => {
  const validationResult = medicineResultSchema.safeParse(data);
  if (!validationResult.success) {
    return validationResult.error.errors.map((error) => error.message);
  }
  return [];
};