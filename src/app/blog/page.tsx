import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog — Insights on CRM, API Integration & Full-Stack Development",
  description:
    "Technical articles by Sabit Kadli on API integration, CRM data migration, Genesys Cloud IVR design, business analysis, and React Three Fiber — drawn from real production experience.",
};

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md" role="banner">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <nav aria-label="Blog navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium list-none p-0 m-0">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
                  ← Portfolio
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
                  CV / Resume
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
                  Skill Games
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Intro */}
        <header className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
            Writing
          </p>
          <h1 className="mb-4 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Technical Articles
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            Practical insights from real projects — API integration, CRM migration, contact centre design, and full-stack development. No theory, just what worked and what didn&apos;t.
          </p>
        </header>

        {/* Post grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {/* Category */}
              <span className={`mb-3 text-[10px] font-bold uppercase tracking-widest ${post.categoryColor}`}>
                {post.category}
              </span>

              {/* Title */}
              <h2 className="mb-3 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground/60">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-border/40 pt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
            ← Return to Portfolio
          </Link>
        </footer>
      </main>
    </div>
  );
}
