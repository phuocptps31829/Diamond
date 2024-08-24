import { Button } from '@/components/ui/Button';

export default function Form() {
  return (
    <div className='mx-auto mt-5 max-w-screen-xl px-4 py-6 md:px-12 md:py-6 md:mt-20 border shadow-gray rounded-md'>
        <div>
        <h1 className='font-bold text-[24px] md:text-[30px] mt-4'>Thông tin đặt lịch khám</h1>
        <p className='mb-1 text-[18px] md:text-[20px]'><strong className=''>Tại: </strong>ĐA KHOA DIAMOND</p>

        <div className='flex flex-col md:flex-row justify-between text-[16px] md:text-[18px] mb-4'>
            <div className='mb-4 md:mb-0 text-[20px]'>
              <p className='mb-1'><strong className=''>Gói khám:</strong> TẦM SOÁT SỨC KHỎE TIỀN SẢN</p>
              <p className='mb-1'><strong className=''>Giá: </strong>2.999.999VND</p>
            </div>
            <div className='text-[20px]'>
              <p className='mb-1'><strong>Ngày khám: </strong>18/08/2024</p>
              <p className='mb-1'><strong>Giờ khám: </strong>08:30</p>
            </div>
        </div>
        </div>
        <hr/>
        <div className='flex flex-col md:flex-row justify-between m-4 mx-0'>
            <div className='text-[20px]'>
                <h1 className='font-bold text-[24px] md:text-[30px]'>Thông tin người đặt</h1>
                <p className='mb-1'><strong>Họ tên: </strong>Nguyễn Văn A</p>
                <p className='mb-1'><strong>Số điện thoại: </strong>0325717890</p>
                <p className='mb-1'><strong>Giới tính: </strong>Nam</p>
                <p className='mb-1'><strong>Ngày sinh: </strong>25/01/2004</p>
            </div>
            <div className='flex gap-[10px] mt-4 md:mt-0'>
                <Button className='bg-green-700 hover:bg-green-800'>
                    Thêm
                </Button>
                <Button variant='primary'>
                    Thay đổi
                </Button>
            </div>
        </div>
        <hr/>
        {/* Thanh toán */}
        <div className='m-4 mx-0 text-[20px]'>
          <h1 className='font-bold text-[24px] md:text-[30px]'>Phương thức thanh toán</h1>
          <div className="flex flex-col md:flex-row gap-2 justify-between w-full md:w-[50%]">
            <label className="flex items-center">
              <input type="radio" name="payment" value="clinic" className="mr-2" />
              Thanh toán tại phòng khám
            </label>
            <label className="flex items-center">
              <input type="radio" name="payment" value="transfer" className="mr-2" />
              Chuyển khoản
            </label>
          </div>
        </div>
        <hr/>
        <p className='text-red-600 italic mt-4'>
            ! Trường hợp khách hàng có 
            người thân hỗ trợ đặt lịch, bệnh án sẽ không được cập nhật liên tục.
        </p>

        {/* Nút tiếp tục */}
        <div className='mt-6 flex flex-col md:flex-row justify-end gap-3'>
          <Button size="lg" variant="outline">
            Trở lại
          </Button>
          <Button size="lg" variant="primary">
            Tiến hành thanh toán
          </Button>
        </div>
    </div>
  );
}
