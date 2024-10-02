import InputCustom from "@/components/ui/InputCustom";
import { patientSchema } from "@/zods/patient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { MdCloudUpload } from "react-icons/md";

export default function Form() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      spectialtyName: "",
      status: "",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = (data) => {
    const formattedData = {
      fullName: data.patientName,
      phoneNumber: data.phone,
      email: data.email,
      gender: data.gender === "male" ? "Nam" : "Nữ",
      dateOfBirth: data.birthDate,
      address: {
        province: data.province,
        district: data.district,
        ward: data.ward,
        street: data.address,
      },
      citizenIdentificationNumber: 0,
      occupation: data.job,
      ethnic: data.ethnicity,
      password: data.password,
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
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex mb-6">
        <div className="w-1/2 ">
            {/* Line 1 */ }
            <div className="block ">
                <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3 ">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-sm"
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
              <div className="mt-2">
                <h2 className="mb-3 text-sm">
                  Trạng thái <span className="text-red-600">*</span>
                </h2>
                <div className="mb-3 flex items-center">
                  <label className="mr-6 flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      className="mr-2"
                      checked
                    />
                    <span className="text-sm">Hiển thị</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      className="mr-2"
                    />
                    <span className="text-sm">Ẩn</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh <span className="text-red-500">*</span>
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
