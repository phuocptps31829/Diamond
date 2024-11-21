import Form from '@/components/client/checkout/Payment';
import Collaborate from '@/components/client/home/Collaborate';
import useScrollToTop from '@/hooks/useScrollToTop';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SVCheckOut() {
  const navigate = useNavigate();
  const bookingInfoCheckout = useSelector((state) => state.infoBooking.bookingInfoCheckout);

  useEffect(() => {
    if (!bookingInfoCheckout) {
      navigate('/booking');
    }
  }, [bookingInfoCheckout, navigate]);

  useScrollToTop();

  if (!bookingInfoCheckout) {
    return null;
  }

  return (
    <div className='bg-[#E8F2F7]' >
      <Form />
      <Collaborate />
    </div>
  );
}
