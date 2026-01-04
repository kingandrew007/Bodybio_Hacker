import type { Metadata } from "next";
import { BlogClient } from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Intelligence Logs | BodyBio Hacker",
  description: "Curated dossiers on supplementation protocols and protocols.",
};

export default function BlogListingPage() {
  return <BlogClient />;
}
