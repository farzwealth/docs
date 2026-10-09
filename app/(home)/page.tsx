import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, Terminal } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-secondary/50 px-3 py-1 text-xs text-fd-muted-foreground mb-6">
        <Sparkles className="size-3.5 text-fd-primary" />
        <span>Documentation & Developer Hub</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl">
        Explore Farz Docs
      </h1>

      <p className="text-base md:text-lg text-fd-muted-foreground max-w-xl mb-8">
        Everything you need to build, integrate, and scale with Farz. Comprehensive guides, architecture references, and API components.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm transition-colors hover:bg-fd-primary/90"
        >
          <span>Get Started</span>
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-semibold text-fd-foreground shadow-sm transition-colors hover:bg-fd-accent"
        >
          <BookOpen className="size-4" />
          <span>Quickstart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full text-left">
        <Link
          href="/docs"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-5 transition-all hover:border-fd-primary/50 hover:bg-fd-card"
        >
          <BookOpen className="size-5 text-fd-primary mb-3" />
          <h2 className="text-base font-semibold mb-1">Guides & Tutorials</h2>
          <p className="text-sm text-fd-muted-foreground">
            Step-by-step walkthroughs to understand the core workflows and architecture.
          </p>
        </Link>

        <Link
          href="/docs/components"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-5 transition-all hover:border-fd-primary/50 hover:bg-fd-card"
        >
          <Terminal className="size-5 text-fd-primary mb-3" />
          <h2 className="text-base font-semibold mb-1">Components & Syntax</h2>
          <p className="text-sm text-fd-muted-foreground">
            Explore rich interactive components like Callouts, Tabs, and Steps.
          </p>
        </Link>

        <Link
          href="/llms.txt"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-5 transition-all hover:border-fd-primary/50 hover:bg-fd-card"
        >
          <Sparkles className="size-5 text-fd-primary mb-3" />
          <h2 className="text-base font-semibold mb-1">AI & LLM Ready</h2>
          <p className="text-sm text-fd-muted-foreground">
            Access curated markdown documentation via llms.txt and llms-full.txt.
          </p>
        </Link>
      </div>
    </main>
  );
}
