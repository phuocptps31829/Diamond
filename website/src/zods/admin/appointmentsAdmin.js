import { z } from "zod";

export const AppointmentAdminSchema = z
  .object({
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
