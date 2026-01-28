import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function TermosDeUsoPage() {
  return (
    <InstitutionalPageTemplate
      pillLabel="Termos"
      title="Termos de uso"
      description={
        <>
          Regras e condições para uso do site da{" "}
          <b className="text-brand-ink">{site.name}</b>.
        </>
      }
      notice={{
        title: "Aviso importante",
        badge: "Recomenda-se revisão jurídica",
        body: (
          <>
            Este documento é um modelo informativo. Ajuste conforme a realidade
            da empresa e revise com suporte jurídico antes de publicar.
          </>
        ),
      }}
      tocItems={[
        { href: "#aceite", label: "1. Aceite" },
        { href: "#uso", label: "2. Uso do site" },
        { href: "#conteudo", label: "3. Conteúdo e propriedade" },
        { href: "#responsabilidade", label: "4. Limitações" },
        { href: "#contato", label: "5. Contato" },
        { href: "#info", label: "Dados da empresa" },
        { href: "#atualizacao", label: "Última atualização" },
      ]}
      summaryItems={[
        { color: "green", text: "Uso do site implica aceite dos termos." },
        { color: "gold", text: "Conteúdo pode mudar sem aviso." },
      ]}
      sections={[
        {
          id: "aceite",
          title: "1. Aceite",
          body: <>Ao navegar neste site, você concorda com estes termos.</>,
        },
        {
          id: "uso",
          title: "2. Uso do site",
          body: <>Use de forma lícita e sem tentar burlar segurança.</>,
        },
        {
          id: "conteudo",
          title: "3. Conteúdo e propriedade",
          body: <>Textos e marca pertencem aos seus respectivos titulares.</>,
        },
        {
          id: "responsabilidade",
          title: "4. Limitações",
          body: <>As informações são gerais e não substituem orientação profissional.</>,
        },
        {
          id: "contato",
          title: "5. Contato",
          body: (
            <>
              Para dúvidas, fale com a gente:{" "}
              <b className="text-brand-ink">{site.email}</b>.
            </>
          ),
        },
      ]}
      infoBlock={{
        title: "Dados da empresa",
        cards: [
          {
            title: "Razão social",
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
            title: "Endereço",
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
