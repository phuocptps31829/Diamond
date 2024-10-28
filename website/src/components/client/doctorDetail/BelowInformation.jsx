import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LiaCertificateSolid } from "react-icons/lia";
import { IoMdImages } from "react-icons/io";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";

const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export default function BelowInformation({ doctor, isLoading }) {
  console.log("doctor", doctor);
  const [activeTab, setActiveTab] = useState("certification");
  const [selectedZoomImage, setSelectedZoomImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomImage = (image) => {
    setSelectedZoomImage(image);
    setIsZoomed(true);
  };

  return (
    <div className="mx-auto my-10 max-w-screen-xl px-5">
      <Tabs
        defaultValue="certification"
        onValueChange={setActiveTab}
        className="my-5 w-full"
      >
        <TabsList className="w-full gap-1 bg-gray-200 py-7">
          <TabsTrigger
            value="certification"
            className={`w-full p-3 ${activeTab === "certification" ? "shadcn-tabs-active" : ""}`}
          >
            Giới thiệu
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className={`w-full p-3 ${activeTab === "experience" ? "shadcn-tabs-active" : ""}`}
          >
            Chứng chỉ
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="certification"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <div
                className="content-news w-full"
                dangerouslySetInnerHTML={{
                  __html: doctor.otherInfo?.detail || "",
                }}
              ></div>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="experience"
          className="rounded-lg border bg-card bg-white p-6 text-card-foreground shadow-sm"
        >
          <div className="space-y-5">
            <div className="flex gap-2">
              <strong className="flex items-center gap-2">
                <LiaCertificateSolid size={22} /> Mã chứng chỉ :
              </strong>
              {isLoading ? (
                <p>Đang tải...</p>
              ) : (
                doctor.otherInfo?.verification?.practicingCertificate ||
                "Lỗi dữ liệu"
              )}
            </div>
            <div className="flex items-center gap-2">
              <strong className="flex items-center gap-2">
                <IoMdImages size={22} /> Hình ảnh chứng chỉ:
              </strong>
            </div>
            {isLoading ? (
              <p>Đang tải...</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {doctor.otherInfo?.verification?.images?.length > 0 ? (
                  doctor.otherInfo?.verification?.images?.map(
                    (image, index) => (
                      <img
                        key={index}
                        src={`${URL_IMAGE}/${image}`}
                        alt="certificate"
                        className="h-full w-full object-cover cursor-pointer"
                        onClick={() => handleZoomImage(image)}
                      />
                    )
                  )
                ) : (
                  <span className="text-[14px] opacity-50 ml-7">
                    Không có hình ảnh nào.
                  </span>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {isZoomed && (
        <Dialog open={isZoomed} onOpenChange={() => setIsZoomed(false)}>
          <DialogContent className="max-w-[50vw]">
            <DialogHeader>
              <DialogTitle>Ảnh chứng chỉ</DialogTitle>
            </DialogHeader>
            <img
              src={`${URL_IMAGE}/${selectedZoomImage}`}
              alt="Zoomed certificate"
              className="h-full w-full object-cover"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
