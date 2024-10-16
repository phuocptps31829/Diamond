import Form from '@/components/client/checkout/ServicesBooking';
import Collaborate from '@/components/client/home/Collaborate';
import useScrollToTop from '@/hooks/useScrollToTop';

export default function ServicesBooking() {
  useScrollToTop();

  return (
    <div className='bg-[#E8F2F7]'>
      <Form />
      <Collaborate />
    </div>
  );
}
