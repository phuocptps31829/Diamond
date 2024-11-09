import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImageUrl } from "@/utils/helper";
import { formatDateTimeLocale } from "@/utils/format";
import { MedicalRecordAccordion } from "./accordions/MedicalRecordAccordion";

const MedicalRecords = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold">Hồ sơ bệnh án cá nhân</h2>
      <div className="rounded-md">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-[30%] w-full rounded-sm overflow-hidden h-64 bg-slate-100">
            <img
              src={ getImageUrl(userProfile?.avatar) }
              alt={ userProfile?.fullName }
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Thông tin cơ bản</h2>
            <table>
              <tbody>
                <tr>
                  <td className="pr-6 pb-2">Họ và tên:</td>
                  <td className="pb-2">{ userProfile?.fullName }</td>
                </tr>
                <tr>
                  <td className="pb-2">Ngày sinh:</td>
                  <td className="pb-2">{ formatDateTimeLocale(userProfile?.dateOfBirth, false) }</td>
                </tr>
                <tr>
                  <td className="pr-6 pb-2">Số điện thoại:</td>
                  <td className="pb-2">{ userProfile?.phoneNumber }</td>
                </tr>
                <tr>
                  <td className="pr-6 pb-2">Số CCCD:</td>
                  <td className="pb-2">{ userProfile?.citizenIdentificationNumber }</td>
                </tr>
                <tr>
                  <td className="pb-2">Giới tính:</td>
                  <td className="pb-2">{ userProfile?.gender || "Chưa rõ" }</td>
                </tr>
                <tr>
                  <td className="pb-2">Địa chỉ:</td>
                  <td className="pb-2">{ userProfile?.address }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="">
          <h2 className="text-lg font-bold mt-4">Chi tiết bệnh án</h2>
          <MedicalRecordAccordion />
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
