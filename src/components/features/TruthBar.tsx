export function TruthBar({ active, filler }: { active: number; filler: number }) {
  const total = active + filler;
  const activePercent = (active / total) * 100;

  return (
    <div className="w-full space-y-2 font-mono text-sm">
      <div className="flex justify-between text-gray-400">
        <span>Active Ingredients</span>
        <span>Fillers/Other</span>
      </div>
      <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden flex">
        {/* The "Good" Stuff */}
        <div 
          style={{ width: `${activePercent}%` }} 
          className="bg-green-500 h-full shadow-[0_0_10px_#22c55e]"
        />
        {/* The "Bad" Stuff */}
        <div 
          className="flex-1 bg-red-900/50 h-full relative"
        >
          {/* Hacker pattern overlay */}
          <div className="absolute inset-0 bg-[url('/patterns/diagonal-stripes.png')] opacity-20" />
        </div>
      </div>
    </div>
  );
}