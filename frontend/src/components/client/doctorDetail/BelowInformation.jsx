import { useState } from "react";

export default function BelowInformation() {
  const [tab, setTab] = useState(1);
  return (
    <div className="mx-auto my-10 max-w-screen-xl px-5">
      <div className="mx-auto flex flex-col overflow-hidden rounded-lg border border-gray-400 bg-white">
        <div className="flex w-full justify-between divide-x divide-gray-400">
          <button
            className={`w-full border-b border-gray-400 p-3 text-center font-bold hover:bg-primary-500 hover:text-white ${
              tab === 1
                ? "bg-primary-500 text-white"
                : "bg-white text-gray-800 hover:bg-primary-500"
            }`}
            onClick={() => setTab(1)}
          >
            Chứng nhận
          </button>
          <button
            className={`w-full border-b border-gray-400 p-3 text-center font-bold hover:bg-primary-500 hover:text-white ${
              tab === 2
                ? "bg-primary-500 text-white"
                : "bg-white text-gray-800 hover:bg-primary-500"
            }`}
            onClick={() => setTab(2)}
          >
            Kinh nghiệm
          </button>
        </div>
        <div className="p-5 sm:p-10">
          <div className={`space-y-5 ${tab === 1 ? "block" : "hidden"}`}>
            <div className="flex flex-col">
              <strong className="mb-2">Trường y:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Bác sĩ y khoa, Đại học Y Dược, Thành phố Hồ Chí Minh, Việt
                  Nam, 2002
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <strong className="mb-2">Bằng cấp chuyên môn:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Thạc sĩ y khoa, Đại học Y Dược, Thành phố Hồ Chí Minh, Việt
                  Nam, 2009
                </li>
                <li className="list-disc">
                  Bác sĩ chuyên khoa II, Gây mê hồi sức, Đại học Y Dược, Hà Nội,
                  Việt Nam, 2020
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <strong className="mb-2">Đào tạo nâng cao:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Hồi sức Cấp cứu, Đại học Nantes, Pháp, 2006
                </li>
                <li className="list-disc">
                  Liệu pháp thay thế thận liên tục (CRRT), Bệnh viện 115, Thành
                  phố Hồ Chí Minh, Việt Nam, 2012
                </li>
              </ul>
            </div>
          </div>
          <div className={`space-y-5 ${tab === 2 ? "block" : "hidden"}`}>
            <div className="flex flex-col">
              <strong className="mb-2">Kinh nghiệm:</strong>
              <ul className="pl-12">
                <li className="list-disc">
                  Kinh nghiệm hơn 5 năm làm bác sĩ khoa ngoại, 3 năm làm bác sĩ
                  nội thần kinh
                </li>
                <li className="list-disc">
                  Bác sĩ chuyên khoa II, Gây mê hồi sức, Đại học Y Dược, Hà Nội,
                  Việt Nam, 2020
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
