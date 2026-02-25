"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { BLOG_POSTS, type BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/cn";

const POSTS_PER_PAGE = 9;

interface BlogFeedClientProps {
  posts?: BlogPost[];
}

export function BlogFeedClient({
  posts = BLOG_POSTS.filter((post) => post.status === "published"),
}: BlogFeedClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags) {
        tagSet.add(tag);
      }
    }
    return Array.from(tagSet);
  }, [posts]);

  const { filteredPosts, paginatedPosts, pages } = useMemo(() => {
    let nextFiltered = [...posts];
    if (selectedTag) {
      nextFiltered = nextFiltered.filter((post) => post.tags.includes(selectedTag));
    }

    nextFiltered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const totalPages = Math.ceil(nextFiltered.length / POSTS_PER_PAGE);
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;

    return {
      filteredPosts: nextFiltered,
      paginatedPosts: nextFiltered.slice(start, end),
      pages: totalPages,
    };
  }, [posts, selectedTag, page]);

  function handleTagChange(tag: string | null) {
    setSelectedTag(tag);
    setPage(1);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        onTagChange={handleTagChange}
      />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4 text-brand/30"
            aria-hidden="true"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <p
            className={cn(
              "text-lg font-medium mb-2",
              "text-light-text dark:text-dark-text"
            )}
          >
            אין פוסטים להצגה
          </p>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {selectedTag
              ? "לא נמצאו פוסטים עם התגית הנבחרת. נסה תגית אחרת."
              : "עדיין לא פורסמו פוסטים. חזור בקרוב."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {pages > 1 && (
            <nav
              aria-label="ניווט בין עמודים"
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
                aria-label="עמוד קודם"
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
                  page <= 1
                    ? "opacity-50 cursor-not-allowed bg-light-bg-secondary/60 dark:bg-white/5 text-light-text-secondary dark:text-dark-text-secondary"
                    : cn(
                        "bg-light-bg-secondary/60 dark:bg-white/5",
                        "text-light-text dark:text-dark-text",
                        "border border-brand/10",
                        "hover:bg-brand/10 hover:text-brand"
                      )
                )}
              >
                הקודם
              </button>

              <span
                className={cn(
                  "text-sm",
                  "text-light-text-secondary dark:text-dark-text-secondary"
                )}
              >
                עמוד {page} מתוך {pages}
              </span>

              <button
                onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                disabled={page >= pages}
                aria-label="עמוד הבא"
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  "focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none",
                  page >= pages
                    ? "opacity-50 cursor-not-allowed bg-light-bg-secondary/60 dark:bg-white/5 text-light-text-secondary dark:text-dark-text-secondary"
                    : cn(
                        "bg-light-bg-secondary/60 dark:bg-white/5",
                        "text-light-text dark:text-dark-text",
                        "border border-brand/10",
                        "hover:bg-brand/10 hover:text-brand"
                      )
                )}
              >
                הבא
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
