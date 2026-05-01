import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/layout/Header";
import HeroSummary from "@/components/sections/HeroSummary";
import Achievements from "@/components/sections/Achievements";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { CinematicFooter } from "@/components/layout/motion-footer";
import { BLOG_POSTS } from "@/lib/blog-data";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Sabit Kadli — Business Analyst, IT Consultant & Full-Stack Developer",
  description:
    "5+ years bridging business and technology: CRM systems, data migration, API integration, 3D web experiences, and automation. Melbourne · Bengaluru · Dubai.",
};

// Lazy-load with SSR disabled — canvas requires window/document
const ParticleCanvas = dynamic(
  () => import("@/components/layout/ParticleCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Fixed particle background — behind all content */}
      <ParticleCanvas />

      {/* Skip-to-content link for keyboard users */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="relative z-10 overflow-x-hidden">
        <HeroSummary />
        <Achievements />
        <Skills />
        <Timeline />
        <Testimonials />

        {/* Blog teaser — 3 latest articles */}
        <section
          id="writing"
          aria-labelledby="writing-heading"
          className="relative z-10 py-16"
        >
          <div className="mx-auto max-w-6xl px-6">
            <FadeInOnScroll>
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                    Writing
                  </p>
                  <h2
                    id="writing-heading"
                    className="text-2xl font-bold tracking-tight text-foreground"
                  >
                    Technical Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  All articles →
                </Link>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll stagger className="grid gap-5 md:grid-cols-3">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="animate-on-scroll group flex flex-col rounded-xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
                >
                  <span className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="flex-1 text-xs leading-relaxed text-muted-foreground/80">
                    {post.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground/50">{post.readTime}</p>
                </Link>
              ))}
            </FadeInOnScroll>
          </div>
        </section>

        <Contact />
      </main>

      <CinematicFooter />
    </>
  );
}
