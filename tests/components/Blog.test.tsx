// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Blog from "@/components/Blog";
import type { PostMeta } from "@/lib/posts";

const makePost = (over: Partial<PostMeta>): PostMeta => ({
  slug: "slug",
  title: "Título",
  excerpt: "Resumen",
  category: "General",
  date: "2026-01-15",
  author: "Autor",
  coverColor: "from-green-400 to-green-600",
  ...over,
});

describe("Blog", () => {
  it("renders at most three posts and resolves category colors (known + fallback)", () => {
    const posts: PostMeta[] = [
      makePost({ slug: "a", title: "Post A", category: "Oncología" }),
      makePost({ slug: "b", title: "Post B", category: "CategoríaInexistente" }),
      makePost({ slug: "c", title: "Post C", category: "Neumología" }),
      makePost({ slug: "d", title: "Post D", category: "General" }),
    ];

    render(<Blog posts={posts} />);

    expect(screen.getByText("Post A")).toBeInTheDocument();
    expect(screen.getByText("Post B")).toBeInTheDocument();
    expect(screen.getByText("Post C")).toBeInTheDocument();
    // Fourth post is sliced off.
    expect(screen.queryByText("Post D")).not.toBeInTheDocument();

    const linkA = screen.getByText("Post A").closest("a");
    expect(linkA).toHaveAttribute("href", "/blog/a");

    // Known category and fallback category are both rendered as badges.
    expect(screen.getByText("Oncología")).toBeInTheDocument();
    expect(screen.getByText("CategoríaInexistente")).toBeInTheDocument();
  });
});
