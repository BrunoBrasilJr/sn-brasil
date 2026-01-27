"use client";

import { faqs } from "@/lib/site";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function FaqModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[2147483647]">
      {/* overlay */}
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative mx-auto flex h-full max-w-3xl items-center px-4">
        <div className="w-full rounded-xl2 border border-brand-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div>
              <div className="text-sm font-semibold">Perguntas frequentes</div>
              <div className="text-xs text-brand-muted">Aperte ESC para fechar</div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-brand-line bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-ink transition hover:bg-white"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto p-5">
            <div className="grid gap-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl2 border border-brand-line bg-white p-5"
                  open={false}
                >
                  <summary className="cursor-pointer text-sm font-semibold">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm text-brand-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-line px-5 py-4">
            <p className="text-xs text-brand-muted">
              Se sua dúvida não estiver aqui, chama no WhatsApp e a gente te ajuda.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
