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
          Condições gerais para uso do site da{" "}
          <b className="text-brand-ink">{site.name}</b>, incluindo regras de navegação,
          responsabilidade pelo conteúdo e canais de contato.
        </>
      }
      notice={{
        title: "Aviso importante",
        badge: "Recomenda-se revisão jurídica",
        content: (
          <>
            Este texto é um modelo institucional e pode (e deve) ser ajustado para refletir a realidade
            da empresa. Antes de publicar oficialmente, recomendamos revisão com um profissional responsável.
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
          {
            label: "Ao navegar no site, você concorda com estes Termos de Uso.",
            dotClassName: "bg-brand-green",
          },
          {
            label: "O conteúdo é informativo e não substitui orientação profissional no seu caso específico.",
            dotClassName: "bg-brand-gold",
          },
        ],
      }}
      sections={[
        {
          id: "aceite",
          title: "1. Aceite",
          content: (
            <>
              Ao acessar e utilizar este site, você declara que leu e concorda com estes Termos de Uso. Se
              não concordar com alguma condição, recomendamos interromper a navegação.
            </>
          ),
        },
        {
          id: "uso",
          title: "2. Uso do site",
          content: (
            <>
              Você se compromete a utilizar o site de forma lícita e respeitosa, sem:
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>tentar explorar falhas, violar medidas de segurança ou obter acesso não autorizado;</li>
                <li>realizar automações abusivas (ex.: varreduras, ataques, scraping indevido);</li>
                <li>praticar atos que prejudiquem a disponibilidade, integridade ou desempenho da plataforma.</li>
              </ul>
            </>
          ),
        },
        {
          id: "conteudo",
          title: "3. Conteúdo e propriedade",
          content: (
            <>
              O conteúdo exibido (textos, identidade visual, marca e materiais) pertence à{" "}
              <b className="text-brand-ink">{site.name}</b> ou é utilizado com autorização/licença. É vedada
              a reprodução, distribuição ou modificação sem consentimento prévio, salvo quando permitido por lei.
            </>
          ),
        },
        {
          id: "responsabilidade",
          title: "4. Responsabilidade",
          content: (
            <>
              As informações publicadas no site têm caráter geral e informativo. Como regras e procedimentos podem
              variar conforme o caso, a orientação formal deve ser confirmada no atendimento. A{" "}
              <b className="text-brand-ink">{site.name}</b> não se responsabiliza por decisões tomadas exclusivamente
              com base no conteúdo do site, sem análise do cenário específico.
            </>
          ),
        },
        {
          id: "contato",
          title: "5. Contato",
          content: (
            <>
              Para dúvidas sobre estes Termos, fale com a gente pelo e-mail{" "}
              <b className="text-brand-ink">{site.email}</b>.
            </>
          ),
        },
        {
          id: "alteracoes",
          title: "6. Alterações",
          content: (
            <>
              Estes Termos podem ser atualizados a qualquer momento para refletir melhorias no site, mudanças em
              serviços e adequações legais. A data da última atualização ficará indicada ao final desta página.
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
                <b className="text-brand-ink">{site.legalName ? site.legalName : site.name}</b>
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
        footer: <>Termos de uso • atualizado em {updatedAt}</>,
      }}
      updatedAt={updatedAt}
    />
  );
}
