import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, type BlogSection } from "@/lib/blog-data";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Sabit Kadli"],
      tags: post.tags,
    },
  };
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mb-4 mt-10 text-xl font-bold tracking-tight text-foreground"
        >
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mb-3 mt-8 text-base font-bold text-foreground"
        >
          {section.content as string}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="mb-5 text-base leading-relaxed text-muted-foreground"
        >
          {section.content as string}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="mb-6 space-y-2">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "highlight":
      return (
        <div
          key={index}
          className="mb-6 rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 text-sm text-muted-foreground"
        >
          {section.content as string}
        </div>
      );
    case "metric":
      return (
        <div
          key={index}
          className="mb-6 rounded-xl border border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5 px-6 py-5"
        >
          <p className="text-sm font-semibold text-[var(--accent-green)]">
            {section.content as string}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

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
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary rounded">
                  ← All Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Article header */}
        <header className="mb-10">
          <span className={`mb-3 block text-[10px] font-bold uppercase tracking-widest ${post.categoryColor}`}>
            {post.category}
          </span>
          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>
          <p className="mb-6 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/60">
            <span>
              By{" "}
              <span className="font-semibold text-muted-foreground">Sabit Kadli</span>
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-AU", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Divider */}
        <div className="mb-10 h-px bg-border/40" />

        {/* Article body */}
        <article>
          {post.sections.map((section, i) => renderSection(section, i))}
        </article>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border/40 pt-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/50 bg-accent/40 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <p className="mb-1 text-sm font-bold text-foreground">Enjoyed this article?</p>
          <p className="mb-4 text-sm text-muted-foreground">
            I write about the intersection of business analysis, API architecture, and full-stack delivery.{" "}
            Reach out if you want to talk through a problem.
          </p>
          <a
            href="mailto:jobs@sabitkadli.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Get in touch
          </a>
        </div>

        {/* More posts */}
        {otherPosts.length > 0 && (
          <section className="mt-16" aria-labelledby="more-posts">
            <h2 id="more-posts" className="mb-6 text-lg font-bold text-foreground">
              More Articles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-xl border border-border/50 bg-card/60 p-5 transition-all hover:border-primary/30 hover:bg-card/80"
                >
                  <span className={`mb-2 block text-[10px] font-bold uppercase tracking-widest ${p.categoryColor}`}>
                    {p.category}
                  </span>
                  <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
