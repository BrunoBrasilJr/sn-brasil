import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

type TocItem = {
  href: string; // ex: "#dados"
  label: string; // ex: "1. Dados coletados"
};

type SummaryBullet = {
  label: string;
  dotClassName?: string; // ex: "bg-brand-green"
};

type SectionItem = {
  id: string; // ex: "dados"
  title: string;
  content: React.ReactNode;
};

type ControllerCard = {
  title: string;
  content: React.ReactNode;
};

type InstitutionalPageTemplateProps = {
  pillLabel: string;
  title: string;
  description: React.ReactNode;

  notice?: {
    title: string;
    badge?: string;
    content: React.ReactNode;
  };

  toc?: {
    title?: string;
    items: TocItem[];
  };

  summary?: {
    title?: string;
    bullets: SummaryBullet[];
  };

  sections: SectionItem[];

  controller?: {
    eyebrow?: string; // ex: "Informações do controlador"
    cards: [ControllerCard, ControllerCard]; // 2 colunas
    footer?: React.ReactNode; // ex: ultima atualização + tag
  };

  updatedAt?: string; // se quiser forçar
};

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
            backgroundImage:
              "radial-gradient(rgba(11,18,32,0.20) 1px, transparent 1px)",
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
              background:
                "radial-gradient(circle, rgba(212,175,55,0.22), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white/80 px-4 py-2 text-xs font-medium text-brand-muted shadow-soft backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-brand-gold shadow-sm" />
      <span className="truncate">{label}</span>
    </div>
  );
}

function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="rounded-2xl border border-brand-line bg-white/80 p-6 shadow-soft backdrop-blur"
      aria-label={title}
    >
      <h2 className="text-base font-semibold text-brand-ink">{title}</h2>
      <div className="mt-2 text-sm leading-relaxed text-brand-muted">
        {children}
      </div>
    </section>
  );
}

function TocLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border border-transparent px-3 py-2 text-sm text-brand-muted transition hover:border-brand-line hover:bg-white/70 hover:text-brand-ink"
    >
      {children}
    </a>
  );
}

export default function InstitutionalPageTemplate({
  pillLabel,
  title,
  description,
  notice,
  toc,
  summary,
  sections,
  controller,
  updatedAt,
}: InstitutionalPageTemplateProps) {
  const finalUpdatedAt =
    updatedAt ?? new Date().toLocaleDateString("pt-BR");

  return (
    <PageBackground>
      <main>
        <Header />

        {/* HERO */}
        <section className="pt-10 sm:pt-14">
          <div className="container-page">
            <div className="mx-auto max-w-5xl">
              <Pill label={pillLabel} />

              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
                {title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-brand-muted sm:text-base">
                {description}
              </p>

              {notice && (
                <div className="mt-8 rounded-2xl border border-brand-line bg-brand-bg/70 p-5 shadow-soft">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm font-semibold text-brand-ink">
                      {notice.title}
                    </div>

                    {notice.badge && (
                      <span className="inline-flex w-fit items-center rounded-full border border-brand-line bg-white/70 px-3 py-1 text-[11px] font-semibold text-brand-muted">
                        {notice.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-sm text-brand-muted">
                    {notice.content}
                  </div>
                </div>
              )}
            </div>
          </div>

          <SectionDivider />
        </section>

        {/* CONTEÚDO */}
        <section className="pb-16">
          <div className="container-page">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_1fr] lg:gap-8">
              {/* ASIDE */}
              <aside className="lg:sticky lg:top-24 lg:self-start">
                {toc && (
                  <div className="rounded-2xl border border-brand-line bg-white/70 p-4 shadow-soft backdrop-blur">
                    <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                      {toc.title ?? "Nesta página"}
                    </div>

                    <nav className="mt-1 space-y-1">
                      {toc.items.map((item) => (
                        <TocLink key={item.href} href={item.href}>
                          {item.label}
                        </TocLink>
                      ))}
                    </nav>
                  </div>
                )}

                {summary && (
                  <div className={`${toc ? "mt-4" : ""} rounded-2xl border border-brand-line bg-white/70 p-4 shadow-soft backdrop-blur`}>
                    <div className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                      {summary.title ?? "Em resumo"}
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-brand-muted">
                      {summary.bullets.map((b, idx) => (
                        <li key={`${b.label}-${idx}`} className="flex items-start gap-3">
                          <span
                            className={`mt-2 h-2 w-2 rounded-full ${b.dotClassName ?? "bg-brand-green"}`}
                          />
                          <span>{b.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>

              {/* MAIN */}
              <div className="space-y-4">
                {sections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="scroll-mt-28">
                    <MiniCard title={sec.title}>{sec.content}</MiniCard>
                  </div>
                ))}

                {/* CONTROLADOR (opcional) */}
                {controller && (
                  <div
                    className="scroll-mt-28 rounded-2xl border border-brand-line bg-white/70 p-6 shadow-soft backdrop-blur"
                    id="controlador"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
                      {controller.eyebrow ?? "Informações do controlador"}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {controller.cards.map((card) => (
                        <div
                          key={card.title}
                          className="rounded-2xl border border-brand-line bg-white/80 p-5"
                        >
                          <div className="text-sm font-semibold text-brand-ink">
                            {card.title}
                          </div>
                          <div className="mt-2 text-sm text-brand-muted">
                            {card.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 h-px w-full bg-brand-line" />

                    <div
                      id="atualizacao"
                      className="mt-4 flex flex-col gap-1 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span>Última atualização: {finalUpdatedAt}</span>
                      {controller.footer ? (
                        <span className="text-brand-muted/80">{controller.footer}</span>
                      ) : (
                        <span className="text-brand-muted/80">
                          Documento informativo • sujeito a revisão
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* FALLBACK atualização (se não tiver controlador) */}
                {!controller && (
                  <div className="pt-2 text-xs text-brand-muted">
                    Última atualização: {finalUpdatedAt}
                  </div>
                )}

                {/* Contato rápido padrão (bem discreto) */}
                <div className="rounded-2xl border border-brand-line bg-white/60 p-5 text-sm text-brand-muted shadow-soft backdrop-blur">
                  Se tiver qualquer dúvida, fala com a{" "}
                  <b className="text-brand-ink">{site.name}</b> em{" "}
                  <b className="text-brand-ink">{site.email}</b>.
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
