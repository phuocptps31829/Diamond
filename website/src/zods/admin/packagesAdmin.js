import { z } from "zod";

export const packageAdminSchema = z.object({
  specialtyID: z.string().nonempty("Chuyên khoa không được để trống"),
  name: z.string().nonempty("Tên gói không được để trống"),
  shortDescription: z.string().nonempty("Mô tả ngắn không được để trống"),
  details: z.string().nonempty("Mô tả gói không được để trống"),
  isHidden: z.boolean(),
  services: z
    .array(
      z.object({
        servicesID: z.array(z.string().nonempty()).min(1),
        levelName: z.string().nonempty(),
        price: z.number().min(0),
        discountPrice: z.number().min(0),
      }),
    )
    .refine(
      (services) =>
        services.every(
          (service) =>
            service.servicesID.length > 0 &&
            service.levelName !== "" &&
            service.price >= 0 &&
            service.discountPrice >= 0,
        ),
      { message: "Vui lòng nhập đầy đủ thông tin cho các dịch vụ" },
    ),
});
