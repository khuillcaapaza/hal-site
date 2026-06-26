import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { documentosGestion } from "@/lib/site";

export const metadata: Metadata = {
  title: "Documentos de Gestión · Hospital Antonio Lorena del Cusco",
  description:
    "Documentos de gestión del Hospital Antonio Lorena del Cusco clasificados por planeamiento, presupuesto, inversión, participación ciudadana, personal, contrataciones y más.",
};

const icons: Record<string, React.ReactNode> = {
  documents: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  transparency: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  complaints: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  mail: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  inbox: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  journal: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

export default function DocumentosGestionPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">
            Transparencia institucional
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">Documentos de Gestión</h1>
          <p className="text-green-100 max-w-3xl leading-relaxed">
            Accede a los documentos de gestión del Hospital Antonio Lorena del Cusco, organizados
            por temas según el Portal de Transparencia Estándar.
          </p>
        </div>
      </section>

      {/* Index */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentosGestion.map((cat) => {
              const external = "href" in cat && typeof cat.href === "string";
              return (
                <a
                  key={cat.slug}
                  href={external ? cat.href : `#${cat.slug}`}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-green-600 group-hover:bg-green-700 rounded-xl flex items-center justify-center text-white mb-5 shadow-md transition-colors">
                    {icons[cat.icon]}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-green-700 text-sm font-semibold group-hover:gap-2 transition-all">
                    Acceder
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {documentosGestion.map((cat) => (
            <div key={cat.slug} id={cat.slug} className="scroll-mt-28">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-md">
                  {icons[cat.icon]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{cat.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1">{cat.desc}</p>
                </div>
              </div>

              {cat.documents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-gray-400 text-sm">
                  Aún no hay documentos publicados en esta sección.
                </div>
              ) : (
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cat.documents.map((doc) => (
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
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
