"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { partners, segments, services, site } from "@/lib/site";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { PENDING_HASH_KEY } from "@/components/SmartLink";

function buildWhatsappLink(number: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

function MiniIcon({ name }: { name: "spark" | "bolt" | "shield" | "check" }) {
  if (name === "spark") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l1.2 4.3L17.5 9l-4.3 1.2L12 14.5l-1.2-4.3L6.5 9l4.3-1.7L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5 19 6.8v6.2c0 5-3.2 8.1-7 9.5-3.8-1.4-7-4.5-7-9.5V6.8L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function PageBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate min-h-screen bg-[#FAFBFC]">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.18), transparent 60%)",
          }}
        />
        <div
          className="absolute -right-44 -top-40 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(14,107,82,0.14), transparent 62%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(102,112,133,0.10), transparent 62%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(11,18,32,0.20) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            backgroundPosition: "0 0",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/60" />
      </div>

      {children}
    </div>
  );
}

function SectionDivider() {
  return (
    <div className="container-page">
      <div className="my-10 sm:my-14">
        <div className="relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-line to-transparent" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.22), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function HomeClient() {
  const whatsappHref = buildWhatsappLink(site.whatsappNumber, site.whatsappMessage);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SCROLL_KEY = "sn_scroll_y_v3";

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    try {
      const pending = sessionStorage.getItem(PENDING_HASH_KEY);
      if (pending) {
        sessionStorage.removeItem(PENDING_HASH_KEY);
        setTimeout(() => {
          const el = document.getElementById(pending);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    } catch {}

    let raf = 0;
    const save = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        try {
          sessionStorage.setItem(SCROLL_KEY, String(window.scrollY || 0));
        } catch {}
      });
    };

    window.addEventListener("scroll", save, { passive: true });

    const restore = () => {
      try {
        const pending = sessionStorage.getItem(PENDING_HASH_KEY);
        if (pending) return;

        const raw = sessionStorage.getItem(SCROLL_KEY);
        const y = raw ? Number(raw) : 0;

        if (!Number.isFinite(y) || y <= 0) return;

        window.scrollTo({ top: y, left: 0, behavior: "auto" });
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: y, left: 0, behavior: "auto" });
        });
        window.setTimeout(() => {
          window.scrollTo({ top: y, left: 0, behavior: "auto" });
        }, 140);
      } catch {}
    };

    restore();

    return () => {
      window.removeEventListener("scroll", save);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const heroContainer = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const heroBadges = useMemo(
    () => [
      { title: "Clareza", sub: "sem enrolação", icon: "spark" as const },
      { title: "Agilidade", sub: "no atendimento", icon: "bolt" as const },
      { title: "Segurança", sub: "no processo", icon: "shield" as const },
    ],
    []
  );

  const scaleMap: Record<string, number> = {
    "Nota Fiscal Paulista": 1.45,
    "SEFAZ-SP": 2.15,
    "Central das Certidões": 1.45,
    "Receita Federal": 1.35,
    "Cartório 24 Horas": 1.35,
    "Simples Nacional": 1.35,
  };

  const partnersMain = useMemo(() => partners.slice(0, Math.max(0, partners.length - 3)), []);
  const partnersBottom = useMemo(() => partners.slice(-3), []);

  return (
    <PageBackground>
      <Header />

      <main>
        <section id="inicio" className="pt-8 sm:pt-12">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
              <motion.div className="flex flex-col" variants={heroContainer} initial="hidden" animate="show">
                <motion.div variants={heroItem} className="flex">
                  <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand-line bg-white/80 px-4 py-2 text-xs font-medium text-brand-muted backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-brand-gold shadow-sm" />
                    <span className="truncate">Consultoria contábil</span>
                    <span className="text-brand-line">•</span>
                    <span className="truncate">{site.cityState}</span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={heroItem}
                  className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink sm:text-5xl"
                >
                  Contabilidade que te deixa em paz pra focar no seu negócio.
                </motion.h1>

                <motion.p variants={heroItem} className="mt-4 text-base text-brand-muted sm:text-lg">
                  Abertura, regularização e rotina contábil com atendimento humano, processo claro e acompanhamento real.
                </motion.p>

                <motion.div variants={heroItem} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                  >
                    Falar com especialista
                  </a>

                  <a
                    href="#servicos"
                    className="inline-flex items-center justify-center rounded-xl border border-brand-line bg-white/80 px-5 py-3 text-sm font-semibold text-brand-ink shadow-soft backdrop-blur transition hover:bg-brand-bg"
                  >
                    Ver serviços
                  </a>
                </motion.div>

                <motion.div variants={heroItem} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {heroBadges.map((i) => (
                    <div
                      key={i.title}
                      className="rounded-[1.25rem] border border-brand-line bg-white/80 p-4 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-brand-bg hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-bg text-brand-ink">
                          <MiniIcon name={i.icon} />
                        </div>

                        <div className="rounded-full border border-brand-line bg-white px-3 py-1 text-[11px] font-semibold text-brand-muted">
                          Diferencial
                        </div>
                      </div>

                      <div className="mt-4 text-base font-semibold text-brand-ink">{i.title}</div>
                      <div className="mt-1 text-sm text-brand-muted">{i.sub}</div>

                      <div className="mt-4 h-px w-full bg-brand-line" />
                      <div className="mt-3 text-xs text-brand-muted">Atendimento com padrão SN Brasil</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
                className="h-full rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur"
              >
                <div className="flex h-full flex-col rounded-[1.25rem] bg-white/85 p-6">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-white">
                      <Image src={site.logo.src} alt={site.logo.alt} fill className="object-contain" priority />
                    </div>

                    <div className="leading-tight">
                      <div className="text-sm font-semibold text-brand-ink">{site.name}</div>
                      <div className="text-xs text-brand-muted">{site.cityState}</div>
                    </div>
                  </div>

                  <div className="mt-5 text-sm font-semibold text-brand-ink">O que você resolve aqui</div>
                  <ul className="mt-3 space-y-3 text-sm text-brand-muted">
                    <li className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                      Abertura de empresa com orientação completa
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                      Regularização e organização para evitar multas
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                      Encerramento com segurança e transparência
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                      Certificado digital e suporte no dia a dia
                    </li>
                  </ul>

                  <div className="mt-6 grid gap-2 rounded-xl border border-brand-line bg-brand-bg/70 p-4 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-brand-muted">Email</span>
                      <span className="font-semibold text-brand-ink">{site.email}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-brand-muted">Telefones</span>
                      <span className="font-semibold text-brand-ink">{site.phones.join(" • ")}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <a
                      href="#contato"
                      className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-brand-line bg-white/90 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-bg"
                    >
                      Ver contato
                    </a>

                    <p className="mt-3 text-center text-xs text-brand-muted">
                      {site.responseSLA ?? "Atendimento rápido e direto."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <SectionDivider />
        </section>

        <section className="pb-2">
          <div className="container-page">
            <Reveal>
              <SectionTitle
                kicker="SN Brasil"
                title="Quem somos"
                subtitle="Contabilidade com presença real, atendimento próximo e responsabilidade técnica."
              />
            </Reveal>

            <div className="mt-8 grid gap-4 lg:grid-cols-3 items-stretch">
              <Reveal>
                <div className="h-full flex flex-col rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-base font-semibold text-brand-ink">Atuação e foco</div>
                  <p className="mt-2 text-sm text-brand-muted">
                    A SN Brasil Contábil atua com orientação clara para quem quer abrir, regularizar ou manter a rotina contábil
                    em dia — sem burocracia desnecessária.
                  </p>

                  <div className="mt-auto">
                    <div className="mt-5 h-px w-full bg-brand-line" />
                    <div className="mt-4 text-sm text-brand-muted">
                      <span className="font-semibold text-brand-ink">Atendimento:</span>{" "}
                      {site.businessHours ?? "Seg a Sex, 08:00 às 18:00"}
                    </div>
                    <div className="mt-1 text-sm text-brand-muted">
                      <span className="font-semibold text-brand-ink">Local:</span> {site.cityState}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="h-full flex flex-col rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-base font-semibold text-brand-ink">Responsabilidade técnica</div>
                  <p className="mt-2 text-sm text-brand-muted">
                    Transparência e acompanhamento do começo ao fim. Quando você chama, você fala com gente de verdade.
                  </p>

                  <div className="mt-auto">
                    <div className="mt-5 h-px w-full bg-brand-line" />
                    <div className="mt-4 space-y-2 text-sm text-brand-muted">
                      {site.responsibleName ? (
                        <div>
                          <span className="font-semibold text-brand-ink">Responsável:</span> {site.responsibleName}
                        </div>
                      ) : (
                        <div>
                          <span className="font-semibold text-brand-ink">Responsável:</span> Contador(a) registrado(a) no CRC
                        </div>
                      )}

                      {site.responsibleCRC && (
                        <div>
                          <span className="font-semibold text-brand-ink">CRC:</span> {site.responsibleCRC}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="h-full flex flex-col rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-base font-semibold text-brand-ink">Dados institucionais</div>
                  <p className="mt-2 text-sm text-brand-muted">Informações importantes para reforçar segurança e conformidade.</p>

                  <div className="mt-auto">
                    <div className="mt-5 h-px w-full bg-brand-line" />
                    <div className="mt-4 space-y-2 text-sm text-brand-muted">
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
                      <div>
                        <span className="font-semibold text-brand-ink">Canal:</span> WhatsApp e e-mail
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <SectionDivider />
        </section>

        <section id="servicos" className="pb-2">
          <div className="container-page">
            <Reveal>
              <SectionTitle
                kicker="Serviços"
                title="O que a gente faz por você"
                subtitle="Serviços claros, objetivos e organizados."
              />
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s: any, i: number) => (
                <Reveal key={s.title} delay={Math.min(i * 0.03, 0.18)}>
                  <div className="flex h-full flex-col rounded-[1.5rem] border border-brand-line bg-white/85 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="text-base font-semibold text-brand-ink">{s.title}</div>
                    <p className="mt-2 text-sm text-brand-muted">{s.desc}</p>

                    <div className="mt-auto">
                      <div className="mt-5 h-px w-full bg-brand-line" />
                      <div className="mt-4 text-xs text-brand-muted">Saiba mais na página de serviços.</div>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.12}>
                <div className="lg:col-start-1">
                  <a
                    href="/servicos"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-brand-line bg-white/85 px-6 py-4 text-sm font-semibold text-brand-ink shadow-soft backdrop-blur transition hover:bg-brand-bg"
                  >
                    Ver página de serviços
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <SectionDivider />
        </section>

        <section id="como-funciona" className="pb-2">
          <div className="container-page">
            <Reveal>
              <SectionTitle kicker="Processo" title="Como funciona" subtitle="Simples, organizado e com acompanhamento." />
            </Reveal>

            <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:items-stretch">
              {[
                { step: "01", title: "Contato", desc: "Você chama e explica o que precisa. Sem burocracia." },
                { step: "02", title: "Organização", desc: "A gente orienta, coleta documentos e resolve o caminho." },
                { step: "03", title: "Acompanhamento", desc: "Suporte contínuo, clareza e comunicação objetiva." },
              ].map((item, idx) => (
                <Reveal key={item.step} delay={idx * 0.05}>
                  <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-gold/70 via-brand-gold/20 to-transparent" />

                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-white px-3 py-1 text-xs font-semibold text-brand-ink border border-brand-line">
                            {item.step}
                          </div>
                          <div className="text-xs text-brand-muted">Etapa</div>
                        </div>

                        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-brand-line bg-white text-brand-ink">
                          <MiniIcon name={idx === 0 ? "spark" : idx === 1 ? "bolt" : "shield"} />
                        </div>
                      </div>

                      <div className="mt-5">
                        <div className="text-lg font-semibold text-brand-ink">{item.title}</div>
                        <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
                      </div>

                      <div className="mt-auto">
                        <div className="mt-5 h-px w-full bg-brand-line" />
                        <div className="mt-4 flex items-center justify-between text-xs text-brand-muted">
                          <span>Atendimento humano</span>
                          <span className="inline-flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-brand-green" />
                            Organizado
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <SectionDivider />
        </section>

        <section id="segmentos" className="pb-2">
          <div className="container-page">
            <Reveal>
              <SectionTitle kicker="Atendimento" title="Segmentos atendidos" subtitle="Atendemos diversos perfis de empresas." />
            </Reveal>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {segments.map((seg, i) => (
                <Reveal key={seg} delay={Math.min(i * 0.03, 0.18)}>
                  <div className="group flex items-center justify-between rounded-[1.25rem] border border-brand-line bg-white/85 px-5 py-4 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-brand-bg hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                      <div className="text-sm font-semibold text-brand-ink">{seg}</div>
                    </div>

                    <div className="grid h-9 w-9 place-items-center rounded-2xl border border-brand-line bg-white text-brand-muted transition group-hover:text-brand-green">
                      <MiniIcon name="check" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <SectionDivider />
        </section>

        <section id="contato" className="pb-6">
          <div className="container-page">
            <Reveal>
              <SectionTitle kicker="Contato" title="Fale com a gente" subtitle="Atendimento direto, humano e organizado." />
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Reveal>
                <div className="rounded-[1.5rem] border border-brand-line bg-white/85 shadow-soft backdrop-blur">
                  <div className="p-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="rounded-[1.5rem] border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur">
                  <div className="text-base font-semibold text-brand-ink">Informações</div>
                  <p className="mt-2 text-sm text-brand-muted">
                    Você também pode entrar em contato por e-mail, telefone ou WhatsApp.
                  </p>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="rounded-xl border border-brand-line bg-white/85 p-4">
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Email</div>
                      <div className="mt-1 font-semibold text-brand-ink">{site.email}</div>
                    </div>

                    <div className="rounded-xl border border-brand-line bg-white/85 p-4">
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Telefones</div>
                      <div className="mt-1 font-semibold text-brand-ink">{site.phones.join(" • ")}</div>
                    </div>

                    <div className="rounded-xl border border-brand-line bg-white/85 p-4">
                      <div className="text-xs uppercase tracking-wide text-brand-muted">Endereço</div>
                      <div className="mt-1 font-semibold text-brand-ink">{site.address}</div>
                      <div className="mt-1 text-xs text-brand-muted">{site.cityState}</div>
                    </div>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-green px-6 py-4 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                    >
                      Chamar no WhatsApp
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <SectionDivider />
        </section>
        <section id="parceiros" className="pb-16">
          <div className="container-page">
            <Reveal>
              <SectionTitle
                kicker="Parcerias"
                title="Parcerias e sistemas oficiais"
                subtitle="Utilizamos plataformas e órgãos reconhecidos para garantir segurança e conformidade."
              />
            </Reveal>

            <div className="mt-10">
              <div
                className="
                  mx-auto grid w-full max-w-6xl
                  grid-cols-[repeat(auto-fit,minmax(150px,1fr))]
                  place-items-center
                  gap-x-12 gap-y-12
                "
              >
                {partnersMain.map((p, i) => {
                  const scale = scaleMap[p.name] ?? 1;

                  return (
                    <Reveal key={p.name} delay={Math.min(i * 0.02, 0.2)} y={10}>
                      <div className="group w-[170px] md:w-[190px]" title={p.name}>
                        <div className="relative h-14 w-full md:h-16">
                          <div className="absolute inset-0 transition-all duration-200 ease-out group-hover:-translate-y-1">
                            <div
                              className="absolute inset-0 grayscale opacity-80 transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                              style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
                            >
                              <Image src={p.logoSrc} alt={p.name} fill className="object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {partnersBottom.length > 0 && (
                <div className="mt-12">
                  <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-16 gap-y-10">
                    {partnersBottom.map((p, i) => {
                      const scale = scaleMap[p.name] ?? 1;

                      return (
                        <Reveal key={p.name} delay={0.12 + i * 0.03} y={10}>
                          <div className="group w-[190px] md:w-[220px]" title={p.name}>
                            <div className="relative h-14 w-full md:h-16">
                              <div className="absolute inset-0 transition-all duration-200 ease-out group-hover:-translate-y-1">
                                <div
                                  className="absolute inset-0 grayscale opacity-80 transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                                  style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
                                >
                                  <Image src={p.logoSrc} alt={p.name} fill className="object-contain" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageBackground>
  );
}
