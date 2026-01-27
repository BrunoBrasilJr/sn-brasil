"use client";

type Item = { title: string; subtitle: string; icon: "spark" | "bolt" | "shield" };

function Icon({ name }: { name: Item["icon"] }) {
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

export default function HeroValueProps({
  items = [
    { title: "Clareza", subtitle: "sem enrolação", icon: "spark" },
    { title: "Agilidade", subtitle: "no atendimento", icon: "bolt" },
    { title: "Segurança", subtitle: "no processo", icon: "shield" },
  ],
}: {
  items?: Item[];
}) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((i) => (
        <div
          key={i.title}
          className="
            group rounded-[1.5rem] border border-brand-line bg-white
            p-5 shadow-soft transition
            hover:-translate-y-0.5 hover:bg-brand-bg hover:shadow-md
          "
        >
          <div className="flex items-center justify-between">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-bg text-brand-ink">
              <Icon name={i.icon} />
            </div>

            <div className="rounded-full border border-brand-line bg-white px-3 py-1 text-xs font-semibold text-brand-muted">
              Diferencial
            </div>
          </div>

          <div className="mt-4 text-lg font-semibold text-brand-ink">
            {i.title}
          </div>
          <div className="mt-1 text-sm text-brand-muted">{i.subtitle}</div>

          <div className="mt-4 h-px w-full bg-brand-line/70" />

          <div className="mt-3 text-xs text-brand-muted">
            Atendimento com padrão SN Brasil
          </div>
        </div>
      ))}
    </div>
  );
}
