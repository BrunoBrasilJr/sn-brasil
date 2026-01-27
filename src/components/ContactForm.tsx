"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { services } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 7 10.5 16.5 4 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-brand-ink">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function FancySelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Selecione",
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const i = options.indexOf(value);
    return i >= 0 ? i : 0;
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(t)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);


  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const i = options.indexOf(value);
    setActiveIndex(i >= 0 ? i : 0);

    setTimeout(() => {
      const el = listRef.current?.querySelector<HTMLButtonElement>(
        `[data-opt-idx="${i >= 0 ? i : 0}"]`
      );
      el?.scrollIntoView({ block: "nearest" });
    }, 0);
  }, [open, options, value]);

  function choose(opt: string) {
    onChange(opt);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      return;
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt) choose(opt);
      return;
    }
  }

  const shown = value || placeholder;

  return (
    <Field label={label}>
      <div ref={wrapRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onButtonKeyDown}
          className={[
            "w-full text-left",
            "rounded-2xl border border-brand-line bg-white",
            "px-5 py-4 pr-12 text-sm font-semibold text-brand-ink",
            "shadow-soft transition",
            "hover:bg-brand-bg",
            "focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold",
          ].join(" ")}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="flex items-center justify-between gap-3">
            <span className={value ? "text-brand-ink" : "text-brand-muted"}>
              {shown}
            </span>
          </div>

          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-brand-muted">
            <ChevronDownIcon className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
          </span>
        </button>

        {open && (
          <div
            ref={listRef}
            tabIndex={-1}
            onKeyDown={onListKeyDown}
            className={[
              "absolute left-0 right-0 z-50 mt-2",
              "overflow-hidden rounded-2xl border border-brand-line",
              "bg-white shadow-soft",
            ].join(" ")}
            role="listbox"
            aria-label={label}
          >
            <div className="max-h-64 overflow-auto p-2">
              {options.map((opt, idx) => {
                const selected = opt === value;
                const active = idx === activeIndex;

                return (
                  <button
                    key={opt}
                    type="button"
                    data-opt-idx={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => choose(opt)}
                    className={[
                      "flex w-full items-center justify-between gap-3",
                      "rounded-2xl px-4 py-3 text-sm",
                      "transition",
                      selected
                        ? "bg-brand-bg text-brand-ink"
                        : "text-brand-ink hover:bg-brand-bg",
                      active && !selected ? "ring-2 ring-brand-gold/20" : "",
                    ].join(" ")}
                    role="option"
                    aria-selected={selected}
                  >
                    <span className={selected ? "font-semibold" : "font-medium"}>
                      {opt}
                    </span>
                    {selected && (
                      <span className="text-brand-green">
                        <CheckIcon />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Field>
  );
}

export default function ContactForm() {
  const serviceOptions = useMemo(() => services.map((s: any) => s.title), []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(serviceOptions[0] ?? "");
  const [message, setMessage] = useState("");


  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const canSend =
    name.trim().length >= 2 &&
    isValidEmail(email) &&
    service.trim().length >= 2 &&
    message.trim().length >= 5;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("loading");
    setErrorMsg("");

    try {

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, website }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setService(serviceOptions[0] ?? "");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setErrorMsg("Falha de rede. Tente novamente.");
    }
  }

  return (
    <div className="rounded-[1.5rem] border border-brand-line bg-brand-bg p-6">
      <div className="rounded-[1.25rem] bg-white p-6 shadow-soft">
        <div className="text-base font-semibold text-brand-ink">Mensagem</div>
        <p className="mt-2 text-sm text-brand-muted">
          Preencha os campos abaixo e clique em <b>Enviar e-mail</b>.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Field label="Nome">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full rounded-2xl border border-brand-line bg-white px-5 py-4 text-sm outline-none shadow-soft transition hover:bg-brand-bg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            />
          </Field>

          <Field label="Email">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full rounded-2xl border border-brand-line bg-white px-5 py-4 text-sm outline-none shadow-soft transition hover:bg-brand-bg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            />
          </Field>

          <FancySelect
            label="Serviço"
            value={service}
            options={serviceOptions}
            onChange={setService}
            placeholder="Selecione um serviço"
          />

          <Field label="Mensagem">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva sua mensagem…"
              rows={5}
              className="w-full resize-none rounded-2xl border border-brand-line bg-white px-5 py-4 text-sm outline-none shadow-soft transition hover:bg-brand-bg focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30"
            />
          </Field>

          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {status === "success" && (
            <div className="rounded-2xl border border-brand-line bg-brand-bg p-4 text-sm text-brand-ink">
              ✅ E-mail enviado com sucesso!
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              ❌ {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSend || status === "loading"}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-brand-green px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Enviar e-mail"}
          </button>
        </form>
      </div>
    </div>
  );
}
