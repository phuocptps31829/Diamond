"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Clock, Building2, Stethoscope, MapPin } from "lucide-react";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString("vi-VN", options);
};

const weekDays = [
  { dayName: "Thứ Hai" },
  { dayName: "Thứ Ba" },
  { dayName: "Thứ Tư" },
  { dayName: "Thứ Năm" },
  { dayName: "Thứ Sáu" },
  { dayName: "Thứ Bảy" },
  { dayName: "Chủ Nhật" },
];

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return days[day];
};

export default function BelowInformation({ doctor, isLoading, schedule }) {
  const [activeTab, setActiveTab] = useState("certification");

  const sortedSchedules =
    schedule?.[0]?.schedules?.sort(
      (a, b) => new Date(a.day) - new Date(b.day)
    ) || [];

  const workingDays = new Map();
  sortedSchedules.forEach((schedule) => {
    const dayOfWeek = getDayOfWeek(schedule.day);
    if (!workingDays.has(dayOfWeek)) {
      workingDays.set(dayOfWeek, {
        schedules: [],
      });
    }
    workingDays.get(dayOfWeek).schedules.push(schedule);
  });

  return (
    <div className="mx-auto my-10 max-w-screen-xl px-5">
      <Tabs
        defaultValue="certification"
        onValueChange={ setActiveTab }
        className="my-5 w-full"
      >
        <TabsList className="w-full gap-1 bg-muted ">
          <TabsTrigger value="certification" className="w-full p-2">
            Giới thiệu
          </TabsTrigger>
          <TabsTrigger value="experience" className="w-full p-2">
            Lịch làm việc
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="certification"
          className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            { isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <div
                className="content-news w-full"
                dangerouslySetInnerHTML={ {
                  __html: doctor.otherInfo?.detail || "",
                } }
              />
            ) }
          </div>
        </TabsContent>
        <TabsContent
          value="experience"
          className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
        >
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] whitespace-nowrap">
                    Thứ trong tuần
                  </TableHead>
                  <TableHead className="w-[200px] whitespace-nowrap">
                    Ngày làm việc
                  </TableHead>
                  <TableHead className="w-[200px] whitespace-nowrap">
                    Thời gian
                  </TableHead>
                  <TableHead className="w-[200px] whitespace-nowrap">
                    Phòng khám
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                { weekDays.map((day) => {
                  const daySchedules = workingDays.get(day.dayName);

                  if (!daySchedules) {
                    return (
                      <TableRow key={ day.dayName }>
                        <TableCell className="whitespace-nowrap font-medium">
                          { day.dayName }
                        </TableCell>
                        <TableCell colSpan={ 4 }>
                          <Badge variant="destructive">Nghỉ</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  }

                  return daySchedules.schedules.map((scheduleItem) => (
                    <TableRow key={ scheduleItem._id }>
                      <TableCell className="whitespace-nowrap font-medium">
                        { day.dayName }
                      </TableCell>
                      <TableCell className="whitespace-nowrap font-medium">
                        ({ formatDate(scheduleItem.day) })
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-primary-500" />
                          <span className="whitespace-nowrap">
                            { scheduleItem.hour.startTime } -{ " " }
                            { scheduleItem.hour.endTime }
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-primary-500" />
                          <span>{ scheduleItem.clinic.name }</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ));
                }) }
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
