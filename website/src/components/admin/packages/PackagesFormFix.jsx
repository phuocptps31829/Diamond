import { useState, useEffect } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import CheckboxServices from "./select/CheckboxServices";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { packageAdminSchema } from "@/zods/admin/packagesAdmin";
import { MdCloudUpload } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaTrashRestore } from "react-icons/fa";
import axios from "axios";
import SpinLoader from "@/components/ui/SpinLoader";
const clientId = import.meta.env.VITE_CLIENT_ID;
import { toastUI as toast } from "@/components/ui/Toastify";

const PackagesFormFix = ({ packageDetail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(packageAdminSchema),
    defaultValues: {
      name: "",
      specialtyID: "",
      shortDescription: "",
      details: "",
      isHidden: true,
      services: [
        {
          servicesID: [],
          levelName: "",
          price: 0,
          discountPrice: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const addService = () => {
    append({
      servicesID: [],
      levelName: "",
      price: 0,
      discountPrice: 0,
    });
  };

  useEffect(() => {
    setValue("name", packageDetail.name);
    setValue("specialtyID", packageDetail.specialtyID);
    setValue("shortDescription", packageDetail.shortDescription);
    setValue("isHidden", packageDetail.isHidden);
    setValue("details", packageDetail.details);
    setImagePreview(packageDetail.image);
    setImage(packageDetail.image);
    setValue(
      "services",
      packageDetail.services.map((service) => ({
        servicesID: service.servicesID,
        levelName: service.levelName,
        price: service.price,
        discountPrice: service.discountPrice,
      })),
    );
  }, [packageDetail, setValue, refreshTrigger]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (fileImage) {
      const formData = new FormData();
      formData.append("image", fileImage);
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${clientId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        const imageUrl = response.data.data.url;
        const formattedData = {
          ...data,
          image: imageUrl,
        };

        console.log(JSON.stringify(formattedData, null, 2));
        setFileImage(null);
        setIsLoading(false);
        setRefreshTrigger((prev) => !prev);
        toast("Cập nhật gói thành công!", "success");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast("Cập nhật gói thất bại!", "error");
      }
    } else {
      const formattedData = {
        ...data,
        image: image,
      };
      console.log(JSON.stringify(formattedData, null, 2));
      setFileImage(null);
      setIsLoading(false);
      setRefreshTrigger((prev) => !prev);
      toast("Cập nhật gói thành công!", "success");
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin gói sản phẩm
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-5 mt-5">
              <div className="relative h-[230px] min-w-[300px] rounded-3xl border-2 border-dashed border-primary-500">
                <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                  <label className="flex h-full w-full cursor-pointer items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <MdCloudUpload size={45} color="#007BBB" />
                      <p className="mt-2 text-sm">Chọn ảnh</p>
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="absolute inset-0 h-full w-full rounded-3xl object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFileImage(file);
                        const imageUrl = URL.createObjectURL(file);
                        setImagePreview(imageUrl);
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-3 w-full">
              <div className="grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2">
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="name"
                  id="name"
                  label="Tên gói:"
                  type="text"
                  control={control}
                  errors={errors}
                  placeholder="Nhập tên gói"
                />
                <div>
                  <Label
                    htmlFor=""
                    className="mb-3 block text-sm font-medium leading-none text-black"
                  >
                    Chuyên khoa:
                  </Label>
                  <SelectSpecialty
                    name="specialtyID"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="grid w-full gap-1.5">
                  <Label className="mb-3 block" htmlFor="shortDescription">
                    Nhập mô tả ngắn:
                  </Label>
                  <Controller
                    name="shortDescription"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Nhập mô tả."
                        id="shortDescription"
                        {...field}
                      />
                    )}
                  />
                  {errors.shortDescription && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.shortDescription.message}
                    </p>
                  )}
                </div>

                <div className="flex h-full flex-col">
                  <Label
                    htmlFor=""
                    className="mb-5 block text-sm font-medium leading-none text-black"
                  >
                    Trạng thái:
                  </Label>
                  <div className="mb-3 flex items-center">
                    <Controller
                      name="isHidden"
                      control={control}
                      render={({ field }) => (
                        <>
                          <label className="mr-6 flex items-center">
                            <input
                              type="radio"
                              name="isHidden"
                              value={false}
                              className="mr-2"
                              checked={field.value === false}
                              onChange={() => field.onChange(false)}
                            />
                            <span className="text-sm">Hiển thị</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="isHidden"
                              value={true}
                              className="mr-2"
                              checked={field.value === true}
                              onChange={() => field.onChange(true)}
                            />
                            <span className="text-sm">Ẩn</span>
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <Label className="mb-3 block text-[17px] font-medium leading-none text-black">
              Dịch vụ trong gói:
            </Label>
            <div className="rounded-lg border-2 border-dashed border-primary-200 bg-[#fafdffdd] p-5">
              {fields.map((item, index) => (
                <>
                  <div
                    key={item.id}
                    className={`${index === 0 ? "pb-3" : "border-t-2 border-dashed border-primary-400 pt-4"} mb-5 flex items-center justify-between`}
                  >
                    <div className="flex h-full w-[40%] flex-col pr-2">
                      <Label
                        htmlFor=""
                        className="mb-4 block text-sm font-medium leading-none text-black"
                      >
                        Chọn dịch vụ:
                      </Label>
                      <div className="scrollable-services">
                        <CheckboxServices
                          name={`services[${index}].servicesID`}
                          control={control}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="relative w-[60%] space-y-4 pl-10">
                      <div className="absolute left-0 top-[10%] h-[90%] w-[1px] border border-dashed border-primary-500"></div>
                      <div className="w-full">
                        <InputCustom
                          className="col-span-1 sm:col-span-1"
                          name={`services[${index}].levelName`}
                          label="Cấp độ gói:"
                          type="text"
                          control={control}
                          errors={errors}
                          placeholder="Nhập tên cấp độ gói"
                        />
                      </div>
                      <div className="w-full">
                        <InputCustom
                          className="col-span-1 sm:col-span-1"
                          name={`services[${index}].price`}
                          label="Giá gói:"
                          type="number"
                          control={control}
                          errors={errors}
                          placeholder="Nhập giá gói"
                        />
                      </div>
                      <div className="w-full">
                        <InputCustom
                          className="col-span-1 sm:col-span-1"
                          name={`services[${index}].discountPrice`}
                          label="Giá khuyến mãi:"
                          type="number"
                          control={control}
                          errors={errors}
                          placeholder="Nhập giá khuyến mãi"
                        />
                      </div>
                    </div>
                  </div>
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="group relative flex items-center justify-center overflow-hidden rounded-sm bg-red-600 bg-gradient-to-r px-4 py-2 text-white transition-all duration-300 ease-out"
                    >
                      <span className="relative text-[13px] font-semibold">
                        Xóa biến thể{" "}
                        <FaTrashRestore className="ml-2 inline-block" />
                      </span>
                    </button>
                  )}
                </>
              ))}
              {fields.length === 1 && (
                <button
                  type="button"
                  onClick={addService}
                  className="group relative flex items-center justify-center overflow-hidden rounded-sm bg-green-600 bg-gradient-to-r px-4 py-2 text-white transition-all duration-300 ease-out hover:bg-gradient-to-r"
                >
                  <span className="relative text-[13px] font-semibold">
                    Thêm biến thể <FaPlus className="ml-2 inline-block" />
                  </span>
                </button>
              )}
            </div>
            {errors.services && (
              <p className="mt-3 text-red-500">{errors.services.message}</p>
            )}
          </div>

          <Label className="mb-3 block" htmlFor="details">
            Nhập mô tả gói:
          </Label>
          <NewsEditor control={control} name="details" errors={errors} />
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit" disabled={isLoading}>
              {isLoading ? <SpinLoader /> : "Cập nhật"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackagesFormFix;
