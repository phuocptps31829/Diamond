import { Button } from '@/components/ui/Button';
import { createAppointment } from '@/services/appointmentApi';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import VNPAYICON from '../../../assets/images/vnpay.webp';
import { useToast } from '@/hooks/useToast';
import { ToastAction } from '@/components/ui/Toast';
import { toastUI } from '@/components/ui/Toastify';

export default function Form() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const bookingInfo = useSelector((state) => state.infoBooking);
  const cart = useSelector((state) => state.cart.cart);
  const personHelpInfo = useSelector((state) => state.infoBooking.bookingInfoCheckout?.appointmentHelpUser);
  const profileCustomer = useSelector((state) => state.auth.userProfile);
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: () => createAppointment(bookingInfo.bookingInfoCheckout, paymentMethod),
    onSuccess: (data) => {
      console.log(data);
      if (paymentMethod === 'momo') {
        location.href = data.data.payUrl;
      }
      if (paymentMethod === 'vnpay') {
        location.href = data.data;

      }
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleSubmitCheckout = () => {
    if (!paymentMethod) {
      toastUI("Vui lòng chọn phương thức thanh toán", "warning");
      return;
    }
    mutate();
  };

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-3 md:px-5 md:py-10'>
      <div className='container bg-white mx-auto gap-5 px-10 py-5 pb-10 border rounded-md '>
        <div>
          <div className='flex flex-col md:flex-row justify-between items-center my-3'>
            <h1 className='font-bold text-[16px] md:text-[24px]'>Thông tin đặt lịch khám</h1>
            <span className='text-[16px] md:text-[20px] mt-4 md:mt-0'><strong>Tổng dịch vụ:</strong> { bookingInfo.bookingDetails?.length } dịch vụ</span>
          </div>
          <div className='flex flex-col md:flex-row justify-between text-[16px] md:text-[18px] mb-6'>
            <div className='w-full md:w-[50%]'>
              <p>Dịch vụ đã chọn:</p>
              { cart.map((item, index) => <div key={ index } className='mt-2 px-2 py-2 md:px-3 md:py-2 border border-primary-500 rounded-lg relative mb-3 max-w-full'>
                <div className='flex flex-row md:flex-row items-center'>
                  <img
                    src={ `${import.meta.env.VITE_IMAGE_API_URL}/${item.image}` }
                    className='w-[60px] md:w-[110px] sm:w-[80px]'
                    alt={ item.name }
                  />
                  <div className='ml-3 flex flex-col'>
                    <a href='/' className='font-bold uppercase text-[12px] sm:text-[16px] md:text-[18px] '>{ item.name }</a>
                  </div>
                </div>
              </div>) }
            </div>
          </div>
        </div>
        <hr />
        <h1 className='font-bold text-[16px] md:text-[24px] my-3'>Thông tin người khám</h1>
        <div className='flex flex-col md:flex-row justify-between mb-7'>
          <div className='text-[14px] md:text-[18px] w-full md:w-[48%] mb-0 md:mb-4'>
            <p className='mb-2'><strong>Họ tên: </strong>{ personHelpInfo ? personHelpInfo.fullName : profileCustomer.fullName }</p>
            <p className='mb-2'><strong>Email: </strong>{ personHelpInfo ? personHelpInfo.email : profileCustomer.email }</p>
            <p className='mb-2'><strong>Số điện thoại: </strong>{ personHelpInfo ? personHelpInfo.phoneNumber : profileCustomer.phoneNumber }</p>
            <p className='mb-2'><strong>Giới tính: </strong>{ personHelpInfo ? personHelpInfo.gender : profileCustomer.gender }</p>
            <p className='mb-2'><strong>Ngày sinh: </strong>{ new Intl.DateTimeFormat('vi-VN').format(new Date(personHelpInfo ? personHelpInfo.dateOfBirth : profileCustomer.dateOfBirth)) }</p>
            <p className='mb-2'><strong>Địa chỉ: </strong>
              { personHelpInfo ? personHelpInfo.address : profileCustomer.address }
            </p>
          </div>
          <div className='text-[14px] md:text-[18px] w-full md:w-[48%]'>
            <p className='mb-2'><strong>Nghề nghiệp: </strong>{ personHelpInfo ? personHelpInfo.occupation : profileCustomer.otherInfo.occupation }</p>
            <p className='mb-2'><strong>Dân tộc: </strong>{ personHelpInfo ? personHelpInfo.ethnic : profileCustomer.otherInfo.ethnic }</p>
            <p className='mb-2'><strong>Số CCCD: </strong>{ personHelpInfo ? personHelpInfo.citizenIdentificationNumber : profileCustomer.citizenIdentificationNumber }</p>
            <p className='mb-2'><strong>Số BHYT: </strong>{ personHelpInfo ? personHelpInfo.insuranceCode : profileCustomer.otherInfo.insuranceCode }</p>
          </div>
        </div>
        <hr />
        {/* Thanh toán */ }
        <div className='mt-3'>
          <h1 className='font-bold text-[16px] md:text-[24px] mb-3'>Phương thức thanh toán</h1>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='flex flex-col gap-4 w-full'>
              <label onClick={ () => setPaymentMethod("momo") } className={ `cursor-pointer flex items-center border-2 border-gray-200 rounded-md p-4 ${paymentMethod === 'momo' ? 'border-primary-500 border-2' : ''}` }>
                <img
                  src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán qua MOMO</span>
                <input type="radio" name="payment" value="momo" className="ml-auto" />
              </label>
              <label onClick={ () => setPaymentMethod("banking") } className={ `cursor-pointer flex items-center border-2 border-gray-200 rounded-md p-4 ${paymentMethod === 'banking' ? 'border-primary-500 border-2' : ''}` }>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/6963/6963703.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán ngân hàng</span>
                <input type="radio" name="payment" value="bank" className="ml-auto" />
              </label>
            </div>
            <div className='flex flex-col gap-4 w-full'>
              <label onClick={ () => setPaymentMethod("vnpay") } className={ `cursor-pointer flex items-center border-2 border-gray-200 rounded-md p-4 ${paymentMethod === 'vnpay' ? 'border-primary-500 border-2' : ''}` }>
                <img
                  src={ VNPAYICON } alt='VNPAYICON'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán qua VNPay</span>
                <input type="radio" name="payment" value="zalopay" className="ml-auto" />
              </label>

              <label className={ `cursor-pointer flex items-center border-2 border-gray-200 rounded-md p-4 ${paymentMethod === 'ccc' ? 'border-primary-500 border-2' : ''}` }>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/1019/1019607.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán tại phòng khám</span>
                <input type="radio" name="payment" value="clinic" className="ml-auto" />
              </label>
            </div>
          </div>
        </div>
        <p className='text-red-600 italic mt-4 text-[16px] md:text-xl'>
          ! Trường hợp khách hàng hỗ trợ đặt lịch cho người thân, bệnh án sẽ được cập nhật tới tài khoản của người thân.
        </p>
        {/* Nút tiếp tục */ }
        <div className='mt-7'>
          <p className='flex justify-end text-xl md:text-2xl'>
            Tổng tiền:
            <strong className='ml-3 text-red-500'>
              { cart.reduce((acc, cur) => acc += cur.price, 0).toLocaleString() } ₫
            </strong>
          </p>
          <div className='mt-6 flex flex-row justify-end gap-3'>
            <Button className='sm:h-10 rounded-md sm:px-8' size="default" variant="outline">
              Trở lại
            </Button>
            <Button onClick={ handleSubmitCheckout } className='sm:h-10 rounded-md sm:px-8' size="default" variant="primary">
              Tiến hành thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
