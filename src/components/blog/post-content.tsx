"use client";

import DOMPurify from "isomorphic-dompurify";
import { cn } from "@/lib/cn";

interface PostContentProps {
  content: string;
  className?: string;
}

/**
 * Renders blog post HTML content in a styled prose container.
 * Content is sanitized with DOMPurify to prevent XSS attacks.
 */
export function PostContent({ content, className }: PostContentProps) {
  const sanitized = DOMPurify.sanitize(content, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  return (
    <div
      className={cn("blog-prose", className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
