export type Service = {
  title: string;
  desc: string;
  icon: string;
  includes: string[];
};

export type Partner = { name: string; logoSrc: string };

export const site = {
  name: "SN Brasil Contábil",

  whatsappNumber: "5511994275418",
  whatsappMessage: "Olá, gostaria de saber mais informações de consultoria contábil!",

  email: "snb@snbrasilcontabil.com.br",
  legalName: "SN BRASIL CONTABIL LTDA",
  cnpj: "03.939.348/0001-37",

  responsibleName: "", 
  responsibleCRC: "", 

  businessHours: "Seg a Sex, 08:00 às 18:00",
  responseSLA: "Respondemos em até 2 horas úteis.",

  phones: ["(11) 5611-3549", "(11) 5614-2142"],

  address: "R. Constantino Sérgio, 206 - Jardim Palmares (Zona Sul)",
  cityState: "São Paulo - SP",

  instagram: "https://www.instagram.com/snbrasilcontabil/",

  logo: {
    src: "/SN-Brasil.png",
    alt: "SN Brasil Contábil",
  },
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(message ?? site.whatsappMessage);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Segmentos", href: "#segmentos" },
  { label: "Contato", href: "#contato" },
  { label: "Parceiros", href: "#parceiros" },
];

export const services: Service[] = [
  {
    title: "Abertura de empresa",
    desc: "Orientação completa do início ao CNPJ ativo.",
    icon: "briefcase",
    includes: [
      "Enquadramento e viabilidade (atividade/regime)",
      "Checklist de documentos e orientação passo a passo",
      "Registro e emissão do CNPJ (acompanhamento)",
      "Configuração inicial para operar com segurança",
    ],
  },
  {
    title: "Regularização",
    desc: "Coloque a casa em ordem e evite dor de cabeça.",
    icon: "shield",
    includes: [
      "Diagnóstico do que está pendente",
      "Plano de ação para normalização",
      "Orientação sobre riscos e prazos",
      "Acompanhamento até a regularização",
    ],
  },
  {
    title: "Encerramento",
    desc: "Encerramento correto, com segurança e transparência.",
    icon: "check",
    includes: [
      "Análise do cenário e pendências",
      "Encerramento com documentação correta",
      "Baixas e comunicados necessários (quando aplicável)",
      "Orientação final para evitar problemas futuros",
    ],
  },
  {
    title: "Aposentadoria",
    desc: "Acompanhamento e orientação com clareza.",
    icon: "user",
    includes: [
      "Entendimento do seu histórico e objetivo",
      "Orientação sobre documentação e próximos passos",
      "Acompanhamento e clareza no processo",
      "Suporte para evitar indeferimentos por falta de informação",
    ],
  },
  {
    title: "Créditos tributários",
    desc: "Análise de oportunidades e recuperação quando aplicável.",
    icon: "coin",
    includes: [
      "Triagem para identificar oportunidades",
      "Análise técnica do enquadramento (quando aplicável)",
      "Orientação sobre documentação e comprovações",
      "Acompanhamento do processo com transparência",
    ],
  },
  {
    title: "Certificado digital",
    desc: "Emissão e suporte para o dia a dia da empresa.",
    icon: "key",
    includes: [
      "Orientação para escolher o tipo ideal",
      "Emissão/renovação com suporte",
      "Configuração básica para uso no dia a dia",
      "Ajuda rápida em caso de dúvidas",
    ],
  },
];

export const segments = [
  "Prestadores de serviço",
  "Comércio",
  "Construção civil",
  "Engenharia",
  "Pequenas e médias empresas",
  "Autônomos / profissionais liberais",
];

export const faqs = [
  {
    q: "Quais documentos preciso para abrir uma empresa?",
    a: "Depende da atividade e do regime, mas geralmente RG/CPF, comprovante de endereço e informações do negócio. A gente te orienta passo a passo.",
  },
  {
    q: "Vocês atendem por WhatsApp?",
    a: "Sim. O atendimento é rápido e direto. Se preferir, também respondemos por e-mail quando necessário.",
  },
  {
    q: "Dá pra fazer tudo online?",
    a: "Na maioria dos casos, sim. Coletamos informações, organizamos documentos e conduzimos o processo com acompanhamento.",
  },
  {
    q: "Como eu peço uma cotação?",
    a: "Você pode chamar no WhatsApp ou usar o formulário de contato. A gente retorna com orientação e próximos passos.",
  },
];

export const partners: Partner[] = [
  { name: "JUCESP", logoSrc: "/partners/jucesp.png" },
  { name: "NF-e", logoSrc: "/partners/nfe.png" },
  { name: "Nota Fiscal Paulista", logoSrc: "/partners/nota-fiscal-paulista.png" },
  { name: "Previdência Social", logoSrc: "/partners/previdencia-social.png" },
  { name: "Receita Federal", logoSrc: "/partners/receita-federal.png" },
  { name: "SEBRAE", logoSrc: "/partners/sebrae.png" },
  { name: "Simples Nacional", logoSrc: "/partners/simples-nacional.png" },
  { name: "SINTEGRA", logoSrc: "/partners/sintegra.png" },
  { name: "CAIXA FGTS", logoSrc: "/partners/caixa-fgts.png" },
  { name: "Cartório 24 Horas", logoSrc: "/partners/cartorio-24h.png" },
  { name: "Central das Certidões", logoSrc: "/partners/central-das-certidoes.png" },
  { name: "e-CAC", logoSrc: "/partners/ecac.png" },
  { name: "SEFAZ-SP", logoSrc: "/partners/sefaz-sp.png" },
];
