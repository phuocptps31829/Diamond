import { Card } from "@/components/ui/Card";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Link } from "react-router-dom";

export default function PaymentPolicy() {
  useScrollToTop();

  return (
    <Card className="min-h-screen max-w-[1243px] mx-auto  border my-6 px-3 rounded-2xl py-6 sm:px-2 lg:px-4">
      <div className="container mx-auto overflow-hidden rounded-lg  ">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Chính sách thanh toán
          </h1>
          <p className="mt-1 max-w-2xl text-lg text-gray-500">Y Khoa Diamond</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            1. Phương thức thanh toán
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Y Khoa Diamond chấp nhận các phương thức thanh toán sau:
          </p>
          <ul className="mb-4 list-disc pl-5 text-base text-gray-700">
            <li>Tiền mặt</li>
            <li>Chuyển khoản ngân hàng</li>
            <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
          </ul>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            2. Thời điểm thanh toán
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Thanh toán được yêu cầu tại thời điểm dịch vụ được cung cấp, trừ khi
            có thỏa thuận khác trước đó. Đối với các thủ thuật hoặc điều trị đặc
            biệt, có thể yêu cầu đặt cọc trước.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            3. Bảo hiểm y tế
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi chấp nhận nhiều loại bảo hiểm y tế. Vui lòng liên hệ với
            chúng tôi trước cuộc hẹn để xác nhận về bảo hiểm của bạn. Bạn có
            trách nhiệm thanh toán cho bất kỳ dịch vụ nào không được bảo hiểm
            chi trả.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            4. Chính sách hoàn tiền
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Trong trường hợp bạn không hài lòng với dịch vụ, vui lòng liên hệ
            với chúng tôi trong vòng 7 ngày kể từ ngày điều trị. Chúng tôi sẽ
            xem xét từng trường hợp cụ thể và có thể cung cấp điều trị bổ sung
            hoặc hoàn tiền một phần nếu thích hợp.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            5. Chính sách hủy hẹn
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Nếu bạn cần hủy hoặc đổi lịch hẹn, vui lòng thông báo cho chúng tôi
            ít nhất 24 giờ trước giờ hẹn. Đối với các cuộc hẹn bị hủy muộn hoặc
            không đến mà không thông báo, chúng tôi có thể tính phí hủy hẹn.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            6. Kế hoạch thanh toán
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Đối với các thủ thuật hoặc điều trị có chi phí cao, chúng tôi có thể
            cung cấp kế hoạch thanh toán. Vui lòng thảo luận với bộ phận tài
            chính của chúng tôi để biết thêm chi tiết.
          </p>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-700">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách thanh toán này, vui
              lòng liên hệ với chúng tôi qua:
            </p>
            <p className="mt-2 text-base text-gray-700">
              Email: diamond@contact.com
              <br />
              Điện thoại: 0123 456 789
              <br />
              Địa chỉ: 39 Lê Duẩn, Phường Bến Nghé, Quận 1, TP.HCM
            </p>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </Card>

  );
}
