import banner from "../../../assets/images/NewsBanner.jpg";

export default function NewsBanner() {
  return (
    <div className="relative w-full h-[30vw] lg:h-[8vw]">
      <img
        src={ banner }
        alt="Doctor delivering great news"
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-[37px] text-center">
          <h1 className="text-[30px] font-bold text-primary-500">
            Tin tức sức khỏe và y tế
          </h1>
          <h4 className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
            Cập nhật thông tin sức khỏe mới nhất từ các chuyên gia y tế hàng đầu
            Việt Nam và thế giới
          </h4>
        </div>
      </div>
    </div>
  );
}
