import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogContent } from "@/components/blog/BlogContent";

// 1. Fetch Post Data
async function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return <BlogContent post={post} />;
}