import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Header from "./Header";
import { Toaster } from "@/components/ui/Toaster";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-gray-700">
          Giao diện không hỗ trợ trên thiết bị di động !
        </p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Sidebar isOpen={isOpen} onToggleOpen={setIsOpen} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-[#F4F4F5] transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <div>
          <Header isOpen={isOpen} onToggleOpen={setIsOpen} />
          <div className="container px-4 pb-8 pt-5 sm:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      <footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      ></footer>
    </>
  );
}
