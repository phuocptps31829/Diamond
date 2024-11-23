import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function StoreLocation(isChange = false) {
  const contentOrder = isChange ? "order-last" : "order-first";
  const imageOrder = isChange ? "order-first" : "order-last";

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className={`grid gap-8 lg:grid-cols-2 ${isChange ? "lg:grid-flow-col" : ""}`}
      >
        {/* Content Column */}
        <div className={`space-y-6 ${contentOrder}`}>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary-500">
              Y Khoa Diamond
            </h1>
            <h2 className="text-3xl font-light text-gray-400">
              Chi nhánh Quận 1
            </h2>
          </div>

          <p className="leading-relaxed text-gray-600">
            Tọa lạc tại trung tâm Quận 1, chi nhánh Y Khoa Diamond mang đến trải
            nghiệm chăm sóc sức khỏe đẳng cấp và chuyên nghiệp. Với đội ngũ bác
            sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết
            mang đến dịch vụ y tế chất lượng cao nhất cho mọi bệnh nhân.
          </p>

          <div className="flex items-center justify-start gap-7">
            <div className="">
              <h3 className="text-lg font-semibold text-primary-500">
                Giờ làm việc:
              </h3>
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div>Thứ Hai - Thứ Sáu:</div>
                <div>08:00 - 20:00</div>
                <div>Thứ Bảy:</div>
                <div>08:00 - 17:00</div>
                <div>Chủ Nhật:</div>
                <div>08:00 - 12:00</div>
              </div>
            </div>
            <div className="mt-0">
              <h3 className="text-lg font-semibold text-primary-500">
                Liên hệ:
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Hotline</span>
                  <span>1900 6789</span>
                </div>
                <Link
                  to="#"
                  className="inline-flex items-center text-primary-500 hover:text-primary-700"
                >
                  <Phone className="mr-1 h-4 w-4" />
                  Đặt lịch khám
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary-500">Địa chỉ:</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
              </p>
              <Link
                to="#"
                className="inline-flex items-center text-primary-500 hover:text-primary-700"
              >
                <MapPin className="mr-1 h-4 w-4" />
                Xem bản đồ
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div
          className={`relative h-[600px] overflow-hidden rounded-lg ${imageOrder}`}
        >
          <img
            className="h-full w-full rounded-md object-cover"
            src="https://placehold.co/800x600"
            alt="Y Khoa Diamond - Chi nhánh Quận 1"
          />
        </div>
      </div>
    </div>
  );
}
