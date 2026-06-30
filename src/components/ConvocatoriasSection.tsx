"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { fetchConvocatorias, type ConvocatoriaMeta } from "@/lib/convocatorias";

const areaColors: Record<string, string> = {
  CAS: "bg-green-700",
  Reemplazo: "bg-emerald-700",
  Nombramiento: "bg-amber-600",
  Ascenso: "bg-sky-700",
  General: "bg-gray-600",
};

export default function ConvocatoriasSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [convocatorias, setConvocatorias] = useState<ConvocatoriaMeta[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchConvocatorias({ perPage: 8, signal: controller.signal }).then((page) =>
      setConvocatorias(page.items),
    );
    return () => controller.abort();
  }, []);

  const scrollBy = (dir: number) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : 320;
    track?.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (convocatorias.length === 0) return null;

  return (
    <section id="convocatorias" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Recursos Humanos</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Últimas convocatorias</h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Procesos de selección, contrataciones y oportunidades laborales del Hospital Antonio Lorena.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="w-11 h-11 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-white hover:border-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Siguiente"
              className="w-11 h-11 rounded-full border border-gray-300 text-gray-600 flex items-center justify-center hover:bg-white hover:border-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {convocatorias.map((c) => (
            <Link
              key={c.slug}
              href={`/convocatorias/${c.slug}`}
              data-card
              className="snap-start flex-shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group block overflow-hidden"
            >
              <div className={`h-2 ${areaColors[c.area] ?? areaColors.General}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{c.area}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.status === "Abierta" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
                    {c.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors">
                  {c.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{c.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{c.fileCount} documento{c.fileCount === 1 ? "" : "s"}</span>
                  <span className="text-green-700 font-semibold group-hover:underline">Ver más →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/convocatorias"
            className="inline-flex items-center gap-2 border-2 border-green-700 text-green-700 font-semibold px-7 py-2.5 rounded-full hover:bg-green-700 hover:text-white transition-colors"
          >
            Ver todas las convocatorias
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
