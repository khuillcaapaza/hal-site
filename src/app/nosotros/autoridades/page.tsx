import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { nosotros } from "@/lib/site";

export const metadata: Metadata = {
  title: "Autoridades · Hospital Antonio Lorena del Cusco",
  description: "Estructura directiva y autoridades del Hospital Antonio Lorena del Cusco.",
};

export default function AutoridadesPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/nosotros"
            className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Volver a Nosotros
          </Link>
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Autoridades</p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Estructura directiva</h1>
          <p className="text-green-100 leading-relaxed">
            Equipo de dirección y oficinas que conducen la gestión del hospital.
          </p>
        </div>
      </section>

      {/* Authorities */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          {nosotros.authorities.map((person) => (
            <div
              key={person.role}
              className="flex items-center gap-4 p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
            >
              {person.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-16 h-16 shrink-0 rounded-full object-cover object-top border border-gray-100"
                />
              ) : (
                <div className="w-14 h-14 shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">{person.area}</p>
                <h3 className="font-bold text-gray-900">{person.role}</h3>
                <p className="text-sm text-gray-500">{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
