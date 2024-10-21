import Form from '@/components/client/checkout/Booking';
import Collaborate from '@/components/client/home/Collaborate';
import useScrollToTop from '@/hooks/useScrollToTop';

export default function Booking() {
  useScrollToTop();

  return (
    <div className='bg-[#E8F2F7]'>
      <Form />
      <Collaborate />
    </div>
  );
}
