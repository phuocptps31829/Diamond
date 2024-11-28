"use client";
import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const AnimatedList = React.memo(
  ({ className, children, baseDelay = 1000, minDelay = 100 }) => {
    const [index, setIndex] = useState(0);

    const childrenArray = useMemo(
      () => React.Children.toArray(children).reverse(),
      [children]
    );

    const dynamicDelay = useMemo(() => {
      if (childrenArray.length <= 1) return baseDelay; 
      const calculatedDelay = Math.max(
        baseDelay / childrenArray.length,
        minDelay
      ); 
      return calculatedDelay;
    }, [childrenArray.length, baseDelay, minDelay]);

    useEffect(() => {
      if (index < childrenArray.length - 1) {
        const timeout = setTimeout(() => {
          setIndex((prevIndex) => prevIndex + 1);
        }, dynamicDelay);

        return () => clearTimeout(timeout);
      }
    }, [index, dynamicDelay, childrenArray.length]);

    const itemsToShow = useMemo(() => {
      return childrenArray.slice(0, index + 1);
    }, [index, childrenArray]);

    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <AnimatePresence>
          {itemsToShow.map((item, idx) => (
            <AnimatedListItem key={item.key || idx} isLast={idx === 0}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children, isLast }) {
  const animations = isLast
    ? {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: "spring", stiffness: 350, damping: 40 },
      }
    : {};

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
