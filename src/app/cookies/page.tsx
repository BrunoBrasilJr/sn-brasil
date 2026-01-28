import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function CookiesPage() {
  const updatedAt = new Date().toLocaleDateString("pt-BR");

  return (
    <InstitutionalPageTemplate
      pillLabel="Cookies"
      title="Política de cookies"
      description={
        <>
          Explicamos de forma transparente como usamos cookies para melhorar sua experiência no site da{" "}
          <b className="text-brand-ink">{site.name}</b> — e como você pode gerenciar suas preferências.
        </>
      }
      notice={{
        title: "Sobre consentimento",
        badge: "Preferências do usuário",
        content: (
          <>
            Você pode aceitar, recusar ou ajustar cookies não essenciais a qualquer momento. Cookies estritamente
            necessários podem ser usados para o funcionamento básico do site.
          </>
        ),
      }}
      toc={{
        items: [
          { href: "#o-que-sao", label: "1. O que são cookies" },
          { href: "#como-usamos", label: "2. Como usamos" },
          { href: "#tipos", label: "3. Tipos de cookies" },
          { href: "#gerenciar", label: "4. Como gerenciar" },
          { href: "#contato", label: "5. Contato" },
          { href: "#controlador", label: "Controlador e endereço" },
          { href: "#atualizacao", label: "Última atualização" },
        ],
      }}
      summary={{
        bullets: [
          { label: "Cookies necessários garantem funcionamento básico.", dotClassName: "bg-brand-green" },
          { label: "Cookies opcionais melhoram experiência e métricas (se você permitir).", dotClassName: "bg-brand-gold" },
        ],
      }}
      sections={[
        {
          id: "o-que-sao",
          title: "1. O que são cookies",
          content: (
            <>
              Cookies são pequenos arquivos armazenados no seu dispositivo quando você visita um site. Eles ajudam
              a lembrar preferências (ex.: idioma), manter sessões e entender como o site é utilizado.
            </>
          ),
        },
        {
          id: "como-usamos",
          title: "2. Como usamos",
          content: (
            <>
              Utilizamos cookies para: (a) funcionamento do site, (b) lembrar preferências, e (c) quando autorizado,
              analisar o uso para melhorar conteúdo e desempenho.
            </>
          ),
        },
        {
          id: "tipos",
          title: "3. Tipos de cookies",
          content: (
            <>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                  <span>
                    <b className="text-brand-ink">Necessários:</b> essenciais para o funcionamento do site.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-gold" />
                  <span>
                    <b className="text-brand-ink">Preferências:</b> guardam escolhas (ex.: preferências de navegação).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-line" />
                  <span>
                    <b className="text-brand-ink">Métricas/analíticos:</b> ajudam a entender como o site é usado (quando aceitos).
                  </span>
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "gerenciar",
          title: "4. Como gerenciar",
          content: (
            <>
              Você pode gerenciar cookies de duas formas:
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-green" />
                  <span>
                    <b className="text-brand-ink">No navegador:</b> bloqueando ou apagando cookies nas configurações.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-gold" />
                  <span>
                    <b className="text-brand-ink">No banner de consentimento:</b> aceitando/recusando cookies opcionais.
                  </span>
                </li>
              </ul>
              <div className="mt-3">
                Se você desativar cookies necessários, algumas partes do site podem não funcionar corretamente.
              </div>
            </>
          ),
        },
        {
          id: "contato",
          title: "5. Contato",
          content: (
            <>
              Se quiser falar sobre cookies e privacidade, chama a gente em{" "}
              <b className="text-brand-ink">{site.email}</b>.
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
        footer: <>Política de cookies • versão {updatedAt}</>,
      }}
      updatedAt={updatedAt}
    />
  );
}
