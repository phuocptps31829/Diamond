"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const tabsListRef = React.useRef(null);

  React.useEffect(() => {
    const updateIndicator = () => {
      if (tabsListRef.current) {
        const activeTab = tabsListRef.current.querySelector(
          '[data-state="active"]'
        );

        if (activeTab) {
          const activeRect = activeTab.getBoundingClientRect();
          const tabsRect = tabsListRef.current.getBoundingClientRect();
          setIndicatorStyle({
            left: activeRect.left - tabsRect.left,
            top: activeRect.top - tabsRect.top,
            width: activeRect.width,
            height: activeRect.height,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    const observer = new MutationObserver(updateIndicator);
    if (tabsListRef.current) {
      observer.observe(tabsListRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
    return () => {
      window.removeEventListener("resize", updateIndicator);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative" ref={ tabsListRef }>
      <TabsPrimitive.List
        ref={ ref }
        className={ cn(
          "relative inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        ) }
        { ...props }
      />
      <div
        className="absolute rounded-md bg-background shadow-sm transition-all duration-300 ease-in-out"
        style={ indicatorStyle }
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ ref }
    className={ cn(
      "z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      className
    ) }
    { ...props }
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ ref }
    className={ cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ) }
    { ...props }
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
