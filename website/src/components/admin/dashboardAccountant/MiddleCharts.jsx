import LineChart from "./chart/LineChart";

export default function MiddleCharts() {
  return (
    <div className="mt-6 grid w-full grid-cols-1 justify-between">
      <div className="flex-1 rounded-md bg-white px-6 py-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold">Thu nhập theo năm</h3>
          <div className="flex flex-col items-center">
            <div className="text-[17px] font-bold">15.000.000 ₫</div>
            <div className="mt-1 text-[14px] text-[#B8B8B8]">
              <span className="text-[#00D3C7]">5%</span> so với tháng trước
            </div>
          </div>
          <select className="mt-2 rounded-md border border-gray-300 p-2 px-3 text-sm">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className="h-[260px] w-full">
          <LineChart />
        </div>
      </div>
    </div>
  );
}
