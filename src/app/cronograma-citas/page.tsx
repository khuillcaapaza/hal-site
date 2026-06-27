import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CronogramasLive from "@/components/CronogramasLive";

export const metadata = {
  title: "Cronograma de citas · Hospital Antonio Lorena del Cusco",
  description:
    "Rol mensual de entrega de citas por área de Consulta Externa del Hospital Antonio Lorena del Cusco.",
};

export default function CronogramaCitasPage() {
  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Consulta Externa</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Cronograma de entrega de citas</h1>
          <p className="text-green-100 max-w-2xl">
            La entrega de citas es mensual y por área. Consulta el rol del mes para saber qué días
            se entregan citas en cada especialidad.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CronogramasLive />
        </div>
      </section>

      <Footer />
    </main>
  );
}
