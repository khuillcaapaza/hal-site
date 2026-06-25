import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, formatDate } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  Neumología: "bg-cyan-100 text-cyan-700",
  Oncología: "bg-pink-100 text-pink-700",
  Vacunación: "bg-emerald-100 text-emerald-700",
  "Planificación Familiar": "bg-purple-100 text-purple-700",
  Investigación: "bg-amber-100 text-amber-700",
  General: "bg-gray-100 text-gray-700",
};

export const metadata = {
  title: "Noticias y Blog · Hospital Antonio Lorena del Cusco",
  description: "Noticias, comunicados y novedades del Hospital Antonio Lorena del Cusco.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-green-200 font-semibold text-sm uppercase tracking-widest mb-3">Noticias</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Artículos y consejos</h1>
          <p className="text-green-100 max-w-2xl">
            Información confiable sobre salud, prevención y bienestar escrita por nuestro equipo de especialistas.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Aún no hay artículos publicados.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group block"
                >
                  <div className={`h-48 bg-gradient-to-br ${post.coverColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <svg className="w-24 h-24 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.5V13H8v-2h5V8.5l4.5 4-4.5 4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] ?? categoryColors.General}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-green-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-green-700 text-sm font-semibold group-hover:underline">Leer más →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
