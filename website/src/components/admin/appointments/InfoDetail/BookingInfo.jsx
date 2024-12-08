import React, { useState } from "react";
import { getStatusPaymentStyle } from "../utils/StatusStyle";
import { IoBulbOutline } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
import { MdOutlineConfirmationNumber } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import avatarDefault from "@/assets/images/avatar_default.png";
import { Link } from "react-router-dom";
import { FaUserInjured } from "react-icons/fa6";
import { formatCurrency } from "@/utils/format";
import { FaRegEdit } from "react-icons/fa";
import { Input } from "@/components/ui/Input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoicesApi } from "@/services/invoicesApi";
import { toastUI } from "@/components/ui/Toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doctorApi } from "@/services/doctorsApi";
import MedicalPackageBooking from "./MedicalPackageBooking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import ServiceBooking from "./ServiceBooking";
import { appointmentApi } from "@/services/appointmentsApi";

const BookingInfo = ({ data }) => {
  const bookingData = data;
  const { stylePayment, textPayment } = getStatusPaymentStyle(
    bookingData.payment.status
  );
  const queryClient = useQueryClient();

  const statusOptions = [
    { value: "PENDING", label: "Chờ xác nhận" },
    {
      value: "CONFIRMED",
      label: bookingData.status === "CONFIRMED" ? "Chờ khám" : "Đã xác nhận",
    },
    { value: "EXAMINED", label: "Đã khám" },
    { value: "CANCELLED", label: "Đã hủy" },
  ];

  const isValidAvatar = (avatar) => {
    const validExtensions = [".jpg", ".jpeg", ".png"];
    return validExtensions.some((ext) => avatar.endsWith(ext));
  };

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPriority, setNewPriority] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, priority }) =>
      invoicesApi.updateOrderNumber(id, priority),
    onSuccess: (id) => {
      queryClient.invalidateQueries("appointment", id);
      toastUI("Cập nhật số ưu tiên thành công!", "success");
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi cập nhật số ưu tiên.", "error");
      console.error("Error updating priority:", error);
    },
  });

  const handleSave = () => {
    const newPriorityNumber = Number(newPriority);
    mutate({ id: bookingData._id, priority: newPriorityNumber });
  };
  const paymentMutation = useMutation({
    mutationFn: ({ id, status }) => invoicesApi.updatePaymentStatus(id, status),
    onSuccess: (id) => {
      queryClient.invalidateQueries("appointment", id);
      toastUI("Đã cập nhật trạng thái thanh toán!", "success");
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi cập nhật trạng thái thanh toán.", "error");
      console.error("Error updating payment status:", error);
    },
  });
  const handlePayment = () => {
    paymentMutation.mutate({ id: bookingData._id, status: "PAID" });
  };

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) => invoicesApi.updateStatus(id, status),
    onSuccess: (id) => {
      toastUI("Chỉnh sửa trạng thái thành công", "success");
      queryClient.invalidateQueries("appointment", id);
    },
    onError: (err) => {
      console.log(err);
      toastUI("Chỉnh sửa trạng thái không thành công", "error");
    },
  });

  const extractDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  };

  const extractTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };
  const { data: availableDoctors } = useQuery({
    queryKey: [
      "availableDoctors",
      bookingData.service?.specialty?._id ||
        bookingData.medicalPackage?.specialty?._id,
      bookingData.branch?._id,
      bookingData.day,
      bookingData.hour,
    ],
    queryFn: () =>
      doctorApi.getDoctorByAvailable({
        specialtyID:
          bookingData.service?.specialty?._id ||
          bookingData.medicalPackage?.specialty?._id,
        branchID: bookingData.branch?._id,
        day: extractDate(bookingData.time),
        hour: extractTime(bookingData.time),
      }),
  });

  // useEffect(() => {
  //   if (bookingData.results.length > 0 && bookingData.status !== "EXAMINED") {
  //     updateStatus({ id: bookingData._id, status: "EXAMINED" });
  //   }
  // }, [
  //   bookingData.results.length,
  //   bookingData.status,
  //   bookingData._id,
  //   updateStatus,
  // ]);

  const handleChangeStatus = (status) => {
    if (status === "EXAMINED" && bookingData.results.length === 0) {
      toastUI("Vui lòng xác nhận lịch đặt và thêm kết quả trước", "error");
      return;
    }
    updateStatus({ id: bookingData._id, status });
  };
  const handleChangeDoctor = (doctorId) => {
    const selectedDoctor = availableDoctors.find(
      (doctor) => doctor._id === doctorId
    );
    setSelectedDoctor(selectedDoctor);
    setIsAlertDialogOpen(true);
  };

  const confirmChangeDoctor = () => {
    if (!selectedDoctor?.workScheduleID) {
      toastUI("Không tìm thấy lịch làm việc của bác sĩ", "error");
      return;
    }

    updateAppointmentWorkShedule({
      id: bookingData._id,
      wordScheduleId: selectedDoctor.workScheduleID,
    });
    setIsAlertDialogOpen(false);
  };

  const isBookingTimePassed = new Date(bookingData.time) < new Date();

  const { mutate: updateAppointmentWorkShedule } = useMutation({
    mutationFn: ({ id, wordScheduleId }) =>
      appointmentApi.updateAppointmentWorkShedule(id, wordScheduleId),
    onSuccess: (id) => {
      toastUI("Cập nhật lịch khám bác sĩ", "success");
      queryClient.invalidateQueries("appointments", id);
    },
    onError: (err) => {
      console.log(err);
      toastUI("Cập nhật lịch khám bác sĩ không thành công", "error");
    },
  });

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <div className="my-2 flex items-center justify-start gap-2">
          {" "}
          <h1 className="text-lg font-semibold text-gray-700">
            Thông tin lịch khám -{" "}
          </h1>
          <div className="flex w-fit items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
            <MdOutlineConfirmationNumber className="text-xl text-yellow-400" />
            <strong className="font-medium text-primary-900">
              Thứ tự khám : {bookingData.orderNumber.number || "Chưa xác định"}
            </strong>
          </div>
          {bookingData.orderNumber.priority !== undefined && (
            <div className="flex items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
              <FcHighPriority className="text-xl" />
              {isPending ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <strong className="font-medium text-primary-900">
                  Số ưu tiên : {bookingData.orderNumber?.priority}
                </strong>
              )}

              <Dialog>
                <DialogTrigger>
                  <FaRegEdit className="ml-1 cursor-pointer text-xl text-black" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chỉnh sửa số ưu tiên</DialogTitle>
                    <DialogDescription>
                      Nhập số ưu tiên mới cho đơn đặt chỗ này.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <Input
                      type="number"
                      min="1"
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="custom" onClick={handleSave}>
                        Lưu
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>{" "}
        <div className="my-2 flex w-fit items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
          <FaUserInjured className="text-xl text-primary-500" />
          <span className="font-medium text-primary-900"> Bệnh nhân :</span>
          <strong className="">
            <Link
              to={`/admin/patients/${bookingData.patient._id}`}
              className="font-semibold text-primary-900 underline"
            >
              {bookingData.patient.fullName}
            </Link>
          </strong>
          <Avatar className="ml-2 size-6">
            <AvatarImage
              src={
                bookingData.patient.avatar &&
                isValidAvatar(bookingData.patient.avatar)
                  ? `${import.meta.env.VITE_IMAGE_API_URL}/${bookingData.patient.avatar}`
                  : avatarDefault
              }
              alt="@shadcn"
            />
          </Avatar>
        </div>
      </div>
      <div className="rounded-xl bg-white px-6 py-4">
        <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-1 md:grid-cols-10">
          <div className="col-span-6 md:col-span-4">
            <strong className="text-lg font-semibold text-gray-700">
              Dịch vụ / gói khám:
            </strong>
            <ul className="list-disc">
              <div
                className="relative py-3"
                key={
                  bookingData.medicalPackage
                    ? bookingData.medicalPackage?._id
                    : bookingData.service._id
                }
              >
                <label className="flex cursor-pointer select-none rounded-lg p-3 outline outline-black">
                  <div className="ml-4 flex items-center gap-10">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_API_URL}/${bookingData.service?.image || bookingData.medicalPackage?.image}`}
                      className="w-[60px] sm:w-[75px] md:w-[100px]"
                      alt={`Image of ${bookingData.medicalPackage ? bookingData.medicalPackage.name : bookingData.service.name}`}
                    />
                    <div className="flex flex-col">
                      <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                        {bookingData.medicalPackage
                          ? bookingData.medicalPackage.name
                          : bookingData.service.name}
                      </p>
                      {bookingData.medicalPackage ? (
                        <p className="text-[14px]">
                          Cấp độ:{" "}
                          <span className="text-primary-500">
                            {bookingData.medicalPackage.level.name}
                          </span>{" "}
                          - Giá:{" "}
                          {formatCurrency(
                            bookingData.medicalPackage.level.price
                          )}
                        </p>
                      ) : (
                        <p className="text-[14px]">
                          Giá: {formatCurrency(bookingData.service.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </ul>
          </div>

          <div className="col-span-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:mt-5">
            <p className="text-gray-600">
              <strong className="font-medium text-black">Bác sĩ:</strong>{" "}
              {bookingData.doctor?.fullName || "Chưa chọn bác sĩ"}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Chi nhánh:</strong>{" "}
              {bookingData.branch.name}
            </p>

            <p className="text-gray-600">
              <strong className="font-medium text-black">Loại khám:</strong>{" "}
              {bookingData.type}
            </p>

            <p className="text-gray-600">
              <strong className="font-medium text-black">Thời gian:</strong>{" "}
              {new Date(bookingData.time).toLocaleString()}
            </p>

            <p className="text-gray-600">
              <strong className="font-medium text-black">Tổng giá:</strong>{" "}
              {formatCurrency(
                bookingData.invoice.price + bookingData.invoice.arisePrice
              )}
            </p>
            <p className="text-red-600">
              <strong className="font-medium text-black">Phí phát sinh:</strong>{" "}
              {formatCurrency(bookingData.invoice.arisePrice || 0)}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">
                Phương thức thanh toán:
              </strong>{" "}
              {bookingData.payment.method === "COD"
                ? "Tại phòng khám"
                : bookingData.payment.method}
            </p>

            <div className="flex w-max items-center justify-center gap-2">
              <strong className="font-medium text-black">
                Trạng thái thanh toán:
              </strong>
              <div
                className={`relative grid select-none items-center whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-bold uppercase ${stylePayment}`}
              >
                <span>{textPayment}</span>
              </div>
            </div>
            <div className="flex w-max items-center justify-center gap-2">
              <p>
                <strong className="font-medium text-black">Trạng thái :</strong>
              </p>

              <div className=" ">
                <Select
                  disabled={
                    bookingData.status === "CANCELLED" ||
                    bookingData.status === "EXAMINED"
                  }
                  className="w-full"
                  value={bookingData.status}
                  onValueChange={handleChangeStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Phòng khám:</strong>{" "}
              {bookingData.clinic?.name}
            </p>
            <div className="flex w-max items-center justify-center gap-2">
              <strong className="font-medium text-black">
                Thay đổi bác sĩ :
              </strong>
              <div className=" ">
                <Select
                  disabled={
                    bookingData.status === "CANCELLED" ||
                    isBookingTimePassed ||
                    bookingData.results.length > 0
                  }
                  className="w-full"
                  onValueChange={handleChangeDoctor}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn bác sĩ" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDoctors?.map((option) => (
                      <SelectItem
                        key={option._id}
                        value={option._id}
                        className="cursor-pointer"
                      >
                        {option.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full text-end">
          {bookingData.status === "CONFIRMED" && !isOpenForm && (
            <Button
              className=""
              variant="custom"
              onClick={() => {
                if (bookingData.medicalPackage) {
                  setIsOpenForm("MedicalPackage");
                } else {
                  setIsOpenForm("Service");
                }
              }}
            >
              Thêm kết quả
            </Button>
          )}
        </div>

        {/* Prescription Section */}
        {bookingData.results.length > 0 && (
          <div className="">
            <h2 className="text-lg font-semibold text-gray-700">
              Kết quả khám bệnh:
            </h2>
            <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 h-auto overflow-y-auto scroll-smooth">
              {bookingData.results.map((result) => (
                <Card key={result._id} className="m-4 mx-1 px-4 shadow-none">
                  <div className="">
                    <div className="flex items-center justify-center gap-5 py-2">
                      <div className="w-[40%] border-r border-gray-300">
                        <div className="mb-4 mt-2">
                          <strong>Dịch vụ:</strong>{" "}
                          <span className="text-primary-500">
                            {result.service.name || "Không có dịch vụ"}
                          </span>
                        </div>
                        <div className="my-4">
                          <strong>Chẩn đoán:</strong>{" "}
                          {result.diagnose || "Chưa có kết quả"}
                        </div>
                        <div className="my-4">
                          <strong>Mô tả:</strong>{" "}
                          {result.description || "Không có mô tả"}
                        </div>
                      </div>

                      <div className="my-4 w-[60%]">
                        <strong>Hình ảnh liên quan:</strong>
                        <div className="mx-auto my-3 mt-2 flex max-h-64 flex-wrap gap-4 overflow-y-auto">
                          {Array.isArray(result.images) &&
                          result.images.length > 0 ? (
                            result.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="flex">
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${image}`}
                                  alt={`Kết quả khám bệnh ${imgIndex}`}
                                  className="h-[100px] w-[100px] cursor-pointer rounded-md object-cover"
                                  onClick={() => handleOpen(image)}
                                  loading="lazy"
                                />
                              </div>
                            ))
                          ) : (
                            <p>Không có hình ảnh</p>
                          )}
                          {selectedImage && (
                            <Dialog open={open} onOpenChange={setOpen}>
                              <DialogContent className="max-w-[1000px]">
                                <DialogHeader>
                                  <DialogTitle>Hình ảnh lớn</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <img
                                    src={`${import.meta.env.VITE_IMAGE_API_URL}/${selectedImage}`}
                                    alt="Hình ảnh lớn"
                                    className="large-thumbnail h-auto w-full"
                                    loading="lazy"
                                  />
                                </DialogDescription>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>

                    {result.prescription && (
                      <div className="my-6 mt-1 rounded-md border-2 border-dashed border-primary-200 bg-[#fafdffdd] p-4">
                        <div className="flex w-fit items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
                          <IoBulbOutline className="text-xl text-yellow-500" />
                          <strong className="font-medium text-primary-900">
                            Lời khuyên :
                          </strong>{" "}
                        </div>
                        <span className="my-3 ml-1 block text-gray-700">
                          {result.prescription.advice}
                        </span>
                        <div className="my-2 flex items-center justify-start">
                          <div className="flex items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
                            <GiMedicines className="text-xl text-red-500" />
                            <strong className="font-medium text-primary-900">
                              Thuốc kê :
                            </strong>{" "}
                          </div>
                        </div>
                        <ul className="ml-4">
                          {result.prescription.medicines.map((medicine, i) => (
                            <React.Fragment key={medicine._id}>
                              {i !== 0 && (
                                <div className="my-3 border border-dashed border-primary-200"></div>
                              )}
                              <li className="mt-2 flex flex-col gap-2">
                                <ul className="ml-4 list-disc text-gray-600">
                                  <li>
                                    <strong className="font-medium text-black">
                                      Tên thuốc:
                                    </strong>{" "}
                                    {medicine.name} - {medicine.unit}
                                  </li>
                                  <li>
                                    <strong className="font-medium text-black">
                                      Thành phần:
                                    </strong>{" "}
                                    {medicine.ingredients}
                                  </li>
                                  <li>
                                    <strong className="font-medium text-black">
                                      Hướng dẫn:
                                    </strong>{" "}
                                    {medicine.instruction}
                                  </li>
                                  <li>
                                    <strong className="font-medium text-black">
                                      Tác dụng phụ:
                                    </strong>{" "}
                                    {medicine.sideEffects}
                                  </li>
                                  <li className="text-black">
                                    <strong className="font-medium text-black">
                                      Lưu ý:
                                    </strong>{" "}
                                    <span className="text-red-500">
                                      {" "}
                                      {medicine.note}
                                    </span>
                                  </li>
                                </ul>
                              </li>
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-5 flex w-full items-center justify-between gap-2">
              {bookingData.results.length > 0 && (
                <>
                  <div className="">
                    <a
                      href={`${import.meta.env.VITE_CUD_API_URL}/contracts/export/${bookingData._id}`} // eslint-disable-line
                      download
                      target="_blank"
                      className="whitespace w-full"
                    >
                      <Button variant="primary" className="w-fit">
                        Tải xuống đơn thuốc
                        <svg
                          className="ml-1 size-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>{" "}
                      </Button>
                    </a>
                  </div>
                </>
              )}
              {bookingData.results.length > 0 &&
                bookingData.payment.status !== "PAID" && (
                  <div>
                    <Link
                      to={`/admin/appointments/create/${bookingData.patient._id}`}
                    >
                      <Button
                        variant={
                          bookingData.payment.status === "PAID"
                            ? "custom"
                            : "outline"
                        }
                        className="ml-2"
                      >
                        Thêm lịch tái khám
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="custom" className="ml-2">
                          Thanh toán
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Xác nhận thanh toán
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc chắn muốn thanh toán{" "}
                            <span className="font-bold text-black">
                              {formatCurrency(
                                bookingData.invoice.price +
                                  bookingData.invoice.arisePrice
                              )}
                            </span>{" "}
                            đơn khám bệnh này không?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction onClick={handlePayment}>
                            Xác nhận
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
      {/*  */}
      {isOpenForm === "Service" && (
        <ServiceBooking
          bookingData={bookingData}
          setIsOpenForm={setIsOpenForm}
          // handleChangeStatus={handleChangeStatus}
        />
      )}
      {isOpenForm === "MedicalPackage" && (
        <MedicalPackageBooking
          bookingData={bookingData}
          setIsOpenForm={setIsOpenForm}
          // handleChangeStatus={handleChangeStatus}
        />
      )}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận thay đổi bác sĩ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn chọn bác sĩ{" "}
              <span className="uppercase text-red-500">
                {" "}
                {selectedDoctor?.name}
              </span>{" "}
              không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmChangeDoctor}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingInfo;
