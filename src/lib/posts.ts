import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export { formatDate } from "./format";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  coverColor: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function readPostFile(fileName: string): PostMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    date: data.date ?? "",
    author: data.author ?? "Hospital Antonio Lorena",
    coverColor: data.coverColor ?? "from-green-100 to-green-200",
  };
}

/** Returns all post metadata, sorted by date (newest first). */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  return fileNames
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns the slugs for every post (used by generateStaticParams). */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Reads a single post and compiles its Markdown body to HTML at build time. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    category: data.category ?? "General",
    date: data.date ?? "",
    author: data.author ?? "Hospital Antonio Lorena",
    coverColor: data.coverColor ?? "from-green-100 to-green-200",
    contentHtml: processed.toString(),
  };
}
