"use client";

type Step = {
  title: string;
  description: string;
};

function StepIcon({ index }: { index: number }) {

  const icons = [

    <path
      key="i0"
      d="M6 7.5h12v7.5a3 3 0 0 1-3 3H10l-4 2.2V7.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="none"
    />,

    <path
      key="i1"
      d="M4.5 7.5A2.5 2.5 0 0 1 7 5h3l1.4 1.7H17A2.5 2.5 0 0 1 19.5 9v7.5A2.5 2.5 0 0 1 17 19H7A2.5 2.5 0 0 1 4.5 16.5V7.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="none"
    />,

    <path
      key="i2"
      d="M20 7 10.5 16.5 4 10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />,
  ];

  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      {icons[index] ?? icons[0]}
    </svg>
  );
}

export default function HowItWorksSection({
  id = "como-funciona",
  title = "Como funciona",
  subtitle = "Simples, organizado e com acompanhamento.",
  steps = [
    {
      title: "Contato",
      description: "Você chama e explica o que precisa. Sem burocracia.",
    },
    {
      title: "Organização",
      description: "A gente orienta, coleta documentos e resolve o caminho.",
    },
    {
      title: "Acompanhamento",
      description: "Suporte contínuo, clareza e comunicação objetiva.",
    },
  ],
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  steps?: Step[];
}) {
  return (
    <section id={id} className="py-14">
      <div className="container-page">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-xs text-brand-muted">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            Processo
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-brand-muted sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => (
            <div
              key={s.title}
              className="
                group relative overflow-hidden rounded-[1.5rem]
                border border-brand-line bg-white p-6 shadow-soft
                transition hover:-translate-y-0.5 hover:shadow-md
              "
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-gold/70 via-brand-gold/20 to-transparent" />

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-bg text-brand-ink">
                    <StepIcon index={idx} />
                  </div>

                  <div className="text-xs font-semibold tracking-wide text-brand-muted">
                    ETAPA{" "}
                    <span className="text-brand-ink">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                <div className="rounded-full border border-brand-line bg-brand-bg px-3 py-1 text-xs font-semibold text-brand-ink">
                  {idx === 0 ? "Início" : idx === 1 ? "Meio" : "Final"}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-brand-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                {s.description}
              </p>

              <div className="mt-5 h-px w-full bg-brand-line/70" />

              <div className="mt-4 flex items-center justify-between text-xs text-brand-muted">
                <span>Atendimento humano</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-green" />
                  Organizado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
