import React, { useState } from "react";
import { getStatusPaymentStyle, getStatusStyle } from "../utils/StatusStyle";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoicesApi } from "@/services/invoicesApi";
import { toastUI } from "@/components/ui/Toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DoctorEditor from "../../doctor/editor";
import { Label } from "@radix-ui/react-dropdown-menu";
import InputCustom from "@/components/ui/InputCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import SelectMedicineCategories from "../select/SelectMedicineCategories";
import SelectMedicine from "../select/SelectMedicine";
import medicineResultSchema from "@/zods/admin/medicineResultSchema";
import Uploader from "../utils/Uploader";
import { prescriptionApi } from "@/services/prescriptionApi";
import { resultsApi } from "@/services/resultsApi";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";
import MedicalPackageBooking from "./MedicalPackageBooking";

const BookingInfo = ({ data }) => {
  const bookingData = data;
  const { stylePayment, textPayment } = getStatusPaymentStyle(
    bookingData.payment.status
  );
  const queryClient = useQueryClient();

  const { style, text } = getStatusStyle(bookingData.status);

  const isValidAvatar = (avatar) => {
    const validExtensions = [".jpg", ".jpeg", ".png"];
    return validExtensions.some((ext) => avatar.endsWith(ext));
  };

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPriority, setNewPriority] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, priority }) =>
      invoicesApi.updateOrderNumber(id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
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
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
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

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(medicineResultSchema),
    defaultValues: {
      diagnosis: "",
      detail: "",
      advice: "",
      medicines: [],
      images: [],
    },
  });
  console.log(errors);

  const medicines = useWatch({
    control,
    name: "medicines",
  });
  console.log(medicines, "medicines");

  const addMedicine = () => {
    const currentMedicines = getValues("medicines");
    const newMedicine = {
      id: Date.now(),
      medicineCategoryID: "",
      medicineID: "",
      quantity: 0,
      price: 0,
      usage: "",
    };
    setValue("medicines", [...currentMedicines, newMedicine], {
      shouldValidate: true,
    });
    trigger("medicines");
  };

  const removeMedicine = (index) => {
    const currentMedicines = getValues("medicines");
    const updatedMedicines = currentMedicines.filter((_, i) => i !== index);
    setValue("medicines", updatedMedicines, { shouldValidate: true });
    trigger("medicines");
  };
  const handleCloseForm = () => {
    setIsOpenForm(false);
    setValue("diagnosis", "");
    setValue("detail", "");
    setValue("medicines", []);
    setSelectedImage(null);
  };
  const handleSelectCategoryMedicine = (index, categoryID) => {
    const currentMedicines = getValues("medicines");
    const updatedMedicines = currentMedicines.map((medicine, i) =>
      i === index ? { ...medicine, medicineCategoryID: categoryID } : medicine
    );
    setValue("medicines", updatedMedicines, { shouldValidate: true });
    trigger("medicines");
  };
  const handleSelectMedicine = (index, medicineID, price) => {
    const currentMedicines = getValues("medicines");
    const updatedMedicines = currentMedicines.map((medicine, i) =>
      i === index ? { ...medicine, medicineID, price } : medicine
    );
    setValue("medicines", updatedMedicines, { shouldValidate: true });
    trigger("medicines");
  };
  const mutation = useMutation({
    mutationFn: async (data) => {
      const [prescriptionResponse, resultResponse] = await Promise.all([
        prescriptionApi.addPrescription(data.prescription),
        resultsApi.addResult(data.result),
      ]);
      return { prescriptionResponse, resultResponse };
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      toastUI("Đã thêm thành công kết quả khám!", "success");
      setIsOpenForm(false);

      reset();
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi thêm kết quả khám.", "error");
      console.error("Error creating appointment:", error);
    },
  });
  const handleConfirmSave = async () => {
    const isValid = await trigger();
    if (isValid) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const onSubmit = async (data) => {
    let imageUrl = [];

    if (data.images.length > 0) {
      setOpen(false);
      const formData = new FormData();
      data.images.forEach((file) => {
        formData.append("file[]", file);
      });
      setLoadingImage(true);
      try {
        const imageResponse = await imageApi.createImages(formData);
        imageUrl = imageResponse?.data;
        console.log(imageUrl, "imageUrl");
      } catch (error) {
        toastUI("Đã xảy ra lỗi ,vui lòng thử lại.", "error");
        console.error("Error creating appointment:", error);
        setLoadingImage(false);
        return;
      } finally {
        setLoadingImage(false);
      }
    }

    console.log(data.medicines, "data.medicines");

    const totalMedicinePrice = data.medicines.reduce((total, medicine) => {
      return total + (medicine.price || 0) * medicine.quantity;
    }, 0);

    const dataAll = {
      prescription: {
        invoiceID: bookingData.invoice._id,
        advice: data.advice,
        medicines: data.medicines.map((medicine) => ({
          medicineID: medicine.medicineID,
          quantity: medicine.quantity,
          dosage: medicine.usage,
        })),
        price: totalMedicinePrice,
      },
      result: {
        appointmentID: bookingData._id,
        serviceID: bookingData.service ? bookingData.service._id : undefined,
        medicalPackageID: bookingData.service
          ? undefined
          : bookingData.medicalPackage._id,
        diagnose: data.diagnosis,
        images: imageUrl,
        description: data.detail,
      },
    };

    console.log(dataAll);

    mutation.mutate(dataAll);
  };

  return (
    <div className="mt-8 w-full">
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
        </div>
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
                  <div className="ml-4 flex items-center gap-12">
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
                        <p className="text-[12px] sm:text-[14px] md:text-[16px]">
                          Cấp độ: {bookingData.medicalPackage.level.name} - Giá:{" "}
                          {bookingData.medicalPackage.level.price}
                        </p>
                      ) : (
                        <p className="text-[12px] sm:text-[14px] md:text-[16px]">
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
              {bookingData.doctor.fullName}
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
            <div className="flex w-max items-center justify-center gap-2">
              <strong className="font-medium text-black">Trạng thái :</strong>
              <div
                className={`relative grid select-none items-center whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-bold uppercase ${style}`}
              >
                <span>{text}</span>
              </div>
            </div>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Tổng giá:</strong>{" "}
              {formatCurrency(
                bookingData.invoice.price + bookingData.invoice.arisePrice
              )}
            </p>
            <p className="text-red-600">
              <strong className="font-medium text-black">Phí phát sinh:</strong>{" "}
              {formatCurrency(bookingData.invoice.arisePrice)}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">
                Phương thức thanh toán:
              </strong>{" "}
              {bookingData.payment.method}
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
          </div>
        </div>
        <div className="w-full text-end">
          {!bookingData.prescription &&
            bookingData.status === "EXAMINED" &&
            !isOpenForm && (
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
        {bookingData.prescription && (
          <div className="">
            <h2 className="text-lg font-semibold text-gray-700">Đơn thuốc:</h2>

            <div className="my-6 mt-1 rounded-md border-2 border-dashed border-primary-200 bg-[#fafdffdd] p-4">
              <div className="flex w-fit items-center gap-1 rounded-md bg-primary-100/30 px-2 py-1">
                <IoBulbOutline className="text-xl text-yellow-500" />
                <strong className="font-medium text-primary-900">
                  Lời khuyên :
                </strong>{" "}
              </div>
              <span className="my-3 ml-1 block text-gray-700">
                {bookingData.prescription.advice}
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
                {data.prescription.medicines.map((medicine, i) => (
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
                          <span className="text-red-500"> {medicine.note}</span>
                        </li>
                      </ul>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <div className="w-full text-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={
                      bookingData.payment.status === "PENDING"
                        ? "outline"
                        : "custom"
                    }
                    className=""
                  >
                    Xem kết quả
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="!max-w-4xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Kết quả khám bệnh</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="my-4">
                        <strong>Chẩn đoán:</strong>{" "}
                        {bookingData.result.diagnose || "Chưa có kết quả"}
                      </div>
                      <div className="my-4">
                        <strong>Mô tả:</strong>{" "}
                        {bookingData.result.description || "Không có mô tả"}
                      </div>
                      <div className="my-4">
                        <strong>Hình ảnh liên quan:</strong>
                        <div className="mx-auto my-3 flex flex-wrap gap-4">
                          {Array.isArray(bookingData.result?.images) &&
                          bookingData.result.images.length > 0 ? (
                            bookingData.result.images.map((image, index) => (
                              <div key={index}>
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${image}`}
                                  alt={`Kết quả khám bệnh ${index}`}
                                  className="h-[150px] w-[150px] cursor-pointer rounded-md object-cover"
                                  onClick={() => handleOpen(image)}
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
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${selectedImage}`}
                                  alt="Hình ảnh lớn"
                                  className="large-thumbnail h-auto w-full"
                                />
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Đóng</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {bookingData.payment.status === "PENDING" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="custom" className="ml-2">
                      Thanh toán
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận thanh toán</AlertDialogTitle>
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
              )}
            </div>
          </div>
        )}
      </div>
      {/*  */}
      {isOpenForm === "Service" && (
        <div className="mt-4 rounded-xl bg-white p-4 pt-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <div className="relative mt-5 md:mb-1 xl:mb-[4px] 2xl:mb-3">
                <InputCustom
                  label={"Chuẩn đoán"}
                  required
                  className="col-span-1 sm:col-span-1"
                  name="diagnosis"
                  type="text"
                  id="diagnosis"
                  placeholder="Nhập chẩn đoán kết quả sau khi khám..."
                  control={control}
                  errors={errors}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-base"
              >
                Nhập chi tiết chẩn đoán: <span className="text-red-500">*</span>
              </label>
              <DoctorEditor name="detail" control={control} errors={errors} />
            </div>
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <Uploader
                  images={field.value}
                  onChange={(newImages) => {
                    setValue("images", newImages);
                    trigger("images");
                  }}
                />
              )}
            />
            {errors.images && (
              <span className="text-sm text-red-500">
                {errors.images.message}
              </span>
            )}
            <div className="my-3">
              <label className="">Thêm đơn thuốc (nếu có):</label>
              <div className="mt-1 w-full rounded-lg border-2 border-dashed border-primary-200 p-6">
                {medicines.map((medicine, index) => (
                  <div key={medicine.id || Date.now()}>
                    <h4 className="mb-2 text-lg font-semibold">
                      Thuốc{" "}
                      <strong className="text-primary-500">{index + 1}</strong>
                      <span className="text-red-500"> *</span>
                    </h4>
                    <div className="mb-2 flex w-full gap-[15px]">
                      <div className="md:w-2/5">
                        <Label className="mb-3 block text-sm font-medium leading-none text-black">
                          Danh mục: <span className="text-red-500">*</span>
                        </Label>
                        <SelectMedicineCategories
                          name={`medicines[${index}].medicineCategoryID`}
                          control={control}
                          errors={errors}
                          onChange={(categoryID) =>
                            handleSelectCategoryMedicine(index, categoryID)
                          }
                          setValue={setValue}
                        />
                      </div>
                      <div className="md:w-2/5">
                        <Label className="mb-3 block text-sm font-medium leading-none text-black">
                          Chọn thuốc: <span className="text-red-500">*</span>
                        </Label>
                        <SelectMedicine
                          name={`medicines[${index}].medicineID`}
                          control={control}
                          medicineCategoryID={medicine.medicineCategoryID}
                          errors={errors}
                          onChange={(medicineID, price) =>
                            handleSelectMedicine(index, medicineID, price)
                          }
                          setValue={setValue}
                        />
                      </div>
                      <div className="w-1/5 md:mb-1 xl:mb-[4px] 2xl:mb-3">
                        <InputCustom
                          label={"Số lượng"}
                          required
                          className="col-span-1 sm:col-span-1"
                          name={`medicines[${index}].quantity`}
                          type="number"
                          id={`quantity-${index}`}
                          placeholder="Số lượng thuốc"
                          control={control}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
                      <InputCustom
                        label={"Hướng dẫn dùng thuốc"}
                        required
                        className="col-span-1 sm:col-span-1"
                        name={`medicines[${index}].usage`}
                        type="text"
                        id={`usage-${index}`}
                        placeholder="Nhập hướng dẫn"
                        control={control}
                        errors={errors}
                      />
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button
                        className="bg-red-400 text-white hover:bg-red-600 hover:text-white"
                        variant="outline"
                        type="button"
                        onClick={() => removeMedicine(index)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="custom" type="button" onClick={addMedicine}>
                  Thêm thuốc
                </Button>
              </div>

              {errors.medicines && (
                <span className="text-sm text-red-500">
                  {errors.medicines.message}
                </span>
              )}
            </div>
            <InputCustom
              label={"Lời khuyên"}
              required
              className="col-span-1 sm:col-span-1"
              name="advice"
              type="text"
              id="advice"
              placeholder="Nhập lời khuyên sau khi khám..."
              control={control}
              errors={errors}
            />

            <div className="mt-3 flex w-full items-center justify-end text-end">
              <Button variant="outline" onClick={handleCloseForm}>
                Hủy
              </Button>
              <Button
                type="button"
                disabled={loadingImage || mutation.isPending}
                variant="custom"
                className="ml-2"
                onClick={handleConfirmSave}
              >
                {loadingImage || mutation.isPending ? (
                  <>
                    <SpinLoader />
                  </>
                ) : (
                  "Lưu kết quả"
                )}
              </Button>

              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận đơn thuốc</AlertDialogTitle>
                    <AlertDialogDescription>
                      <span>
                        Bạn có chắc chắn muốn lưu đơn khám bệnh này không?
                      </span>
                      <br />
                      <span className="text-red-500">
                        Hành động này sẽ không thể chỉnh sửa đơn thuốc.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                      Hủy
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit(onSubmit)}>
                      Xác nhận
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </div>
      )}
      {isOpenForm === "MedicalPackage" && (
        <MedicalPackageBooking
          bookingData={bookingData}
          handleCloseForm={handleCloseForm}
        />
      )}
    </div>
  );
};

export default BookingInfo;
