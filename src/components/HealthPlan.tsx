import { insurance } from "@/lib/site";

export default function HealthPlan() {
  return (
    <section id="seguros" className="py-20 bg-green-900 text-white overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-700/30 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-700/20 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-green-300 font-semibold text-sm uppercase tracking-widest mb-4">Acceso a la salud</p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              {insurance.title}
            </h2>
            <p className="text-green-100 mb-8 leading-relaxed">
              {insurance.intro}
            </p>
            <a
              href="#contacto"
              className="inline-block bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
            >
              Oficina de Convenios y Seguros →
            </a>
          </div>

          {/* Items */}
          <div className="grid gap-4">
            {insurance.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl p-5 flex items-center gap-4 bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
              >
                <span className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-white font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
