# API documentation accuracy review — 11 October 2026

Reviewed deployed docs at https://docs.api.farz.app against https://api.farz.app/openapi.json, the verified farzwealth/Web-and-API backend contract and runtime handlers. The live schema exactly matches the backend repository contract: 132 declared paths and 160 operations. Published narrative docs instead describe an unavailable planned developer API.

| Published claim before correction | Verified current behavior |
| --- | --- |
| Paid Clerk developer-key setup and 90-day key lifecycle | Issuance is deferred; first-party requests use supported Clerk user session bearers. Farz does not use Clerk Billing. |
| `/api/developer/v1/accounts`, transactions and profile | Live probes return404; capabilities reports personal_api not_configured. |
| Working MCP and OAuth discovery/setup | `/mcp` and both advertised protected-resource discovery paths return404; MCP capability is not_configured. |
|15 read-only developer endpoints|Unified `/api/v1` declares132 paths/160 operations, including financial commands.|
|Accounts `items`/Money/base_balance/valuation envelope and universal pagination|Accounts return AccountResponse[]; balance is a string, currency is separate. Transactions use items/next_offset/next_cursor, default limit100.|
|Universal366-day range and developer cursor error codes|Constraints are route-specific; transaction cursor mismatch/expiry maps to409 CONFLICT.|
|60 user requests/minute,20 per credential, two concurrent reports|Durable shared identity buckets: read120/120, write20/30, export3/6 capacity/refill per minute.|
|All responses JSON200|Success statuses and content types are operation-specific, including account creation201 and protected CSV/HTML/JSON reports.|
|No lending reference|Actual advances, partial/full Reclaim and compensating corrections are live and now documented.|

The correction preserves page URLs and the existing site design. It removes invented credentials/setup/response examples, labels deferred integrations, corrects auth/conventions/error/rate/pagination guides, supplies an exact schema snapshot and complete generated route index, and documents lending. Eleven resource guides generate their selected model definitions directly from the verified schema. No backend behavior, database, financial key or deployment setting changes.

Verification:

- The live OpenAPI JSON equals the verified backend contract; public capabilities and unsigned profile401/UNAUTHENTICATED checked.
- Contract verifier checks every declared operation, snapshot fingerprint,11 exact-model guides,29 pages and internal documentation links.
- Reference/model regeneration is repeatable from the reviewed schema; package lock and existing AGENTS instructions are unchanged.
- Next route generation/TypeScript and production Next build pass.
- All29 rendered documentation routes return200; served schema equals the snapshot; LLM full-text uses the corrected contract.
- Chromium verifies seven core/status pages, the mobile public example and zero page errors.

This review does not activate developer keys/OAuth/MCP, native private screens or unconfigured billing/email/AI/general import providers. A route appearing in OpenAPI does not prove optional-provider acceptance. The previous published site remains unchanged until this documentation PR is merged and a Cloudflare build is verified. No Cloudflare management credential is present in this runtime, and no production deployment is claimed.
