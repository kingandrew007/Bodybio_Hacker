"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export function StarInput({ onRate }: { onRate: (rating: number) => void }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              star <= (hover || rating)
                ? "fill-hacker-green text-hacker-green shadow-[0_0_10px_#00ff41]"
                : "text-gray-600"
            }`}
          />
        </button>
      ))}
      <input type="hidden" name="rating" value={rating} />
    </div>
  );
}