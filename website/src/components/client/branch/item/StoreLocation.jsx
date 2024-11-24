import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function StoreLocation({ isChange, branch }) {
  console.log(branch);

  const contentOrder = isChange ? "order-last" : "order-first";
  const imageOrder = isChange ? "order-first" : "order-last";

  return (
    <Card className="p-5">
      <div
        className={`grid gap-8 lg:grid-cols-2 ${isChange ? "lg:grid-flow-col" : ""}`}
      >
        {/* Content Column */}
        <div className={` ${contentOrder}`}>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary-500">
              {branch.name}
            </h1>
            <h2 className="text-3xl font-light text-gray-400">
              {branch.address}
            </h2>
          </div>

          <p className="leading-relaxed text-gray-600">
            Tọa lạc tại trung tâm Quận 1, chi nhánh Y Khoa Diamond mang đến trải
            nghiệm chăm sóc sức khỏe đẳng cấp và chuyên nghiệp. Với đội ngũ bác
            sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết
            mang đến dịch vụ y tế chất lượng cao nhất cho mọi bệnh nhân.
          </p>

          <div className="flex flex-col items-start justify-start gap-7 md:flex-row">
            <div className="  border-r p-3 pl-0">
              <h3 className="text-lg font-semibold text-primary-500">
                Giờ làm việc:
              </h3>
              <div className=" text-gray-600 p-3 pl-0">
                <div className="whitespace-pre-wrap text-wrap">{branch.workingTime}</div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-lg font-semibold text-primary-500">
                Liên hệ:
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>Hotline:</span>
                  <span>{branch.hotline}</span>
                </div>
                <Button
                 variant="primary"
                >
                  <Phone className="mr-1 h-4 w-4" />
                  Đặt lịch khám
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold text-primary-500">Địa chỉ:</h3>
            <div className="space-y-2">
              <p className="text-gray-600">{branch.address}</p>
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
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
          className={`relative h-[400px] overflow-hidden rounded-lg ${imageOrder}`}
        >
          <img
            className="h-full w-full rounded-md object-cover"
            src={`${import.meta.env.VITE_IMAGE_API_URL}/${branch.imagesURL[0]}`}
            alt={branch.name}
          />
        </div>
      </div>
    </Card>
  );
}
