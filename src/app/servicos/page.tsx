"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services, site } from "@/lib/site";

function buildWhatsappLink(number: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

function serviceWhatsappMessage(title: string) {
  const base = "Olá! Gostaria de saber mais informações sobre";

  const map: Record<string, string> = {
    "Abertura de empresa": `${base} abertura de empresa.`,
    Regularização: `${base} regularização de empresa.`,
    Encerramento: `${base} encerramento de empresa.`,
    Aposentadoria: `${base} aposentadoria e orientações.`,
    "Créditos tributários": `${base} créditos tributários e possibilidades de recuperação.`,
    "Certificado digital": `${base} certificado digital.`,
  };

  return map[title] ?? `${base} "${title}".`;
}


function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "doc" | "chat" | "shield" | "check" | "arrow";
  className?: string;
}) {
  if (name === "doc") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3.8h7.5L19 8.3V20a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14.5 3.8V8.3H19" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 12h8M8 15.5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4.5 6.5A3 3 0 0 1 7.5 3.5h9A3 3 0 0 1 19.5 6.5v7A3 3 0 0 1 16.5 16.5H10l-4.5 3V6.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M8 8.8h8M8 11.8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.5 19 6.8v6.2c0 5-3.2 8.1-7 9.5-3.8-1.4-7-4.5-7-9.5V6.8L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.2 12.2 11 14l3.8-4.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "arrow") {
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

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
            background: "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.18), transparent 60%)",
          }}
        />
        <div
          className="absolute -right-44 -top-40 h-[560px] w-[560px] rounded-full opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(circle at 60% 40%, rgba(14,107,82,0.14), transparent 62%)",
          }}
        />
        <div
          className="absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(102,112,133,0.10), transparent 62%)",
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

export default function ServicosPage() {
  const defaultWhatsappHref = buildWhatsappLink(
    site.whatsappNumber,
    "Olá! Quero entender qual serviço faz mais sentido para minha empresa."
  );

  return (
    <PageBackground>
      <Header />

      <main>
        <section className="pt-10 sm:pt-14">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-4 py-2 text-xs font-medium text-brand-muted shadow-soft backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-brand-gold shadow-sm" />
                <span className="truncate">Serviços</span>
                <span className="text-brand-line">•</span>
                <span className="truncate">Catálogo e escopo</span>
              </div>

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
                Escolha com clareza. Contrate com segurança.
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base text-brand-muted sm:text-lg">
                Selecione um serviço e clique em <b>Mensagem</b>. A mensagem no WhatsApp já vai pronta, do
                jeitinho certo.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={defaultWhatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark sm:w-auto"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                {[
                  { title: "Escopo", sub: "o que inclui", icon: "doc" as const },
                  { title: "Direto", sub: "sem enrolação", icon: "chat" as const },
                  { title: "Seguro", sub: "processo guiado", icon: "shield" as const },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex h-full items-center justify-between gap-3 rounded-2xl border border-brand-line bg-white/80 p-4 shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-brand-bg hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-bg text-brand-ink">
                        <Icon name={item.icon} />
                      </div>

                      <div className="text-left leading-tight">
                        <div className="text-sm font-semibold text-brand-ink">{item.title}</div>
                        <div className="text-xs text-brand-muted">{item.sub}</div>
                      </div>
                    </div>

                    <div className="grid h-9 w-9 place-items-center rounded-2xl border border-brand-line bg-white text-brand-muted">
                      <Icon name="check" className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs text-brand-muted">{site.responseSLA ?? "Atendimento rápido e direto."}</p>
            </div>
          </div>

          <SectionDivider />
        </section>

        <section id="catalogo" className="pb-2">
          <div className="container-page">
            <div className="mb-10">
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Catálogo</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
                Serviços contábeis claros, sem complicação
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-brand-muted">
                Cards com escopo e exemplos do que normalmente está incluso. Se quiser, a gente adapta ao seu cenário.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s: any) => {
                const msg = serviceWhatsappMessage(s.title);
                const href = buildWhatsappLink(site.whatsappNumber, msg);

                return (
                  <article key={s.title} className="flex h-full flex-col rounded-2xl border border-brand-line bg-white shadow-soft">
                    <header className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-brand-ink">{s.title}</h3>

                        <span className="rounded-full border border-brand-line bg-brand-bg px-3 py-1 text-[11px] font-semibold text-brand-muted">
                          Serviço
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-brand-muted">{s.desc}</p>
                    </header>
                    <div className="h-px w-full bg-brand-line" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Inclui</div>

                      <ul className="mt-4 space-y-3 text-sm text-brand-muted">
                        {Array.isArray(s.includes) &&
                          s.includes.map((item: string) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-brand-green" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        <div className="h-px w-full bg-brand-line" />

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="text-xs text-brand-muted">Resposta rápida via WhatsApp</span>

                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                          >
                            Mensagem <Icon name="arrow" className="ml-2 h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <SectionDivider />
        </section>

        <section className="pb-16">
          <div className="container-page">
            <div className="relative mx-auto max-w-3xl text-center">
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-[220px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-60"
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,175,55,0.16), rgba(14,107,82,0.08), transparent 70%)",
                }}
              />

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                  background: "radial-gradient(900px 420px at 50% 0%, rgba(255,255,255,0.85), transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2 text-xs font-medium text-brand-muted shadow-soft backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-brand-gold" />
                  Dúvida rápida
                </div>

                <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                  Não sabe qual serviço faz sentido pra você?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">
                  Chama no WhatsApp. A gente entende seu cenário e orienta sem compromisso — rápido, humano e direto.
                </p>

                <div className="mt-7 flex justify-center">
                  <a
                    href={defaultWhatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-green px-8 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                  >
                    Falar com um contador agora
                  </a>
                </div>

                <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center justify-center gap-2 text-xs text-brand-muted sm:flex-row sm:gap-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-green" />
                    Atendimento humano
                  </span>

                  <span className="hidden h-3 w-px bg-brand-line sm:block" />

                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-gold" />
                    {site.responseSLA ?? "Respondemos em até 2 horas úteis."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageBackground>
  );
}
