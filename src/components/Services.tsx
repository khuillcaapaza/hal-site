import Image from "next/image";
import { services } from "@/lib/site";

const icons: Record<string, React.ReactNode> = {
  emergency: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
  ),
  stethoscope: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5a5 5 0 0010 0V4m-5 14a4 4 0 004-4v-1m3 1a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  lungs: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v8m0 0c-1 3-4 4-5 8-1 3 1 2 3 2s2-3 2-6m0-4c1 3 4 4 5 8 1 3-1 2-3 2s-2-3-2-6" />
    </svg>
  ),
  ribbon: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  maternity: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  family: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm-7-2a3 3 0 11-3-3m17 3a3 3 0 10-3-3" />
    </svg>
  ),
  vaccine: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2l4 4M17 7l3-3M6 18l9-9 0 0-3-3-9 9v3h3zM9 15l-1.5-1.5M12 12l-1.5-1.5" />
    </svg>
  ),
  shield: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  book: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Lo que ofrecemos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Nuestros servicios</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Atención integral en más de 30 especialidades médicas al servicio de la población cusqueña.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group relative overflow-hidden p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
            >
              {/* Blurred related background */}
              <div className="absolute inset-0 -z-0">
                <Image
                  src={svc.image}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover scale-110 blur-md opacity-25 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500"
                />
                {/* Readability overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70 group-hover:from-white group-hover:via-white/85 group-hover:to-white/60 transition-colors" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-14 h-14 bg-green-600 group-hover:bg-green-700 rounded-xl flex items-center justify-center text-white mb-5 shadow-md transition-colors">
                  {icons[svc.icon]}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#especialidades"
            className="inline-block border-2 border-green-700 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-700 hover:text-white transition-colors"
          >
            Ver todas las especialidades
          </a>
        </div>
      </div>
    </section>
  );
}
