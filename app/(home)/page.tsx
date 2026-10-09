import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  Coins,
  Cpu,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-20">
      {/* Background Glow Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-20 sm:left-[calc(50%-20rem)] sm:w-[60rem]"
        />
      </div>

      {/* Hero Announcement Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card/70 px-3.5 py-1.5 text-xs font-medium text-fd-foreground shadow-xs backdrop-blur-md transition-colors hover:border-fd-primary/50">
        <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-fd-muted-foreground">Farz Developer API v1</span>
        <span className="text-fd-border">•</span>
        <span className="flex items-center gap-1 font-semibold text-fd-primary">
          Remote MCP Server Live
          <ArrowRight className="size-3" />
        </span>
      </div>

      {/* Hero Logo & Titles */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-30 blur-2xl" />
        <div className="relative rounded-2xl border border-fd-border/60 bg-fd-card/90 p-2 shadow-xl backdrop-blur-sm">
          <Image
            src="/assets/logo.png"
            alt="Farz Logo"
            width={64}
            height={64}
            className="rounded-xl drop-shadow-md"
            priority
          />
        </div>
      </div>

      <h1 className="max-w-3xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-5">
        The Developer Platform for{' '}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Modern Wealth
        </span>
      </h1>

      <p className="max-w-2xl text-center text-base sm:text-lg text-fd-muted-foreground mb-8 leading-relaxed">
        Programmatic access to your multi-currency accounts, investment portfolios, liabilities,
        and double-entry ledger. Integrate custom scripts or connect AI assistants via the Model Context Protocol.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-md transition-all hover:bg-fd-primary/90 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Explore Documentation</span>
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/docs/quickstart"
          className="inline-flex items-center gap-2 rounded-xl border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-semibold text-fd-foreground shadow-xs transition-all hover:bg-fd-accent hover:border-fd-border/80"
        >
          <Zap className="size-4 text-amber-500" />
          <span>5-Min Quickstart</span>
        </Link>
        <Link
          href="/docs/mcp"
          className="inline-flex items-center gap-2 rounded-xl border border-fd-border bg-fd-card px-5 py-2.5 text-sm font-semibold text-fd-foreground shadow-xs transition-all hover:bg-fd-accent hover:border-fd-border/80"
        >
          <Sparkles className="size-4 text-purple-500" />
          <span>MCP Setup</span>
        </Link>
        <a
          href="https://farz.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-fd-border bg-fd-card/40 px-4 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground hover:bg-fd-accent"
        >
          <span>Farz Web App</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Interactive Code Preview Window */}
      <div className="mb-16 w-full max-w-4xl overflow-hidden rounded-2xl border border-fd-border/80 bg-fd-card/90 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-fd-border/60 bg-fd-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-fd-muted-foreground">
              GET /api/developer/v1/accounts
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-fd-muted-foreground">
            <span className="rounded bg-fd-card px-2 py-0.5 border border-fd-border">200 OK</span>
            <span>42ms</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-fd-border/60 font-mono text-xs text-left">
          {/* Request Side */}
          <div className="p-4 bg-fd-card/50 overflow-x-auto">
            <div className="text-[11px] font-bold text-fd-muted-foreground uppercase tracking-wider mb-2">
              Request
            </div>
            <pre className="text-fd-foreground leading-relaxed whitespace-pre">
              <span className="text-blue-500 font-semibold">curl</span> -X GET \<br />
              {'  '}https://api.farz.app/api/developer/v1/accounts \<br />
              {'  '}-H <span className="text-emerald-500">&quot;Authorization: Bearer $FARZ_API_KEY&quot;</span> \<br />
              {'  '}-H <span className="text-emerald-500">&quot;Accept: application/json&quot;</span>
            </pre>
          </div>

          {/* Response Side */}
          <div className="p-4 bg-fd-card/30 overflow-x-auto">
            <div className="text-[11px] font-bold text-fd-muted-foreground uppercase tracking-wider mb-2">
              Response (Exact Decimal Precision)
            </div>
            <pre className="text-fd-foreground leading-relaxed whitespace-pre">
              {`{
  "items": [
    {
      "id": "acc_01J8F9E4Z...",
      "name": "Primary Treasury",
      "kind": "checking",
      "balance": {
        "amount": "142500.50",
        "currency": "USD"
      }
    }
  ],
  "has_more": false
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Core Capabilities Pillars */}
      <div className="mb-16 w-full max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Engineered for Precision & Intelligence
          </h2>
          <p className="text-sm sm:text-base text-fd-muted-foreground max-w-xl mx-auto">
            Built from first principles for programmatic financial workflows, custom portfolios, and autonomous agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {/* Pillar 1 */}
          <div className="group relative rounded-2xl border border-fd-border bg-fd-card/50 p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card shadow-xs">
            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 mb-4 transition-colors group-hover:bg-blue-500 group-hover:text-white">
              <Code2 className="size-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">15 REST Endpoints</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              Access accounts, itemized transactions, asset lots, debt amortization schedules, and net worth history with stable cursor pagination.
            </p>
            <Link
              href="/docs/api/overview"
              className="inline-flex items-center gap-1 text-xs font-semibold text-fd-primary hover:underline"
            >
              <span>Explore API Reference</span>
              <ChevronSmallRight className="size-3" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="group relative rounded-2xl border border-fd-border bg-fd-card/50 p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card shadow-xs">
            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-4 transition-colors group-hover:bg-purple-500 group-hover:text-white">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Model Context Protocol</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              Native Streamable HTTP server allows Claude Desktop, Cursor, and custom agent workflows to inspect balances and ask financial questions safely.
            </p>
            <Link
              href="/docs/mcp"
              className="inline-flex items-center gap-1 text-xs font-semibold text-fd-primary hover:underline"
            >
              <span>Connect MCP Client</span>
              <ChevronSmallRight className="size-3" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="group relative rounded-2xl border border-fd-border bg-fd-card/50 p-6 transition-all hover:border-fd-primary/50 hover:bg-fd-card shadow-xs">
            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <Coins className="size-5" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Zero Precision Loss</h3>
            <p className="text-sm text-fd-muted-foreground leading-relaxed mb-4">
              All financial values are strictly serialized as arbitrary-precision decimal strings. Avoid IEEE-754 floating-point errors across 11 native currencies.
            </p>
            <Link
              href="/docs/concepts/conventions"
              className="inline-flex items-center gap-1 text-xs font-semibold text-fd-primary hover:underline"
            >
              <span>Currency Conventions</span>
              <ChevronSmallRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Architecture & Security Feature Strip */}
      <div className="mb-16 w-full max-w-5xl rounded-2xl border border-fd-border bg-fd-card/40 p-6 sm:p-8 backdrop-blur-sm text-left">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-fd-primary">
            Security & Compliance
          </span>
          <h3 className="text-xl font-bold tracking-tight mt-1">
            Built with strict safeguards for personal wealth data
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Strict Read-Only Access</h4>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Tokens and MCP tools can query records, but can never initiate transfers, execute trades, or move money.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">OAuth 2.0 with PKCE S256</h4>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                RFC 8414 discovery, rotating single-use refresh tokens, and granular permission scopes for applications.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="size-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold mb-1">Own-Data Boundary</h4>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                Multi-user household and joint accounts are shielded to guarantee complete data isolation for private keys.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Jump Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full text-left">
        <Link
          href="/docs/quickstart"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-4 transition-all hover:border-fd-primary/50 hover:bg-fd-card hover:-translate-y-0.5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="size-4 text-fd-primary" />
            <ArrowUpRight className="size-3 text-fd-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">Quickstart</h3>
          <p className="text-xs text-fd-muted-foreground">
            Get your Clerk API key and execute your first curl request in minutes.
          </p>
        </Link>

        <Link
          href="/docs/working-with-data"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-4 transition-all hover:border-fd-primary/50 hover:bg-fd-card hover:-translate-y-0.5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <Layers className="size-4 text-fd-primary" />
            <ArrowUpRight className="size-3 text-fd-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">Working with Data</h3>
          <p className="text-xs text-fd-muted-foreground">
            Master cursor pagination, date filtering, and summary aggregation.
          </p>
        </Link>

        <Link
          href="/docs/developer/examples"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-4 transition-all hover:border-fd-primary/50 hover:bg-fd-card hover:-translate-y-0.5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <Terminal className="size-4 text-fd-primary" />
            <ArrowUpRight className="size-3 text-fd-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">Code Examples</h3>
          <p className="text-xs text-fd-muted-foreground">
            Copy-paste Python (httpx + Decimal) and TypeScript fetch templates.
          </p>
        </Link>

        <Link
          href="/llms.txt"
          className="rounded-xl border border-fd-border bg-fd-card/50 p-4 transition-all hover:border-fd-primary/50 hover:bg-fd-card hover:-translate-y-0.5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="size-4 text-fd-primary" />
            <ArrowUpRight className="size-3 text-fd-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">AI & LLMs</h3>
          <p className="text-xs text-fd-muted-foreground">
            Feed clean markdown documentation into agents via llms.txt.
          </p>
        </Link>
      </div>
    </main>
  );
}

function ChevronSmallRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
