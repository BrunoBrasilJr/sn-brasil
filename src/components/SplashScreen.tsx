"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type SplashPhase = "redirecting" | "welcome";

export default function SplashScreen({
  durationMs = 5000,
  switchAtMs = 3000,
  leaving = false,
  onRequestClose,
}: {
  durationMs?: number;
  switchAtMs?: number;
  leaving?: boolean;
  onRequestClose: () => void;
}) {
  const [phase, setPhase] = useState<SplashPhase>("redirecting");
  const [progress, setProgress] = useState(0);

  const [entered, setEntered] = useState(false);

  const message = useMemo(() => {
    if (phase === "redirecting")
      return "Estamos redirecionando você ao nosso site.";
    return "Bem-vindo à SN Brasil Contábil.";
  }, [phase]);

  useEffect(() => {
    setEntered(false);
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const tKick = window.setTimeout(() => setProgress(12), 120);
    const tMid = window.setTimeout(() => setProgress(72), 220);

    const tSwitch = window.setTimeout(() => {
      setPhase("welcome");
      setProgress(100);
    }, switchAtMs);

    const tClose = window.setTimeout(() => onRequestClose(), durationMs);

    return () => {
      window.clearTimeout(tKick);
      window.clearTimeout(tMid);
      window.clearTimeout(tSwitch);
      window.clearTimeout(tClose);
    };
  }, [durationMs, switchAtMs, onRequestClose]);

  return (
    <div
      className={[
        "fixed inset-0 z-[100] grid place-items-center bg-white opacity-0",
        "transition-[opacity,transform] duration-[1600ms] ease-out will-change-[opacity,transform]",
        leaving
          ? "opacity-0 translate-y-2"
          : entered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6",
      ].join(" ")}
      aria-label="Tela de carregamento"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-56 left-1/2 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="absolute -bottom-56 left-1/3 h-[820px] w-[820px] -translate-x-1/2 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.65),rgba(255,255,255,1)_55%)]" />
      </div>

      <div className="relative w-[92vw] max-w-xl">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-brand-line bg-white/70 p-8 shadow-soft backdrop-blur">
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-black/[0.03]" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[75%] -translate-x-1/2 rounded-full bg-white/60 blur-2xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-white/60 blur-md" />
              <div className="relative grid h-[150px] w-[150px] place-items-center rounded-[2.5rem] border border-brand-line bg-white shadow-soft">
                <div className="relative h-[110px] w-[110px]">
                  <Image
                    src="/SN-Brasil.png"
                    alt="SN Brasil Contábil"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <h1 className="mt-7 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
              SN Brasil Contábil
            </h1>

            <p
              key={phase}
              className="mt-3 max-w-md text-sm text-brand-muted sm:text-base animate-[splashfade_420ms_ease-out]"
              aria-live="polite"
              aria-atomic="true"
            >
              {message}
            </p>

            <div className="mt-8 w-full max-w-md">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-line/60">
                <div
                  className="h-full rounded-full bg-brand-green/70 transition-[width] duration-[2400ms] ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-brand-muted">
                <span className="h-2 w-2 rounded-full bg-brand-gold" />
                Carregando…
              </div>
            </div>

            <div className="mt-7 flex w-full max-w-md flex-wrap items-center justify-center gap-2">
              {["Atendimento humano", "Organização", "Segurança"].map((t) => (
                <span
                  key={t}
                  className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-brand-line bg-white/70 px-4 text-xs font-medium text-brand-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes splashfade {
          0% {
            opacity: 0;
            transform: translateY(4px);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}
