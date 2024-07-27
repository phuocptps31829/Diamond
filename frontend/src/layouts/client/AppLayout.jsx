import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
