"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { citas } from "@/lib/site";
import { getCronogramaBySlug } from "@/lib/api";
import { WEEKDAYS, type AreaSchedule, type Weekday } from "@/lib/cronograma";

const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

type Estado =
  | { fase: "cargando" }
  | {
      fase: "listo";
      now: Date;
      weekday: Weekday;
      disponibles: AreaSchedule[];
      hayCronograma: boolean;
    };

export default function CitasBanner() {
  // Se resuelve en el navegador para usar siempre la fecha del visitante y
  // consultar en vivo el cronograma del mes actual.
  const [estado, setEstado] = useState<Estado>({ fase: "cargando" });

  useEffect(() => {
    let activo = true;
    (async () => {
      const now = new Date();
      const weekday = WEEKDAYS[(now.getDay() + 6) % 7];
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
      try {
        const cronograma = await getCronogramaBySlug(monthKey);
        if (!activo) return;
        const disponibles = cronograma
          ? cronograma.areas.filter((a) => a.days.includes(weekday))
          : [];
        setEstado({ fase: "listo", now, weekday, disponibles, hayCronograma: !!cronograma });
      } catch {
        if (!activo) return;
        setEstado({ fase: "listo", now, weekday, disponibles: [], hayCronograma: false });
      }
    })();
    return () => {
      activo = false;
    };
  }, []);

  const listo = estado.fase === "listo" ? estado : null;
  const monthLabel = listo
    ? `${monthNames[listo.now.getMonth()]} ${listo.now.getFullYear()}`
    : "Programación mensual";

  return (
    <section id="citas" className="py-20 bg-gradient-to-br from-green-800 to-green-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">{citas.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{citas.title}</h2>
            <p className="text-green-100 leading-relaxed mb-6 max-w-lg">{citas.subtitle}</p>

            <div className="flex items-center gap-3 mb-8 text-green-100">
              <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{citas.schedule}</span>
            </div>

            <a
              href={citas.cta.href}
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
            >
              {citas.cta.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <Link
              href="/cronograma-citas"
              className="ml-3 inline-flex items-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Cronograma de citas
            </Link>
          </div>

          {/* Especialidades disponibles hoy */}
          <div className="lg:justify-self-end w-full max-w-sm">
            <div className="bg-white rounded-3xl p-6 shadow-2xl text-gray-800">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-green-700 font-bold text-lg leading-none">Consulta Externa</p>
                  <p className="text-gray-400 text-sm mt-1 capitalize">{monthLabel}</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Día actual */}
              <div className="flex items-center gap-4 rounded-2xl bg-green-600 text-white px-5 py-4">
                <span className="text-5xl font-bold leading-none tabular-nums">
                  {listo ? listo.now.getDate() : "—"}
                </span>
                <div>
                  <p className="font-semibold capitalize leading-tight">
                    {listo ? listo.weekday : "Hoy"}
                  </p>
                  <p className="text-green-100 text-sm capitalize">{monthLabel}</p>
                </div>
              </div>

              {/* Especialidades de hoy */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Especialidades disponibles hoy
                </p>

                {!listo ? (
                  <ul className="space-y-2 animate-pulse">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <li key={i} className="h-11 rounded-xl bg-gray-100" />
                    ))}
                  </ul>
                ) : listo.disponibles.length > 0 ? (
                  <ul className="space-y-2">
                    {listo.disponibles.map((a) => (
                      <li
                        key={a.area}
                        className="flex items-start justify-between gap-3 rounded-xl bg-green-50 border border-green-100 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-green-800 text-sm truncate">{a.area}</p>
                          {a.location && <p className="text-xs text-gray-500 truncate">{a.location}</p>}
                        </div>
                        {a.time && (
                          <span className="text-xs font-medium text-green-700 whitespace-nowrap shrink-0">
                            {a.time}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 rounded-xl bg-gray-50 border border-gray-100 px-3 py-3">
                    {listo.hayCronograma
                      ? "Hoy no hay entrega de citas en Consulta Externa."
                      : "Aún no se ha publicado el cronograma de este mes."}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded bg-green-600 inline-block" />
                Día de hoy · Atención de lunes a sábado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
