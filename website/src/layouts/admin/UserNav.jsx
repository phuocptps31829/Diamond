import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/Tooltip";
import { LogOut, User } from "lucide-react";
import { IoMdMailUnread } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { roles } from "@/constants/roles";
import { logoutAction } from "@/redux/authSlice";
import { toastUI } from "@/components/ui/Toastify";

const UserNav = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    toastUI("Đăng xuất thành công!", "success");
    navigate("/admin/auth");
  };

  return (
    <>
      <div className="mr-2 flex items-center gap-6">
        <button className="relative">
          <span className="absolute -right-1 flex h-3 w-3">
            <span
              className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
              style={ { animationDuration: "2s" } }
            ></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
          </span>
          <IoMdMailUnread size={ 25 } color="#007BBB" />
        </button>
        <button className="relative">
          <span className="absolute right-0 flex h-3 w-3">
            <span
              className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
              style={ { animationDuration: "2s" } }
            ></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
          </span>
          <FaBell size={ 25 } color="#007BBB" />
        </button>
      </div>
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={ 100 }>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-none bg-transparent shadow-none"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary-500">
                      { userProfile?.fullName }
                    </span>
                    <span className="text-right text-[13px] font-light text-primary-300">
                      { roles.find(role => role.value === userProfile?.role?.name)?.label }
                    </span>
                  </div>
                  <Avatar>
                    <img
                      src={ userProfile?.avatar
                        ? `${import.meta.env.VITE_IMAGE_API_URL}/${userProfile?.avatar}`
                        : 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png' }
                      alt={ userProfile?.fullName }
                      className="h-10 w-10 rounded-full"
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Hồ sơ</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{ userProfile?.fullName }</p>
              <p className="text-xs leading-none text-muted-foreground">
                { userProfile?.phoneNumber || userProfile?.email }
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link href="/account" className="flex items-center">
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                Hồ sơ
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="hover:cursor-pointer" onClick={ handleLogout }>
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNav;
