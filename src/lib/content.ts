import { cache } from "react";
import { BLOG_POSTS, type BlogPost } from "@/data/blog-posts";
import {
  FALLBACK_PROJECTS,
  type ProjectCaseStudy,
} from "@/data/projects";

function sortPostsByPublishedAt(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return sortPostsByPublishedAt(
    BLOG_POSTS.filter((post) => post.status === "published")
  );
});

export const getPublishedBlogPostBySlug = cache(
  async (slug: string): Promise<BlogPost | undefined> => {
    return BLOG_POSTS.find(
      (post) => post.slug === slug && post.status === "published"
    );
  }
);

export const getPublishedBlogSlugs = cache(async (): Promise<string[]> => {
  return BLOG_POSTS.filter((post) => post.status === "published").map(
    (post) => post.slug
  );
});

export const getBlogLastModifiedMap = cache(
  async (): Promise<Record<string, string>> => {
    return BLOG_POSTS.filter((post) => post.status === "published").reduce<
      Record<string, string>
    >((acc, post) => {
      acc[post.slug] = post.updatedAt;
      return acc;
    }, {});
  }
);

export const getPublicProjects = cache(
  async (): Promise<ProjectCaseStudy[]> => {
    return FALLBACK_PROJECTS;
  }
);
