# Farz API documentation

Updated16October2026 against the deployed unified API: **224 paths/264 operations**.

Base URL: `https://api.farz.app/api/v1`.
Private first-party requests use the current Clerk user session bearer and an
authorized workspace ID from `/me`; no developer API key is required. Native
private access remains gated pending its independent security acceptance.

- [API availability](https://docs.api.farz.app/docs)
- [Complete route reference](https://docs.api.farz.app/docs/api/endpoints)
- [Live authoritative OpenAPI](https://api.farz.app/openapi.json)
- [Repository reference sources](content/docs/api)
- [Verification/publication evidence](verification/api-refresh-2026-10-16.md)

The reference includes finance, actual lending repayments, cards/transfers,
recurring/rent plans, reports, privacy/account controls, browsing/sync,
owned-record exports and private notifications. Mutations retain explicit
confirmations, revisions and UUID idempotency headers where declared. Amounts
are decimal strings; missing valuations stay missing. Collection paging,
recent-authentication rules and content types are endpoint-specific.

Email sending, automatic reminder transport, billing, AI, general import
processing, developer API and MCP must not be inferred from route declarations.
Current capabilities report optional integrations `not_configured`. PDF/image
extraction is not live and will use approved native model vision, never OCR.
Farz does not use Clerk Billing. Future Paid developer keys must be Clerk-issued
and independently authorized from verified payment state; no issuance, scope,
OAuth or MCP setup instructions are available today.

This file supersedes the former proposed developer-key/OAuth/MCP specification.
The checked-in snapshot and generated guides are reviewable source; publication
status and the actually served site must be verified separately.
