import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import { useNavigate } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";
import SignatureCanvas from "react-signature-canvas";
import { Label } from "@/components/ui/Label";
import SelectDoctor from "../select/SelectDoctor";
import SelectDate from "../select/SelectDate";
import SelectBranch from "../select/SelectBranch";
import {  contractDoctorSurgeonSchema } from "@/zods/admin/contractAdmin";
import { contractApi } from "@/services/contractApi";
import SelectTimeWork from "../select/SelectTimeWork";

const ContractsDoctorSurgeonAdd = () => {
  const sigCanvas = useRef({});
  const [isTimeWork, setIsTimeWork] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const combineDateTime = (date, time) => {
    return `${date}T${time}:00.000`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5);
    return combineDateTime(date, time);
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(contractDoctorSurgeonSchema),
    defaultValues: {
      doctorID: "",
      hospitalID: "",
      startDate: "",
      countDate: "",
      timeWork: "",
      endDate: "",
      address: "",
      price: "",
      isInternal: false,
    },
  });
  console.log("errors", errors);

  const mutation = useMutation({
    mutationFn: (contractData) =>
      contractApi.createContractDoctor(contractData),
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
      toastUI("Thêm Hợp đồng bác sĩ ngoài giờ thành công.", "success");
      reset();
      setIsTimeWork(null);
      sigCanvas.current.clear();
      navigate("/admin/contracts/list");
    },
    onError: (error) => {
      toastUI("Thêm Hợp đồng bác sĩ ngoài giờ thất bại.", "error");
      console.error("Error creating contract:", error);
    },
  });

  const clearSignature = () => {
    sigCanvas.current.clear();
  };
  const onSubmit = async (data) => {
    console.log("Raw form data:", data);
    console.log("Doctor ID:", data.doctorID);
    console.log("Hospital ID:", data.hospitalID);
    const canvas = sigCanvas.current.getTrimmedCanvas();
    const isCanvas = sigCanvas.current.isEmpty();
    if (isCanvas) {
      toastUI("Vui lòng ký tên trước khi gửi.", "error");
      return;
    }
    canvas.toBlob(async (blob) => {
      console.log("%cSignature Blob:", "font-weight: bold;", blob);

      const formData = new FormData();
      formData.append("file", blob, "signature.png");
      formData.append("doctorID", data.doctorID);
      formData.append("hospitalID", data.hospitalID);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);
      formData.append("countDate", data.countDate);
      formData.append("timeWork", isTimeWork);
      formData.append("time", getCurrentDateTime());
      formData.append("title", "Hợp đồng bác sĩ ");
      formData.append("address", data.address);
      formData.append("price", data.price);
      formData.append("isInternal", data.isInternal);
      mutation.mutate(formData);
      console.log("Contract data:", formData);
    });
  };

  return (
    <div className="w-full">
      <div className="min-h-[calc(100vh-140px)] rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Hợp đồng bác sĩ ngoài giờ
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="w-full">
              <SelectDoctor
                control={control}
                name="doctorID"
                errors={errors}
                onChange={(value) => console.log("Selected doctor:", value)}
              />
            </div>
            <div className="w-full">
              <SelectBranch
                control={control}
                name="hospitalID"
                errors={errors}
                onChange={(value) => console.log("Selected hospital:", value)}
              />
            </div>
            <div className="w-full">
              <SelectDate
                control={control}
                name="startDate"
                errors={errors}
                onChange={(value) => console.log("Selected start date:", value)}
              />
            </div>
            <div className="w-full">
              <SelectDate
                control={control}
                isEnd
                name="endDate"
                errors={errors}
                onChange={(value) => console.log("Selected end date:", value)}
              />
            </div>
            <div className="w-full">
              <InputCustom
                id="title"
                type="text"
                name="title"
                disabled={true}
                label="Tiêu đề:"
                placeholder="Hợp đồng bác sĩ ngoài giờ"
                value="Hợp đồng bác sĩ ngoài giờ"
                control={control}
                errors={errors}
              />
            </div>

            <div className="w-full">
              <InputCustom
                id="price"
                type="text"
                name="price"
                label="Nhập lương:"
                placeholder="Nhập lương bác sĩ"
                control={control}
                errors={errors}
              />
            </div>

            <div className="w-full">
              <InputCustom
                id="countDate"
                type="text"
                name="countDate"
                label="Số ngày làm việc:"
                placeholder="Nhập số ngày làm việc"
                control={control}
                errors={errors}
              />
            </div>
            <div className="w-full">
              <Label className="mb-3 block">Chọn ca làm việc:</Label>

              <SelectTimeWork
                control={control}
                name="timeWork"
                errors={errors}
                onChange={(value) => setIsTimeWork(value)}
              />
            </div>
          </div>
          <div className="mt-2 w-full">
            <InputCustom
              id="address"
              type="text"
              name="address"
              label="Địa điểm ký hợp đồng:"
              placeholder="Nhập địa điểm ký hợp đồng"
              control={control}
              errors={errors}
            />
          </div>
          <div className="my-4">
            <Label className="mb-1">Chữ kí:</Label>
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                className: "sigCanvas border rounded-lg h-[300px] w-full",
              }}
              ref={sigCanvas}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={clearSignature}>
                Xóa
              </Button>
            </div>
          </div>
          <div className="mt-10 w-full text-end">
            <Button
              type="submit"
              disabled={mutation.isPending}
              variant="custom"
            >
              {mutation.isPending ? (
                <>
                  <SpinLoader />
                </>
              ) : (
                "Thêm Hợp đồng bác sĩ ngoài giờ"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractsDoctorSurgeonAdd;
