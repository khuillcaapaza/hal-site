import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { nosotros, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros · Hospital Antonio Lorena del Cusco",
  description: nosotros.intro,
};

export default function NosotrosPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">
            La organización
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {site.fullName}
          </h1>
          <p className="text-green-100 max-w-3xl leading-relaxed">{nosotros.intro}</p>
        </div>
      </section>

      {/* Misión / Visión */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border border-gray-100 bg-green-50/50">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Misión</h2>
            <p className="text-gray-600 leading-relaxed">{nosotros.mision}</p>
          </div>
          <div className="p-8 rounded-2xl border border-gray-100 bg-green-50/50">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Visión</h2>
            <p className="text-gray-600 leading-relaxed">{nosotros.vision}</p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="pb-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nuestros valores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nosotros.valores.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl border border-gray-100 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages links */}
      <section className="pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          <Link
            href="/nosotros/historia"
            className="group p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
              Historia →
            </h3>
            <p className="text-gray-500">Más de 90 años al servicio de la salud en el Cusco.</p>
          </Link>
          <Link
            href="/nosotros/autoridades"
            className="group p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
              Autoridades →
            </h3>
            <p className="text-gray-500">Conoce la estructura directiva del hospital.</p>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
