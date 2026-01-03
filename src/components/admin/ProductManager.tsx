"use client";

import { useEffect, useState } from "react";
import { getAdminProducts, deleteProduct } from "@/app/actions/product-actions";
import { Button } from "@/components/ui/Button";
import { Trash2, Edit, RefreshCw, PackageX } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Logic
  async function loadData() {
    setLoading(true);
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (error) {
      toast.error("FAILED_TO_FETCH_INVENTORY");
    } finally {
      setLoading(false);
    }
  }

  // Initial Load
  useEffect(() => {
    loadData();
  }, []);

  // Delete Logic
  async function handleDelete(id: string) {
    if (!confirm("CONFIRM TERMINATION? This action cannot be undone.")) return;
    
    const res = await deleteProduct(id);
    if (res.success) {
      toast.success("ASSET_DELETED", { icon: <PackageX className="text-red-500" /> });
      loadData(); // Refresh list immediately
    } else {
      toast.error("DELETION_FAILED");
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-hacker-green font-mono animate-pulse gap-2">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span>SCANNING_DATABASE...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-white/10">
         <h2 className="text-xl font-mono font-bold">ACTIVE_INVENTORY ({products.length})</h2>
         <Button onClick={loadData} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" /> REFRESH_GRID
         </Button>
      </div>

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-white/10 bg-white/5 rounded-lg hover:border-hacker-green/30 transition-all hover:bg-white/10">
            
            {/* Left: Info */}
            <div className="flex items-center gap-4">
              {/* Thumbnail Preview */}
              <div className="w-12 h-12 bg-black rounded border border-white/10 overflow-hidden relative">
                 {p.images?.thumbnail ? (
                   <Image 
                     src={p.images.thumbnail} 
                     alt={p.name} 
                     fill 
                     className="object-contain p-1"
                   />
                 ) : (
                   <div className="w-full h-full bg-gray-900" />
                 )}
              </div>

              <div>
                <div className="font-bold text-white text-lg tracking-tight">{p.name}</div>
                <div className="text-xs font-mono text-gray-500 flex gap-2">
                  <span className="uppercase">{p.brand}</span> 
                  <span className="text-hacker-green">// {p.category}</span>
                </div>
              </div>
            </div>
            
            {/* Right: Stats & Actions */}
            <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-mono text-white">₹{p.pricing?.current_price || 0}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Score: <span className={p.ratings?.overall > 8 ? "text-hacker-green" : "text-yellow-500"}>{p.ratings?.overall}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleDelete(p._id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
            <PackageX className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <div className="text-gray-500 font-mono">NO_ASSETS_FOUND_IN_SECTOR</div>
          </div>
        )}
      </div>
    </div>
  );
}