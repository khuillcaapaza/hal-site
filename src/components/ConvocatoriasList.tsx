"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Convocatoria } from "@/lib/convocatorias";

const areaColors: Record<string, string> = {
  CAS: "bg-green-700",
  Reemplazo: "bg-emerald-700",
  Nombramiento: "bg-amber-600",
  Ascenso: "bg-sky-700",
  General: "bg-gray-600",
};

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const PER_PAGE = 6;

export default function ConvocatoriasList({ convocatorias }: { convocatorias: Convocatoria[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");
  const [page, setPage] = useState(1);

  const years = useMemo(
    () => Array.from(new Set(convocatorias.map((c) => c.year))).sort((a, b) => b - a),
    [convocatorias],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return convocatorias.filter((c) => {
      if (year !== "all" && c.year !== Number(year)) return false;
      if (month !== "all" && c.month !== Number(month)) return false;
      if (q && !`${c.title} ${c.area} ${c.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [convocatorias, query, year, month]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  // Group the current page items by year then month.
  const groups = useMemo(() => {
    const map = new Map<number, Map<number, Convocatoria[]>>();
    for (const c of pageItems) {
      if (!map.has(c.year)) map.set(c.year, new Map());
      const byMonth = map.get(c.year)!;
      if (!byMonth.has(c.month)) byMonth.set(c.month, []);
      byMonth.get(c.month)!.push(c);
    }
    return map;
  }, [pageItems]);

  const resetPage = () => setPage(1);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); resetPage(); }}
            placeholder="Buscar convocatoria..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
          />
        </div>
        <select
          value={year}
          onChange={(e) => { setYear(e.target.value); resetPage(); }}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-gray-700"
        >
          <option value="all">Todos los años</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => { setMonth(e.target.value); resetPage(); }}
          className="px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition text-gray-700"
        >
          <option value="all">Todos los meses</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} convocatoria{filtered.length === 1 ? "" : "s"} encontrada{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No se encontraron convocatorias con los filtros seleccionados.</p>
      ) : (
        <div className="space-y-12">
          {Array.from(groups.keys()).sort((a, b) => b - a).map((y) => {
            const byMonth = groups.get(y)!;
            return (
              <div key={y}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{y}</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                {Array.from(byMonth.keys()).sort((a, b) => b - a).map((m) => (
                  <div key={m} className="mb-8">
                    <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-4">{MONTHS[m - 1]}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {byMonth.get(m)!.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/convocatorias/${c.slug}`}
                          className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group block overflow-hidden"
                        >
                          <div className={`h-2 ${areaColors[c.area] ?? areaColors.General}`} />
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{c.area}</span>
                              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-600">Cerrada</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-green-700 transition-colors">
                              {c.title}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{c.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                {String(c.day).padStart(2, "0")} {MONTHS[c.month - 1].slice(0, 3)} {c.year} · {c.files.length} doc.
                              </span>
                              <span className="text-green-700 font-semibold group-hover:underline">Ver más →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-600 hover:text-green-700 transition-colors"
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-10 h-10 rounded-lg border transition-colors ${
                p === safePage
                  ? "bg-green-700 border-green-700 text-white"
                  : "border-gray-200 text-gray-600 hover:border-green-600 hover:text-green-700"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-600 hover:text-green-700 transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
