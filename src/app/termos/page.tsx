import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function TermosPage() {
  const updatedAt = new Date().toLocaleDateString("pt-BR");

  return (
    <InstitutionalPageTemplate
      pillLabel="Termos"
      title="Termos de uso"
      description={
        <>
          Regras básicas de utilização do site da{" "}
          <b className="text-brand-ink">{site.name}</b>, incluindo responsabilidade,
          conteúdo e forma de contato.
        </>
      }
      notice={{
        title: "Aviso importante",
        badge: "Recomenda-se revisão jurídica",
        content: (
          <>
            Este texto é um modelo institucional e pode (e deve) ser ajustado para refletir a realidade
            da empresa. Se for publicar de forma oficial, revise com um profissional responsável.
          </>
        ),
      }}
      toc={{
        items: [
          { href: "#aceite", label: "1. Aceite" },
          { href: "#uso", label: "2. Uso do site" },
          { href: "#conteudo", label: "3. Conteúdo e propriedade" },
          { href: "#responsabilidade", label: "4. Responsabilidade" },
          { href: "#contato", label: "5. Contato" },
          { href: "#alteracoes", label: "6. Alterações" },
          { href: "#controlador", label: "Controlador e endereço" },
          { href: "#atualizacao", label: "Última atualização" },
        ],
      }}
      summary={{
        bullets: [
          { label: "O uso do site implica concordância com estes termos.", dotClassName: "bg-brand-green" },
          { label: "Conteúdos são informativos; confirmações ocorrem no atendimento.", dotClassName: "bg-brand-gold" },
        ],
      }}
      sections={[
        {
          id: "aceite",
          title: "1. Aceite",
          content: (
            <>
              Ao acessar e utilizar este site, você concorda com estes Termos de Uso. Se não concordar,
              recomendamos não utilizar o site.
            </>
          ),
        },
        {
          id: "uso",
          title: "2. Uso do site",
          content: (
            <>
              Você se compromete a utilizar o site de forma lícita e respeitosa, sem tentar explorar falhas,
              automatizar acessos indevidos, ou praticar qualquer ato que prejudique a disponibilidade e
              segurança da plataforma.
            </>
          ),
        },
        {
          id: "conteudo",
          title: "3. Conteúdo e propriedade",
          content: (
            <>
              O conteúdo exibido (textos, identidade visual, marca e materiais) pertence à{" "}
              <b className="text-brand-ink">{site.name}</b> ou é usado com autorização. É proibida a reprodução
              sem consentimento, salvo quando permitido por lei.
            </>
          ),
        },
        {
          id: "responsabilidade",
          title: "4. Responsabilidade",
          content: (
            <>
              Informações no site podem ter caráter introdutório/informativo. Decisões finais e orientações
              formais devem ser confirmadas pelo atendimento. A{" "}
              <b className="text-brand-ink">{site.name}</b> não se responsabiliza por danos decorrentes do uso
              das informações sem validação adequada ao caso concreto.
            </>
          ),
        },
        {
          id: "contato",
          title: "5. Contato",
          content: (
            <>
              Para dúvidas sobre estes Termos, entre em contato pelo e-mail{" "}
              <b className="text-brand-ink">{site.email}</b>.
            </>
          ),
        },
        {
          id: "alteracoes",
          title: "6. Alterações",
          content: (
            <>
              Estes Termos podem ser atualizados a qualquer momento para refletir melhorias no serviço e
              adequações legais. A data da última atualização fica no final desta página.
            </>
          ),
        },
      ]}
      controller={{
        cards: [
          {
            title: "Controlador dos dados",
            content: (
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
            content: (
              <>
                <b className="text-brand-ink">{site.address}</b> — {site.cityState}.
              </>
            ),
          },
        ],
        footer: <>Termos de uso • versão {updatedAt}</>,
      }}
      updatedAt={updatedAt}
    />
  );
}
