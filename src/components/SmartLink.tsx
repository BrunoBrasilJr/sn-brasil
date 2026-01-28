"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
};

const PENDING_HASH_KEY = "sn_pending_hash_v1";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export default function SmartLink({
  href,
  className,
  children,
  target,
  rel,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!href) return;

    if (isExternal(href)) return;

    if (href.startsWith("#")) {
      e.preventDefault();

      const id = href.slice(1);

      if (pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      try {
        sessionStorage.setItem(PENDING_HASH_KEY, id);
      } catch {}

      router.push("/"); 
      return;
    }
  }

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}

export { PENDING_HASH_KEY };
