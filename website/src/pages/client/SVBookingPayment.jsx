import Form from '@/components/client/checkout/SVBookingPayment';
import Collaborate from '@/components/client/home/Collaborate';
import useScrollToTop from '@/hooks/useScrollToTop';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SVCheckOut() {
  const navigate = useNavigate();
  const bookingInfoCheckout = useSelector((state) => state.infoBooking.bookingInfoCheckout);
  if (!bookingInfoCheckout) {
    console.log('hi');
    navigate('/services-booking');
  }

  useScrollToTop();
  return (
    <div >
      <Form />
      <Collaborate />
    </div>
  );
}
