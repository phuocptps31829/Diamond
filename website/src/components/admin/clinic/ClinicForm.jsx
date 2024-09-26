import InputCustom from "@/components/ui/InputCustom";
import { clinicSchema } from "@/zods/clinic";   
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectDepartment from "@/components/client/checkout/select/SelectSpecialty";
import 'react-quill/dist/quill.snow.css'; 
import { Button } from "@/components/ui/Button";

export default function ClinicsForm() {

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      clinicName: "",
      specialty:"",
      branch:"",
      address:"",
    },
  });
  const onSubmit = () => {  
  };


    return (
      <div className="bg-white w-[100%] px-7 py-6 rounded-lg shadow-gray ">
        <h1 className="mr-2 bg-white h-fit mb-4 text-2xl font-bold">Thông tin phòng khám</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="flex gap-[10px] ">

          <div className=" w-full">
          {/* Line 1 */}
          <div className="block ">
            <div className="w-full md:flex gap-[10px]">
              <div className="mb-3 md:w-1/2 w-full relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white">
                  Tên phòng khám <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1 "
                  name="clinicName"
                  type="text"
                  id="clinicName"
                  control={control}
                  errors={errors}
                />
              </div>

              <div className="mb-3 md:w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2 ">
                  Chuyên khoa <span className="text-red-500">*</span>
                </label>
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="specialty"
                    errors={errors}
                    // specialtyID={
                    //   selectedService?.bookingDetail?.specialtyID || ""
                    // }
                    // setValue={setValue}
                    // onChange={(branchID) => {
                    //   setSelectedBranchId(branchID);
                    // }}
                  />
              </div>
            </div>
          </div>

          {/* Line 2 */}
          <div className="w-full flex gap-[10px] ">
            <div className="w-full md:flex gap-[10px]">
            <div className="mb-3 md:w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2 ">
                  Chi nhánh làm việc <span className="text-red-500">*</span>
                </label>
                  <SelectDepartment
                    control={control}
                    name="branch"
                    errors={errors}
                    // specialtyID={
                    //   selectedService?.bookingDetail?.specialtyID || ""
                    // }
                    // setValue={setValue}
                    // onChange={(branchID) => {
                    //   setSelectedBranchId(branchID);
                    // }}
                  />
                </div>

              <div className="mb-3 md:w-1/2 w-full relative">
                <label htmlFor="email" className="block px-1 left-[15px] bg-white">
                  Địa chỉ cụ thể <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="address"
                  type="text"
                  id="address"
                  control={control}
                  errors={errors}
                />
              </div>


            </div>
          </div>
          </div>
          </div>
            {/* Button */}
            <div className="flex gap-2 justify-end">
            <Button
              size=""
              variant="primary"
              className="border-none bg-gray-200 hover:bg-gray-400 text-primary-500 px-6"
            >
              Hủy
            </Button>
            <Button
              size=""
              variant="primary"
              className="border-none bg-primary-500 hover:bg-primary-600 px-6"
            >
              Cập nhật
            </Button>
            </div>
        </form>
      </div>
    );
  }
  