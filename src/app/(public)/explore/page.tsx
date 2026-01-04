import type { Metadata } from "next";
import { ExploreClient } from "@/components/explore/ExploreClient";

export const metadata: Metadata = {
  title: "Explore Products | BodyBio Hacker",
  description: "Browse our database of supplement reviews and lab results.",
};

export default function ExplorePage() {
  return <ExploreClient />;
}
