import { z } from "zod";

export const invoicesPaymentAdminSchema = z
  .object({
    fullName: z.string().min(1, "Họ tên không được để trống!"),
    phoneNumber: z.string().min(1, "Số điện thoại không được để trống!"),
    email: z.string().optional(),
    gender: z.string().min(1, "Giới tính không được để trống!"),
    dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
    address: z.string().min(1, "Địa chỉ không được để trống!"),
    citizenIdentificationNumber: z.string().min(9, "Số CMND/CCCD không hợp lệ"),
    occupation: z.string().optional(),
    ethnic: z.string().optional(),
    insuranceCode: z.string().optional(),
    service: z.string().optional(),
    medicalPackage: z.string().optional(),
    level: z.string().optional(),
    department: z.string().min(1, "Khoa khám không được để trống!"),
    date: z.string().min(1, "Ngày khám không được để trống!"),
    doctor: z.string().min(1, "Bác sĩ không được để trống!"),
    time: z.string().min(1, "Thời gian khám không được để trống!"),
    type: z.string().min(1, "Loại khám không được để trống!"),
    isServiceSelected: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isServiceSelected) {
        return data.service && data.service.trim().length > 0;
      } else {
        return data.medicalPackage && data.medicalPackage.trim().length > 0;
      }
    },
    {
      message: "Dịch vụ không được để trống!",
      path: ["service"],
    }
  )
  .refine(
    (data) => {
      if (
        !data.isServiceSelected &&
        (!data.medicalPackage || data.medicalPackage.trim().length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Gói khám không được để trống!",
      path: ["medicalPackage"],
    }
  )
  .refine(
    (data) => {
      if (
        !data.isServiceSelected &&
        (!data.level || data.level.trim().length === 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Cấp độ không được để trống!",
      path: ["level"],
    }
  );
