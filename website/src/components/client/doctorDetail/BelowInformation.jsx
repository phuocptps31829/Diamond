import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const sampleSchedule = [
  { day: "Thứ Hai", time: "08:00 - 12:00, 13:00 - 17:00" },
  { day: "Thứ Ba", time: "08:00 - 12:00, 13:00 - 17:00" },
  { day: "Thứ Tư", time: "Nghỉ" },
  { day: "Thứ Năm", time: "08:00 - 12:00, 13:00 - 17:00" },
  { day: "Thứ Sáu", time: "08:00 - 12:00, 13:00 - 17:00" },
  { day: "Thứ Bảy", time: "08:00 - 12:00" },
  { day: "Chủ Nhật", time: "Nghỉ" },
];

export default function BelowInformation({ doctor, isLoading }) {
  const [activeTab, setActiveTab] = useState("certification");

  return (
    <div className="mx-auto my-10 max-w-screen-xl px-5">
      <Tabs
        defaultValue="certification"
        onValueChange={setActiveTab}
        className="my-5 w-full"
      >
        <TabsList className="w-full gap-1 bg-gray-200 py-7">
          <TabsTrigger
            value="certification"
            className={`w-full p-3 ${activeTab === "certification" ? "shadcn-tabs-active" : ""}`}
          >
            Giới thiệu
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className={`w-full p-3 ${activeTab === "experience" ? "shadcn-tabs-active" : ""}`}
          >
            Lịch làm việc
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="certification"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <div
                className="content-news w-full"
                dangerouslySetInnerHTML={{
                  __html: doctor.otherInfo?.detail || "",
                }}
              ></div>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="experience"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div>
            {isLoading ? (
              <div>Đang tải...</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 border text-gray-700 shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-left text-black">
                    <th className="border-b px-4 py-3 font-semibold">Ngày</th>
                    <th className="border-b px-4 py-3 font-semibold">
                      Thời gian
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {sampleSchedule.map((entry, index) => (
                    <tr
                      key={index}
                      className={`${
                        entry.time === "Nghỉ" ? "bg-red-200" : "bg-green-200"
                      } ${index % 2 === 0 ? "bg-opacity-75" : "bg-opacity-50"}`}
                    >
                      <td className="border-b px-4 py-3 font-semibold">
                        {entry.day}
                      </td>
                      <td className="border-b px-4 py-3">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
