import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConvocatoriaDetail from "@/components/ConvocatoriaDetail";
import {
  getAllConvocatoriaSlugs,
  getConvocatoriaBySlug,
} from "@/lib/convocatorias";

// Pre-render the convocatorias that exist at build time (static export). New
// convocatorias created in the admin panel show up in the listings instantly
// (the listings fetch live); their dedicated page is emitted on the next deploy.
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllConvocatoriaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const convocatoria = await getConvocatoriaBySlug(slug);
  if (!convocatoria) {
    return { title: "Convocatoria no encontrada · Hospital Antonio Lorena del Cusco" };
  }

  return {
    title: `${convocatoria.title} · Hospital Antonio Lorena del Cusco`,
    description: convocatoria.description,
  };
}

export default async function ConvocatoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <Navbar />
      <ConvocatoriaDetail slug={slug} />
      <Footer />
    </main>
  );
}
