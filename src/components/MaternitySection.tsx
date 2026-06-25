import Image from "next/image";

export default function MaternitySection() {
  return (
    <section id="nosotros" className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-4">Nuestra Historia</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
              Más de 90 años al servicio de la salud en el Cusco
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              El terreno del hospital fue adjudicado el 30 de mayo de 1933 en la Plazoleta de
              Belén, distrito de Santiago. Inicialmente denominado «Hospital Mixto del Cusco»,
              fue posteriormente renombrado en homenaje al médico cusqueño <strong>Antonio Lorena Rozas</strong>.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Fundado en 1933 como Hospital Mixto del Cusco",
                "Nombrado en honor al Dr. Antonio Lorena Rozas",
                "Parte de la Zona Monumental del Cusco desde 1972",
                "Integra el casco histórico declarado Patrimonio de la Humanidad por la UNESCO (1983)",
                "Hospital de referencia del sur del país",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="/blog"
              className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Conoce más sobre nosotros →
            </a>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden h-96 lg:h-[480px] shadow-xl relative">
              <Image
                src="/images/photo-1.jpg"
                alt="Hospital Antonio Lorena del Cusco"
                fill
                className="object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Desde 1933</p>
                <p className="text-gray-500 text-xs">Patrimonio histórico del Cusco</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
