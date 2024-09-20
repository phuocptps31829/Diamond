import SheetMenu from "./SheetMenu";
import SidebarToggle from "./SidebarToggle";
import UserNav from "./UserNav";
import { IoSearchSharp } from "react-icons/io5";

const Header = ({ isOpen, onToggleOpen }) => {
  return (
    <header className="sticky top-0 z-20 flex w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-16 w-full items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-4">
          <SidebarToggle isOpen={isOpen} onToggleOpen={onToggleOpen} />
          <SheetMenu />

          <div className="flex w-full max-w-xs min-w-[300px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <IoSearchSharp size={20} />
              </span>
            </div>
          </div>
        </div>

        {/* Right Section with UserNav */}
        <div className="flex items-center">
          <div className="flex w-full flex-1 items-center justify-end">
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
