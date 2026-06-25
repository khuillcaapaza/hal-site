import Link from "next/link";
import { PostMeta, formatDate } from "@/lib/posts";

const categoryColors: Record<string, string> = {
  Neumología: "bg-cyan-100 text-cyan-700",
  Oncología: "bg-pink-100 text-pink-700",
  Vacunación: "bg-emerald-100 text-emerald-700",
  "Planificación Familiar": "bg-purple-100 text-purple-700",
  Investigación: "bg-amber-100 text-amber-700",
  General: "bg-gray-100 text-gray-700",
};

export default function Blog({ posts }: { posts: PostMeta[] }) {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-green-700 font-semibold text-sm uppercase tracking-widest mb-2">Blog de Salud</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Artículos recientes</h2>
          </div>
          <Link href="/blog" className="text-green-700 font-semibold hover:underline text-sm">
            Ver todos →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group block"
            >
              {/* Placeholder cover */}
              <div className={`h-48 bg-gradient-to-br ${article.coverColor} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-24 h-24 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.5V13H8v-2h5V8.5l4.5 4-4.5 4z" />
                  </svg>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] ?? categoryColors.General}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(article.date)}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-green-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <span className="text-green-700 text-sm font-semibold group-hover:underline">
                  Leer más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
