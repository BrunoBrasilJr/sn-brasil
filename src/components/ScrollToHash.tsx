"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 88;

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.replace("#", "");
    if (!id) return;

    const start = Date.now();
    const maxWait = 2500;

    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        const y =
          el.getBoundingClientRect().top +
          window.scrollY -
          HEADER_OFFSET;

        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }

      if (Date.now() - start < maxWait) {
        requestAnimationFrame(tick);
      }
    };

    const t = window.setTimeout(() => requestAnimationFrame(tick), 60);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
