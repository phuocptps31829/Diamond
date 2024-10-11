import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { getMenuList } from "@/constants/menu-admin-list";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Ellipsis } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import CollapseMenuButton from "./CollapseMenuButton";
import { Button } from "@/components/ui/Button";
import { useSelector } from "react-redux";

const Menu = ({ isOpen }) => {
  const location = useLocation();
  const menuList = getMenuList(location.pathname);
  const profile = useSelector((state) => state.auth.userProfile);
  const profileRole = profile?.role?.name;

  console.log('role', profileRole);

  console.log(menuList, 'mm');

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="no-scrollbar mt-5 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-2 px-5 lg:min-h-[calc(100vh-32px-40px-32px)]">
          { menuList.map(({ groupLabel, menus, roles }, index) => (
            roles?.includes(profileRole) && <li className={ cn("w-full", groupLabel ? "pt-4" : "") } key={ index }>
              { (isOpen && groupLabel) || isOpen === undefined ? (
                <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                  { groupLabel }
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={ 100 }>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{ groupLabel }</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-0"></p>
              ) }
              { menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus?.length === 0 ? (
                    <div className="w-full" key={ index }>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={ 100 }>
                          <TooltipTrigger asChild>
                            <Button
                              variant={ active ? "secondary" : "ghost" }
                              className="mb-1 h-10 w-full justify-start"
                              asChild
                            >
                              <Link href={ href }>
                                <span
                                  className={ cn(isOpen === false ? "" : "mr-4") }
                                >
                                  <Icon size={ 18 } />
                                </span>

                                <p
                                  className={ cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                  ) }
                                >
                                  { label }
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          { isOpen === false && (
                            <TooltipContent side="right">
                              { label }
                            </TooltipContent>
                          ) }
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={ index }>
                      <CollapseMenuButton
                        icon={ Icon }
                        label={ label }
                        active={ active }
                        submenus={ submenus }
                        isOpen={ isOpen }
                      />
                    </div>
                  ),
              ) }
            </li>
          )) }
        </ul>
      </nav>
    </ScrollArea>
  );
};

export default Menu;
