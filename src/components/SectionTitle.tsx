type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ kicker, title, subtitle }: Props) {
  return (
    <div className="mb-8">
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-3 py-1 text-sm text-brand-muted">
          <span className="h-2 w-2 rounded-full bg-brand-gold" />
          <span>{kicker}</span>
        </div>
      ) : null}

      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-2 max-w-2xl text-base text-brand-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
