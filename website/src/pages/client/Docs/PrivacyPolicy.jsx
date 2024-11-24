import { Card } from "@/components/ui/Card";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <Card className="mx-auto my-6 min-h-screen max-w-[1243px] rounded-2xl border px-3 py-6 sm:px-2 lg:px-4">
      <div className="container mx-auto overflow-hidden rounded-lg bg-white">
        <div className="px-4 py-7 sm:px-6">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Chính sách bảo mật
          </h1>
          <p className="mt-1 max-w-2xl text-lg text-gray-500">Y Khoa Diamond</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            1. Thông tin chúng tôi thu thập
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký dịch
            vụ, đặt lịch khám, hoặc liên hệ với chúng tôi. Thông tin này có thể
            bao gồm:
          </p>
          <ul className="mb-4 list-disc pl-5 text-base text-gray-700">
            <li>Họ tên</li>
            <li>Địa chỉ email</li>
            <li>Số điện thoại</li>
            <li>Địa chỉ</li>
            <li>Thông tin sức khỏe liên quan</li>
          </ul>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            2. Cách chúng tôi sử dụng thông tin
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi sử dụng thông tin của bạn để:
          </p>
          <ul className="mb-4 list-disc pl-5 text-base text-gray-700">
            <li>Cung cấp và cải thiện dịch vụ y tế</li>
            <li>Liên lạc với bạn về lịch hẹn và chăm sóc sức khỏe</li>
            <li>Xử lý thanh toán</li>
            <li>Tuân thủ các yêu cầu pháp lý</li>
          </ul>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            3. Bảo mật thông tin
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi sử
            dụng các biện pháp bảo mật phù hợp để ngăn chặn truy cập trái phép,
            tiết lộ, thay đổi hoặc phá hủy thông tin.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            4. Chia sẻ thông tin
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của
            bạn cho bên thứ ba, trừ khi được sự đồng ý của bạn hoặc theo yêu cầu
            pháp lý.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            5. Quyền của bạn
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Bạn có quyền truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình.
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi,
            vui lòng liên hệ với chúng tôi.
          </p>

          <h2 className="mb-4 text-lg font-medium leading-6 text-gray-900">
            6. Thay đổi chính sách
          </h2>
          <p className="mb-4 text-base text-gray-700">
            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian.
            Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng
            chính sách mới trên trang web này.
          </p>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-700">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng
              liên hệ với chúng tôi qua:
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
        <div className="py-4">
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
};

export default PrivacyPolicy;
