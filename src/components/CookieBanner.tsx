"use client";

import React from "react";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
};

const STORAGE_KEY = "cookie_consent_v1";
const CONSENT_VERSION = "1.0.0";

/**
 * ✅ DEV ONLY:
 * Enquanto estamos estilizando, força o banner a aparecer sempre.
 * Quando terminar, troca para false.
 */
const DEBUG_ALWAYS_SHOW = false;

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;

    if (
      !parsed ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      typeof parsed.timestamp !== "number" ||
      typeof parsed.version !== "string"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(next: Omit<Consent, "timestamp" | "version">) {
  const payload: Consent = {
    ...next,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("cookie-consent:changed", { detail: payload }));
}

function LockScroll({ locked }: { locked: boolean }) {
  React.useEffect(() => {
    if (!locked) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);

  return null;
}

function Backdrop({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <button
      type="button"
      aria-label="Fechar"
      onClick={onClose}
      className="fixed inset-0 z-[60] cursor-default bg-black/25 backdrop-blur-[3px]"
    />
  );
}

function Pill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-bg px-3 py-1 text-[11px] font-semibold text-brand-muted">
      <span className="h-2 w-2 rounded-full bg-brand-gold" />
      {label}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-line bg-white/80 p-4 shadow-soft backdrop-blur">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-brand-ink">{label}</div>
        <p className="mt-1 text-sm leading-relaxed text-brand-muted">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        aria-pressed={checked}
        disabled={disabled}
        className={[
          "group relative h-8 w-14 flex-none rounded-full border border-brand-line transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40",
          disabled ? "cursor-not-allowed opacity-60" : "",
          // ✅ sem hover branco: mantém o mesmo fundo, só muda se estiver checked (verde)
          checked ? "bg-brand-green" : "bg-brand-bg",
        ].join(" ")}
      >
        <span
          className={[
            "pointer-events-none absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-soft",
            "transition-[left,transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
            "group-active:scale-[0.96]",
            checked ? "left-[30px]" : "left-[4px]",
          ].join(" ")}
          style={{
            boxShadow: checked
              ? "0 10px 24px rgba(14,107,82,0.18), 0 2px 8px rgba(0,0,0,0.08)"
              : "0 10px 22px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        />

        <span
          className={[
            "pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300",
            checked ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 55%)",
          }}
        />
      </button>
    </div>
  );
}

export default function CookieBanner() {
  const [ready, setReady] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [openPrefs, setOpenPrefs] = React.useState(false);

  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  const [bannerIn, setBannerIn] = React.useState(false);

  // ✅ FUNÇÃO: abre preferências sempre (mesmo se banner estiver oculto)
  const openPreferences = React.useCallback(() => {
    const current = readConsent();
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);
    setOpenPrefs(true);
  }, []);

  React.useEffect(() => {
    // ✅ expõe um "hook" global pra você chamar de qualquer lugar:
    // window.__openCookiePrefs()
    (window as any).__openCookiePrefs = openPreferences;

    return () => {
      // cleanup
      if ((window as any).__openCookiePrefs === openPreferences) {
        delete (window as any).__openCookiePrefs;
      }
    };
  }, [openPreferences]);

  React.useEffect(() => {
    // ✅ evento global: window.dispatchEvent(new Event("cookie-consent:open-prefs"))
    const onOpenPrefs = () => openPreferences();
    window.addEventListener("cookie-consent:open-prefs", onOpenPrefs as any);

    return () => {
      window.removeEventListener("cookie-consent:open-prefs", onOpenPrefs as any);
    };
  }, [openPreferences]);

  React.useEffect(() => {
    // ✅ Enquanto DEBUG_ALWAYS_SHOW = true, a gente IGNORA o localStorage
    // e mostra sempre, mas ainda salva normalmente quando clica.
    if (DEBUG_ALWAYS_SHOW) {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setShow(true);
      requestAnimationFrame(() => setBannerIn(true));
      setReady(true);
      return;
    }

    const current = readConsent();
    if (!current) {
      setShow(true);
      setAnalytics(false);
      setMarketing(false);
      requestAnimationFrame(() => setBannerIn(true));
    } else {
      setShow(false);
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
    }
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!openPrefs) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPrefs(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPrefs]);

  if (!ready) return null;

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, marketing: true });

    if (DEBUG_ALWAYS_SHOW) {
      // não some no preview
      setBannerIn(false);
      setTimeout(() => setBannerIn(true), 260);
      setOpenPrefs(false);
      return;
    }

    setBannerIn(false);
    setTimeout(() => {
      setShow(false);
      setOpenPrefs(false);
    }, 220);
  }

  function rejectAll() {
    writeConsent({ necessary: true, analytics: false, marketing: false });

    if (DEBUG_ALWAYS_SHOW) {
      setBannerIn(false);
      setTimeout(() => setBannerIn(true), 260);
      setOpenPrefs(false);
      return;
    }

    setBannerIn(false);
    setTimeout(() => {
      setShow(false);
      setOpenPrefs(false);
    }, 220);
  }

  function savePrefs() {
    writeConsent({ necessary: true, analytics, marketing });

    if (DEBUG_ALWAYS_SHOW) {
      setOpenPrefs(false);
      setBannerIn(false);
      setTimeout(() => setBannerIn(true), 260);
      return;
    }

    setBannerIn(false);
    setTimeout(() => {
      setShow(false);
      setOpenPrefs(false);
    }, 220);
  }

  // ✅ se banner não deve aparecer, ainda queremos permitir o modal abrir via evento/função global
  const shouldRenderBanner = show;

  return (
    <>
      <LockScroll locked={openPrefs} />
      <Backdrop open={openPrefs} onClose={() => setOpenPrefs(false)} />

      {shouldRenderBanner && (
        <div className="fixed bottom-5 left-0 right-0 z-[70] px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div
              className={[
                "relative overflow-hidden rounded-[1.4rem] border border-brand-line shadow-soft backdrop-blur",
                "bg-white/95",
                "transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
                bannerIn ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[1px]",
              ].join(" ")}
              style={{
                boxShadow: "0 18px 50px rgba(11,18,32,0.12), 0 2px 10px rgba(11,18,32,0.06)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-28 h-[280px] w-[280px] rounded-full blur-3xl opacity-70"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.22), transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -left-32 -bottom-32 h-[320px] w-[320px] rounded-full blur-3xl opacity-60"
                style={{
                  background: "radial-gradient(circle, rgba(14,107,82,0.16), transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(rgba(11,18,32,0.22) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              <div className="relative grid gap-4 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="min-w-0">
                  <Pill label="Cookies" />

                  <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-[15px]">
                    Usamos cookies <b className="text-brand-ink">necessários</b> para o site funcionar e, se você permitir,
                    cookies de <b className="text-brand-ink">análise</b> e{" "}
                    <span className="whitespace-nowrap">
                      <b className="text-brand-ink">marketing</b>.
                    </span>
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-brand-muted/90">
                    Você pode recusar, aceitar tudo ou ajustar suas preferências agora.
                  </p>

                  {DEBUG_ALWAYS_SHOW && (
                    <p className="mt-2 text-[11px] font-semibold text-brand-muted/90">
                      Modo preview ativo: banner sempre visível (DEBUG_ALWAYS_SHOW)
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setOpenPrefs(true)}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-brand-line bg-white px-5 text-sm font-semibold text-brand-ink shadow-soft transition hover:bg-brand-bg sm:w-auto"
                  >
                    Preferências
                  </button>

                  <button
                    type="button"
                    onClick={rejectAll}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-brand-line bg-brand-bg px-5 text-sm font-semibold text-brand-ink transition hover:bg-white sm:w-auto"
                  >
                    Recusar
                  </button>

                  <button
                    type="button"
                    onClick={acceptAll}
                    className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-green px-6 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark sm:w-auto"
                  >
                    Aceitar tudo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openPrefs && (
        <div className="fixed left-1/2 top-1/2 z-[80] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <div
            className={[
              "rounded-[1.75rem] border border-brand-line bg-white/95 p-5 shadow-soft backdrop-blur sm:p-6",
              "animate-[cookieModalIn_240ms_cubic-bezier(.2,.8,.2,1)_both]",
            ].join(" ")}
          >
            <style>{`
              @keyframes cookieModalIn {
                from { opacity: 0; transform: translateY(10px) scale(0.985); filter: blur(1px); }
                to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
              }
            `}</style>

            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-bg px-3 py-1 text-[11px] font-semibold text-brand-muted">
                  <span className="h-2 w-2 rounded-full bg-brand-gold" />
                  Preferências
                </div>

                <h3 className="mt-3 text-lg font-semibold text-brand-ink">Preferências de cookies</h3>

                <p className="mt-1 text-sm text-brand-muted">
                  Você escolhe quais cookies opcionais podem ser usados.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenPrefs(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-line bg-white text-brand-ink shadow-soft transition hover:bg-brand-bg"
                aria-label="Fechar"
                title="Fechar"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <Toggle
                checked={true}
                onChange={() => {}}
                disabled
                label="Necessários"
                description="Essenciais para o site funcionar corretamente. Sempre ativos."
              />

              <Toggle
                checked={analytics}
                onChange={setAnalytics}
                label="Análise"
                description="Métricas para entender o uso do site e melhorar a experiência."
              />

              <Toggle
                checked={marketing}
                onChange={setMarketing}
                label="Marketing"
                description="Personalização e campanhas. Só com sua permissão."
              />
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={rejectAll}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-brand-line bg-brand-bg px-5 text-sm font-semibold text-brand-ink transition hover:bg-white sm:w-auto"
              >
                Recusar tudo
              </button>

              <button
                type="button"
                onClick={savePrefs}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-green px-6 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark sm:w-auto"
              >
                Salvar preferências
              </button>
            </div>

            <div className="mt-4 h-px w-full bg-brand-line" />

            <p className="mt-4 text-xs leading-relaxed text-brand-muted">
              Você pode alterar essa escolha quando quiser: basta abrir novamente as preferências de cookies
              (ou limpar os dados do navegador).
            </p>
          </div>
        </div>
      )}
    </>
  );
}
