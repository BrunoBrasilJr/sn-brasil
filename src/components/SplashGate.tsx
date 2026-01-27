"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";

type SplashState = "visible" | "leaving" | "hidden";

const STORAGE_KEY = "sn_splash_seen";

export default function SplashGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SplashState>("visible");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
      setState(seen ? "hidden" : "visible");
    } catch {
      setState("visible");
    } finally {
      setReady(true);
    }
  }, []);

  const requestClose = useCallback(() => {
    setState("leaving");

    window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setState("hidden");
    }, 520);
  }, []);

  // ✅ evita 1-frame do site aparecer antes da splash
  if (!ready) {
    return (
      <>
        <div className="fixed inset-0 z-[100] bg-white" />
        <div className="opacity-0">{children}</div>
      </>
    );
  }

  const showContent = state === "hidden";

  return (
    <>
      {state !== "hidden" ? (
        <SplashScreen
          durationMs={5000}
          switchAtMs={3000}
          leaving={state === "leaving"}
          onRequestClose={requestClose}
        />
      ) : null}

      <div
        className={[
          "transition-opacity duration-700 ease-out",
          showContent ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        {children}
      </div>
    </>
  );
}
