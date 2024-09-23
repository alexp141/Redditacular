"use client";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

export default function FavoriteStar({ className }: { className?: boolean }) {
  return (
    <StarIcon
      className={cn(className)}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}
