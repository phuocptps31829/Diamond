import { Button } from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { MdChevronRight } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CollapseMenuButton = ({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
}) => {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState(isSubmenuActive);
  const profile = useSelector((state) => state.auth.userProfile);
  const profileRole = profile?.role?.name;

  return isOpen ? (
    <Collapsible
      open={ isCollapsed }
      onOpenChange={ setIsCollapsed }
      className="no-scrollbar w-full"
    >
      <CollapsibleTrigger
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
        asChild
      >
        <button className="h-10 w-full justify-start pl-0 text-[15px] hover:text-primary-700">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4 rounded-md bg-[#F4F5FA] p-3">
                <Icon size={ 18 } />
              </span>
              <p
                className={ cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                ) }
              >
                { label }
              </p>
            </div>
            <div
              className={ cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0",
              ) }
            >
              <ChevronDown
                size={ 18 }
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        { submenus.map(({ href, label, active, exceptRoles }, index) => (
          !exceptRoles?.includes(profileRole) && <button
            key={ index }
            className="mb-1 ml-4 h-10 w-full justify-start text-[14px] hover:text-primary-700"
          >
            <Link to={ href } className={ `${active ? "" : "opacity-50"} flex w-full items-center text-primary-700 hover:opacity-100` }>
              <span className="ml-2 mr-4">
                { active ? (
                  <MdChevronRight size={ 18 } />
                ) : (
                  <span className="mr-[18px] block" />
                ) }
              </span>
              <p
                className={ cn(
                  "max-w-[170px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                ) }
              >
                { label }
              </p>
            </Link>
          </button>
        )) }
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={ 100 }>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={ active ? "secondary" : "ghost" }
                className="mb-1 h-10 w-full justify-start"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <span className={ cn(isOpen === false ? "" : "mr-4") }>
                      <Icon size={ 18 } />
                    </span>
                    <p
                      className={ cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100",
                      ) }
                    >
                      { label }
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={ 2 }>
            { label }
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={ 25 } align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          { label }
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        { submenus.map(({ href, label, active, exceptRoles }, index) => (
          !exceptRoles?.includes(profileRole) && <DropdownMenuItem key={ index } asChild>
            <Link className={ `${active ? "text-primary-500" : ""} cursor-pointer` } to={ href }>
              <p className="max-w-[180px] truncate">{ label }</p>
            </Link>
          </DropdownMenuItem>
        )) }
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CollapseMenuButton;
