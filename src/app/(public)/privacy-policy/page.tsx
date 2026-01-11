import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | BodyBio Hacker",
  description: "Data retention and surveillance protocols.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-hacker-green/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            PRIVACY_POLICY<span className="text-hacker-green">.log</span>
          </h1>
          <p className="text-sm text-hacker-green/80 uppercase tracking-widest">
            Protocol: Data_Protection // User_Anonymity
          </p>
        </div>

        <div className="prose prose-invert prose-green max-w-none">
          <p className="lead text-xl text-white">
            We value your privacy. In fact, we prefer if you stay anonymous.
          </p>

          <h2>1. Data Collection</h2>
          <p>
            Personal Data: We do not currently allow user registration. We do not store your name, email, or physical address unless you voluntarily submit them (e.g., waiting list).
          </p>
          <p>
            Usage Data: We use anonymous analytics to track which supplements are trending. This data is aggregated and cannot trace back to your specific device identity.
          </p>

          <h2>2. Cookies</h2>
          <p>
            We use minimal cookies necessary for site function (e.g., remembering your comparison list).
            Third-party services (like Amazon) may place cookies when you click an outbound link. We do not control Amazon's surveillance grid.
          </p>

          <h2>3. Third-Party Links</h2>
          <p>
            This site contains links to other websites (Amazon, 1mg, etc.). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us.
          </p>

          <h2>4. Security</h2>
          <p>
            We adhere to standard encryption protocols (HTTPS/TLS). However, remember that no method of transmission over the internet is 100% secure.
          </p>

          <div className="p-6 bg-hacker-green/5 border border-hacker-green/20 rounded-lg mt-8">
            <h3 className="text-hacker-green font-bold mt-0">Contact Us</h3>
            <p className="mb-0 text-sm">
              If you have questions about this Privacy Policy, please contact us via our encrypted channels or email: <span className="text-white">bodybiohacker@protonmail.com</span>
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500">
           Last Updated: 2025-01-11 // System_Log_ID: PRIV_002
        </div>

      </div>
    </div>
  );
}
