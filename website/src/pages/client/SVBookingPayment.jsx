import Form from '@/components/client/checkout/SVBookingPayment'
import Collaborate from '@/components/client/home/Collaborate'
import useScrollToTop from '@/hooks/useScrollToTop';

export default function SVCheckOut(){
  useScrollToTop();
  return (
    <div >
        <Form/>
        <Collaborate/>
    </div>
  )
}
