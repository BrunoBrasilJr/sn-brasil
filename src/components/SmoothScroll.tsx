"use client";

import { useEffect } from "react";

function getHeaderOffset() {
  return 80;
}

export default function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;

      e.preventDefault();

      history.pushState(null, "", href);

      const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top, behavior: "smooth" });
    };

    document.addEventListener("click", onClick, { passive: false });

    return () => {
      document.removeEventListener("click", onClick as any);
    };
  }, []);

  return null;
}
