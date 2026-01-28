import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function PoliticaDePrivacidadePage() {
  return (
    <InstitutionalPageTemplate
      pillLabel="Privacidade"
      title="Política de privacidade"
      description={
        <>
          Transparência sobre como usamos informações enviadas por você ao entrar
          em contato com a <b className="text-brand-ink">{site.name}</b>.
        </>
      }
      notice={{
        title: "Aviso importante",
        badge: "Recomenda-se revisão jurídica",
        body: (
          <>
            Este texto pode ser ajustado para refletir práticas específicas da
            empresa e recomenda-se revisão com um profissional responsável antes
            de publicação oficial.
          </>
        ),
      }}
      tocItems={[
        { href: "#dados", label: "1. Dados coletados" },
        { href: "#finalidade", label: "2. Finalidade" },
        { href: "#compartilhamento", label: "3. Compartilhamento" },
        { href: "#seguranca", label: "4. Segurança" },
        { href: "#contato", label: "5. Contato" },
        { href: "#info", label: "Controlador e endereço" },
        { href: "#atualizacao", label: "Última atualização" },
      ]}
      summaryItems={[
        { color: "green", text: "Usamos seus dados só para atendimento e retorno." },
        { color: "gold", text: "Não vendemos dados." },
      ]}
      sections={[
        {
          id: "dados",
          title: "1. Dados coletados",
          body: (
            <>
              Coletamos informações fornecidas por você em formulários e contato
              (como nome, e-mail, telefone/WhatsApp e mensagem) com a finalidade
              de responder sua solicitação.
            </>
          ),
        },
        {
          id: "finalidade",
          title: "2. Finalidade",
          body: (
            <>
              Utilizamos os dados para atendimento, esclarecimento de dúvidas,
              envio de orientações e retorno de contato.
            </>
          ),
        },
        {
          id: "compartilhamento",
          title: "3. Compartilhamento",
          body: (
            <>
              Não vendemos dados. Compartilhamento pode ocorrer apenas quando
              necessário para prestação do serviço ou por obrigação legal.
            </>
          ),
        },
        {
          id: "seguranca",
          title: "4. Segurança",
          body: (
            <>
              Adotamos medidas para proteger informações contra acesso não
              autorizado. Ainda assim, nenhum sistema é 100% imune.
            </>
          ),
        },
        {
          id: "contato",
          title: "5. Contato",
          body: (
            <>
              Para dúvidas sobre privacidade, entre em contato pelo e-mail:{" "}
              <b className="text-brand-ink">{site.email}</b>.
            </>
          ),
        },
      ]}
      infoBlock={{
        title: "Informações do controlador",
        cards: [
          {
            title: "Controlador dos dados",
            body: (
              <>
                <b className="text-brand-ink">
                  {site.legalName ? site.legalName : site.name}
                </b>
                {site.cnpj ? ` — CNPJ ${site.cnpj}` : ""}.
              </>
            ),
          },
          {
            title: "Endereço comercial",
            body: (
              <>
                <b className="text-brand-ink">{site.address}</b> — {site.cityState}.
              </>
            ),
          },
        ],
      }}
    />
  );
}
