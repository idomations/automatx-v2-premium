import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { BlogPost } from "@/data/blog-posts";

interface PostCardProps {
  post: BlogPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-light-bg-secondary/60 dark:bg-white/5",
        "backdrop-blur-md",
        "border border-brand/10 dark:border-brand/10",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg hover:shadow-brand/10 hover:border-brand/20",
        "focus-within:ring-2 focus-within:ring-brand focus-within:outline-none"
      )}
    >
      {/* Featured image placeholder */}
      <div
        className={cn(
          "w-full h-48 flex items-center justify-center",
          "bg-brand/5 dark:bg-brand/5"
        )}
        aria-hidden="true"
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        )}
      </div>

      <div className="p-5">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3" aria-label="תגיות">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "text-xs px-2.5 py-0.5 rounded-full",
                  "bg-brand/10 text-brand",
                  "border border-brand/20"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "text-lg font-bold mb-2 leading-tight",
            "text-light-text dark:text-dark-text"
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p
          className={cn(
            "text-sm leading-relaxed mb-4 line-clamp-3",
            "text-light-text-secondary dark:text-dark-text-secondary"
          )}
        >
          {post.excerpt}
        </p>

        {/* Date */}
        <time
          dateTime={post.publishedAt}
          className={cn(
            "text-xs",
            "text-light-text-secondary dark:text-dark-text-secondary"
          )}
        >
          {formatDate(post.publishedAt)}
        </time>
      </div>
    </article>
  );
}
