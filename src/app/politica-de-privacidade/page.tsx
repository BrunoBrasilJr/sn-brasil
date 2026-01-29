import InstitutionalPageTemplate from "@/components/InstitutionalPageTemplate";
import { site } from "@/lib/site";

export default function PoliticaDePrivacidadePage() {
  return (
    <InstitutionalPageTemplate
      pillLabel="Política de Privacidade"
      title="Política de Privacidade"
      description={
        <>
          Esta Política explica, de forma simples, como a <b>{site.name}</b>{" "}
          coleta, usa e protege dados pessoais ao utilizar este site e seus
          canais de atendimento.
        </>
      }
      notice={{
        title: "Aviso importante",
        badge: "Recomenda-se revisão jurídica",
        content: (
          <>
            Esta política foi criada como base e pode ser ajustada para refletir
            as práticas específicas da empresa. Recomenda-se revisão com um
            profissional responsável antes da publicação oficial.
          </>
        ),
      }}
      toc={{
        title: "Nesta página",
        items: [
          { href: "#definicoes", label: "1. Definições" },
          { href: "#dados", label: "2. Dados coletados" },
          { href: "#finalidades", label: "3. Finalidades" },
          { href: "#bases-legais", label: "4. Bases legais" },
          { href: "#compartilhamento", label: "5. Compartilhamento" },
          { href: "#cookies", label: "6. Cookies e tecnologias" },
          { href: "#armazenamento", label: "7. Armazenamento e segurança" },
          { href: "#direitos", label: "8. Direitos do titular" },
          { href: "#contato", label: "9. Contato" },
        ],
      }}
      summary={{
        title: "Em resumo",
        bullets: [
          {
            label:
              "Coletamos apenas o necessário para atender você, comunicar quando solicitado e melhorar a experiência no site.",
            dotClassName: "bg-brand-green",
          },
          {
            label:
              "Você pode solicitar acesso, correção ou exclusão de dados conforme a LGPD.",
            dotClassName: "bg-brand-gold",
          },
          {
            label:
              "Adotamos medidas de segurança e limitamos o acesso aos dados ao mínimo necessário.",
            dotClassName: "bg-brand-ink",
          },
        ],
      }}
      sections={[
        {
          id: "definicoes",
          title: "1. Definições",
          content: (
            <>
              <p>
                Para facilitar a leitura, aqui vão alguns termos comuns nesta
                Política:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <b>Dados pessoais</b>: informações que identificam ou podem
                  identificar uma pessoa (ex.: nome, e-mail, telefone).
                </li>
                <li>
                  <b>Titular</b>: a pessoa a quem os dados pessoais se referem.
                </li>
                <li>
                  <b>Tratamento</b>: qualquer operação com dados (coletar, usar,
                  armazenar, compartilhar, excluir).
                </li>
                <li>
                  <b>Controlador</b>: quem decide como e por que os dados serão
                  tratados.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "dados",
          title: "2. Dados coletados",
          content: (
            <>
              <p>
                Coletamos dados de duas formas: quando você nos informa (por
                exemplo, ao entrar em contato) e quando seu navegador envia
                informações técnicas durante a navegação.
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="font-semibold text-brand-ink">
                    2.1 Dados fornecidos por você
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>Nome e sobrenome</li>
                    <li>E-mail</li>
                    <li>Telefone/WhatsApp</li>
                    <li>Mensagem enviada via formulário/canais de contato</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-brand-ink">
                    2.2 Dados coletados automaticamente
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Dados técnicos (IP, navegador, sistema operacional,
                      resolução de tela)
                    </li>
                    <li>
                      Dados de navegação (páginas visitadas, tempo de sessão,
                      origem de tráfego)
                    </li>
                    <li>
                      Cookies e identificadores semelhantes (conforme seção de
                      Cookies)
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },
        {
          id: "finalidades",
          title: "3. Finalidades do tratamento",
          content: (
            <>
              <p>Utilizamos dados pessoais para:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Responder solicitações e dúvidas</li>
                <li>Prestar atendimento e suporte</li>
                <li>Enviar comunicações quando solicitado/necessário</li>
                <li>Melhorar a experiência e desempenho do site</li>
                <li>Prevenir fraudes e garantir segurança</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </>
          ),
        },
        {
          id: "bases-legais",
          title: "4. Bases legais (LGPD)",
          content: (
            <>
              <p>
                O tratamento de dados pessoais ocorre com base em uma ou mais
                hipóteses legais previstas na LGPD, como:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Execução de contrato ou de procedimentos preliminares</li>
                <li>Cumprimento de obrigação legal/regulatória</li>
                <li>Legítimo interesse (com avaliação e medidas de mitigação)</li>
                <li>Consentimento (quando aplicável)</li>
              </ul>
            </>
          ),
        },
        {
          id: "compartilhamento",
          title: "5. Compartilhamento de dados",
          content: (
            <>
              <p>
                Podemos compartilhar dados com fornecedores que ajudam a operar
                este site e prestar serviços (ex.: hospedagem, analytics,
                atendimento). Isso é feito com o mínimo necessário e com
                compromisso de segurança e confidencialidade.
              </p>
              <p className="mt-3">
                Também podemos compartilhar dados quando exigido por lei,
                determinação judicial/administrativa, ou para proteção de
                direitos.
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "6. Cookies e tecnologias similares",
          content: (
            <>
              <p>
                Cookies são pequenos arquivos armazenados no seu dispositivo
                para melhorar a navegação, entender como o site é utilizado e,
                quando aplicável, personalizar conteúdo.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <b>Necessários</b>: essenciais para funcionamento básico do
                  site
                </li>
                <li>
                  <b>Analíticos</b>: ajudam a entender como o site é utilizado
                </li>
                <li>
                  <b>Preferências</b>: lembram escolhas (quando aplicável)
                </li>
              </ul>
              <p className="mt-3">
                Você pode gerenciar cookies nas configurações do seu navegador.
              </p>
            </>
          ),
        },
        {
          id: "armazenamento",
          title: "7. Armazenamento e segurança",
          content: (
            <>
              <p>
                Mantemos dados pelo tempo necessário para cumprir as finalidades
                descritas nesta Política, respeitando prazos legais e
                regulatórios.
              </p>
              <p className="mt-3">
                Adotamos medidas técnicas e organizacionais para proteger dados
                contra acessos não autorizados, perda, alteração indevida ou
                divulgação.
              </p>
            </>
          ),
        },
        {
          id: "direitos",
          title: "8. Direitos do titular",
          content: (
            <>
              <p>
                Você pode solicitar, a qualquer momento, conforme aplicável:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Confirmação de tratamento e acesso aos dados</li>
                <li>Correção de dados incompletos/inexatos</li>
                <li>Anonimização, bloqueio ou eliminação</li>
                <li>Portabilidade (quando aplicável)</li>
                <li>Informação sobre compartilhamentos</li>
                <li>Revogação do consentimento (quando aplicável)</li>
              </ul>
            </>
          ),
        },
        {
          id: "contato",
          title: "9. Contato",
          content: (
            <>
              <p>
                Para exercer seus direitos ou tirar dúvidas sobre esta Política,
                entre em contato:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <b>E-mail:</b> {site.email}
                </li>
              </ul>
              <p className="mt-3">
                Para sua segurança, podemos solicitar informações adicionais
                para confirmar sua identidade antes de atender determinadas
                solicitações.
              </p>
            </>
          ),
        },
      ]}
      controller={{
        eyebrow: "Informações do controlador",
        cards: [
          {
            title: "Controlador",
            content: (
              <>
                <b>{site.name}</b>
              </>
            ),
          },
          {
            title: "Canal de contato",
            content: (
              <>
                E-mail: <b>{site.email}</b>
              </>
            ),
          },
        ],
        footer: <span>Baseado na LGPD • Conteúdo sujeito a revisão</span>,
      }}
      updatedAt={new Date().toLocaleDateString("pt-BR")}
    />
  );
}
