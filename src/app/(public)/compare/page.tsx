import type { Metadata } from "next";
import { CompareClient } from "@/components/compare/CompareClient";

export const metadata: Metadata = {
  title: "Compare Products | BodyBio Hacker",
  description: "Compare supplements side-by-side with our advanced comparison matrix.",
};

export default function ComparePage() {
  return <CompareClient />;
}
