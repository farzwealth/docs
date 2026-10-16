# API documentation refresh —16October2026

The reviewed snapshot matches both the unified backend repository contract and
https://api.farz.app/openapi.json as parsed JSON: **224 paths/264 operations**,
production schema0076. Serving implementation is4344f29; source repository HEAD
at review is0c5d843 (documentation-only successor). The prior docs snapshot had
132paths/160operations. Every current path is assigned once to21 resource guides.
The generated route index records the exact checked-in snapshot SHA-256.

The refresh covers private notifications/reminders, owned-record exports,
privacy/consents/account lifecycle/trial availability, device/session controls,
record discovery/sync, cards/transfers/ledger/reporting and import intake/review.
Provider webhook signatures are distinct from Clerk user bearer authentication;
required Svix headers and empty204 responses are documented correctly. The root
proposed developer-key/OAuth/MCP guide is replaced with current availability.
Native model vision remains the intended PDF/image method; OCR is not used.

Live capabilities still report AI, billing, email, market, imports, personal API
and MCP as not_configured. Identity is configured and lending is available.
Email sending and automatic notification scheduling remain off. No schema route,
unit provider mock, request receipt, local session block or export is presented as
provider activation, complete erasure/portability or native acceptance.

Verification: route/security/complete-guide/model/fingerprint/navigation/internal-
link checks pass; regenerated artifacts are byte-identical. TypeScript and the
Next production build pass. All39 rendered docs routes return200; the served
OpenAPI equals the reviewed snapshot and LLM full text includes the new guides.
Six focused Chromium views (notifications/owned-records/webhooks, desktop/mobile)
pass without page errors or horizontal body overflow. No backend, financial data,
configuration, provider or unrelated application tests/changes are performed.

The default sandbox initially blocked Next's local loopback listener; rerunning
with an approved local-build sandbox allowance succeeds. Existing dependency CSS
minifier warnings are nonfatal. This is a local Next production build, not a
Cloudflare Worker deployment or native application acceptance.

Publication is tracked in [docs PR1](https://github.com/farzwealth/docs/pull/1).
The source update is distinct from Cloudflare publication; no Cloudflare
management credential or verified deployment receipt is available for this run.
No backend checklist IDs close and implementation estimates remain unchanged.

[Machine-readable receipt](api-refresh-2026-10-16.json).
