import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | BodyBio Hacker",
  description: "Transparency protocol regarding our funding and affiliate relationships.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-hacker-green/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            AFFILIATE_DISCLOSURE<span className="text-hacker-green">.txt</span>
          </h1>
          <p className="text-sm text-hacker-green/80 uppercase tracking-widest">
            Protocol: Transparency // Funding_Source
          </p>
        </div>

        <div className="prose prose-invert prose-green max-w-none">
          <p className="lead text-xl text-white">
            BodyBio Hacker is an independent intelligence unit. We do not accept bribes, sponsorships, or "free samples" in exchange for positive reviews.
          </p>

          <div className="p-6 bg-hacker-green/5 border border-hacker-green/20 rounded-lg">
            <h3 className="text-hacker-green font-bold mt-0">Testing Protocol</h3>
            <p className="mb-0 text-sm">
              We buy our supplements from the open market, just like you. We test them. We publish the raw data.
            </p>
          </div>

          <h2>1. Amazon Affiliate Program</h2>
          <p>
            BodyBio Hacker is a participant in the Amazon Associates Program. This means if you click a "BUY" or "CHECK PRICE" link on our site and make a purchase, we may earn a small commission (referral fee).
          </p>
          <p>
            **This adds ZERO cost to you.** The price stays exactly the same.
          </p>

          <h2>2. How We Use These Funds</h2>
          <ul className="list-disc pl-4 space-y-2">
            <li>**Lab Testing:** Mass spectrometry and HPLC testing is expensive. Commissions fund these tests.</li>
            <li>**Server Costs:** Keeping this secure database online.</li>
            <li>**Product Procurement:** We buy random samples to ensure brands aren't sending us "golden samples".</li>
          </ul>

          <h2>3. No Bias Policy</h2>
          <p>
            Our ranking algorithm is purely data-driven. A brand cannot pay us to rank higher.
            If a product has trash ingredients or fails a lab test, we will flag it, regardless of commission potential.
          </p>
          <p>
             Reference: <span className="text-hacker-green">Mission_Statement.md</span>
          </p>

        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500">
          Last Updated: 2025-01-11 // System_Log_ID: AFF_001
        </div>

      </div>
    </div>
  );
}
