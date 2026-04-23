"use client";
import { useState } from "react";
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
  };
  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all duration-300 ${
        liked
          ? "border-fuchsia-300/70 bg-fuchsia-400/20 text-fuchsia-100 shadow-[0_0_24px_-10px_rgba(217,70,239,0.9)]"
          : "border-cyan-300/35 bg-slate-950/60 text-slate-200 hover:-translate-y-0.5 hover:border-cyan-200/70"
      }`}
    >
      <span>{liked ? "❤" : "🤍"}</span>
      <span>{count} lượt thích</span>
    </button>
  );
}
