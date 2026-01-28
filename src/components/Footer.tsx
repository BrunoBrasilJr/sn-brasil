"use client";

import Image from "next/image";
import { faqs, site, whatsappLink } from "@/lib/site";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "mail" | "phone" | "pin" | "instagram" | "faq" | "shield" | "arrow";
  className?: string;
}) {
  switch (name) {
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="m6.5 7.5 5.5 4 5.5-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M8.5 5.5c.3-1 1.4-1.6 2.4-1.3l1.6.5c.8.2 1.3 1 1.2 1.8l-.3 1.8c-.1.7.2 1.4.8 1.8l1.4.9c.6.4 1.4.4 2-.1l1.5-1.1c.7-.5 1.7-.4 2.2.3l.8 1.2c.6.9.4 2.1-.4 2.7-1.2.9-2.7 1.5-4.3 1.5-6.4 0-11.7-5.3-11.7-11.7 0-1.6.5-3.1 1.5-4.3.6-.8 1.8-1 2.7-.4l1.2.8c.7.5.8 1.5.3 2.2L9 6.8c-.5.6-.5 1.4-.1 2l.9 1.4c.4.6 1.1.9 1.8.8l1.8-.3c.8-.1 1.6.4 1.8 1.2l.5 1.6c.3 1-.3 2.1-1.3 2.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.5 3.8h9A3.7 3.7 0 0 1 20.2 7.5v9a3.7 3.7 0 0 1-3.7 3.7h-9A3.7 3.7 0 0 1 3.8 16.5v-9A3.7 3.7 0 0 1 7.5 3.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M17.2 6.8h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "faq":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4.5 5.5h15v10.2a3 3 0 0 1-3 3H10l-4.5 2.6V5.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M11.7 14.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path
            d="M9.8 10a2.2 2.2 0 1 1 3.7 1.6c-.5.5-.9.7-.9 1.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3.5 19 6.8v6.2c0 5-3.2 8.1-7 9.5-3.8-1.4-7-4.5-7-9.5V6.8L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "arrow":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

const MODAL_ANIM_MS = 420;
const MODAL_CLOSE_MS = 200;

function FaqModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    let tEnter: number | undefined;
    let tClose: number | undefined;

    if (open) {
      setRendered(true);
      setClosing(false);

      setEntered(false);
      tEnter = window.setTimeout(() => setEntered(true), 50);
    } else if (rendered) {
      setClosing(true);
      tClose = window.setTimeout(() => {
        setRendered(false);
        setClosing(false);
        setEntered(false);
      }, MODAL_CLOSE_MS);
    }

    return () => {
      if (tEnter) window.clearTimeout(tEnter);
      if (tClose) window.clearTimeout(tClose);
    };
  }, [open, mounted, rendered]);

  useEffect(() => {
    if (!rendered) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [rendered, onClose]);

  if (!mounted || !rendered) return null;

  const visible = entered && !closing;

  return createPortal(
    <div
      className={[
        "fixed inset-0 z-[2147483647] flex items-center justify-center",
        `transition-opacity duration-[${MODAL_ANIM_MS}ms] ease-out`,
        visible ? "opacity-100" : "opacity-0",
      ].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-label="Perguntas frequentes"
    >
      <button
        type="button"
        onClick={onClose}
        className={[
          "absolute inset-0 bg-black/40 backdrop-blur-sm",
          `transition-opacity duration-[${MODAL_ANIM_MS}ms] ease-out`,
          visible ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-label="Fechar FAQ"
      />

      <div
        className={[
          "relative w-[92vw] max-w-2xl rounded-2xl border border-brand-line bg-white shadow-soft",
          `transition-[opacity,transform] duration-[${MODAL_ANIM_MS}ms] ease-out will-change-transform`,
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-3 border-b border-brand-line p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-bg text-brand-ink">
              <Icon name="faq" />
            </div>
            <div>
              <div className="text-sm font-semibold text-brand-ink">Perguntas frequentes</div>
              <div className="text-xs text-brand-muted">Respostas rápidas e objetivas</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-brand-line bg-white px-3 py-2 text-sm font-semibold text-brand-ink hover:bg-brand-bg"
          >
            Fechar
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-5">
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-brand-line bg-brand-bg p-4">
                <summary className="cursor-pointer list-none text-sm font-semibold text-brand-ink">
                  <div className="flex items-start justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="mt-0.5 text-brand-muted transition group-open:rotate-90" aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  </div>
                </summary>
                <p className="mt-3 text-sm text-brand-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="border-t border-brand-line p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <Icon name="shield" className="h-4 w-4" />
              Atendimento com clareza e segurança.
            </div>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark"
              href={whatsappLink(site.whatsappMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Footer() {
  const [faqOpen, setFaqOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const scrollingRef = useRef(false);

  const instaHandle = useMemo(() => {
    try {
      const u = new URL(site.instagram);
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[0] ? `@${parts[0]}` : site.instagram;
    } catch {
      return site.instagram;
    }
  }, [site.instagram]);

  const smoothScrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return false;

    const headerOffset = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });

    return true;
  }, []);

  const goToSection = useCallback(
    (id: string) => {
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

  const whatsappHref = whatsappLink(site.whatsappMessage);

  // ✅ NOVO: abre o modal de preferências do Cookie Banner
  const openCookiePrefs = useCallback(() => {
    window.dispatchEvent(new Event("cookie-consent:open-prefs"));
  }, []);

  return (
    <footer className="border-t border-brand-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="lg:hidden">
        <div className="container-page py-8">
          <div className="rounded-[1.5rem] border border-brand-line bg-brand-bg p-4">
            <div className="rounded-[1.25rem] bg-white p-4 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white">
                  <Image src={site.logo.src} alt={site.logo.alt} fill className="object-contain" />
                </div>

                <div className="min-w-0 leading-tight">
                  <div className="truncate text-sm font-semibold text-brand-ink">{site.name}</div>
                  <div className="truncate text-xs text-brand-muted">{site.cityState}</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-brand-muted">
                Atendimento próximo, organização e segurança para o seu negócio.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                >
                  WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setFaqOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-brand-bg px-4 py-3 text-sm font-semibold text-brand-ink shadow-soft transition hover:bg-white"
                >
                  <Icon name="faq" className="h-4 w-4" />
                  FAQ
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <details className="group rounded-[1.25rem] border border-brand-line bg-white shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                <span className="text-sm font-semibold text-brand-ink">Contato</span>
                <span className="text-brand-muted transition group-open:rotate-90" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </summary>

              <div className="border-t border-brand-line px-5 py-4">
                <div className="space-y-4 text-sm text-brand-muted">
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                      <Icon name="mail" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Email</div>
                      <div className="font-semibold text-brand-ink">{site.email}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                      <Icon name="phone" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Telefones</div>
                      <div className="font-semibold text-brand-ink">{site.phones.join(" • ")}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                      <Icon name="pin" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Endereço</div>
                      <div className="font-semibold text-brand-ink">{site.address}</div>
                      <div className="text-sm text-brand-muted">{site.cityState}</div>

                      {(site.legalName || site.cnpj) && (
                        <div className="mt-3 text-sm text-brand-muted">
                          {site.legalName && (
                            <div>
                              <span className="font-semibold text-brand-ink">Razão social:</span> {site.legalName}
                            </div>
                          )}
                          {site.cnpj && (
                            <div>
                              <span className="font-semibold text-brand-ink">CNPJ:</span> {site.cnpj}
                            </div>
                          )}
                        </div>
                      )}

                      {(site.responsibleName || site.responsibleCRC) && (
                        <div className="mt-3 text-sm text-brand-muted">
                          <div>
                            <span className="font-semibold text-brand-ink">Responsável técnico:</span>{" "}
                            {site.responsibleName ? site.responsibleName : "Contador(a) registrado(a) no CRC"}
                          </div>
                          {site.responsibleCRC && (
                            <div>
                              <span className="font-semibold text-brand-ink">CRC:</span> {site.responsibleCRC}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                      <Icon name="instagram" />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Instagram</div>
                      <a
                        className="font-semibold text-brand-ink underline-offset-4 hover:underline"
                        href={site.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {instaHandle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </details>

            <details className="group rounded-[1.25rem] border border-brand-line bg-white shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
                <span className="text-sm font-semibold text-brand-ink">Links</span>
                <span className="text-brand-muted transition group-open:rotate-90" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </summary>

              <div className="border-t border-brand-line px-5 py-4">
                <div className="grid gap-2 text-sm">
                  <button
                    type="button"
                    onClick={() => goToSection("servicos")}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Serviços
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSection("como-funciona")}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Como funciona
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSection("segmentos")}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Segmentos
                  </button>

                  <button
                    type="button"
                    onClick={() => goToSection("contato")}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Contato
                  </button>

                  <button
                    type="button"
                    onClick={() => setFaqOpen(true)}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    FAQ
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push("/politica-de-privacidade")}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Política de privacidade
                  </button>

                  {/* ✅ NOVO */}
                  <button
                    type="button"
                    onClick={openCookiePrefs}
                    className="text-left font-semibold text-brand-ink hover:underline"
                  >
                    Gerenciar cookies
                  </button>
                </div>
              </div>
            </details>
          </div>

          <div className="mt-6 border-t border-brand-line/70 pt-5 text-xs text-brand-muted">
            <div>
              © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-gold" aria-hidden="true" />
              Site institucional • {site.cityState}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="container-page py-9">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-white">
                  <Image src={site.logo.src} alt={site.logo.alt} fill className="object-contain" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-ink">{site.name}</div>
                  <div className="text-xs text-brand-muted">{site.cityState}</div>
                </div>
              </div>

              <p className="mt-3 max-w-sm text-sm text-brand-muted">
                Atendimento próximo, organização e segurança para o seu negócio.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="text-sm font-semibold text-brand-ink">Contato</div>

              <div className="mt-3 space-y-3 text-sm text-brand-muted">
                <div className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                    <Icon name="mail" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-brand-muted">Email</div>
                    <div className="font-semibold text-brand-ink">{site.email}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-brand-muted">Telefones</div>
                    <div className="font-semibold text-brand-ink">{site.phones.join(" • ")}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                    <Icon name="pin" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-brand-muted">Endereço</div>
                    <div className="font-semibold text-brand-ink">{site.address}</div>
                    <div className="text-sm text-brand-muted">{site.cityState}</div>

                    {(site.legalName || site.cnpj) && (
                      <div className="mt-3 text-sm text-brand-muted">
                        {site.legalName && (
                          <div>
                            <span className="font-semibold text-brand-ink">Razão social:</span> {site.legalName}
                          </div>
                        )}
                        {site.cnpj && (
                          <div>
                            <span className="font-semibold text-brand-ink">CNPJ:</span> {site.cnpj}
                          </div>
                        )}
                      </div>
                    )}

                    {(site.responsibleName || site.responsibleCRC) && (
                      <div className="mt-3 text-sm text-brand-muted">
                        <div>
                          <span className="font-semibold text-brand-ink">Responsável técnico:</span>{" "}
                          {site.responsibleName ? site.responsibleName : "Contador(a) registrado(a) no CRC"}
                        </div>
                        {site.responsibleCRC && (
                          <div>
                            <span className="font-semibold text-brand-ink">CRC:</span> {site.responsibleCRC}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-brand-ink" aria-hidden="true">
                    <Icon name="instagram" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-brand-muted">Instagram</div>
                    <a
                      className="font-semibold text-brand-ink underline-offset-4 hover:underline"
                      href={site.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {instaHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="text-sm font-semibold text-brand-ink">Links</div>

              <div className="mt-3 grid gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => goToSection("servicos")}
                  className="text-left text-brand-ink hover:underline"
                >
                  Serviços
                </button>

                <button
                  type="button"
                  onClick={() => goToSection("como-funciona")}
                  className="text-left text-brand-ink hover:underline"
                >
                  Como funciona
                </button>

                <button
                  type="button"
                  onClick={() => goToSection("segmentos")}
                  className="text-left text-brand-ink hover:underline"
                >
                  Segmentos
                </button>

                <button
                  type="button"
                  onClick={() => goToSection("contato")}
                  className="text-left text-brand-ink hover:underline"
                >
                  Contato
                </button>

                <button
                  type="button"
                  onClick={() => setFaqOpen(true)}
                  className="text-left text-brand-ink hover:underline"
                >
                  FAQ
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/politica-de-privacidade")}
                  className="text-left text-brand-ink hover:underline"
                >
                  Política de privacidade
                </button>

                {/* ✅ NOVO */}
                <button
                  type="button"
                  onClick={openCookiePrefs}
                  className="text-left text-brand-ink hover:underline"
                >
                  Gerenciar cookies
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-brand-line/70 pt-5 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-gold" aria-hidden="true" />
              Site institucional • {site.cityState}
            </div>
          </div>
        </div>
      </div>

      <FaqModal open={faqOpen} onClose={() => setFaqOpen(false)} />
    </footer>
  );
}
