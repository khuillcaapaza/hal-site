import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllConvocatorias } from "@/lib/convocatorias";
import { formatDate } from "@/lib/posts";

const statusColors: Record<string, string> = {
  Abierta: "bg-green-100 text-green-700",
  "En evaluación": "bg-amber-100 text-amber-700",
  Cerrada: "bg-gray-200 text-gray-600",
};

const areaColors: Record<string, string> = {
  CAS: "bg-green-700",
  Terceros: "bg-emerald-700",
  Nombramiento: "bg-amber-600",
  General: "bg-gray-600",
};

export const metadata = {
  title: "Convocatorias · Hospital Antonio Lorena del Cusco",
  description:
    "Convocatorias, procesos de selección y oportunidades laborales del Hospital Antonio Lorena del Cusco.",
};

export default function ConvocatoriasPage() {
  const convocatorias = getAllConvocatorias();

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Recursos Humanos</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Convocatorias</h1>
          <p className="text-green-100 max-w-2xl">
            Procesos de selección, contrataciones CAS, servicios de terceros y nombramientos del Hospital Antonio Lorena.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {convocatorias.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Por el momento no hay convocatorias publicadas.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {convocatorias.map((c) => (
                <Link
                  key={c.slug}
                  href={`/convocatorias/${c.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all group block overflow-hidden"
                >
                  <div className={`h-2 ${areaColors[c.area] ?? areaColors.General}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{c.area}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[c.status] ?? statusColors.Abierta}`}>
                        {c.status}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.excerpt}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Cierre: {formatDate(c.deadline)}</span>
                      <span className="text-green-700 font-semibold group-hover:underline">Ver más →</span>
                    </div>
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
