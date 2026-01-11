export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-hacker-green/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-hacker-green rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-4 border-4 border-b-white rounded-full animate-spin-reverse"></div>
        </div>
        
        {/* Text Animation */}
        <div className="space-y-1 text-center">
            <h2 className="text-hacker-green font-bold text-xl animate-pulse">SYSTEM_LOADING</h2>
            <div className="flex gap-1 justify-center text-xs text-gray-500">
                <span>[</span>
                <span className="animate-[pulse_1s_infinite]">|</span>
                <span className="animate-[pulse_1.2s_infinite]">|</span>
                <span className="animate-[pulse_1.4s_infinite]">|</span>
                <span>]</span>
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-2">Decrypting Data Stream...</p>
        </div>
      </div>
    </div>
  );
}
