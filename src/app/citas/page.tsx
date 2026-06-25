import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { citas, site } from "@/lib/site";

export const metadata = {
  title: "Proceso de Citas · Hospital Antonio Lorena del Cusco",
  description:
    "Conoce paso a paso cómo obtener una cita en Consulta Externa del Hospital Antonio Lorena del Cusco.",
};

export default function CitasPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">{citas.eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{citas.title}</h1>
          <p className="text-green-100 max-w-2xl">{citas.subtitle}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">¿Cómo obtener una cita?</h2>
          <ol className="space-y-6">
            {citas.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex-shrink-0 w-11 h-11 rounded-full bg-green-700 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Schedule + notes */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Horario de atención
              </h3>
              <p className="text-gray-700">{citas.schedule}</p>
              <p className="text-gray-500 text-sm mt-2">{site.contact.emergencias}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Ten en cuenta
              </h3>
              <ul className="space-y-2">
                {citas.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-green-700 text-white rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-2">¿Tienes dudas sobre tu cita?</h3>
            <p className="text-green-100 mb-5">Comunícate con nosotros o acércate a Admisión de Consulta Externa.</p>
            <a
              href={`tel:${site.contact.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              {site.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
