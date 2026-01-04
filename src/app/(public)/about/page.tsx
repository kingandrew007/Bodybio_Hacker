import type { Metadata } from "next";
import { AboutClient } from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About Us | BodyBio Hacker",
  description: "Disrupting the supplement industry with mass spectrometry and raw data.",
};

export default function AboutPage() {
  return <AboutClient />;
}
