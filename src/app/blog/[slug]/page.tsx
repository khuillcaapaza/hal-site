import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPostSlugs, getPostBySlug, formatDate } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  Neumología: "bg-cyan-100 text-cyan-700",
  Oncología: "bg-pink-100 text-pink-700",
  Vacunación: "bg-emerald-100 text-emerald-700",
  "Planificación Familiar": "bg-purple-100 text-purple-700",
  Investigación: "bg-amber-100 text-amber-700",
  General: "bg-gray-100 text-gray-700",
};

// Pre-render every post as a static page at build time.
export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado · Hospital Antonio Lorena del Cusco" };

  return {
    title: `${post.title} · Hospital Antonio Lorena del Cusco`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main>
      <Navbar />

      {/* Cover */}
      <section className={`pt-32 pb-16 bg-gradient-to-br ${post.coverColor}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-sm text-gray-600 hover:text-green-700 transition-colors inline-flex items-center gap-1 mb-6">
            ← Volver al blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? categoryColors.General}`}>
              {post.category}
            </span>
            <span className="text-sm text-gray-600">{formatDate(post.date)}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-700">Por {post.author}</p>
        </div>
      </section>

      {/* Body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose-article"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* CTA */}
          <div className="mt-12 bg-green-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">¿Necesitas atención?</h3>
            <p className="text-gray-500 mb-4">Conóce nuestros servicios, horarios e información de contacto.</p>
            <a href="/#contacto" className="inline-block bg-green-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-800 transition-colors">
              Contáctanos
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
