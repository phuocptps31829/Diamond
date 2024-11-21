import notFoundImg from "@/assets/images/no-product.png";

const NotFound = ({ message }) => {
  return (
    <div className="col-span-3 flex h-full flex-col items-center justify-center p-4">
      <img
        src={notFoundImg}
        alt="Not Found"
        className="w-full max-w-xs rounded-md md:max-w-md lg:max-w-md"
      />
      <h1 className="mt-4 text-center text-lg font-semibold text-gray-700">
        {message || "Không tìm thấy trang bạn yêu cầu."}
      </h1>
    </div>
  );
};

export default NotFound;
