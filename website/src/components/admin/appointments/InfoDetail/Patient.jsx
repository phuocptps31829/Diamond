import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const Patient = () => {
  const profile = {
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    email: "nguyenvana@example.com",
    occupation: "Kỹ sư phần mềm",
    birthDate: "1990-01-15",
    ethnicity: "Kinh",
    idNumber: "123456789",
    insuranceNumber: "BH123456789",
    address: "123 Đường ABC, Quận 1, TP. HCM",
  };

  return (
    <div className="w-full">
      <h1 className="mb-2 text-lg font-semibold text-gray-700">
        Thông tin bệnh nhân
      </h1>
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="grid grid-cols-10 items-start gap-16">
          <div className="col-span-2 ">
            <Avatar className="w-full h-auto  ">
              <AvatarImage src="https://github.com/shadcn.png" className="rounded-md" alt="@shadcn" />
            </Avatar>
          </div>
          <div className="col-span-8 grid grid-cols-1 gap-6 sm:grid-cols-2 w-full items-center p-2">
            <p className="text-gray-600">
              <strong className="font-medium text-black">Họ và tên:</strong>{" "}
              {profile.fullName}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Số điện thoại:</strong>{" "}
              {profile.phoneNumber}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Email:</strong>{" "}
              {profile.email}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Nghề nghiệp:</strong>{" "}
              {profile.occupation}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Ngày sinh:</strong>{" "}
              {profile.birthDate}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Dân tộc:</strong>{" "}
              {profile.ethnicity}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Số CMND:</strong>{" "}
              {profile.idNumber}
            </p>
            <p className="text-gray-600">
              <strong className="font-medium text-black">Số bảo hiểm:</strong>{" "}
              {profile.insuranceNumber}
            </p>
            <p className="text-gray-600 sm:col-span-2">
              <strong className="font-medium text-black">Địa chỉ:</strong>{" "}
              {profile.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
