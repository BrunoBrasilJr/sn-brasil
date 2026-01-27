"use client";

type Segment = { label: string };

function CheckMini() {
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

export default function SegmentsSection({
  id = "segmentos",
  title = "Segmentos atendidos",
  subtitle = "Atendemos diversos perfis de empresas.",
  segments = [
    { label: "Prestadores de serviço" },
    { label: "Comércio" },
    { label: "Construção civil" },
    { label: "Engenharia" },
    { label: "Pequenas e médias empresas" },
    { label: "Autônomos / profissionais liberais" },
  ],
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  segments?: Segment[];
}) {
  return (
    <section id={id} className="py-14">
      <div className="container-page">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-brand-muted">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            Atendimento
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-muted sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <div
              key={s.label}
              className="
                group flex items-center justify-between gap-4
                rounded-[1.25rem] border border-brand-line bg-white
                px-5 py-4 shadow-soft
                transition hover:-translate-y-0.5 hover:bg-brand-bg hover:shadow-md
              "
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                <span className="text-sm font-semibold text-brand-ink">
                  {s.label}
                </span>
              </div>


              <span className="grid h-9 w-9 place-items-center rounded-2xl border border-brand-line bg-white text-brand-muted transition group-hover:bg-white group-hover:text-brand-green">
                <CheckMini />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
