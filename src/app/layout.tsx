import type { Metadata } from "next";
import "../styles/tailwind.css";
import { site } from "@/lib/site";
import SplashGate from "@/components/SplashGate";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description:
    "Consultoria contábil com atendimento rápido. Abertura, regularização, encerramento e serviços contábeis em São Paulo.",
  keywords: [
    "contabilidade",
    "consultoria contábil",
    "abertura de empresa",
    "regularização",
    "encerramento de empresa",
    "certificado digital",
    "São Paulo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: site.name,
    description:
      "Consultoria contábil com atendimento rápido. Abertura, regularização, encerramento e serviços contábeis em São Paulo.",
    siteName: site.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <SplashGate><CookieBanner></CookieBanner>{children}</SplashGate>
      </body>
    </html>
  );
}
