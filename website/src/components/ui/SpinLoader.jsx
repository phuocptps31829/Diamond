export default function SpinLoader() {
  return (
    <div className="flex items-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3 h-5 w-5 animate-spin text-white"
      >
        <circle
          strokeWidth="4"
          stroke="currentColor"
          r="10"
          cy="12"
          cx="12"
          className="opacity-25"
        ></circle>
        <path
          d="M4 12a8 8 0 018-8v8H4z"
          fill="currentColor"
          className="opacity-75"
        ></path>
      </svg>
      Đang xử lí...
    </div>
  );
}
