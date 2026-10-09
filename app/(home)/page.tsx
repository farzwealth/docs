import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BookOpen,
  Building2,
  CheckCircle2,
  Code2,
  Coins,
  CreditCard,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wallet,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 md:py-20 text-center">
      {/* Ambient Radial Mesh Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div className="aspect-1155/678 w-[42rem] bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/25 dark:from-blue-600/15 dark:via-indigo-500/15 dark:to-purple-600/20" />
      </div>

      {/* Farz Eyebrow Status Badge (Authentic Liquid Glass Pill from /assets) */}
      <Link
        href="/docs"
        className="farz-liquid-glass group mb-6 px-3.5 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 gap-2.5 transition-transform hover:scale-[1.02]"
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <Zap className="size-3 fill-current" />
        </span>
        <span>Fast, Reliable, and Always On</span>
        <span className="text-zinc-300 dark:text-zinc-600">•</span>
        <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
          Developer API v1
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      {/* Logo Display */}
      <div className="relative mb-6 flex items-center justify-center">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 opacity-25 dark:opacity-40 blur-2xl" />
        <div className="relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 p-2.5 shadow-xl backdrop-blur-md">
          <Image
            src="/assets/logo.png"
            alt="Farz Logo"
            width={64}
            height={64}
            className="rounded-xl drop-shadow-sm"
            priority
          />
        </div>
      </div>

      {/* Hero Typography */}
      <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4 text-zinc-900 dark:text-white leading-[1.15]">
        Your entire financial life,{' '}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
          on autopilot.
        </span>
      </h1>

      <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
        Navigate your finances with confidence. Programmatic access to spending, budgets,
        investment portfolios, liabilities, net worth, and autonomous AI assistant integrations.
      </p>

      {/* Action Buttons (Authentic Farz Button Hierarchy) */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
        <Link
          href="/docs"
          className="farz-btn-primary px-6 py-3 text-sm font-semibold gap-2 shadow-lg"
        >
          <span>Explore Documentation</span>
          <ArrowRight className="size-4" />
        </Link>

        <Link
          href="/docs/quickstart"
          className="farz-btn-white px-5 py-3 text-sm font-semibold gap-2"
        >
          <Terminal className="size-4 text-zinc-700 dark:text-zinc-900" />
          <span>How It Works</span>
        </Link>

        <Link
          href="/docs/mcp"
          className="farz-btn-dark px-5 py-3 text-sm font-semibold gap-2"
        >
          <Sparkles className="size-4 text-purple-400" />
          <span>MCP Setup</span>
        </Link>

        <a
          href="https://farz.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-4 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <span>Farz Web App</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>

      {/* Hero Showcase Container: Interactive Dot-Grid Asset Hub + Code Preview */}
      <div className="farz-card mb-20 w-full max-w-4xl overflow-hidden text-left">
        {/* Upper Preview Area: Farz Multi-Asset Flow (Dot Grid Canvas) */}
        <div className="farz-dot-grid relative border-b border-zinc-200/80 dark:border-zinc-800 p-8 sm:p-12 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Double-Entry Financial Architecture
            </span>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mt-1">
              Consolidated Multi-Asset Intelligence
            </h3>
          </div>

          {/* 4 Multi-Asset Squircles with Glossy Glows and Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center relative z-10">
            {/* Cash / Checking */}
            <div className="flex flex-col items-center gap-3">
              <div className="farz-squircle farz-squircle-blue size-16 sm:size-20">
                <Wallet className="size-8 sm:size-9 text-white drop-shadow-md" />
              </div>
              <span className="farz-pill-cyan px-3 py-1 text-xs font-semibold">
                Cash Treasury
              </span>
            </div>

            {/* Real Estate */}
            <div className="flex flex-col items-center gap-3">
              <div className="farz-squircle farz-squircle-purple size-16 sm:size-20">
                <Building2 className="size-8 sm:size-9 text-white drop-shadow-md" />
              </div>
              <span className="farz-pill-violet px-3 py-1 text-xs font-semibold">
                Real Estate
              </span>
            </div>

            {/* Crypto / Investments */}
            <div className="flex flex-col items-center gap-3">
              <div className="farz-squircle farz-squircle-gold size-16 sm:size-20">
                <Coins className="size-8 sm:size-9 text-white drop-shadow-md" />
              </div>
              <span className="farz-pill-orange px-3 py-1 text-xs font-semibold">
                Investments
              </span>
            </div>

            {/* Liabilities */}
            <div className="flex flex-col items-center gap-3">
              <div className="farz-squircle farz-squircle-cyan size-16 sm:size-20">
                <CreditCard className="size-8 sm:size-9 text-white drop-shadow-md" />
              </div>
              <span className="inline-flex items-center rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 px-3 py-1 text-xs font-semibold shadow-sm">
                Liabilities
              </span>
            </div>
          </div>
        </div>

        {/* Lower Preview Area: Live API Split Terminal */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80 inline-block" />
              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                GET /api/developer/v1/accounts
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span className="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 font-semibold">
                200 OK
              </span>
              <span>42ms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200/80 dark:divide-zinc-800 font-mono text-xs">
            {/* Request */}
            <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-x-auto">
              <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                cURL Request
              </div>
              <pre className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">curl</span> -X GET \<br />
                {'  '}https://api.farz.app/api/developer/v1/accounts \<br />
                {'  '}-H <span className="text-emerald-600 dark:text-emerald-400">&quot;Authorization: Bearer $FARZ_API_KEY&quot;</span> \<br />
                {'  '}-H <span className="text-emerald-600 dark:text-emerald-400">&quot;Accept: application/json&quot;</span>
              </pre>
            </div>

            {/* Response */}
            <div className="p-5 bg-white dark:bg-zinc-950 overflow-x-auto">
              <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                Response (Exact Decimal String)
              </div>
              <pre className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre">
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
      </div>

      {/* Component & Architecture Showcase Cards (Modeled after /assets cards) */}
      <div className="mb-20 w-full max-w-5xl text-left">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Core Foundations
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-1">
            Every capability, built for precision.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mt-2">
            The complete developer toolkit — 15 REST endpoints, Model Context Protocol tools, and exact decimal math.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: REST API */}
          <div className="farz-card overflow-hidden flex flex-col justify-between">
            <div className="farz-dot-grid p-6 bg-zinc-50/60 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center min-h-[140px]">
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Code2 className="size-4" />
                </div>
                <div>
                  <div className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    GET /accounts
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono">15 endpoints • v1</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">
                15 REST Endpoints
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Query checking, investments, lot-level cost basis, loan schedules, and net worth reports with cursor pagination.
              </p>
              <Link
                href="/docs/api/overview"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>View API Reference</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Card 2: MCP Server */}
          <div className="farz-card overflow-hidden flex flex-col justify-between">
            <div className="farz-dot-grid p-6 bg-zinc-50/60 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center min-h-[140px]">
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="farz-pill-violet px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  <span>list_accounts</span>
                </span>
                <span className="farz-pill-cyan px-3 py-1.5 text-xs font-semibold">
                  get_financial_summary
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">
                Model Context Protocol
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Connect Claude Desktop, Cursor, or autonomous agents over Streamable HTTP for real-time natural language answers.
              </p>
              <Link
                href="/docs/mcp"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Connect MCP Client</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Card 3: Exact Decimal Precision */}
          <div className="farz-card overflow-hidden flex flex-col justify-between">
            <div className="farz-dot-grid p-6 bg-zinc-50/60 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center min-h-[140px]">
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 shadow-sm text-center">
                <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  USD &quot;142500.50&quot;
                </div>
                <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                  Zero Float Errors • 11 Currencies
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">
                Zero Precision Loss
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                Monetary numbers are represented as arbitrary-precision decimal strings. Avoid IEEE-754 floating-point inaccuracies.
              </p>
              <Link
                href="/docs/concepts/conventions"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Currency Conventions</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Data Boundary Feature Strip */}
      <div className="farz-card mb-20 w-full max-w-5xl p-6 sm:p-8 text-left bg-zinc-50/40 dark:bg-zinc-900/40">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Security & Compliance
          </span>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
            Built with strict safeguards for personal wealth data
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                Strict Read-Only Access
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Tokens and MCP tools can query records, but can never initiate transfers, execute trades, or move money.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                OAuth 2.0 with PKCE S256
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                RFC 8414 discovery, rotating single-use refresh tokens, and granular permission scopes for applications.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="size-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
                Own-Data Boundary
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
          className="farz-card p-4 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="size-4 text-blue-600 dark:text-blue-400" />
            <ArrowUpRight className="size-3 text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Quickstart</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Get your Clerk API key and execute your first curl request in minutes.
          </p>
        </Link>

        <Link
          href="/docs/working-with-data"
          className="farz-card p-4 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <Layers className="size-4 text-purple-600 dark:text-purple-400" />
            <ArrowUpRight className="size-3 text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Working with Data</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Master cursor pagination, date filtering, and summary aggregation.
          </p>
        </Link>

        <Link
          href="/docs/developer/examples"
          className="farz-card p-4 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <Terminal className="size-4 text-amber-600 dark:text-amber-400" />
            <ArrowUpRight className="size-3 text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Code Examples</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Copy-paste Python (httpx + Decimal) and TypeScript fetch templates.
          </p>
        </Link>

        <Link
          href="/llms.txt"
          className="farz-card p-4 transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
            <ArrowUpRight className="size-3 text-zinc-400" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">AI & LLMs</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Feed clean markdown documentation into agents via llms.txt.
          </p>
        </Link>
      </div>
    </main>
  );
}
