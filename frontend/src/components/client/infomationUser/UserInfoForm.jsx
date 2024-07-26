import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import avatarU from "../../../assets/images/healthcare-medical-people-concept-smiling-asian-female-doctor-pointing-fingers-right-showing-adverti.jpg";

const UserInfoForm = () => {
  return (
    <div className="w-full p-6">
      <h2 className="col-span-2 mb-6 text-xl font-bold">Thông tin tài khoản</h2>
      <div className="grid grid-cols-3 gap-6">
        <form className="col-span-2 grid w-full grid-cols-2 gap-6 p-4">
          <div>
            <label className="mb-2 block">Họ và tên</label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Số điện thoại</label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Email</label>
            <input type="email" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Nghề nghiệp</label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Ngày sinh</label>
            <input type="date" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Dân tộc</label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
          <div>
            <label className="mb-2 block">Số CMND/CCCD</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              disabled
              value="**************"
            />
          </div>
          <div>
            <label className="mb-2 block">Số thẻ BH</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              disabled
              value="**************"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-2 block">Địa chỉ</label>
            <input type="text" className="w-full rounded border p-2" />
          </div>
        </form>
        <div className="mt-6 flex h-full flex-col items-center gap-5">
          <Avatar className="size-36">
            <AvatarImage src={avatarU} />
          </Avatar>

          <div className="mt-4 flex items-center bg-white p-2 text-center">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
          </div>
          <div className="container mt-4 flex place-content-center">
            <div className="flex w-2/3 items-center justify-center gap-4">
              <div className="item-center flex w-full rounded-md border p-2 text-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-3 size-5"
                />
                <label className="mr-2">Nam</label>
              </div>
              <div className="item-center flex w-full rounded-md border p-2 text-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-3 size-5"
                />
                <label>Nữ</label>
              </div>
            </div>
          </div>
          <div className="mb-11 flex w-2/3 grow items-end">
            <button className="mt-4 h-fit w-full rounded bg-primary-500 p-2 text-white">
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;
