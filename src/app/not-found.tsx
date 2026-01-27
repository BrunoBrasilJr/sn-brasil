"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-brand-ink">404</h1>
        <p className="mt-3 text-sm text-brand-muted">
          Página não encontrada.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-green px-5 py-3 text-sm font-semibold text-white hover:bg-brand-green-dark"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
