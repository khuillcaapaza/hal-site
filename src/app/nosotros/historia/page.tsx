import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { nosotros } from "@/lib/site";

export const metadata: Metadata = {
  title: "Historia · Hospital Antonio Lorena del Cusco",
  description: nosotros.history.intro,
};

export default function HistoriaPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/nosotros"
            className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Volver a Nosotros
          </Link>
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Nuestra historia</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            Más de 90 años cuidando la salud del Cusco
          </h1>
          <p className="text-green-100 leading-relaxed">{nosotros.history.intro}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="relative border-l-2 border-green-100 ml-3">
            {nosotros.history.milestones.map((m, i) => (
              <li key={`${m.year}-${i}`} className="mb-10 ml-8">
                <span className="absolute -left-[11px] flex items-center justify-center w-5 h-5 bg-green-700 rounded-full ring-4 ring-white" />
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-green-700 mb-1">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{m.title}</h3>
                <p className="text-gray-600 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  );
}
