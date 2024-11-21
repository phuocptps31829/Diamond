import { useState, useCallback } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { packageAdminSchema } from "@/zods/admin/packagesAdmin";
import SpinLoader from "@/components/ui/SpinLoader";
import { toastUI as toast } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { imageApi } from "@/services/imageApi";
import { packageApi } from "@/services/medicalPackagesApi";
import RadioGroupField from "@/components/ui/RadioGroupField";
import AgeField from "@/components/ui/AgeField";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import CheckboxServices from "./select/CheckboxServices";

const PackagesFormAdd = () => {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState(false);
  const [pageServices, setPageServices] = useState(0);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(packageAdminSchema),
    defaultValues: {
      name: "",
      specialtyID: "",
      shortDescription: "",
      details: "",
      isHidden: false,
      isFamily: false,
      gender: "0",
      age: {
        min: 0,
        max: 0,
      },
      services: [
        {
          servicesID: [],
          levelName: "Cơ bản",
          price: 0,
          discountPrice: 0,
          duration: 0,
        },
        {
          servicesID: [],
          levelName: "Tiêu chuẩn",
          price: 0,
          discountPrice: 0,
          duration: 0,
        },
        {
          servicesID: [],
          levelName: "Toàn diện",
          price: 0,
          discountPrice: 0,
          duration: 0,
        },
        {
          servicesID: [],
          levelName: "Nâng cao",
          price: 0,
          discountPrice: 0,
          duration: 0,
        },
        {
          servicesID: [],
          levelName: "VIP",
          price: 0,
          discountPrice: 0,
          duration: 0,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "services",
  });

  const syncServicesID = useCallback(
    (servicesID, currentIndex) => {
      fields.forEach((_, i) => {
        if (i > currentIndex) {
          const currentServices = getValues(`services[${i}].servicesID`);
          const newServices = [...new Set([...currentServices, ...servicesID])];
          setValue(`services[${i}].servicesID`, newServices);
        }
      });
    },
    [fields, getValues, setValue]
  );

  const { mutate: createPackageMutation, isPending } = useMutation({
    mutationFn: (requestBody) => packageApi.createPackage(requestBody),
    onSuccess: () => {
      reset();
      setLoadingImage(false);
      setImagePreview(null);
      setFileImage(null);
      toast("Thêm mới gói thành công!", "success");
      navigate("/admin/packages/list");
    },
    onError: (error) => {
      console.log("error", error);
      setFileImage(null);
      setLoadingImage(false);
      toast("Thêm mới gói thất bại!", "error");
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage) {
      toast("Vui lòng chọn ảnh!", "error");
      return;
    }

    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", fileImage);

    const imageResponse = await imageApi.createImage(formData);
    const imageUrl = imageResponse?.data;

    if (!imageUrl) {
      setLoadingImage(false);
      throw new Error("Không thể upload ảnh");
    }

    const requestBody = {
      image: imageUrl,
      name: data.name,
      specialtyID: data.specialtyID,
      shortDescription: data.shortDescription,
      details: data.details,
      isHidden: data.isHidden,
      applicableObject: {
        isFamily: data.isFamily,
        gender: data.gender,
        age: {
          min: data.age.min,
          max: data.age.max,
        },
      },
      services: data.services.map((service) => ({
        servicesID: service.servicesID,
        levelName: service.levelName,
        price: service.price,
        discountPrice: service.discountPrice,
        duration: service.duration,
      })),
    };

    createPackageMutation(requestBody);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin gói sản phẩm
        </h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-8 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-5 mt-5">
              <ImagePreview
                imagePreview={ imagePreview }
                setFileImage={ setFileImage }
                setImagePreview={ setImagePreview }
              />
              { !fileImage && (
                <p className="mt-3 text-center text-sm text-red-500">
                  Vui lòng chọn ảnh
                </p>
              ) }
            </div>
            <div className="mt-3 w-full">
              <div className="grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2">
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="name"
                  id="name"
                  label="Tên gói:"
                  required
                  type="text"
                  control={ control }
                  errors={ errors }
                  placeholder="Nhập tên gói"
                />
                <div>
                  <Label
                    htmlFor=""
                    className="mb-3 block text-sm font-medium leading-none text-black"
                  >
                    Chuyên khoa <span className="text-red-500">*</span>
                  </Label>
                  <SelectSpecialty
                    name="specialtyID"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label className="mb-3 block" htmlFor="shortDescription">
                    Nhập mô tả ngắn: <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="shortDescription"
                    control={ control }
                    render={ ({ field }) => (
                      <Textarea
                        placeholder="Nhập mô tả."
                        id="shortDescription"
                        { ...field }
                      />
                    ) }
                  />
                  { errors.shortDescription && (
                    <p className="mt-1 text-sm text-red-500">
                      { errors.shortDescription.message }
                    </p>
                  ) }
                </div>
                <AgeField
                  label="Chọn độ tuổi phù hợp cho gói:"
                  control={ control }
                  errors={ errors }
                />

                <div className="col-span-2 flex justify-between">
                  <RadioGroupField
                    name="isFamily"
                    label="Dành cho gia đình:"
                    options={ [
                      { value: true, label: "Có" },
                      { value: false, label: "Không" },
                    ] }
                    control={ control }
                  />
                  <div className="flex h-[50px] w-[1px] border border-dashed border-primary-400"></div>
                  <RadioGroupField
                    name="gender"
                    label="Dành cho giới tính:"
                    options={ [
                      { value: "Nam", label: "Nam" },
                      { value: "Nữ", label: "Nữ" },
                      { value: "0", label: "Tất cả" },
                    ] }
                    control={ control }
                  />
                  <div className="flex h-[50px] w-[1px] border border-dashed border-primary-400"></div>
                  <RadioGroupField
                    name="isHidden"
                    label="Trạng thái:"
                    options={ [
                      { value: false, label: "Hiển thị" },
                      { value: true, label: "Ẩn" },
                    ] }
                    control={ control }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <Label className="mb-3 block text-[17px] font-medium leading-none text-black">
              Dịch vụ trong gói: <span className="text-red-500">*</span>
            </Label>
            <div
              className={ `${pageServices % 2 === 0 ? "bg-[#c1e0ff2f]" : "bg-[#d4fff02f]"} flex w-full flex-col rounded-lg border-2 border-dashed border-primary-200 p-5` }
            >
              { fields.map((item, index) => (
                <>
                  <div
                    key={ item.id }
                    className={ `${index === pageServices ? "flex" : "hidden"} mb-5 w-full items-center justify-between` }
                  >
                    <div className="flex h-full min-h-[330px] w-[40%] flex-col pr-2">
                      <Label
                        htmlFor=""
                        className="mb-4 block text-sm font-medium leading-none text-black"
                      >
                        Chọn dịch vụ:
                      </Label>
                      <CheckboxServices
                        name={ `services[${index}].servicesID` }
                        control={ control }
                        errors={ errors }
                        onChange={ (servicesID) => {
                          setValue(`services[${index}].servicesID`, servicesID);
                          if (index < fields.length - 1) {
                            syncServicesID(servicesID, index);
                          }
                        } }
                        index={ index }
                      />
                    </div>
                    <div className="relative w-[60%] space-y-4 pl-10">
                      <div className="absolute left-0 top-[10%] h-[90%] w-[1px] border border-dashed border-primary-500"></div>
                      <div className="w-full">
                        <InputCustom
                          required
                          className="col-span-1 sm:col-span-1"
                          name={ `services[${index}].levelName` }
                          label="Cấp độ gói:"
                          type="text"
                          control={ control }
                          errors={ errors }
                          placeholder="Nhập tên cấp độ gói"
                          disabled={ true }
                        />
                      </div>
                      <div className="w-full">
                        <InputCustom
                          required
                          className="col-span-1 sm:col-span-1"
                          name={ `services[${index}].price` }
                          label="Giá gói:"
                          type="number"
                          control={ control }
                          errors={ errors }
                          placeholder="Nhập giá gói"
                        />
                      </div>
                      <div className="w-full">
                        <InputCustom
                          required
                          className="col-span-1 sm:col-span-1"
                          name={ `services[${index}].discountPrice` }
                          label="Giá khuyến mãi:"
                          type="number"
                          control={ control }
                          errors={ errors }
                          placeholder="Nhập giá khuyến mãi"
                        />
                      </div>
                      <div className="w-full">
                        <InputCustom
                          required
                          className="col-span-1 sm:col-span-1"
                          name={ `services[${index}].duration` }
                          label="Thời gian: (phút)"
                          type="number"
                          control={ control }
                          errors={ errors }
                          placeholder="Nhập thời gian"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )) }
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className={ `${pageServices === 0 ? "bg-gray-400" : "bg-red-500"} flex min-w-[70px] items-center justify-center gap-2 rounded-md p-2 text-[13px] text-white` }
                  onClick={ () => setPageServices(pageServices - 1) }
                  disabled={ pageServices === 0 }
                >
                  <FaArrowLeft /> Trước
                </button>
                <button
                  type="button"
                  className={ `${pageServices === 4 ? "bg-gray-400" : "bg-green-500"} flex min-w-[70px] items-center justify-center gap-2 rounded-md p-2 text-[13px] text-white` }
                  onClick={ () => setPageServices(pageServices + 1) }
                  disabled={ pageServices === 4 }
                >
                  Sau <FaArrowRight />
                </button>
              </div>
            </div>
            { errors.services && (
              <p className="mt-3 text-red-500">{ errors.services.message }</p>
            ) }
          </div>

          <Label className="mb-3 block" htmlFor="details">
            Nhập mô tả gói: <span className="text-red-500">*</span>
          </Label>
          <NewsEditor control={ control } name="details" errors={ errors } />
          <div className="mt-10 w-full text-end">
            <Button
              variant="custom"
              type="submit"
              disabled={ isPending || loadingImage }
            >
              { isPending || loadingImage ? <SpinLoader /> : "Thêm mới" }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackagesFormAdd;
