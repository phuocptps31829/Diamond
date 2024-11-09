import { useState } from "react";

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
} from "@/components/ui/AlertDialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import { Label } from "@radix-ui/react-dropdown-menu";
import InputCustom from "@/components/ui/InputCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import SelectMedicineCategories from "../select/SelectMedicineCategories";
import SelectMedicine from "../select/SelectMedicine";
import medicineResultSchema from "@/zods/admin/medicineResultSchema";
import Uploader from "../utils/Uploader";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";

import { Textarea } from "@/components/ui/Textarea";
import { resultsApi } from "@/services/resultsApi";

const ServiceBooking = ({ bookingData, setIsOpenForm }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

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

  const medicines = useWatch({
    control,
    name: "medicines",
  });

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
  };

  const handleSelectCategoryMedicine = (index, categoryID) => {
    const currentMedicines = getValues("medicines");
    const updatedMedicines = currentMedicines.map((medicine, i) =>
      i === index ? { ...medicine, medicineCategoryID: categoryID } : medicine
    );
    setValue("medicines", updatedMedicines, { shouldValidate: true });
    setValue(`medicines[${index}].medicineID`, "");
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
      const response = await resultsApi.addResultAndPrescription(data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("appointments");
      // handleChangeStatus("EXAMINED");
      setIsOpenForm(false);
      reset();
      toastUI("Đã thêm thành công kết quả khám!", "success");
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
    setOpen(false);
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

    const dataAll = {
      payload: [
        {
          result: {
            appointmentID: bookingData._id,
            serviceID: bookingData.service
              ? bookingData.service._id
              : undefined,
            diagnose: data.diagnosis,
            images: imageUrl,
            description: data.detail,
          },
          prescription: {
            advice: data.advice,
            medicines: data.medicines.map((medicine) => ({
              medicineID: medicine.medicineID,
              quantity: medicine.quantity,
              dosage: medicine.usage,
            })),
          },
        },
      ],
    };

    console.log(dataAll);

    mutation.mutate(dataAll);
  };

  return (
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
          <Label className="mb-2 block bg-white px-1 text-base">
            Nhập chi tiết chẩn đoán: <span className="text-red-500">*</span>
          </Label>

          <Controller
            name="detail"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Nhập chi tiết chuẩn đoán"
                id="detail"
                className="min-h-[100px] w-full"
                {...field}
              />
            )}
          />
          {errors.detail && (
            <p className="mt-1 text-sm text-red-500">{errors.detail.message}</p>
          )}
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
          <span className="text-sm text-red-500">{errors.images.message}</span>
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
                      min={1}
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
  );
};

export default ServiceBooking;
