import { citas } from "@/lib/site";

const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
// Simple decorative month grid (starts on a Monday).
const days = Array.from({ length: 30 }, (_, i) => i + 1);
const highlighted = [4, 12, 18, 25];

export default function CitasBanner() {
  return (
    <section id="citas" className="py-20 bg-gradient-to-br from-green-800 to-green-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">{citas.eyebrow}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{citas.title}</h2>
            <p className="text-green-100 leading-relaxed mb-6 max-w-lg">{citas.subtitle}</p>

            <div className="flex items-center gap-3 mb-8 text-green-100">
              <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{citas.schedule}</span>
            </div>

            <a
              href={citas.cta.href}
              className="inline-flex items-center gap-2 bg-white text-green-800 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors shadow-lg"
            >
              {citas.cta.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Calendar visual */}
          <div className="lg:justify-self-end w-full max-w-sm">
            <div className="bg-white rounded-3xl p-6 shadow-2xl text-gray-800">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-green-700 font-bold text-lg leading-none">Consulta Externa</p>
                  <p className="text-gray-400 text-sm mt-1">Programación mensual</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
                {weekDays.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {days.map((d) => {
                  const isOn = highlighted.includes(d);
                  return (
                    <span
                      key={d}
                      className={`py-1.5 rounded-lg ${isOn ? "bg-green-600 text-white font-bold" : "text-gray-600"}`}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 rounded bg-green-600 inline-block" />
                Días con mayor disponibilidad de citas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
