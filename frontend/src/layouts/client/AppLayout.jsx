import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </>
  );
}
