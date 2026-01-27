"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const STORAGE_KEY = "sn_scroll_keeper_v1";
const SAVE_THROTTLE_MS = 120;

type Store = Record<string, number>;

function readStore(): Store {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

function getKey(pathname: string) {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  return `${pathname}${hash || ""}`;
}

export default function ScrollKeeper() {
  const pathname = usePathname();
  const rafLock = useRef(false);
  const lastSaveAt = useRef(0);

  // salvar scroll enquanto rola
  useEffect(() => {
    const onScroll = () => {
      const now = Date.now();
      if (now - lastSaveAt.current < SAVE_THROTTLE_MS) return;
      lastSaveAt.current = now;

      if (rafLock.current) return;
      rafLock.current = true;

      requestAnimationFrame(() => {
        rafLock.current = false;
        const key = getKey(pathname);
        const store = readStore();
        store[key] = window.scrollY;
        writeStore(store);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // restaurar scroll no F5 / troca de rota
  useEffect(() => {
    const key = getKey(pathname);
    const store = readStore();
    const savedY = store[key];

    const t = window.setTimeout(() => {
      if (typeof savedY === "number") {
        window.scrollTo({ top: savedY, behavior: "auto" });
      }
    }, 20);

    return () => window.clearTimeout(t);
  }, [pathname]);

  // tratar mudança só de hash
  useEffect(() => {
    const onHashChange = () => {
      const key = getKey(pathname);
      const store = readStore();
      store[key] = window.scrollY;
      writeStore(store);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  return null;
}
