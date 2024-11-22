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
import { contractServiceRentalSchema } from "@/zods/admin/contractAdmin";
import { contractApi } from "@/services/contractApi";
import SelectDate from "../select/SelectDate";
import SelectBank from "../select/SelectBank";

const ContractsServiceRentalAdd = () => {
  const [isPending, setIsPending] = useState(false);
  const sigCanvas = useRef({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0].slice(0, 5);
    return `${date}T${time}:00.000`;
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(contractServiceRentalSchema),
    defaultValues: {
      accountNumber: "",
      bankName: "",
      accountName: "",
      tin: "",
      startDate: "",
      endDate: "",
      phone: "",
      position: "",
      agent: "",
      price: "",
      address: "",
      title: "Hợp Đồng Y tế",
      time: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (contractData) =>
      contractApi.createContractHealthCare(contractData),
    onSuccess: () => {
      queryClient.invalidateQueries("contracts");
      toastUI("Thêm hợp đồng thuê dịch vụ thành công.", "success");
      reset();
      sigCanvas.current.clear();
      navigate("/admin/contracts/list");
    },
    onError: (error) => {
      toastUI("Thêm hợp đồng thuê dịch vụ thất bại.", "error");
      console.error("Error creating contract:", error);
    },
  });

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const onSubmit = async (data) => {
    const canvas = sigCanvas.current.getTrimmedCanvas();
    const isCanvas = sigCanvas.current.isEmpty();
    if (isCanvas) {
      toastUI("Vui lòng ký tên trước khi gửi.", "error");
      return;
    }
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "signature.png");
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      formData.append("time", getCurrentDateTime());
      formData.append("title", "Hợp đồng thuê dịch vụ");

      setIsPending(true);
      mutation.mutate(formData);
    });
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6 min-h-[calc(100vh-140px)]">
        <h1 className="mb-5 text-2xl font-bold">Hợp đồng thuê dịch vụ</h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-2 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="w-full">
              <SelectDate
                control={ control }
                name="startDate"
                errors={ errors }
                onChange={ (value) => console.log("Selected start date:", value) }
              />
            </div>
            <div className="w-full">
              <SelectDate
                control={ control }
                isEnd
                name="endDate"
                errors={ errors }
                onChange={ (value) => console.log("Selected end date:", value) }
              />
            </div>

            <InputCustom
              id="accountNumber"
              type="text"
              name="accountNumber"
              label="Số tài khoản:"
              placeholder="Nhập số tài khoản"
              control={ control }
              errors={ errors }
            />

            <div className="w-full">
              <Label className="mb-3 block">Ngân hàng:</Label>
              <SelectBank
                control={ control }
                name="bankName"
                errors={ errors }
                onChange={ (value) => console.log("Selected bank name:", value) }
              />
            </div>
            <InputCustom
              id="accountName"
              type="text"
              name="accountName"
              label="Tên chủ tài khoản:"
              placeholder="Nhập tên chủ tài khoản"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              id="tin"
              type="text"
              name="tin"
              label="Mã số thuế:"
              placeholder="Nhập mã số thuế"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              id="phone"
              type="text"
              name="phone"
              label="Số điện thoại:"
              placeholder="Nhập số điện thoại"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              id="position"
              type="text"
              name="position"
              label="Vị trí:"
              placeholder="Nhập vị trí công việc"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              id="agent"
              type="text"
              name="agent"
              label="Người đại diện:"
              placeholder="Nhập tên người đại diện"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              id="price"
              type="text"
              name="price"
              label="Giá trị hợp đồng:"
              placeholder="Nhập giá trị hợp đồng"
              control={ control }
              errors={ errors }
            />
          </div>
          <InputCustom
            id="address"
            type="text"
            name="address"
            label="Địa chỉ:"
            placeholder="Nhập địa chỉ"
            control={ control }
            errors={ errors }
          />
          <div className="my-4">
            <Label className="mb-1">Chữ ký:</Label>
            <SignatureCanvas
              penColor="black"
              canvasProps={ {
                className: "sigCanvas border rounded-lg h-[300px] w-full",
              } }
              ref={ sigCanvas }
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={ clearSignature }>
                Xóa
              </Button>
            </div>
          </div>
          <div className="mt-10 text-end">
            <Button
              type="submit"
              disabled={ isPending || mutation.isPending }
              variant="custom"
            >
              { isPending || mutation.isPending ? (
                <SpinLoader />
              ) : (
                "Thêm Hợp đồng thuê dịch vụ"
              ) }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractsServiceRentalAdd;
