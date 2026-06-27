import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CronogramaDetailLive from "@/components/CronogramaDetailLive";
import { getCronogramaBySlug } from "@/lib/api";
import { getCronogramaSlugsForBuild } from "@/lib/cronograma-build";

// Pre-genera, en tiempo de build, una página por cada mes ya publicado en la API.
// Los datos del contenido se obtienen en vivo desde el navegador, así que las
// ediciones se reflejan sin re-desplegar. Un mes NUEVO aparece en el listado en
// vivo; su página dedicada se genera en el siguiente deploy.
export async function generateStaticParams() {
  const slugs = await getCronogramaSlugsForBuild();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const cronograma = await getCronogramaBySlug(slug);
    if (!cronograma) return { title: "Cronograma no encontrado · Hospital Antonio Lorena del Cusco" };

    return {
      title: `${cronograma.title} · Hospital Antonio Lorena del Cusco`,
      description: cronograma.excerpt,
    };
  } catch {
    return { title: "Cronograma de citas · Hospital Antonio Lorena del Cusco" };
  }
}

export default async function CronogramaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <Navbar />
      <CronogramaDetailLive slug={slug} />
      <Footer />
    </main>
  );
}
