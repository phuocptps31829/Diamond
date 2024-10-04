import InputCustom from "@/components/ui/InputCustom";
import { patientSchema } from "@/zods/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { MdCloudUpload } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getSpecialtyById } from "@/services/specialtiesApi";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Controller, useForm } from "react-hook-form";
export default function Form() {
  const { id } = useParams();
  console.log(id);
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      spectialtyName: "",
      status: "",
    },
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ["specialty", id],
    queryFn: () => getSpecialtyById(id),
    enabled: !!id,
  });
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    if (data) {
      console.log("Fetched data: ", data);
      setValue("spectialtyName", data.name);
      setValue("status", data.isHidden ? "Ẩn" : "Hiện");
      setSelectedFile(data.image);
    }
  }, [data, setValue]);
  const onSubmit = (data) => {
    console.log("Data: " + data);
    const formattedData = {
      name: data.spectialtyName,
      isHidden: data.status,
      image: data.fileImage,
    };

    console.log(JSON.stringify(formattedData, null, 2));
  };
  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thêm chuyên khoa
      </h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        {/* Image */ }
        <div className="grid-cols-1 gap-[60px] sm:grid md:flex mb-6">
        <div className="w-1/2 ">
            {/* Line 1 */ }
            <div className="block ">
                <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3 ">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1"
                  >
                    Tên chuyên khoa <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1 w-4/5"
                    name="spectialtyName"
                    type="text"
                    id="spectialtyName"
                    placeholder="Nhập tên chuyên khoa"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              {/* Status */ }

              <div className=" ">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
                Trạng thái
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ẩn" id="r1" />
                      <Label htmlFor="r1">Ẩn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hiện" id="r2" />
                      <Label htmlFor="r2">Hiện</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            </div>
          </div>
          {/* tai anh len */}
          <div className="flex gap-3">
            <div className="w-1/2">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh mới<span className="text-red-500">*</span>
            </label>
            <div className="relative h-[250px] min-w-[250px] rounded-3xl border-2 border-dashed border-primary-500">
              <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                <label className="flex h-full w-full cursor-pointer items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <MdCloudUpload size={ 45 } color="#007BBB" />
                    <p className="mt-2 text-sm">Chọn ảnh</p>
                  </div>
                  <input
                    type="file"
                    id="fileImage"
                    className="hidden"
                    onChange={ handleFileChange }
                  />
                </label>
              </div>
            </div>
            </div>
            {/* Anh hien tai */}
            <div className="w-1/2">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh hiện tại<span className="text-red-500">*</span>
            </label>
              {selectedFile && (
                <div className="relative h-[250px] min-w-[250px]">
                  <img 
                    src={selectedFile}
                    alt="Image Preview"
                    className="flex h-full w-full cursor-pointer items-center justify-center rounded-3xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Button */ }
        <div className="flex justify-end gap-2">
          <Button
            size=""
            variant="primary"
            className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
          >
            Hủy
          </Button>
          <Button
            size=""
            variant="primary"
            className="border-none bg-primary-500 px-6 hover:bg-primary-600"
          >
            Thêm chuyên khoa
          </Button>
        </div>
      </form>
    </div>
  );
}
