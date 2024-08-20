import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FaSearch } from "react-icons/fa";
import { Input } from '@/components/ui/Input';

export default function Form() {
  return (
    <div className='flex flex-col mx-auto mt-5 max-w-screen-xl px-0 py-3 md:px-5 md:py-5 md:mt-10 border shadow-gray rounded-md'>
      <div className='container mx-auto flex flex-col md:flex-row gap-5 px-3'>
        {/* Select Services */}
        <div className='flex flex-col gap-[20px] w-full max-w-[440px] px-2'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Chọn gói khám</p>
            <p className='font-light'>Đã chọn 1 gói khám</p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input className="pl-10" placeholder="Tìm kiếm gói khám..." />
          </div>
          {/* Package */}
          <div className='px-4 py-3 border border-primary-500 rounded-lg relative'>
            <Checkbox id="checkbox-gt-2" className="absolute top-1/2 right-5" />
            <div className='flex mb-2'>
              <img
                src='https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg'
                className='w-[98px] h-[51px]'
              />
              <div className='ml-2'>
                <p className='font-bold text-[13px] md:text-[17px]'>GÓI KHÁM TỔNG QUÁT NAM</p>
                <span className='text-[12px] md:text-sm'>Tiêu chuẩn</span>
              </div>
            </div>
            <div>
              <p>
                Giá: <span>2.000.000đ</span>
              </p>
              <p className='w-full max-w-[330px] font-light text-[12px] md:text-[15px] text-justify'>
                Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className='w-full md:ml-auto p-4 pt-0'>
          <p className='text-xl font-bold mb-4'>Thông tin đặt lịch khám</p>
          <form>
            <div className='flex flex-col gap-4'>
              {/* Hàng đầu tiên */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <select id="khoa" className='w-full p-3 border rounded'>
                    <option value="">Chọn khoa</option>
                    {/* Thêm các option */}
                  </select>
                </div>
                <div className='flex-1'>
                  <select id="bacsi" className='w-full p-3 border rounded'>
                    <option value="">Chọn bác sĩ</option>
                    {/* Thêm các option */}
                  </select>
                </div>
              </div>

              {/* Hàng thứ hai */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <input type="time" id="gio" className='w-full p-3 border rounded' />
                </div>
                <div className='flex-1'>
                  <select id="phongkham" className='w-full p-3 border rounded'>
                    <option value="">Chọn phòng khám</option>
                    {/* Thêm các option */}
                  </select>
                </div>
              </div>

              {/* Hàng thứ ba */}
              <div className='flex-1'>
                <input type="date" id="ngay" className='w-full p-3 border rounded' />
              </div>

              {/* Thông tin người khám */}
              <div className='bg-gray-500/30 px-5 py-6 pt-2 rounded-md'>
                <p className='text-xl font-bold mt-6 mb-4'>Thông tin người khám</p>

                {/* Hàng 1 */}
                <div className='mb-4'>
                  <label htmlFor="hoten" className='block mb-1'>Họ và tên</label>
                  <input type="text" id="hoten" className='w-full p-2 border rounded' />
                </div>

                {/* Hàng 2 */}
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <label htmlFor="email" className='block mb-1'>Email</label>
                    <input type="email" id="email" className='w-full p-2 border rounded' />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="sdt" className='block mb-1'>Số điện thoại</label>
                    <input type="tel" id="sdt" className='w-full p-2 border rounded' />
                  </div>
                </div>

                {/* Hàng 3 */}
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <label htmlFor="gioitinh" className='block mb-1'>Giới tính</label>
                    <select id="gioitinh" className='w-full p-2 border rounded'>
                      <option value="">Chọn giới tính</option>
                      <option value="nam">Nam</option>
                      <option value="nu">Nữ</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="ngaysinh" className='block mb-1'>Ngày sinh</label>
                    <input type="date" id="ngaysinh" className='w-full p-2 border rounded' />
                  </div>
                </div>

                {/* Hàng 4 */}
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <label htmlFor="nghenghiep" className='block mb-1'>Nghề nghiệp</label>
                    <input type="text" id="nghenghiep" className='w-full p-2 border rounded' />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="dantoc" className='block mb-1'>Dân tộc</label>
                    <input type="text" id="dantoc" className='w-full p-2 border rounded' />
                  </div>
                </div>

                {/* Hàng 5 */}
                <div className='flex flex-col md:flex-row gap-4'>
                  <div className='flex-1'>
                    <label htmlFor="so-cccd" className='block mb-1'>Số CCCD</label>
                    <input type="text" id="so-cccd" className='w-full p-2 border rounded' />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="so-bhyt" className='block mb-1'>Số BHYT</label>
                    <input type="text" id="so-bhyt" className='w-full p-2 border rounded' />
                  </div>
                </div>

                {/* Hàng 6 */}
                <div className='mb-4'>
                  <label htmlFor="diachi" className='block mb-1'>Địa chỉ</label>
                  <input type="text" id="diachi" className='w-full p-2 border rounded' />
                </div>
              </div>

              {/* Nút tiếp tục */}
              <div className='mt-6 flex justify-end gap-3'>
                <Button size="lg" variant="outline">
                  Trở lại
                </Button>
                <Button size="lg" variant="primary">
                  Tiếp tục
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
