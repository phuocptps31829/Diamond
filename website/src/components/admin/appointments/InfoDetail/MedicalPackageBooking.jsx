import { useEffect, useState } from "react";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
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
} from "@/components/ui/AlertDialog";
import SpinLoader from "@/components/ui/SpinLoader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resultsApi } from "@/services/resultsApi";
import { Textarea } from "@/components/ui/Textarea";

const MedicalPackageBooking = ({
  bookingData,
  handleCloseForm,
  handleChangeStatus,
}) => {
  const [serviceResults, setServiceResults] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const queryClient = useQueryClient();
  const defaultServiceID = bookingData.medicalPackage?.services?.[0]?._id || "";

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

  useEffect(() => {
    if (defaultServiceID) {
      handleSelectService(defaultServiceID);
    }
  }, [defaultServiceID]);

  useEffect(() => {
    handleSaveAllServices();
  }, [selectedService, getValues()]);

  useEffect(() => {
    validateServiceResults();
  }, [serviceResults, bookingData.medicalPackage?.services]);

  const handleSelectService = (serviceID) => {
    const currentValues = getValues();

    if (selectedService) {
      updateServiceResults(selectedService, currentValues);
    }

    setSelectedService(serviceID);
    populateFormFields(serviceID);
  };

  const updateServiceResults = (serviceID, values) => {
    setServiceResults((prevResults) => {
      const existingResultIndex = prevResults.findIndex(
        (result) => result.serviceID === serviceID
      );

      const newResult = {
        serviceID,
        result: {
          diagnosis: values.diagnosis,
          detail: values.detail,
          advice: values.advice,
          images: values.images,
        },
        prescription: values.medicines,
      };

      if (existingResultIndex !== -1) {
        const updatedResults = [...prevResults];
        updatedResults[existingResultIndex] = newResult;
        return updatedResults;
      } else {
        return [...prevResults, newResult];
      }
    });
  };

  const populateFormFields = (serviceID) => {
    const selectedServiceResult = serviceResults.find(
      (result) => result.serviceID === serviceID
    );

    if (selectedServiceResult) {
      setValue("diagnosis", selectedServiceResult.result.diagnosis);
      setValue("detail", selectedServiceResult.result.detail);
      setValue("advice", selectedServiceResult.result.advice);
      setValue("images", selectedServiceResult.result.images);
      setValue("medicines", selectedServiceResult.prescription);
    } else {
      resetFormFields();
    }

    triggerFormFields();
  };

  const resetFormFields = () => {
    setValue("diagnosis", "");
    setValue("detail", "");
    setValue("advice", "");
    setValue("images", []);
    setValue("medicines", []);
  };

  const triggerFormFields = () => {
    trigger("diagnosis");
    trigger("detail");
    trigger("advice");
    trigger("images");
    trigger("medicines");
  };

  const closeForm = () => {
    handleCloseForm();
    setServiceResults([]);
    setSelectedService(null);
    setValidationError(null);
    reset();
  };

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

  console.log(serviceResults, "serviceResults");

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

  const handleSaveAllServices = () => {
    const currentValues = getValues();
    if (selectedService) {
      updateServiceResults(selectedService, currentValues);
    }
  };

  const validateServiceResults = () => {
    const requiredServices = bookingData.medicalPackage?.services || [];

    for (const service of requiredServices) {
      const serviceResult = serviceResults.find(
        (result) => result.serviceID === service._id
      );

      if (
        !serviceResult ||
        !serviceResult.result.diagnosis ||
        serviceResult.result.diagnosis.trim() === "" ||
        !serviceResult.result.detail ||
        serviceResult.result.detail.trim() === "" ||
        !serviceResult.result.advice ||
        serviceResult.result.advice.trim() === "" ||
        serviceResult.prescription.length === 0
      ) {
        setValidationError(
          "Tất cả kết quả và đơn thuốc của dịch vụ phải được điền."
        );
        return false;
      }

      for (const prescription of serviceResult.prescription) {
        if (
          !prescription.medicineCategoryID ||
          prescription.medicineCategoryID.trim() === "" ||
          !prescription.medicineID ||
          prescription.medicineID.trim() === "" ||
          !prescription.price ||
          prescription.price === 0 ||
          !prescription.quantity ||
          prescription.quantity === 0 ||
          !prescription.usage ||
          prescription.usage.trim() === ""
        ) {
          setValidationError(
            "Tất cả các trường trong đơn thuốc phải được điền."
          );
          return false;
        }
      }
    }

    setValidationError(null);
    return true;
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await resultsApi.addResultAndPrescription(data);
      return response;
    },
    onSuccess: () => {
      handleChangeStatus("EXAMINED");
      queryClient.invalidateQueries("appointments");
      toastUI("Đã thêm thành công kết quả khám!", "success");
      closeForm();
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi thêm kết quả khám.", "error");
      console.error("Error creating appointment:", error);
    },
  });

  const handleConfirmSave = async () => {
    const isValid = await trigger();
    console.log("isValid", isValid);
    console.log("validateServiceResults()", validateServiceResults());

    if (isValid && validateServiceResults()) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const uploadServiceImages = async (images) => {
    if (images.length === 0) return [];

    const formData = new FormData();
    images.forEach((file) => {
      formData.append("file[]", file);
    });

    try {
      const imageResponse = await imageApi.createImages(formData);
      return imageResponse?.data || [];
    } catch (error) {
      toastUI("Đã xảy ra lỗi khi upload hình ảnh, vui lòng thử lại.", "error");
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const onSubmit = async () => {
    setOpen(false);
    setLoadingImage(true);

    try {
      const updatedServiceResults = await Promise.all(
        serviceResults.map(async (serviceResult) => {
          const imageUrl = await uploadServiceImages(
            serviceResult.result.images
          );
          return {
            ...serviceResult,
            result: {
              ...serviceResult.result,
              images: imageUrl,
            },
          };
        })
      );

      setServiceResults(updatedServiceResults);

      const dataAll = {
        payload: updatedServiceResults.map((serviceResult) => ({
          result: {
            appointmentID: bookingData._id,
            serviceID: serviceResult.serviceID,
            diagnose: serviceResult.result.diagnosis,
            images: serviceResult.result.images,
            description: serviceResult.result.detail,
          },
          prescription: {
            advice: serviceResult.result.advice,
            medicines: serviceResult.prescription.map((medicine) => ({
              medicineID: medicine.medicineID,
              quantity: medicine.quantity,
              dosage: medicine.usage,
            })),
          },
        })),
      };
      console.log("dataAll", dataAll);

      mutation.mutate(dataAll);
    } catch (error) {
      console.error("Error in onSubmit:", error);
    } finally {
      setLoadingImage(false);
    }
  };

  return (
    <div className="mt-5">
      <Label className="mb-3 block text-[17px] font-medium leading-none text-black">
        Dịch vụ trong gói: <span className="text-red-500">*</span>
      </Label>
      <div className="flex w-full flex-col rounded-lg border-2 border-dashed border-primary-200 bg-[#c1e0ff2f] p-5 pt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 flex w-full justify-between">
            <div className="flex h-full min-h-[330px] w-[34%] flex-col gap-2 pr-2">
              <RadioServices
                services={bookingData.medicalPackage?.services}
                name="serviceID"
                onChange={handleSelectService}
                control={control}
                defaultValue={defaultServiceID}
              />
              <div className="">
                {validationError && (
                  <span className="text-sm text-red-500">
                    {validationError}
                  </span>
                )}
              </div>
            </div>

            <div className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 max-h-[600px] w-[70%] space-y-4 overflow-y-auto px-2 pl-7">
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
                    <p className="mt-1 text-sm text-red-500">
                      {errors.detail.message}
                    </p>
                  )}
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

              <div className="my-3">
                <Label className="">Thêm đơn thuốc (nếu có):</Label>
                <div className="mt-1 w-full rounded-lg border-2 border-dashed border-primary-200 bg-white p-6">
                  {medicines.map((medicine, index) => (
                    <div key={medicine.id || Date.now()}>
                      <h4 className="mb-2 text-lg font-semibold">
                        Thuốc{" "}
                        <strong className="text-primary-500">
                          {index + 1}
                        </strong>
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
                            min={1}
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
            </div>
          </div>

          <div className="mt-3 flex w-full items-center justify-end">
            <Button variant="outline" type="button" onClick={closeForm}>
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
    </div>
  );
};

export default MedicalPackageBooking;
