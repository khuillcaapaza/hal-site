"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCronogramas } from "@/lib/api";
import type { CronogramaMeta } from "@/lib/cronograma";

/** Listado de cronogramas obtenido en vivo desde la API. */
export default function CronogramasLive() {
  const [cronogramas, setCronogramas] = useState<CronogramaMeta[]>([]);
  const [estado, setEstado] = useState<"cargando" | "ok" | "error">("cargando");

  useEffect(() => {
    let activo = true;
    (async () => {
      try {
        const data = await getAllCronogramas();
        if (!activo) return;
        setCronogramas(data);
        setEstado("ok");
      } catch {
        if (!activo) return;
        setEstado("error");
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  if (estado === "cargando") {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="h-2 bg-gray-200" />
            <div className="p-6 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (estado === "error") {
    return (
      <p className="text-center text-gray-400 py-12">
        No se pudieron cargar los cronogramas en este momento. Intenta nuevamente más tarde.
      </p>
    );
  }

  if (cronogramas.length === 0) {
    return <p className="text-center text-gray-400 py-12">Por el momento no hay cronogramas publicados.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cronogramas.map((c) => (
        <Link
          key={c.slug}
          href={`/cronograma-citas/${c.slug}`}
          className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group block overflow-hidden"
        >
          <div className="h-2 bg-green-700" />
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-green-700 capitalize">{c.monthLabel}</span>
            </div>
            <h2 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors">
              {c.title}
            </h2>
            {c.excerpt && <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.excerpt}</p>}
            <span className="text-green-700 font-semibold text-sm group-hover:underline">Ver rol del mes →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
