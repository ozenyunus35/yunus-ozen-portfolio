"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { resetScrollPositionOnNavigation } from "@/lib/motion/scroll-utils";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    resetScrollPositionOnNavigation();
  }, [pathname]);

  useEffect(() => {
    resetScrollPositionOnNavigation();
  }, [pathname]);

  return null;
}
