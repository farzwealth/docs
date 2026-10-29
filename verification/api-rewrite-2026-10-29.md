# API docs rewrite evidence, 29 October 2026

## Source of truth

- Contract: the deployed `/api/v1` OpenAPI document, version `info.version` 0.1.0, OpenAPI 3.1.0.
- File SHA-256: `9c605af425f3f6184cf3bac982b231bf9a0c5e03f77788a2aea8498dd615e55a`.
- The contract has 369 paths and 421 operations. It has no staff or admin paths.
- The personal developer REST API has 3 paths: profile, accounts and transactions.

## Coverage

| Check | Result |
| --- | --- |
| Contract paths covered by a docs page | 369 of 369 |
| Contract operations covered by a docs page | 421 of 421 |
| Staff or admin paths excluded | 0 (none in the contract) |
| Provider webhook paths | 4, listed on the webhooks page as not for customers |
| Internal tracker IDs in the docs | 0 |
| Broken internal `/docs` links | 0 |
| MDX frontmatter problems | 0 |
| Stray braces or angle brackets outside code | 0 |

Coverage was checked by matching each `METHOD /path` string in the MDX files against the contract.

## Not run

- The site build was not run. No `npm`, `pnpm`, `next build`, tests or dev server were used. The MDX has not been compiled, so a build is needed before merge.
- No live API call was made. Routes and fields come from the contract. Status labels come from the internal plans and runbooks.
