import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAllCronogramaSlugs,
  getCronogramaBySlug,
  WEEKDAYS,
  type AreaSchedule,
  type Weekday,
} from "@/lib/cronograma";

// Pre-render every monthly schedule as a static page at build time.
export function generateStaticParams() {
  return getAllCronogramaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cronograma = await getCronogramaBySlug(slug);
  if (!cronograma) return { title: "Cronograma no encontrado · Hospital Antonio Lorena del Cusco" };

  return {
    title: `${cronograma.title} · Hospital Antonio Lorena del Cusco`,
    description: cronograma.excerpt,
  };
}

// Color palette assigned to areas (cycled in order).
const areaPalette = [
  "bg-green-600 text-white",
  "bg-emerald-700 text-white",
  "bg-teal-600 text-white",
  "bg-lime-600 text-white",
  "bg-cyan-700 text-white",
  "bg-amber-600 text-white",
  "bg-sky-700 text-white",
  "bg-indigo-600 text-white",
];

const weekdayShort = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default async function CronogramaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cronograma = await getCronogramaBySlug(slug);

  if (!cronograma) notFound();

  const { areas } = cronograma;

  // Assign a stable color to each area.
  const areaColor = new Map<string, string>();
  areas.forEach((a, i) => areaColor.set(a.area, areaPalette[i % areaPalette.length]));

  // Map every weekday to the areas that deliver appointments that day.
  const byWeekday = new Map<Weekday, AreaSchedule[]>();
  WEEKDAYS.forEach((w) => byWeekday.set(w, []));
  areas.forEach((a) => {
    a.days.forEach((d) => byWeekday.get(d)?.push(a));
  });

  // Build the month calendar from the "YYYY-MM" key (deterministic at build time).
  const match = /^(\d{4})-(\d{2})$/.exec(cronograma.month);
  const year = match ? parseInt(match[1], 10) : new Date().getFullYear();
  const monthIdx = match ? parseInt(match[2], 10) - 1 : new Date().getMonth();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const leadingBlanks = (new Date(year, monthIdx, 1).getDay() + 6) % 7; // Monday-start
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cronograma-citas" className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6">
            ← Volver a cronogramas
          </Link>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white uppercase tracking-wider mb-4 capitalize">
            {cronograma.monthLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{cronograma.title}</h1>
          {cronograma.excerpt && <p className="text-green-100 max-w-2xl">{cronograma.excerpt}</p>}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Schedule by area */}
          {areas.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Rol por área</h2>
              <p className="text-gray-500 mb-6">Días de la semana en que cada área entrega citas durante el mes.</p>
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left text-gray-500">
                      <th className="px-5 py-3 font-semibold">Área</th>
                      <th className="px-5 py-3 font-semibold">Días de entrega</th>
                      <th className="px-5 py-3 font-semibold">Horario</th>
                      <th className="px-5 py-3 font-semibold">Lugar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {areas.map((a) => (
                      <tr key={a.area} className="align-top">
                        <td className="px-5 py-4">
                          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${areaColor.get(a.area)}`}>
                            {a.area}
                          </span>
                          {a.note && <p className="text-xs text-gray-400 mt-1.5">{a.note}</p>}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1.5">
                            {a.days.length > 0 ? (
                              a.days.map((d) => (
                                <span key={d} className="text-xs font-medium px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-100">
                                  {d}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{a.time ?? "—"}</td>
                        <td className="px-5 py-4 text-gray-600">{a.location ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Month calendar */}
          {areas.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1 capitalize">{cronograma.monthLabel}</h2>
              <p className="text-gray-500 mb-6">Vista del mes con las áreas que entregan citas cada día.</p>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {weekdayShort.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
                ))}
                {Array.from({ length: leadingBlanks }).map((_, i) => (
                  <div key={`blank-${i}`} className="min-h-20 sm:min-h-24" />
                ))}
                {days.map((day) => {
                  const weekday = WEEKDAYS[(new Date(year, monthIdx, day).getDay() + 6) % 7];
                  const dayAreas = byWeekday.get(weekday) ?? [];
                  return (
                    <div
                      key={day}
                      className="min-h-20 sm:min-h-24 rounded-xl border border-gray-100 bg-gray-50/50 p-1.5 flex flex-col"
                    >
                      <span className="text-xs font-semibold text-gray-400">{day}</span>
                      <div className="mt-1 flex flex-col gap-1 overflow-hidden">
                        {dayAreas.map((a) => (
                          <span
                            key={a.area}
                            title={a.area}
                            className={`text-[10px] leading-tight font-medium px-1.5 py-0.5 rounded truncate ${areaColor.get(a.area)}`}
                          >
                            {a.area}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Markdown body / notes */}
          {cronograma.contentHtml.trim() && (
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: cronograma.contentHtml }}
            />
          )}

          <div className="bg-green-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cómo solicito mi cita?</h3>
            <p className="text-gray-500 mb-4">Conoce el proceso de entrega de citas de Consulta Externa.</p>
            <Link href="/citas" className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-800 transition-colors">
              Ver proceso de citas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
