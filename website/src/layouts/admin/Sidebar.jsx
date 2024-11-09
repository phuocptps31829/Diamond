import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import LogoNoLetters from "@/assets/images/LogoNoLetters.png";
import BrandLogo from "@/assets/images/brandLogo.png";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !isOpen ? "w-[90px]" : "!no-scrollbar w-72",
      )}
    >
      <div className="relative flex h-full flex-col overflow-y-auto pb-6 shadow-md dark:shadow-zinc-800">
        <div className="mt-0.5 flex min-h-16 items-center justify-center border-b-2 border-primary-100">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2"
          >
            {!isOpen ? (
              <div className="h-[45px] w-[45px] duration-200">
                <img
                  src={LogoNoLetters}
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-[58px] w-56 duration-200">
                <img
                  src={BrandLogo}
                  alt="Logo"
                  className="h-full w-full"
                />
              </div>
            )}
          </Link>
        </div>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
