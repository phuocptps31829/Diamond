import { Button } from "@/components/ui/Button";
import { ToastAction } from "@/components/ui/Toast";
import { useToast } from "@/components/ui/use-toast";

import { AiOutlineSchedule } from "react-icons/ai";
const ServiceDetail = () => {
  const { toast } = useToast();
  const product = {
    image: "https://www.material-tailwind.com/image/product-4.png",
    name: "TẦM SOÁT SỨC KHỎE TIỀN SẢN",
    new_price: 1234567,
    description:
      "Theo khuyến cáo các cặp vợ chồng nên thực hiện khám sàng lọc trước khi mang thai khoảng 3-6 tháng giúp ngăn ngừa lây truyền các bệnh truyền nhiễm từ cha mẹ sang con, giảm rủi ro khi sinh con, giảm nguy cơ mắc bệnh, dị tật bẩm sinh cho trẻ sơ sinh.",
    book: 100,
    quantity: 10,
  };

  return (
    <div className="mx-auto max-w-screen-2xl pb-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
        <div className="container flex items-center justify-center">
          {" "}
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-9/12"
          />
        </div>

        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="mb-4 text-xl font-bold md:text-3xl">{product.name}</h3>
          <div className="my-4 flex items-center gap-2">
            <AiOutlineSchedule size={25} />
            <span className="text-sm font-bold !text-gray-700">
              {product.book} lượt đặt lịch
            </span>
          </div>

          <p className="mb-4 text-justify text-sm font-normal leading-[27px] text-gray-500">
            {product.description}
          </p>
          <span className="mb-6 block text-lg font-medium">
            <strong className="font-semibold">Giá:</strong>{" "}
            {product.new_price.toLocaleString()} đ
          </span>

          <div className="mb-4 flex w-full items-center gap-3">
            <Button
              className="w-full"
              size="lg"
              variant="custom"
              onClick={() => {
                toast({
                  variant: "success",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                  action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
              }}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
