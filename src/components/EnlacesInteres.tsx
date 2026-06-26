import { enlacesInteres } from "@/lib/site";

export default function EnlacesInteres() {
  return (
    <section id="enlaces" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Recursos</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Enlaces de interés</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Accede a los portales de las principales instituciones públicas relacionadas con la salud.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {enlacesInteres.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 mb-3 rounded-xl bg-green-600 group-hover:bg-green-700 flex items-center justify-center text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 11-5.656-5.656l1.5-1.5m6.328-1.328a4 4 0 010-5.656l3-3a4 4 0 115.656 5.656l-1.5 1.5" />
                </svg>
              </div>
              <span className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">
                {link.name}
              </span>
              <span className="text-gray-500 text-xs mt-1 leading-snug">{link.full}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
