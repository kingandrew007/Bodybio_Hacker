"use client";

import { createProduct } from "@/app/actions/product-actions";
import { Button } from "@/components/ui/Button";
import { Upload, Database, Activity, Tag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function ProductUploader() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createProduct(formData);
    setLoading(false);

    if (result.success) {
      toast.success(result.message, { icon: <Database className="text-hacker-green" /> });
      // In a real app, you'd reset the form here
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="border border-white/10 bg-black p-8 rounded-xl max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
        <Upload className="text-hacker-green w-6 h-6 animate-pulse" />
        <h2 className="text-xl font-mono font-bold text-white">INJECT_NEW_ASSET</h2>
      </div>

      <form action={handleSubmit} className="space-y-8 relative z-10">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup label="PRODUCT NAME" name="name" placeholder="e.g. MuscleBlaze Biozyme" />
          <InputGroup label="BRAND IDENTITY" name="brand" placeholder="e.g. MuscleBlaze" />
        </div>

        {/* ROW 2: FLEXIBLE CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* THE FIX: Standard Input, Type Whatever You Want */}
           <InputGroup 
             label="CATEGORY TAG (CUSTOM)" 
             name="category" 
             placeholder="Type ANY category (e.g. Pre-Workout, Gear)" 
             icon={<Tag className="w-3 h-3 text-hacker-green" />}
           />
           <InputGroup label="MARKET PRICE (INR)" name="price" type="number" placeholder="2499" />
        </div>

        {/* ROW 3: METRICS */}
        <div className="p-6 border border-hacker-green/20 bg-hacker-green/5 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-hacker-green text-xs font-mono font-bold mb-2 uppercase tracking-widest">
            <Activity className="w-4 h-4" /> Lab Analysis Metrics
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <InputGroup label="SCORE (0-10)" name="score" type="number" step="0.1" placeholder="8.5" />
             <InputGroup label="ACTIVE MG (PER SERVING)" name="active" type="number" placeholder="25" />
             <InputGroup label="SERVING SIZE (MG)" name="total" type="number" placeholder="33" />
          </div>
        </div>

        {/* ROW 4 */}
        <InputGroup label="IMAGE PATH (PUBLIC)" name="image" placeholder="/images/products/my-new-product.webp" />
        
        <div>
           <label className="text-xs font-mono text-gray-500 mb-1 block uppercase tracking-wider">Analysis Summary</label>
           <textarea 
             name="description" 
             rows={4} 
             className="w-full bg-gray-900 border border-gray-700 rounded p-4 text-white focus:border-hacker-green focus:ring-1 focus:ring-hacker-green focus:outline-none font-mono text-sm placeholder:text-gray-600" 
             placeholder="Enter lab findings..." 
           />
        </div>

        <Button disabled={loading} className="w-full bg-hacker-green text-black font-bold h-14 hover:bg-white hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(0,255,65,0.3)]">
          {loading ? "UPLOADING PACKET..." : "DEPLOY TO DATABASE"}
        </Button>
      </form>
    </div>
  );
}

// ------------------------------------
// UI HELPER: Forces Dark Colors
// ------------------------------------
function InputGroup({ label, name, type = "text", placeholder, step, icon }: any) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider group-focus-within:text-hacker-green transition-colors">
        {icon} {label}
      </label>
      <input 
        type={type} 
        name={name}
        step={step}
        // FIXED COLORS: bg-gray-900 and text-white ensures it's readable
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-hacker-green focus:ring-1 focus:ring-hacker-green focus:outline-none font-mono text-sm transition-all placeholder:text-gray-600"
        placeholder={placeholder}
        required 
      />
    </div>
  );
}