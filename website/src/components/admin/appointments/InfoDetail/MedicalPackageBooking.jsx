import { useState } from "react";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import DoctorEditor from "../../doctor/editor";
import SelectMedicineCategories from "../select/SelectMedicineCategories";
import SelectMedicine from "../select/SelectMedicine";
import { Button } from "@/components/ui/Button";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import medicineResultSchema from "@/zods/admin/medicineResultSchema";
import RadioServices from "../select/CheckboxServices";
import Uploader from "../utils/Uploader";
import { imageApi } from "@/services/imageApi";
import { toastUI } from "@/components/ui/Toastify";
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
import SpinLoader from "@/components/ui/SpinLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { prescriptionApi } from "@/services/prescriptionApi";
import { resultsApi } from "@/services/resultsApi";

const MedicalPackageBooking = ({ bookingData, handleCloseForm }) => {
  const [serviceResults, setServiceResults] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const queryClient = useQueryClient();

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
  const validateServiceResults = () => {
    const serviceIDs = bookingData.medicalPackage?.services.map(
      (service) => service._id
    );
    const resultServiceIDs = serviceResults.map((result) => result.serviceID);
    for (const serviceID of serviceIDs) {
      if (!resultServiceIDs.includes(serviceID)) {
        return "Vui lòng điền đầy đủ kết quả dịch vụ.";
      }
    }
    for (const result of serviceResults) {
      const { diagnosis, detail, advice } = result.result;
      if (!diagnosis || !detail || !advice) {
        return "Vui lòng điền đầy đủ kết quả dịch vụ.";
      }
    }
    setValidationError(null);
    return null;
  };
  const handleSelectService = (serviceID) => {
    const currentValues = getValues();

    if (selectedService) {
      setServiceResults((prevResults) => {
        const existingResultIndex = prevResults.findIndex(
          (result) => result.serviceID === selectedService
        );

        const newResult = {
          serviceID: selectedService,
          result: {
            diagnosis: currentValues.diagnosis,
            detail: currentValues.detail,
            advice: currentValues.advice,
          },
        };

        if (existingResultIndex !== -1) {
          const updatedResults = [...prevResults];
          updatedResults[existingResultIndex] = newResult;
          return updatedResults;
        } else {
          return [...prevResults, newResult];
        }
      });
    }

    setSelectedService(serviceID);

    const selectedServiceResult = serviceResults.find(
      (result) => result.serviceID === serviceID
    );
    if (selectedServiceResult) {
      setValue("diagnosis", selectedServiceResult.result.diagnosis);
      setValue("detail", selectedServiceResult.result.detail);
      setValue("advice", selectedServiceResult.result.advice);
    } else {
      setValue("diagnosis", "");
      setValue("detail", "");
      setValue("advice", "");
    }
    trigger("diagnosis");
    trigger("detail");
    trigger("advice");
  };

  const closeForm = () => {
    handleCloseForm();
    setServiceResults([]);
    setSelectedService(null);
    setValidationError(null);
    reset();
  };
  console.log("Service results: ", serviceResults);

  const medicines = useWatch({
    control,
    name: "medicines",
  });
  console.log("medicines", medicines);

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
  const handleSaveAllServices = () => {
    const currentValues = getValues();

    if (selectedService) {
      setServiceResults((prevResults) => {
        const existingResultIndex = prevResults.findIndex(
          (result) => result.serviceID === selectedService
        );

        const newResult = {
          serviceID: selectedService,
          result: {
            diagnosis: currentValues.diagnosis,
            detail: currentValues.detail,
            advice: currentValues.advice,
          },
        };

        if (existingResultIndex !== -1) {
          const updatedResults = [...prevResults];
          updatedResults[existingResultIndex] = newResult;
          return updatedResults;
        } else {
          return [...prevResults, newResult];
        }
      });
    }
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

      reset();
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi thêm kết quả khám.", "error");
      console.error("Error creating appointment:", error);
    },
  });
  const onSubmit = async (data) => {
    handleSaveAllServices();
    const validationError = validateServiceResults();
    if (validationError) {
      setValidationError(validationError);
      return;
    }

    let imageUrl = [];

    if (data.images.length > 0) {
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
    <div className="mt-5">
      <Label className="mb-3 block text-[17px] font-medium leading-none text-black">
        Dịch vụ trong gói: <span className="text-red-500">*</span>
      </Label>
      <div className="flex w-full flex-col rounded-lg border-2 border-dashed border-primary-200 bg-[#c1e0ff2f] p-5 pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 flex w-full justify-between">
            <div className="flex h-full min-h-[330px] w-[30%] flex-col pr-2">
              <RadioServices
                services={bookingData.medicalPackage?.services}
                name="serviceID"
                onChange={handleSelectService}
                control={control}
              />
            </div>
            <div className="w-[70%] space-y-4 pl-10">
              <div className="mb-1 rounded-xl bg-white p-4 pt-1">
                <div className="block">
                  <div className="relative mb-0 mt-5">
                    <InputCustom
                      label={"Chuẩn đoán"}
                      required
                      className="col-span-1 sm:col-span-1"
                      name="diagnosis"
                      type="text"
                      control={control}
                      errors={errors}
                      id="diagnosis"
                      placeholder="Nhập chẩn đoán kết quả sau khi khám..."
                    />
                  </div>
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
                <div className="w-full">
                  <Label className="mb-2 block bg-white px-1 text-base">
                    Nhập chi tiết chẩn đoán:{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <DoctorEditor name="detail" control={control} />
                </div>
                <div className="mt-3">
                  <InputCustom
                    label={"Lời khuyên"}
                    required
                    name="advice"
                    type="text"
                    control={control}
                    errors={errors}
                    placeholder="Nhập lời khuyên sau khi khám..."
                  />
                </div>
              </div>
              {validationError && (
                <span className="text-red-500">{validationError}</span>
              )}
            </div>
          </div>
          <div className="my-3">
            <Label className="">Thêm đơn thuốc (nếu có):</Label>
            <div className="mt-1 w-full rounded-lg border-2 border-dashed border-primary-200 bg-white p-6">
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
                        errors={errors}
                        medicineCategoryID={medicine.medicineCategoryID}
                        setValue={setValue}
                        onChange={(medicineID, price) =>
                          handleSelectMedicine(index, medicineID, price)
                        }
                      />
                    </div>
                    <div className="w-1/5">
                      <InputCustom
                        label={"Số lượng"}
                        required
                        control={control}
                        medicineCategoryID={medicine.medicineCategoryID}
                        errors={errors}
                        name={`medicines[${index}].quantity`}
                        type="number"
                        placeholder="Số lượng thuốc"
                      />
                    </div>
                  </div>
                  <InputCustom
                    label={"Hướng dẫn dùng thuốc"}
                    required
                    name={`medicines[${index}].usage`}
                    control={control}
                    errors={errors}
                    placeholder="Nhập hướng dẫn"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button
                      className="bg-red-400 text-white hover:bg-red-600"
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
          <div className="mt-3 flex w-full items-center justify-end">
            <Button variant="outline" type="button" onClick={closeForm}>
              Hủy
            </Button>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  disabled={loadingImage || mutation.isPending}
                  variant="custom"
                  className="ml-2"
                >
                  {loadingImage || mutation.isPending ? (
                    <>
                      <SpinLoader />
                    </>
                  ) : (
                    "Lưu kết quả"
                  )}
                </Button>
              </AlertDialogTrigger>
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
    </div>
  );
};

export default MedicalPackageBooking;
