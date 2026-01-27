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
    "Regularização": `${base} regularização de empresa.`,
    "Encerramento": `${base} encerramento de empresa.`,
    "Aposentadoria": `${base} aposentadoria e orientações.`,
    "Créditos tributários": `${base} créditos tributários e possibilidades de recuperação.`,
    "Certificado digital": `${base} certificado digital.`,
  };

 
  return map[title] ?? `${base} "${title}".`;
}

function MiniIcon({ name }: { name: "check" | "arrow" }) {
  if (name === "check") {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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

export default function ServicosPage() {
  return (
    <main>
      <Header />

      <section className="bg-white">
        <div className="container-page pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-line bg-brand-bg px-3 py-2 text-sm font-semibold text-brand-ink hover:bg-white"
            >
              <span className="text-brand-muted">←</span> Voltar
            </a>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-brand-bg px-3 py-1 text-sm text-brand-muted">
            <span className="h-2 w-2 rounded-full bg-brand-gold" />
            Serviços
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Serviços contábeis
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-muted sm:text-base">
            Selecione um serviço e clique em <b>Solicitar orientação</b>. A mensagem no WhatsApp já vai pronta, do jeitinho certo.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s: any) => {
              const msg = serviceWhatsappMessage(s.title);
              const href = buildWhatsappLink(site.whatsappNumber, msg);

              return (
                <div
                  key={s.title}
                  className="flex h-full flex-col rounded-[1.5rem] border border-brand-line bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-brand-ink">{s.title}</div>
                      <p className="mt-2 text-sm text-brand-muted">{s.desc}</p>

                      {Array.isArray(s.includes) && s.includes.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm text-brand-muted">
                          {s.includes.map((item: string) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-brand-line bg-brand-bg text-brand-ink">
                      <MiniIcon name="check" />
                    </div>
                  </div>

                  <div className="mt-5 h-px w-full bg-brand-line" />

                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-green-dark"
                  >
                    Solicitar orientação <MiniIcon name="arrow" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
