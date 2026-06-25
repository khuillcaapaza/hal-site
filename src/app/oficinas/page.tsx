import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllOficinas } from "@/lib/oficinas";

export const metadata: Metadata = {
  title: "Servicios y Oficinas · Hospital Antonio Lorena del Cusco",
  description:
    "Directorio de servicios y oficinas del Hospital Antonio Lorena del Cusco: funciones, contacto, ubicación, autoridades y recursos de cada área.",
};

const categoryColors: Record<string, string> = {
  "Órgano de Dirección": "bg-green-100 text-green-700",
  "Órgano de Apoyo": "bg-blue-100 text-blue-700",
  "Órgano de Asesoramiento": "bg-amber-100 text-amber-700",
  "Servicio Asistencial": "bg-emerald-100 text-emerald-700",
  Oficina: "bg-gray-100 text-gray-600",
};

export default function OficinasPage() {
  const oficinas = getAllOficinas();

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">
            Directorio institucional
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Servicios y Oficinas</h1>
          <p className="text-green-100 max-w-3xl leading-relaxed">
            Conoce las áreas del hospital, sus funciones, datos de contacto, ubicación, autoridades
            y recursos disponibles.
          </p>
        </div>
      </section>

      {/* Listado */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {oficinas.length === 0 ? (
            <p className="text-gray-500 text-center">Aún no hay oficinas publicadas.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {oficinas.map((oficina) => (
                <Link
                  key={oficina.slug}
                  href={`/oficinas/${oficina.slug}`}
                  className="group p-7 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all"
                >
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      categoryColors[oficina.category] ?? categoryColors.Oficina
                    }`}
                  >
                    {oficina.category}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {oficina.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{oficina.excerpt}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-green-700">Ver más →</span>
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
