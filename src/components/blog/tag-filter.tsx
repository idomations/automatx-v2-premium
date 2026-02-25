"use client";

import { cn } from "@/lib/cn";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function TagFilter({ tags, selectedTag, onTagChange }: TagFilterProps) {
  return (
    <nav aria-label="סינון לפי תגית" className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onTagChange(null)}
        aria-pressed={selectedTag === null}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
          selectedTag === null
            ? "bg-brand text-white"
            : cn(
                "bg-light-bg-secondary/60 dark:bg-white/5",
                "text-light-text-secondary dark:text-dark-text-secondary",
                "border border-brand/10",
                "hover:bg-brand/10 hover:text-brand"
              )
        )}
      >
        הכל
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          aria-pressed={selectedTag === tag}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
            selectedTag === tag
              ? "bg-brand text-white"
              : cn(
                  "bg-light-bg-secondary/60 dark:bg-white/5",
                  "text-light-text-secondary dark:text-dark-text-secondary",
                  "border border-brand/10",
                  "hover:bg-brand/10 hover:text-brand"
                )
          )}
        >
          {tag}
        </button>
      ))}
    </nav>
  );
}
