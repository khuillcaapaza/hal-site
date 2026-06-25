import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllOficinaSlugs, getOficinaBySlug } from "@/lib/oficinas";

// Pre-render every office as a static page at build time.
export function generateStaticParams() {
  return getAllOficinaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const oficina = await getOficinaBySlug(slug);
  if (!oficina) return { title: "Oficina no encontrada · Hospital Antonio Lorena del Cusco" };

  return {
    title: `${oficina.title} · Hospital Antonio Lorena del Cusco`,
    description: oficina.excerpt,
  };
}

function isExternal(url: string) {
  return /^https?:\/\//i.test(url);
}

export default async function OficinaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const oficina = await getOficinaBySlug(slug);

  if (!oficina) notFound();

  const { contact, location } = oficina;
  const hasContact = contact.phone || contact.email || contact.schedule;
  const hasLocation = location.building || location.floor || location.reference || location.mapUrl;

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/oficinas"
            className="text-sm text-green-200 hover:text-white transition-colors inline-flex items-center gap-1 mb-6"
          >
            ← Volver a Servicios y Oficinas
          </Link>
          <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white uppercase tracking-wider mb-4">
            {oficina.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">{oficina.title}</h1>
          {oficina.excerpt && <p className="text-green-100 max-w-3xl leading-relaxed">{oficina.excerpt}</p>}
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2">
            {oficina.contentHtml && (
              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: oficina.contentHtml }}
              />
            )}

            {/* Autoridades */}
            {oficina.authorities.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Autoridades del área</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {oficina.authorities.map((person) => (
                    <div
                      key={`${person.role}-${person.name}`}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100"
                    >
                      <div className="w-11 h-11 shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{person.role}</p>
                        <p className="text-sm text-gray-500">{person.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recursos */}
            {oficina.resources.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recursos y documentos</h2>
                <ul className="space-y-4">
                  {oficina.resources.map((doc) => (
                    <li
                      key={doc.file}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50"
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
                        Descargar
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Enlaces */}
            {oficina.links.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Enlaces de interés</h2>
                <ul className="space-y-2">
                  {oficina.links.map((link) => {
                    const external = isExternal(link.url);
                    return (
                      <li key={`${link.title}-${link.url}`}>
                        <a
                          href={link.url}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-3 3a4 4 0 1 0 5.656 5.656l1.5-1.5m-1.156-6.328a4 4 0 0 1 5.656 0l3 3a4 4 0 1 1-5.656 5.656l-1.5-1.5" />
                          </svg>
                          {link.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {hasContact && (
              <div className="p-6 rounded-2xl border border-gray-100 bg-green-50/50">
                <h3 className="font-bold text-gray-900 mb-4">Contacto</h3>
                <ul className="space-y-3 text-sm">
                  {contact.phone && (
                    <li className="flex items-start gap-3">
                      <span className="text-green-700">☎</span>
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-gray-700 hover:text-green-700">
                        {contact.phone}
                      </a>
                    </li>
                  )}
                  {contact.email && (
                    <li className="flex items-start gap-3">
                      <span className="text-green-700">✉</span>
                      <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-green-700 break-all">
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {contact.schedule && (
                    <li className="flex items-start gap-3">
                      <span className="text-green-700">🕒</span>
                      <span className="text-gray-700">{contact.schedule}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {hasLocation && (
              <div className="p-6 rounded-2xl border border-gray-100 bg-green-50/50">
                <h3 className="font-bold text-gray-900 mb-4">Ubicación</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {location.building && <li>{location.building}</li>}
                  {location.floor && <li>{location.floor}</li>}
                  {location.reference && <li className="text-gray-500">{location.reference}</li>}
                </ul>
                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-green-700 hover:text-green-800"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                    Ver en el mapa
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
