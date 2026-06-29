"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConvocatoriaBySlug, type Convocatoria } from "@/lib/convocatorias";
import { formatDate } from "@/lib/format";

const isImage = (ext: string) => ["jpg", "jpeg", "png"].includes(ext);

/**
 * Detalle de una convocatoria leído EN VIVO desde la API. La página servidora
 * pre-genera la metadata/SEO en build; este componente trae el contenido en el
 * navegador para reflejar al instante las ediciones hechas en el panel.
 */
export default function ConvocatoriaDetail({ slug }: { slug: string }) {
  const [convocatoria, setConvocatoria] = useState<Convocatoria | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    getConvocatoriaBySlug(slug, controller.signal)
      .then((data) => setConvocatoria(data))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-100">Cargando convocatoria…</p>
        </div>
      </section>
    );
  }

  if (!convocatoria) {
    return (
      <section className="pt-32 pb-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Convocatoria no encontrada</h1>
          <p className="text-gray-500 mb-6">La convocatoria que buscas no existe o fue retirada.</p>
          <Link href="/convocatorias" className="inline-block bg-green-700 text-white font-semibold px-7 py-3 rounded-full hover:bg-green-800 transition-colors">
            Ver todas las convocatorias
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/convocatorias" className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6">
            ← Volver a convocatorias
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white uppercase tracking-wider">
              {convocatoria.area}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${convocatoria.status === "Abierta" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
              {convocatoria.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {convocatoria.title}
          </h1>
          <p className="text-green-100 leading-relaxed mb-4">{convocatoria.description}</p>
          {convocatoria.date && (
            <p className="text-green-200 text-sm">Publicada: {formatDate(convocatoria.date)}</p>
          )}
        </div>
      </section>

      {/* Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {convocatoria.files.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aún no hay documentos publicados para esta convocatoria.</p>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Documentos de la convocatoria</h2>
              <p className="text-gray-500 mb-6">
                Descarga las bases, comunicados, fe de erratas y resultados relacionados con este proceso.
              </p>
              <ul className="space-y-4">
                {convocatoria.files.map((doc) => (
                  <li
                    key={doc.name}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/50 transition-colors"
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${isImage(doc.ext) ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                        {isImage(doc.ext) ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2 1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                        )}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 break-words">{doc.label}</p>
                      <p className="text-xs text-gray-400 uppercase mt-0.5">{doc.ext}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 border border-green-700 text-green-700 text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-green-50 transition-colors"
                      >
                        Ver
                      </a>
                      <a
                        href={doc.href}
                        download
                        className="inline-flex items-center justify-center gap-2 bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                        </svg>
                        Descargar
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">¿Tienes consultas sobre esta convocatoria?</h3>
            <p className="text-gray-500 mb-4">Comunícate con la Oficina de Recursos Humanos del hospital.</p>
            <Link href="/#contacto" className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-800 transition-colors">
              Contáctanos
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
