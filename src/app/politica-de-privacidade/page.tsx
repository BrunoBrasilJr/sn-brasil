import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export default function PoliticaDePrivacidadePage() {
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
            Privacidade
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Política de privacidade
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-muted sm:text-base">
            Transparência sobre como usamos informações enviadas por você ao entrar em contato com a {site.name}.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="rounded-[1.5rem] border border-brand-line bg-brand-bg p-6">
              <div className="text-sm font-semibold text-brand-ink">Aviso importante</div>
              <p className="mt-2 text-sm text-brand-muted">
                Este texto pode ser ajustado para refletir práticas específicas da empresa e recomenda-se revisão
                com um profissional responsável antes de publicação oficial.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-brand-line bg-white p-6 shadow-soft">
              <h2 className="text-base font-semibold text-brand-ink">1. Dados coletados</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Coletamos informações fornecidas por você em formulários e contato (como nome, e-mail, telefone/WhatsApp
                e mensagem) com a finalidade de responder sua solicitação.
              </p>

              <h2 className="mt-6 text-base font-semibold text-brand-ink">2. Finalidade</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Utilizamos os dados para atendimento, esclarecimento de dúvidas, envio de orientações e retorno de contato.
              </p>

              <h2 className="mt-6 text-base font-semibold text-brand-ink">3. Compartilhamento</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Não vendemos dados. Compartilhamento pode ocorrer apenas quando necessário para prestação do serviço
                ou por obrigação legal.
              </p>

              <h2 className="mt-6 text-base font-semibold text-brand-ink">4. Segurança</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Adotamos medidas para proteger informações contra acesso não autorizado. Ainda assim, nenhum sistema é 100% imune.
              </p>

              <h2 className="mt-6 text-base font-semibold text-brand-ink">5. Contato</h2>
              <p className="mt-2 text-sm text-brand-muted">
                Para dúvidas sobre privacidade, entre em contato pelo e-mail:{" "}
                <b className="text-brand-ink">{site.email}</b>.
              </p>

              <p className="mt-3 text-sm text-brand-muted">
                <b className="text-brand-ink">Controlador dos dados:</b>{" "}
                {site.legalName ? site.legalName : site.name}
                {site.cnpj ? ` — CNPJ ${site.cnpj}` : ""}.
              </p>

              <p className="mt-3 text-sm text-brand-muted">
                <b className="text-brand-ink">Endereço comercial:</b> {site.address} — {site.cityState}.
              </p>

              <div className="mt-6 h-px w-full bg-brand-line" />

              <p className="mt-4 text-xs text-brand-muted">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
