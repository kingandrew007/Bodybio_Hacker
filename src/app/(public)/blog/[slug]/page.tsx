import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BlogContent } from "@/components/blog";

import { Metadata } from "next";

// 1. Fetch Post Data
async function getPost(slug: string) {
  return BLOG_POSTS.find(p => p.slug === slug);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | BodyBio Hacker",
    };
  }

  const keywords = [
    "protein shake", 
    "body bio", 
    "bodybio", 
    "body", 
    "biobody", 
    "bodybiohacker", 
    "body bio hacker", 
    "supplements", 
    "fitness india",
    ...post.category.split(" "),
  ];

  return {
    title: `${post.title} | BodyBio Hacker`,
    description: post.excerpt,
    keywords: keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return <BlogContent post={post} />;
}