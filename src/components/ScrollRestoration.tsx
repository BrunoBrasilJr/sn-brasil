"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KEY_PREFIX = "scroll-pos:";

function getKey(pathname: string) {
  return `${KEY_PREFIX}${pathname}`;
}

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const key = getKey(pathname);

    const restore = () => {
      const raw = sessionStorage.getItem(key);
      const y = raw ? Number(raw) : 0;

      if (!Number.isFinite(y)) return;

      window.scrollTo({ top: y, left: 0, behavior: "instant" as any });
    };

    const t1 = window.setTimeout(restore, 0);
    const t2 = window.setTimeout(restore, 120);

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY || 0));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const onPageHide = () => {
      sessionStorage.setItem(key, String(window.scrollY || 0));
    };
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return null;
}
