import banner from "../../../assets/images/contactBanner.jpg";

export default function BannerContact() {
  return (
    <>
      <div className="relative h-[50vw] w-full sm:h-[30vw] lg:h-[8vw]">
        <img
          src={ banner }
          alt="Doctor delivering great news"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-[37px] text-center">
            <h1 className="text-[30px] font-bold text-primary-500">
              Hợp tác với chúng tôi
            </h1>
            <h4 className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
              Diamond rất hân hạnh được hợp tác cùng với các cơ sở y tế, các quý
              bác sĩ để tiếp cận đến hàng triệu bệnh nhân.
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
