import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { informacionEpidemiologica } from "@/lib/site";

export const metadata: Metadata = {
  title: "Información Epidemiológica · Hospital Antonio Lorena del Cusco",
  description:
    "Boletines, reportes y salas situacionales de vigilancia epidemiológica del Hospital Antonio Lorena del Cusco.",
};

export default function InformacionEpidemiologicaPage() {
  const { title, desc, documents } = informacionEpidemiologica;

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Volver al inicio
          </Link>
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">
            Vigilancia en salud
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{title}</h1>
          <p className="text-green-100 max-w-3xl leading-relaxed">{desc}</p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {documents.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-400 text-sm">
              Aún no hay documentos publicados en esta sección.
            </div>
          ) : (
            <ul className="grid sm:grid-cols-2 gap-3">
              {documents.map((doc) => (
                <li key={doc.href}>
                  <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white hover:border-green-200 hover:shadow-sm transition-all h-full">
                    <span className="w-10 h-10 flex-shrink-0 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm0 2l4 4h-4V4zM8.5 13.5c0 .83-.67 1.5-1.5 1.5H6v1.5H5v-5h2c.83 0 1.5.67 1.5 1.5v.5zm-1.5.5H6v-1h1v1zm6 1.5c0 .83-.67 1.5-1.5 1.5H10v-5h1.5c.83 0 1.5.67 1.5 1.5v2zm-1.5.5H11v-3h.5v3zm6-3.5h-1.5v1H17v1h-1.5v1.5h-1v-5H17v.5z" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium text-sm leading-snug">{doc.title}</p>
                      {doc.date && <p className="text-xs text-gray-400 mt-0.5">{doc.date}</p>}
                    </div>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver PDF
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
