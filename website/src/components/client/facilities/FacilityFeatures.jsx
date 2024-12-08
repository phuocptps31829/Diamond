import { Card } from "@/components/ui/Card";
import {
  Stethoscope,
  Microscope,
  Bed,
  Syringe,
  Pill,
  HeartPulse,
} from "lucide-react";
import PKHD from "@/assets/images/Phòng khám hiện đại.jpg";
import PXNTT from "@/assets/images/Phòng xét nghiệm tiên tiến.jpg";
import PNTTM from "@/assets/images/Phòng nội trú thoải mái.jpg";
import PCC from "@/assets/images/Phòng cấp cứu 247.jpg";
import NTDD from "@/assets/images/Nhà thuốc đầy đủ.jpg";
import KVTTAT from "@/assets/images/Khu vực tiêm chủng an toàn.jpg";

const features = [
  {
    title: "Phòng khám hiện đại",
    description:
      "Phòng khám được trang bị các thiết bị y tế tiên tiến, đảm bảo chẩn đoán chính xác và điều trị hiệu quả.",
    icon: <Stethoscope className="size-4 md:size-6" />,
    image: PKHD,
  },
  {
    title: "Phòng xét nghiệm tiên tiến",
    description:
      "Phòng xét nghiệm với công nghệ mới nhất, giúp phân tích nhanh chóng và chính xác các chỉ số sức khỏe.",
    icon: <Microscope className="size-4 md:size-6" />,
    image: PXNTT,
  },
  {
    title: "Phòng nội trú thoải mái",
    description:
      "Phòng nội trú được thiết kế ấm cúng, tạo cảm giác thoải mái cho bệnh nhân trong quá trình điều trị.",
    icon: <Bed className="size-4 md:size-6" />,
    image: PNTTM,
  },
  {
    title: "Khu vực tiêm chủng an toàn",
    description:
      "Khu vực tiêm chủng được bố trí riêng biệt, đảm bảo an toàn và thuận tiện cho mọi đối tượng.",
    icon: <Syringe className="size-4 md:size-6" />,
    image: KVTTAT,
  },
  {
    title: "Nhà thuốc đầy đủ",
    description:
      "Nhà thuốc cung cấp đầy đủ các loại thuốc cần thiết, đảm bảo chất lượng và nguồn gốc rõ ràng.",
    icon: <Pill className="size-4 md:size-6" />,
    image: NTDD,
  },
  {
    title: "Phòng cấp cứu 24/7",
    description:
      "Phòng cấp cứu hoạt động 24/7, sẵn sàng đáp ứng mọi tình huống khẩn cấp với đội ngũ y bác sĩ giàu kinh nghiệm.",
    icon: <HeartPulse className="size-4 md:size-6" />,
    image: PCC,
  },
];

const FacilityFeatures = () => {
  return (
    <section className="py-3">
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-3xl font-medium lg:text-4xl my-2">
          Cơ sở vật chất hiện đại của Y khoa Diamond
        </h2>

        <div className="mx-auto mb-10 mt-2 grid gap-5 md:grid-cols-2 lg:mt-3">
          { features.map((feature, idx) => (
            <Card
              key={ idx }
              className="cursor-pointer p-5 duration-300 hover:-translate-y-1 md:p-0"
            >
              <div className="flex flex-col gap-6 rounded-lg md:p-5">
                <img
                  src={ feature.image }
                  alt=""
                  className="h-[200px] w-full rounded-xl object-cover md:h-[300px]"
                />

                <div className="flex items-center justify-center gap-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-accent px-3 md:size-12">
                    { feature.icon }
                  </span>
                  <div className="">
                    <h3 className="font-medium md:mb-1 md:text-xl">
                      { feature.title }
                    </h3>
                    <p className="text-sm text-muted-foreground md:text-base">
                      { feature.description }
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )) }
        </div>
      </div>
    </section>
  );
};

export default FacilityFeatures;
