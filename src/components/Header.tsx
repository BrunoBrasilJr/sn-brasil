"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { site, whatsappLink } from "@/lib/site";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "menu" | "close";
  className?: string;
}) {
  if (name === "close") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollingRef = useRef(false);

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const navItems = useMemo(
    () => [
      { id: "inicio", label: "Início" },
      { id: "servicos", label: "Serviços" },
      { id: "como-funciona", label: "Como funciona" },
      { id: "segmentos", label: "Segmentos" },
      { id: "contato", label: "Contato" },
      { id: "parceiros", label: "Parceiros" },
    ],
    []
  );

  const smoothScrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return false;

    const headerOffset = 88;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
    return true;
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      setOpen(false);

      if (pathname === "/") {
        smoothScrollToId(id);
        return;
      }

      router.push(`/#${id}`);

      if (scrollingRef.current) return;
      scrollingRef.current = true;

      const start = Date.now();
      const maxWait = 3000;

      const tick = () => {
        const ok = smoothScrollToId(id);
        const timedOut = Date.now() - start > maxWait;

        if (ok || timedOut) {
          scrollingRef.current = false;
          return;
        }
        requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    },
    [pathname, router, smoothScrollToId]
  );

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;

    const id = hash.replace("#", "");
    if (!id) return;

    const t = window.setTimeout(() => smoothScrollToId(id), 50);
    return () => window.clearTimeout(t);
  }, [pathname, smoothScrollToId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;

        setScrolled(y > 8);

        const lastY = lastYRef.current;
        const delta = y - lastY;

        const HIDE_AFTER = 120;
        const DELTA_HIDE = 10;
        const DELTA_SHOW = 6;

        if (y <= 6) {
          setHidden(false);
        } else if (delta > DELTA_HIDE && y > HIDE_AFTER) {
          setHidden(true);
        } else if (delta < -DELTA_SHOW) {
          setHidden(false);
        }

        lastYRef.current = y;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = whatsappLink(site.whatsappMessage);

  return (
    <header
      className={[
        "sticky top-0 z-[50]",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/70 to-transparent" />
      <div
        className={[
          "relative backdrop-blur",
          "transition-colors duration-300 ease-out",
          scrolled
            ? "bg-white/90 border-b border-brand-line"
            : "bg-white/70 border-b border-brand-line/60",
        ].join(" ")}
      >
        <div className="container-page">
          <div className="hidden items-center justify-between py-4 lg:flex">
            <a href="/#inicio" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl bg-white">
                <Image src={site.logo.src} alt={site.logo.alt} fill className="object-contain" priority />
              </div>

              <div className="leading-tight">
                <div className="text-sm font-semibold text-brand-ink">{site.name}</div>
                <div className="text-xs text-brand-muted">{site.cityState}</div>
              </div>
            </a>

            <nav className="flex items-center gap-6 text-sm">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => goToSection(n.id)}
                  className="text-brand-ink hover:underline"
                >
                  {n.label}
                </button>
              ))}
            </nav>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
            >
              Whatsapp
            </a>
          </div>

          <div className="flex items-center justify-between py-3 lg:hidden">
            <a href="/#inicio" className="flex min-w-0 items-center gap-3">
              <div className="relative h-11 w-11 flex-none overflow-hidden rounded-2xl bg-white">
                <Image src={site.logo.src} alt={site.logo.alt} fill className="object-contain" priority />
              </div>

              <div className="min-w-0 leading-tight">
                <div className="truncate text-sm font-semibold text-brand-ink">{site.name}</div>
                <div className="truncate text-xs text-brand-muted">{site.cityState}</div>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goToSection("contato")}
                className="inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
              >
                Contato
              </button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-xl border border-brand-line bg-white/95 text-brand-ink shadow-soft transition hover:bg-brand-bg"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
              >
                <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden">
            <div className="border-t border-brand-line bg-white/95 backdrop-blur">
              <div className="container-page py-4">
                <div className="grid gap-2">
                  {navItems.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => goToSection(n.id)}
                      className="rounded-xl border border-brand-line bg-white px-4 py-3 text-left text-sm font-semibold text-brand-ink shadow-soft transition hover:bg-brand-bg"
                    >
                      {n.label}
                    </button>
                  ))}

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
