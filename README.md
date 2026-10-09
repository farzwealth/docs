<p align="center">
  <a href="https://farzdocs.abdulrahman-maniar.workers.dev">
    <img src="public/logo.svg" width="72" height="72" alt="Farz Logo" />
  </a>
</p>

<h1 align="center">Farz Wealth Documentation</h1>

<p align="center">
  <b>Official documentation, architecture guides, and API specifications for Farz Wealth.</b><br />
  Your entire financial life, on autopilot.
</p>

<p align="center">
  <a href="https://farzdocs.abdulrahman-maniar.workers.dev">
    <img src="https://img.shields.io/badge/Live_Site-Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Live Site" />
  </a>
  <a href="https://farz.app">
    <img src="https://img.shields.io/badge/Product-Farz_App-256AFE?style=for-the-badge" alt="Farz App" />
  </a>
  <a href="https://fumadocs.dev">
    <img src="https://img.shields.io/badge/Powered_by-Fumadocs-6366F1?style=for-the-badge" alt="Fumadocs" />
  </a>
</p>

---

## 🔗 Quick Links

- 📖 **Documentation**: [https://farzdocs.abdulrahman-maniar.workers.dev/docs](https://farzdocs.abdulrahman-maniar.workers.dev/docs)
- 🚀 **Farz App**: [https://farz.app](https://farz.app)
- 🤖 **LLMs Index**: [https://farzdocs.abdulrahman-maniar.workers.dev/llms.txt](https://farzdocs.abdulrahman-maniar.workers.dev/llms.txt)
- 📑 **LLMs Full Content**: [https://farzdocs.abdulrahman-maniar.workers.dev/llms-full.txt](https://farzdocs.abdulrahman-maniar.workers.dev/llms-full.txt)

---

## ⚡ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) & [React 19](https://react.dev/)
- **Documentation Engine**: [Fumadocs](https://fumadocs.dev/) (Fumadocs MDX, Fumadocs UI)
- **Deployment Platform**: [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext Cloudflare Adapter](https://opennext.js.org/cloudflare)
- **Caching**: Cloudflare R2 Incremental Cache (`farzdocs-opennext-cache`)
- **Styling**: Tailwind CSS v4
- **Search**: Built-in full-text search API powered by Fumadocs

---

## 📂 Project Structure

```
farzdocs/
├── app/
│   ├── (home)/              # Landing page and home layout
│   ├── docs/                # Documentation layout and MDX page handler
│   ├── api/search/          # Search route handler
│   ├── llms.txt/            # AI agent documentation index
│   └── layout.tsx           # Root layout with metadata and providers
├── content/
│   └── docs/                # Documentation MDX source files
│       ├── meta.json        # Sidebar navigation structure and ordering
│       ├── index.mdx        # Introduction doc
│       ├── getting-started.mdx
│       └── components.mdx
├── lib/
│   ├── shared.ts            # Site configuration, app name, and git info
│   ├── layout.shared.tsx    # Navbar, logo, and layout options
│   └── source.ts            # Content collections loader
├── public/                  # Static assets (logo.svg, favicon.png, social.png)
├── open-next.config.ts      # OpenNext Cloudflare configuration
└── wrangler.jsonc           # Cloudflare Workers configuration
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js 22+
- npm or pnpm

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/farzwealth/docs.git
   cd docs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

4. **Verify production build:**
   ```bash
   npm run build
   ```

---

## 📝 Writing Documentation

All documentation pages are authored in MDX under `content/docs/`:

1. Create a `.mdx` file (e.g. `content/docs/architecture.mdx`).
2. Add frontmatter with `title` and `description`:
   ```mdx
   ---
   title: Architecture
   description: Overview of Farz backend and frontend systems
   ---
   ```
3. Register the page slug in [`content/docs/meta.json`](content/docs/meta.json):
   ```json
   {
     "pages": [
       "index",
       "getting-started",
       "architecture"
     ]
   }
   ```
4. Use rich interactive components directly without extra imports: `<Callout />`, `<Cards />`, `<Tabs />`, `<Steps />`, and `<Accordions />`.

---

## 🚀 Deployment

The site is deployed to **Cloudflare Workers** using OpenNext:

```bash
# Build and deploy to Cloudflare Workers
npm run deploy
```

For local preview against the Cloudflare Workers runtime:

```bash
npm run preview
```

---

## 📄 License

Internal documentation repository for Farz Wealth. All rights reserved.
