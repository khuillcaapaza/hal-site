import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvocatoriasList from "@/components/ConvocatoriasList";

export const metadata = {
  title: "Convocatorias · Hospital Antonio Lorena del Cusco",
  description:
    "Convocatorias, procesos de selección y oportunidades laborales del Hospital Antonio Lorena del Cusco.",
};

export default function ConvocatoriasPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Recursos Humanos</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Convocatorias</h1>
          <p className="text-green-100 max-w-2xl">
            Procesos de selección, contrataciones CAS, servicios de terceros y nombramientos del Hospital Antonio Lorena.
            Consulta el historial de convocatorias por año y mes, y descarga sus documentos.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<p className="text-center text-gray-400 py-12">Cargando convocatorias…</p>}>
            <ConvocatoriasList />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
