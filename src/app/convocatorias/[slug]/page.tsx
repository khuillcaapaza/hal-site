import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAllConvocatoriaSlugs,
  getConvocatoriaBySlug,
} from "@/lib/convocatorias";
import { formatDate } from "@/lib/posts";

const statusColors: Record<string, string> = {
  Abierta: "bg-green-100 text-green-700",
  "En evaluación": "bg-amber-100 text-amber-700",
  Cerrada: "bg-gray-200 text-gray-600",
};

// Pre-render every convocatoria as a static page at build time.
export function generateStaticParams() {
  return getAllConvocatoriaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const convocatoria = await getConvocatoriaBySlug(slug);
  if (!convocatoria) return { title: "Convocatoria no encontrada · Hospital Antonio Lorena del Cusco" };

  return {
    title: `${convocatoria.title} · Hospital Antonio Lorena del Cusco`,
    description: convocatoria.excerpt,
  };
}

export default async function ConvocatoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const convocatoria = await getConvocatoriaBySlug(slug);

  if (!convocatoria) notFound();

  return (
    <main>
      <Navbar />

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
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[convocatoria.status] ?? statusColors.Abierta}`}>
              {convocatoria.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {convocatoria.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-green-100 text-sm">
            {convocatoria.date && <span>Publicada: {formatDate(convocatoria.date)}</span>}
            {convocatoria.deadline && <span>Cierre de postulación: {formatDate(convocatoria.deadline)}</span>}
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: convocatoria.contentHtml }}
          />

          {convocatoria.attachments.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Documentos de la convocatoria</h2>
              <p className="text-gray-500 mb-6">Descarga las bases, anexos y formatos relacionados con este proceso.</p>
              <ul className="space-y-4">
                {convocatoria.attachments.map((doc) => (
                  <li
                    key={doc.file}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-green-200 hover:bg-green-50/50 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">
                        {doc.title}
                        {doc.size && <span className="ml-2 text-xs font-normal text-gray-400">PDF · {doc.size}</span>}
                      </p>
                      {doc.description && <p className="text-sm text-gray-500 mt-0.5">{doc.description}</p>}
                    </div>
                    <a
                      href={doc.file}
                      download
                      className="shrink-0 inline-flex items-center justify-center gap-2 bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-800 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                      </svg>
                      Descargar PDF
                    </a>
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

      <Footer />
    </main>
  );
}
