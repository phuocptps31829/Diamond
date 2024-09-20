import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import { IoDiamond } from "react-icons/io5";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !isOpen ? "w-[90px]" : "!no-scrollbar w-72",
      )}
    >
      <div className="relative flex h-full flex-col overflow-y-auto pb-6 shadow-md dark:shadow-zinc-800">
        <div className="flex min-h-16 items-center justify-center border-b-2 mt-0.5 border-primary-100">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2"
          >
            <IoDiamond className="me-2 text-2xl" color="#007BBB" />
            <h1
              className={cn(
                "whitespace-nowrap text-2xl font-bold transition-[transform,opacity,display] duration-300 ease-in-out text-[#007BBB]",
                !isOpen
                  ? "hidden -translate-x-96 opacity-0"
                  : "translate-x-0 opacity-100",
              )}
            >
              Diamond
            </h1>
          </Link>
        </div>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
