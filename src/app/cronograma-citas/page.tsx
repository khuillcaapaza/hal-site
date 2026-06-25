import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllCronogramas } from "@/lib/cronograma";

export const metadata = {
  title: "Cronograma de citas · Hospital Antonio Lorena del Cusco",
  description:
    "Rol mensual de entrega de citas por área de Consulta Externa del Hospital Antonio Lorena del Cusco.",
};

export default function CronogramaCitasPage() {
  const cronogramas = getAllCronogramas();

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Consulta Externa</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cronograma de entrega de citas</h1>
          <p className="text-green-100 max-w-2xl">
            La entrega de citas es mensual y por área. Consulta el rol del mes para saber qué días
            se entregan citas en cada especialidad.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cronogramas.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Por el momento no hay cronogramas publicados.</p>
          ) : (
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
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
