import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function CookiesPage() {
  return (
    <InstitutionalPageTemplate
      pillLabel="Cookies"
      title="Política de cookies"
      description={
        <>
          Entenda como o site da <b className="text-brand-ink">{site.name}</b>{" "}
          usa cookies e tecnologias semelhantes.
        </>
      }
      tocItems={[
        { href: "#o-que-sao", label: "1. O que são cookies" },
        { href: "#para-que", label: "2. Para que usamos" },
        { href: "#tipos", label: "3. Tipos de cookies" },
        { href: "#controle", label: "4. Como controlar" },
        { href: "#contato", label: "5. Contato" },
        { href: "#info", label: "Dados da empresa" },
        { href: "#atualizacao", label: "Última atualização" },
      ]}
      summaryItems={[
        { color: "green", text: "Cookies ajudam a melhorar a experiência." },
        { color: "gold", text: "Você pode controlar pelo navegador." },
      ]}
      sections={[
        {
          id: "o-que-sao",
          title: "1. O que são cookies",
          body: <>Pequenos arquivos que ajudam o site a funcionar e lembrar preferências.</>,
        },
        {
          id: "para-que",
          title: "2. Para que usamos",
          body: <>Para funcionalidades básicas, métricas e melhoria de navegação (se aplicável).</>,
        },
        {
          id: "tipos",
          title: "3. Tipos de cookies",
          body: <>Essenciais, desempenho e preferências (dependendo do que o site usa).</>,
        },
        {
          id: "controle",
          title: "4. Como controlar",
          body: <>Você pode bloquear/remover cookies nas configurações do seu navegador.</>,
        },
        {
          id: "contato",
          title: "5. Contato",
          body: (
            <>
              Dúvidas? Escreve pra: <b className="text-brand-ink">{site.email}</b>.
            </>
          ),
        },
      ]}
      infoBlock={{
        title: "Dados da empresa",
        cards: [
          {
            title: "Controlador",
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
