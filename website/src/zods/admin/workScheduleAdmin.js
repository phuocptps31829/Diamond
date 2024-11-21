import { z } from "zod";

export const createWorkScheduleSchema = z.object({
    startTime: z.string().min(1, "Vui lòng chọn giờ bắt đầu"),
    endTime: z.string().min(1, "Vui lòng chọn giờ kết thúc"),
    clinicID: z.string().min(1, "Vui lòng chọn phòng khám"),
}).refine((data) => {
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);
    const startTime = new Date(0, 0, 0, startHour, startMinute);
    const endTime = new Date(0, 0, 0, endHour, endMinute);
    return endTime > startTime;
}, {
    message: "Giờ kết thúc phải lớn hơn giờ bắt đầu",
    path: ["endTime"],
});