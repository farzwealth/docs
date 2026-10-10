import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Lock,
  Terminal,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="page-enter flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24 text-center max-w-4xl mx-auto w-full">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center">
        <Image
          src="/assets/logo.png"
          alt="Farz Logo"
          width={52}
          height={52}
          className="rounded-xl border border-fd-border"
          priority
        />
      </div>

      {/* Version Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-muted/50 px-3 py-1 text-xs text-fd-muted-foreground">
        <span>Farz Developer API v1</span>
        <span>•</span>
        <span>Model Context Protocol</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fd-foreground mb-4">
        Farz Documentation
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-fd-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
        Official developer guides and API reference for Farz Wealth. Programmatically query accounts,
        transactions, investment portfolios, and connect AI assistants via MCP.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-lg bg-fd-foreground text-fd-background px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        >
          <span>Get Started</span>
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/docs/quickstart"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
        >
          <span>Quickstart</span>
        </Link>
        <Link
          href="/docs/mcp"
          className="inline-flex items-center gap-2 rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
        >
          <span>MCP Setup</span>
        </Link>
        <a
          href="https://farz.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          <span>Farz App</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Simple Code Preview */}
      <div className="w-full mb-14 overflow-hidden rounded-xl border border-fd-border bg-fd-card text-left font-mono text-xs">
        <div className="flex items-center justify-between border-b border-fd-border bg-fd-muted/40 px-4 py-2 text-fd-muted-foreground">
          <span>GET /api/developer/v1/accounts</span>
          <span>200 OK</span>
        </div>
        <div className="p-4 bg-fd-card/50 overflow-x-auto text-fd-foreground leading-relaxed whitespace-pre">
          {`curl -X GET "https://api.farz.app/api/developer/v1/accounts" \\
  -H "Authorization: Bearer $FARZ_API_KEY" \\
  -H "Accept: application/json"`}
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-left">
        <Link
          href="/docs/quickstart"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <Terminal className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">Quickstart Guide</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Create your Clerk User API key and make your first authenticated request in 5 minutes.
          </p>
        </Link>

        <Link
          href="/docs/api/overview"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <Code2 className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">REST API Reference</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Explore all 15 endpoints for accounts, transactions, investments, and reports.
          </p>
        </Link>

        <Link
          href="/docs/mcp"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <Cpu className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">Model Context Protocol</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Connect Claude Desktop, Cursor, and custom AI agents via Streamable HTTP.
          </p>
        </Link>

        <Link
          href="/docs/working-with-data"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <Layers className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">Working with Data</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Understand cursor-based pagination, date filtering, and decimal precision models.
          </p>
        </Link>

        <Link
          href="/docs/oauth"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <Lock className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">OAuth 2.0 & PKCE</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Integrate third-party applications with protected-resource discovery and rotating tokens.
          </p>
        </Link>

        <Link
          href="/docs/developer/examples"
          className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:bg-fd-accent/40 hover:border-fd-foreground/20"
        >
          <div className="flex items-center justify-between mb-3">
            <BookOpen className="size-4 text-fd-foreground" />
            <ArrowUpRight className="size-3.5 text-fd-muted-foreground" />
          </div>
          <h2 className="text-sm font-semibold text-fd-foreground mb-1">Code Examples</h2>
          <p className="text-xs text-fd-muted-foreground leading-relaxed">
            Runnable Python (httpx + Decimal) and TypeScript code samples with full typing.
          </p>
        </Link>
      </div>
    </main>
  );
}
