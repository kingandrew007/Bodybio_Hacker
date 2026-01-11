import type { Metadata } from "next";
import { FlaskConical, Microscope, ShieldCheck, Skull } from "lucide-react";

export const metadata: Metadata = {
  title: "Lab Methodology | BodyBio Hacker",
  description: "Our rigorous testing protocol for supplements.",
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-hacker-green/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            LAB_METHODOLOGY<span className="text-hacker-green">.sys</span>
          </h1>
          <p className="text-sm text-hacker-green/80 uppercase tracking-widest">
            Protocol: Heavy_Metals // Amino_Spiking // Purity
          </p>
        </div>

        {/* Intro */}
        <div className="text-xl text-white leading-relaxed">
          <p>
            The supplement industry is unregulated. Labels are lies. 
            We do not trust "Certificates of Analysis" provided by manufacturers. 
            <span className="text-hacker-green font-bold"> We verify everything ourselves.</span>
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-8">
            <MethodCard 
                icon={FlaskConical}
                title="1. Blind Procurement"
                description="We buy products anonymously from Amazon, Flipkart, and local stores. No 'PR Samples'. No 'Golden Batches' sent by brands."
            />
            <MethodCard 
                icon={Microscope}
                title="2. Nitrogen Analysis"
                description="We use Kjeldahl and Dumas methods to determine total nitrogen content. This confirms the baseline protein quantity."
            />
            <MethodCard 
                icon={Skull}
                title="3. Heavy Metal Screen"
                description="We screen for Lead, Mercury, Arsenic, and Cadmium using ICP-MS. If it's toxic, it fails immediately."
            />
            <MethodCard 
                icon={ShieldCheck}
                title="4. Amino Spiking Check"
                description="We test for free-form amino acids (Glycine, Taurine) to ensure brands aren't inflating protein counts with cheap fillers."
            />
        </div>

        {/* Grading System */}
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-hacker-green pl-4">The Grading Algorithm</h2>
            <div className="space-y-4">
                <GradeRow grade="A+" desc="Cleanest. Matches label 100%. No heavy metals. Zero spiking." />
                <GradeRow grade="A" desc="Matches label (within 5% variance). Safe metal levels." />
                <GradeRow grade="B" desc="Matches label (within 10% variance). Minor fillers detected." />
                <GradeRow grade="C" desc="Failed label claim (>15% variance). Not recommended." />
                <GradeRow grade="F" desc="TOXIC or FAKE. Detected heavy metals or massive spiking. BIN IT." />
            </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-xs text-gray-500">
           Last Updated: 2025-01-11 // System_Log_ID: METH_003
        </div>

      </div>
    </div>
  );
}

function MethodCard({ icon: Icon, title, description }: any) {
    return (
        <div className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-hacker-green/50 transition-colors group">
            <Icon className="w-8 h-8 text-hacker-green mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
    )
}

function GradeRow({ grade, desc }: any) {
    return (
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
            <div className={`text-2xl font-bold w-12 text-center ${grade === 'F' ? 'text-red-500' : 'text-hacker-green'}`}>
                {grade}
            </div>
            <div className="text-sm text-gray-300">{desc}</div>
        </div>
    )
}
