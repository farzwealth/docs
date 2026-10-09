# Farz Public Developer API

Use the Farz API to read your personal accounts, transactions, assets and financial reports from a private application. Get started with a user API key from your Clerk account settings, or connect an MCP client with OAuth.

**Base URL:** `https://api.farz.app/api/developer/v1`  
**MCP URL:** `https://api.farz.app/mcp`  
**API version:** `v1`  
**Last updated:** 9 October 2026

**Contract status: pre-release.** This guide describes the intended public API for the finished product. The developer REST and MCP surfaces are not yet implemented in this repository. Endpoint paths, response models and examples below are proposed contracts; confirm them against the published public OpenAPI and release notes when the API becomes available.

## Contents

- [Quickstart](#quickstart)
- [Working with your data](#working-with-your-data)
- [Connect an MCP client](#connect-an-mcp-client)
- [Authentication](#authentication)
- [Access and scopes](#access-and-scopes)
- [Conventions](#conventions)
- [Pagination and filtering](#pagination-and-filtering)
- [Rate limits](#rate-limits)
- [Errors](#errors)
- [Endpoint reference](#endpoint-reference)
- [Response schemas](#response-schemas)
- [Python and TypeScript examples](#python-and-typescript-examples)
- [OAuth](#oauth)
- [Compatibility and troubleshooting](#compatibility-and-troubleshooting)
- [Personal use and data handling](#personal-use-and-data-handling)

## Quickstart

Create a user API key, configure your terminal, and request your accounts. All requests are read-only. Example responses use synthetic data; use IDs returned by your own requests.

For individual operations and response fields, see the [endpoint reference](#endpoint-reference) and [response schemas](#response-schemas).

### Before you begin

You need:

- An active **Paid** Farz account. Free and Trial accounts do not include developer API or MCP access.
- Access to your **Clerk account settings** for that Farz account.
- A Bash terminal with `curl`. On Windows, you can use Git Bash or WSL for the shell examples.
- Python 3 for the [account reader example](#read-accounts-with-python).

Open Farz and check that you have an account to read. If your portfolio is empty, you can still authenticate and receive an empty list; add financial records through the Farz app when you want to try the examples against your own data.

### Create an API key

Open your **Clerk account settings**, then the user API-key controls for your Farz account. Create a key for your integration and give it a recognizable name, such as `My personal dashboard`.

Select these two read scopes to start:

| Scope | Access granted |
| --- | --- |
| `accounts:read` | List an account and read its balance |
| `transactions:read` | Read that account's posted transactions |

Choose an expiry within Farz's allowed maximum of 90 days. Complete identity verification and the personal-use notice when prompted, then copy the issued user API key into your secure credential storage.

Use your own user API key for Farz. A Clerk application secret, publishable key or ordinary login session token will not work as a replacement. The names and layout of Clerk controls may vary; look for the user API-key controls rather than an application's administrator credentials.

### Configure your terminal

Paste this block into your Bash terminal:

```sh
export FARZ_API_BASE='https://api.farz.app/api/developer/v1'
read -r -s -p 'Paste your Farz user API key: ' FARZ_API_KEY
printf '\n'
export FARZ_API_KEY
```

Paste your key at the prompt and press Enter. The hidden prompt keeps the key out of the visible command and shell-history entry. The key is available to programs launched from this terminal until you clear it or close the session; a trusted private terminal is still required.

`FARZ_API_BASE` contains the public API URL. `FARZ_API_KEY` contains the credential. The examples below insert both automatically, so you do not have to paste the secret into each request.

### Make your first request

Run:

```sh
curl --fail-with-body --include \
  "$FARZ_API_BASE/accounts?limit=20" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

You have just asked for up to 20 of your own accounts. `GET` reads data. The Authorization header identifies your user API key, and the Accept header requests JSON. `--include` shows the HTTP status and response headers before the body.

Look for **`200 OK`**. A response body can look like this:

```json
{
  "items": [
    {
      "id": "22222222-2222-4222-8222-222222222222",
      "revision": 4,
      "name": "Personal cash",
      "kind": "cash",
      "masked_reference": "",
      "archived": false,
      "liquidity": "liquid",
      "balance": {"amount": "1250.00", "currency": "AED"},
      "base_balance": {"amount": "1250.00", "currency": "AED"},
      "valuation": {
        "as_of": "2026-10-10",
        "timezone": "Asia/Dubai",
        "freshness": "current",
        "source": "recorded_balance",
        "fx_legs": [],
        "warnings": []
      }
    }
  ],
  "next_cursor": null,
  "has_more": false
}
```

Read the response in this order:

1. `items` holds your account objects. `[]` means the request worked but no accounts matched.
2. `id` identifies the account for [retrieving an account](#retrieve-an-account). Copy an ID from your actual response, not the synthetic one above.
3. `balance.amount` is a decimal **string** and `balance.currency` tells you its native currency. Keep these together.
4. `base_balance` is the reporting-currency conversion. A null value means the conversion is unavailable, not that the balance is zero.
5. `valuation` explains the date, source and freshness of the result.
6. `next_cursor: null` and `has_more: false` mean there is no second page.

If you do not get 200, use the matching fix:

| Result | What to do now |
| --- | --- |
| `401 UNAUTHENTICATED` | Check that you copied the user API key correctly and it has not expired or been revoked. Update the key using [Configure your terminal](#configure-your-terminal). |
| `403 PAID_REQUIRED` | Check active Paid status in Farz; a trial is insufficient. |
| `403 INSUFFICIENT_SCOPE` | Create a key in Clerk with accounts:read and update your terminal credential. |
| `429 RATE_LIMITED` | Wait for the Retry-After delay before repeating the request. |
| `503 UNAVAILABLE` | Wait and retry with bounded backoff. Check whether the public service has been activated. |

## Working with your data

Use the same terminal and API key from the [quickstart](#quickstart) for these requests. Add the scopes required by each operation when creating your key.

- [Retrieve an account](#retrieve-an-account)
- [Filter transactions](#filter-transactions)
- [Retrieve the next page](#retrieve-the-next-page)
- [Read accounts with Python](#read-accounts-with-python)
- [Request summaries and reports](#request-summaries-and-reports)
- [Close your session](#close-your-session)

### Retrieve an account

At the next prompt, paste an account ID from the account-list response:

```sh
read -r -p 'Paste one of your account IDs: ' FARZ_ACCOUNT_ID
export FARZ_ACCOUNT_ID

curl --fail-with-body \
  "$FARZ_API_BASE/accounts/$FARZ_ACCOUNT_ID" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

The response is one Account object, rather than a page with `items`. Its `id` should match the ID you supplied. If you get 404, check the copied ID and whether the record belongs to your permitted personal workspace. A household/shared record visible in the app may be outside this API's scope.

### Filter transactions

Choose dates covering some of your posted records. These October dates are examples; change both when you need a different interval:

```sh
export FARZ_START='2026-10-01'
export FARZ_END='2026-10-10'

curl --fail-with-body --get \
  "$FARZ_API_BASE/transactions" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode "start=$FARZ_START" \
  --data-urlencode "end=$FARZ_END" \
  --data-urlencode "account_id=$FARZ_ACCOUNT_ID" \
  --data-urlencode 'limit=50'
```

`--get` puts the parameters in the query string. `--data-urlencode` encodes each value safely. The required `start` and `end` dates are inclusive; the range cannot exceed 366 calendar days.

Each item identifies its `type`, `occurred_on`, native `amount`, category and reviewed/reversed state. An expense of `"25.50"` AED is a native recorded amount; a transfer is not ordinary income or spending. An empty page can simply mean you chose dates with no posted activity. Drafts and future plans are not posted transactions.

To look only at expenses, run the same request with the extra type filter:

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/transactions" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode "start=$FARZ_START" \
  --data-urlencode "end=$FARZ_END" \
  --data-urlencode "account_id=$FARZ_ACCOUNT_ID" \
  --data-urlencode 'type=expense' \
  --data-urlencode 'limit=50'
```

Remove the type option to include all transaction types again.

### Retrieve the next page

Request [transactions](#filter-transactions) with `limit=1` to fetch a single item per page. If at least two transactions match, the response will contain a non-null `next_cursor` and `has_more: true`.

Copy the complete cursor value, without its JSON quotation marks. Then run:

```sh
read -r -p 'Paste next_cursor from your last page: ' FARZ_NEXT_CURSOR

curl --fail-with-body --get \
  "$FARZ_API_BASE/transactions" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode "start=$FARZ_START" \
  --data-urlencode "end=$FARZ_END" \
  --data-urlencode "account_id=$FARZ_ACCOUNT_ID" \
  --data-urlencode 'limit=1' \
  --data-urlencode "cursor=$FARZ_NEXT_CURSOR"
```

This continues the same list. Keep the same dates, account and other filters; if you used `type=expense` on the first page, include it again here. Paste each new cursor to continue, and stop when `next_cursor` is null. If only one or no records match, there is no next page to request.

A cursor is an opaque continuation value, not a resource ID. Do not edit it. If it expires or you want new filters, start again without the cursor.

### Read accounts with Python

To automate account reads and pagination, use the Python example below. In a private working directory, create a virtual environment and install the HTTP library:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install httpx
```

Create a file named `read_accounts.py` and paste the complete script from [Python: paginate and preserve decimal precision](#python-paginate-and-preserve-decimal-precision). The script reads `FARZ_API_KEY` from the terminal environment, follows every page and calculates separate native-currency totals with Decimal.

Then run it from the same terminal where you set your API key:

```sh
python read_accounts.py
```

The script prints a count such as `Read 2 accounts across 1 native currencies.` without displaying private balances. The actual counts come from your response; an empty portfolio prints zero. The `totals` variable contains the exact amounts for your own application to use. A missing FARZ_API_KEY error means you opened a different terminal or cleared the variable; follow [Configure your terminal](#configure-your-terminal) in this terminal. An HTTP error means you should follow the response's error-handling instructions before retrying.

Do not add the credential to the Python file. If you want a Node/TypeScript implementation instead, follow the [TypeScript example](#typescript-request-one-page-from-a-private-node-backend).

### Request summaries and reports

For a full own-data summary, create a key in Clerk that includes `reports:read`, `accounts:read`, `assets:read` and `liabilities:read`. Replace the terminal key using the hidden prompt in [Configure your terminal](#configure-your-terminal).

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/summary" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'domains=accounts,assets,liabilities' \
  --data-urlencode "as_of=$FARZ_END"
```

Read `coverage_percent`, `excluded` and `valuation.warnings` before using `net_worth`. An unavailable net-worth value is null; do not replace it with zero. The summary includes only records permitted by the public personal API, so it can differ from a household view in Farz.

For transaction report data, your key needs `reports:read` and `transactions:read`:

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/reports" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'kind=transactions' \
  --data-urlencode "start=$FARZ_START" \
  --data-urlencode "end=$FARZ_END" \
  --data-urlencode "account_id=$FARZ_ACCOUNT_ID" \
  --data-urlencode 'limit=50'
```

This returns paginated JSON report rows. It does not download a PDF or full privacy archive. Follow `next_cursor` just as you did for transactions. Use the [endpoint reference](#endpoint-reference) to choose the scopes and filters for other report kinds.

### Close your session

When you finish using the terminal, clear the session variables:

```sh
unset FARZ_API_KEY FARZ_API_BASE FARZ_ACCOUNT_ID FARZ_START FARZ_END FARZ_NEXT_CURSOR
```

Clearing the environment is not key revocation. Return to your Clerk account settings to revoke a key you no longer need. Keep only the least-privileged credential required by your private application.

## Connect an MCP client

Use this path if you want an approved assistant or remote MCP application to read your own Farz data. You need an active Paid Farz account and a client that supports remote **Streamable HTTP** MCP and OAuth. Available controls depend on the client, plan and organization policy; verified client-specific screenshots/instructions will accompany activation.

### Add the Farz server

Open the client's remote-server or connector settings and add **`https://api.farz.app/mcp`**. Choose Streamable HTTP if the client asks for a transport. Use the client's connection setup, not the ordinary conversation text box.

Do not paste your user API key into a prompt. This connection uses the resource-specific OAuth flow advertised by Farz.

### Authorize the connection

Follow the authorization redirect, sign in to your Farz account, and complete verification when prompted. Review the client name, read scopes and disclosure before approving. To list accounts, the connection needs accounts:read; requesting a full summary requires `reports:read` and all selected domain scopes. After successful authorization, the client resumes setup. If access is denied, check Paid status and the requested scopes before reconnecting.

### Request your data

After the client initializes and discovers authorized tools, ask it:

> List my Farz accounts and explain the currency and valuation date for each balance.

The client should use `list_accounts`. Inspect the returned accounts rather than accepting a guessed balance. An empty list can be a valid result. Tool availability follows your granted scopes, so a connection may not expose tools you did not authorize.

For a client that accepts tool arguments directly, try `list_transactions` with transactions:read:

```json
{"start":"2026-10-01","end":"2026-10-10","limit":50}
```

Change the dates to match your own posted activity. These reads do not create transactions, execute trades or make payments.

### Manage the connection

Use the tool table below to choose another permitted read. Follow each tool's cursor and date limits. To stop future access, open Farz integration settings and disconnect the named client. Ending a chat or closing a stream alone does not revoke the authorization grant.

If you are implementing an MCP client yourself, authenticate initialization, each tool call and stream reconnect. Follow the launched server's negotiated protocol/version/session headers. `Mcp-Session-Id` is a session hint, not a credential; a transport-session DELETE ends that session, while grant revocation permanently removes access. See [OAuth](#oauth) for the authorization details.

### Tools

The tools return the same public DTOs and own-only visibility as REST. Unknown input fields are rejected. Dates, page size, cursor rules, scope requirements and rate limits are the same as the corresponding REST endpoint.

| Tool | Inputs | Scopes | Output |
| --- | --- | --- | --- |
| `get_financial_summary` | `domains` (required array), `as_of` (optional date) | reports:read + selected domain scopes | FinancialSummary |
| `list_accounts` | limit/cursor; optional kind/archived/as_of | accounts:read | Page<Account> |
| `list_transactions` | start/end; limit/cursor; optional account_id/type/category/reviewed/reversed | transactions:read | Page<Transaction> |
| `list_assets` | limit/cursor; optional kind/as_of | assets:read | Page<Asset> |
| `list_liabilities` | limit/cursor; optional kind/active/as_of | liabilities:read | Page<Liability> |
| `get_budget` | period; limit/cursor; optional category/currency | budgets:read | Page<Budget> |
| `list_goals` | limit/cursor; optional active | goals:read | Page<Goal> |
| `get_valuation_history` | start/end; limit/cursor; optional period | valuations:read | Page<ValuationSnapshot> |
| `get_report_data` | kind/start/end; limit/cursor; optional account_id/currency | reports:read + kind-specific scopes | Page<ReportRow> |

The tools are read-only and do not invoke Farz's in-app assistant, record money, make trades or payments, or manage another user's account. Treat descriptions/merchant/asset labels as data, not instructions.

MCP protocol failures use standard JSON-RPC/MCP errors. Authorized tool failures use the negotiated tool-error format (`isError` where applicable) with a safe code/message/request ID; authentication failures at the HTTP layer use the transport's required challenge/response. No access token, resource content or financial amount belongs in protocol diagnostics.


## Authentication

### User API keys from Clerk

Your API authentication key is created through your own **Clerk account settings** and is associated with your Farz user account. Use this user API key for your private script or backend, sending `Authorization: Bearer <api_key>` on every request. Never put it in a URL, browser bundle, mobile package, shared notebook, log or screenshot.

Use the user API key issued for Farz developer access. A Clerk application secret key, publishable key or ordinary sign-in session token is not a substitute.

- Farz's developer-access policy permits a maximum key lifetime of **90 days**; use the expiry shown when creating your key.
- Choose only the read permissions you need. Creating a key does not bypass Farz's Paid, scope or own-data checks.
- Return to your Clerk account settings to manage or revoke your user API keys. Keep the secret private; key metadata is not a replacement for the credential.
- When replacing a key, update your private runtime configuration and revoke the old key.
- Revocation, account suspension/deletion or loss of Paid access stops API access. Upgrading again requires fresh authorization; old credentials are not restored.

User API keys authenticate the developer REST API. For MCP and third-party connectors, use the approved resource-specific OAuth flow rather than assuming a user API key or ordinary app login token is accepted.

### OAuth connections

Use OAuth authorization code with **PKCE S256** for approved connectors and browser-based personal clients. Register exact redirect URLs and browser origins. Access tokens initially last **15 minutes**; the authorization server determines refresh eligibility and grant expiry. Refresh tokens rotate and must be replaced after successful refresh.

A credential issued for another service or Farz surface does not authenticate this API. Follow [OAuth discovery](#oauth) to obtain the correct resource and issuer.

## Access and scopes

Every user API key or OAuth grant belongs to one Farz user and that user's private personal workspace. Requests do not accept a user ID or workspace selector. Household/family-office workspaces and shared or jointly owned records containing another person's private information are outside this API's initial scope.

An active Paid subscription is checked for each request and page, including OAuth refresh and MCP tool calls. A household member's plan or an external assistant subscription does not grant access.

| Scope | Grants read access to |
| --- | --- |
| `profile:read` | Language, reporting currency and timezone |
| `accounts:read` | Masked account summaries and native balances |
| `transactions:read` | Posted transactions and allowed classification/reversal information |
| `assets:read` | Own asset estimates, qualified holdings and lot/cost evidence |
| `liabilities:read` | Own liabilities and installment schedules |
| `budgets:read` | Native budgets, spending and remaining amounts |
| `goals:read` | Own goal targets, progress and contribution assumptions |
| `valuations:read` | Saved dated valuations, corrections and provenance |
| `reports:read` | Bounded deterministic summary/report data |

Summary and report requests also require the scopes for every requested domain. The server returns a scope error instead of silently presenting a partial portfolio as a complete total.

The public API does not provide raw statements, OCR text, uploaded files, document links, full bank numbers, household/guardian information, payment instruments, subscription management, private conversations or religious settings. There are no write, trading, payment, import, assistant-generation or bulk privacy-export operations.

## Conventions

### Requests and responses

REST resource endpoints use `GET`. They do not accept JSON request bodies, mutation keys, client-authored balances or arbitrary field selections. Send only the documented query parameters; unsupported parameters or invalid combinations return `422 INVALID_INPUT`.

| Header | Meaning |
| --- | --- |
| `Authorization: Bearer <api_key or OAuth access token>` | Required on all financial/profile API requests |
| `Accept: application/json` | JSON responses |
| `Content-Type: application/json` | Successful resource responses and errors |
| `Cache-Control: no-store` | Private responses must not be cached by shared proxies or service workers |
| `X-Request-ID` | Server-generated correlation ID; include it when reporting an error |
| `Retry-After` | Whole seconds to wait after a `429` response |

Single-resource reads return a JSON object. Collection reads return [Page](#page) with typed `items`. Successful reads use `200 OK`; an empty authorized collection is an empty page, not an error. A record that is missing or outside the credential's visibility is an opaque `404`.

### Amounts and currencies

All amounts, quantities, rates and percentages are **decimal strings**. Parse them with a decimal library when calculating; do not use binary floating point for financial totals. For example, `"1250.00"` is a decimal amount, while `"0.000125"` can be a precise holding quantity. Exponent notation, NaN and infinity are not part of the contract.

A [Money](#money) object always identifies the currency. Keep native currencies separate unless a documented base-currency conversion is provided. A negative account balance is valid; expense/transfer classification determines economic meaning rather than the sign alone.

Native tracking supports **AED, USD, GBP, EUR, SAR, BHD, KWD, QAR, OMR, JOD and TRY**. BHD/KWD/OMR/JOD have three payment minor digits; the other launch currencies have two. Stored quantities/calculations can be more precise than displayed or payment-rounded values. FX feed coverage does not imply additional native account currencies are enabled.

`null` means unavailable or not applicable as described by the field. A missing quote or conversion never becomes a fabricated `"0"`. A real zero balance is `"0"` or an equivalent decimal representation. Decimal trailing zeros carry no additional economic value.

### IDs, dates and freshness

Resource IDs are UUID strings. Instrument IDs are qualified public identifiers, such as an exchange-qualified stock or chain/provider-qualified coin; a ticker alone is not a unique identity.

Dates use `YYYY-MM-DD`; timestamps use RFC 3339 UTC. Date filters are inclusive and follow the returned IANA reporting timezone. Language, currency and timezone are independent preferences. `revision` is the resource's server-assigned version, not a globally ordered synchronization cursor.

Responses distinguish recorded balances, manual estimates, current/stale quotes and missing observations. [ValuationContext](#valuationcontext) identifies dates, source, warnings and conversion lineage. A portfolio estimate is not a bank verification, guaranteed sale price, tax determination or investment recommendation.

Financial forecast dates never prove payment. Transfers are not ordinary income/spending; liability principal is separate from financing costs. Goals and planned contributions are not additional net-worth assets. Saved historical valuations preserve their original inputs and any explicit correction chain.

## Pagination and filtering

All collection endpoints accept:

| Parameter | Type | Default / limit |
| --- | --- | --- |
| `limit` | Integer | Default 50; minimum 1; maximum 100 |
| `cursor` | String | Optional opaque continuation, maximum 2,048 characters |

Use the returned `next_cursor` with exactly the same resource filters and credential subject. Keep the original `limit` for a consistent traversal. Do not decode or modify the cursor. The traversal uses a consistent snapshot boundary; begin a new request without a cursor to see newly added records.

```sh
curl --fail-with-body --get \
  'https://api.farz.app/api/developer/v1/transactions' \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  --data-urlencode 'start=2026-10-01' \
  --data-urlencode 'end=2026-10-10' \
  --data-urlencode 'limit=50' \
  --data-urlencode "cursor=$FARZ_NEXT_CURSOR"
```

Stop when `next_cursor` is null and `has_more` is false. Missing/expired cursor failures require a fresh traversal; deduplicate by record ID/revision if your local job already processed part of the previous snapshot. Do not combine records from different traversals and call them a single atomic snapshot.

Date ranges require both `start` and `end` wherever a range is specified. `start <= end` and the inclusive interval must contain at most **366 calendar days**. A supplied `as_of` cannot be in the future and cannot be combined with a range unless the endpoint explicitly permits it. Historical values are returned only when supported by recorded evidence.

## Rate limits

Initial public integration limits:

| Limit | Allowance |
| --- | --- |
| Per user, across credentials and public integrations | 60 requests/minute |
| Per credential | 20 requests/minute |
| Concurrent expensive summary/report reads | 2 |
| Collection page size | 100 records |
| Date range | 366 calendar days |

Opening more credentials does not multiply the per-user allowance. MCP uses the same personal integration access limits. Published launch limits may be adjusted following measurement; check release notes for the activated policy.

On `429`, honor `Retry-After`, then retry the same read with bounded backoff and jitter. Reduce polling, wait for an active report read to finish, or narrow the requested range. Do not rotate tokens to evade throttling. There is no guarantee that every minute starts with a full burst allowance.

## Errors

An API error uses this JSON envelope:

```json
{
  "code": "INSUFFICIENT_SCOPE",
  "message": "This request requires accounts:read.",
  "request_id": "11111111-1111-4111-8111-111111111111",
  "field_errors": [],
  "retry": false
}
```

| HTTP | Code | Recommended action |
| --- | --- | --- |
| 401 | `UNAUTHENTICATED` | Check or replace your API key in Clerk account settings, or follow supported OAuth refresh/authorization |
| 403 | `PAID_REQUIRED` | Check active Paid access in Farz; Trial does not qualify |
| 403 | `INSUFFICIENT_SCOPE` | Authorize a credential with the required explicit read scopes |
| 403 | `ACCESS_RESTRICTED` | Follow the applicable account/eligibility/consent restriction in Farz |
| 404 | `NOT_FOUND` | Check the own-resource ID; inaccessible records are not disclosed |
| 409 | `CURSOR_EXPIRED` | Restart the collection traversal without the cursor |
| 409 | `CURSOR_MISMATCH` | Restore original filters/subject or start a fresh traversal |
| 422 | `INVALID_INPUT` | Correct the documented field/filter/range format |
| 429 | `RATE_LIMITED` | Wait for Retry-After and reduce concurrency/frequency |
| 503 | `UNAVAILABLE` | Retry the read with bounded backoff; preserve your last known data with its date |

Missing prices or FX normally appear as null values and explicit coverage/freshness warnings in a successful response. Do not turn an incomplete successful estimate into a silently complete portfolio total.

`field_errors` contains objects with `field` and `message`, such as `{"field":"query.end","message":"Invalid date range"}`. `retry` advises whether a transient read retry is appropriate; it does not promise recovery. Errors never disclose another user's balances or record existence. OAuth and MCP have their own protocol-specific error formats; see their sections below.

## Endpoint reference

All paths below are relative to `https://api.farz.app/api/developer/v1`. Every endpoint requires an active Paid user and the listed scopes. Collection filters are additional to the common `limit` and `cursor`. All endpoints return JSON with `200` on success and the shared error envelope on REST failures.

For collection endpoints, also use the common [pagination parameters](#pagination-and-filtering). Dates use `YYYY-MM-DD`; booleans use `true` or `false`. The examples use the environment variables configured in the [quickstart](#configure-your-terminal). For paths containing an ID, set the matching `FARZ_ACCOUNT_ID`, `FARZ_ENTRY_ID`, `FARZ_ASSET_ID` or `FARZ_LIABILITY_ID` variable to an ID returned by your own collection request.

| Operation | Method and path |
| --- | --- |
| [Get profile preferences](#get-profile-preferences) | `GET /profile` |
| [Get a financial summary](#get-a-financial-summary) | `GET /summary` |
| [List accounts](#list-accounts) | `GET /accounts` |
| [Get an account](#get-an-account) | `GET /accounts/{account_id}` |
| [List transactions](#list-transactions) | `GET /transactions` |
| [Get a transaction](#get-a-transaction) | `GET /transactions/{entry_id}` |
| [List assets](#list-assets) | `GET /assets` |
| [Get an asset](#get-an-asset) | `GET /assets/{asset_id}` |
| [List asset lots](#list-asset-lots) | `GET /assets/{asset_id}/lots` |
| [List liabilities](#list-liabilities) | `GET /liabilities` |
| [List a liability schedule](#list-a-liability-schedule) | `GET /liabilities/{liability_id}/schedule` |
| [List budgets](#list-budgets) | `GET /budgets` |
| [List goals](#list-goals) | `GET /goals` |
| [List valuation history](#list-valuation-history) | `GET /valuations` |
| [Get report data](#get-report-data) | `GET /reports` |

### Get profile preferences

`GET /profile`

Return the minimum preferences needed to interpret financial responses.

**Scopes:** `profile:read`.  
**Response:** [Profile](#profile).

**Parameters:** None. Returns a single object.

**Example request**

```sh
curl --fail-with-body \
  "$FARZ_API_BASE/profile" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

**Example response**

```json
{"locale":"en","timezone":"Asia/Dubai","base_currency":"AED","revision":3}
```

### Get a financial summary

`GET /summary`

Return a dated portfolio summary over the explicitly selected own-data domains, with coverage and excluded components.

**Scopes:** `reports:read` plus the scope for each requested domain.  
**Response:** [FinancialSummary](#financialsummary).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `domains` | string | Required | Comma-separated subset of `accounts`, `assets`, `liabilities`. |
| `as_of` | date | Optional | Valuation date; defaults to today in the reporting timezone. |

Requesting `accounts` requires `accounts:read`; `assets` requires `assets:read`; `liabilities` requires `liabilities:read`. Net worth is null unless all three domains were requested and have sufficient valuation coverage.

**Coverage:** amounts exclude unvalued components only when explicitly identified in `excluded`. A total with partial coverage is not a complete portfolio valuation. `domains` prevents scopes from being bypassed by aggregation.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/summary" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'domains=accounts,assets,liabilities'
```

### List accounts

`GET /accounts`

List masked own account summaries and exact native balances.

**Scopes:** `accounts:read`.  
**Response:** [Page<Account>](#account).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | string | Optional | `bank`, `cash`, `credit` or `investment`. |
| `archived` | boolean | Optional | Filter by archived status; omission includes both. |
| `as_of` | date | Optional | Balance date; defaults to today. |

Order: name ascending, then ID.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/accounts" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'limit=20'
```

### Get an account

`GET /accounts/{account_id}`

Read one allowed own account.

**Scopes:** `accounts:read`.  
**Response:** [Account](#account).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | UUID (path) | Required | ID returned by your account list. |
| `as_of` | date | Optional | Balance date; defaults to today. |

**Example request**

```sh
curl --fail-with-body \
  "$FARZ_API_BASE/accounts/$FARZ_ACCOUNT_ID" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

### List transactions

`GET /transactions`

List posted own transactions; pending drafts are not posted financial activity. Transfers match either allowed participating account.

**Scopes:** `transactions:read`.  
**Response:** [Page<Transaction>](#transaction).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `start` | date | Required | Inclusive beginning of the date range. |
| `end` | date | Required | Inclusive end; maximum range is 366 calendar days. |
| `account_id` | UUID | Optional | Filter by an account you own; transfers match either permitted participating account. |
| `type` | string | Optional | Transaction type; see [Transaction](#transaction). |
| `category` | string | Optional | Exact category key. |
| `reviewed` | boolean | Optional | Filter by review status. |
| `reversed` | boolean | Optional | Filter by reversal status. |

Order: occurred_on descending, then stable ID.

**Example request**

```sh
curl --fail-with-body --get \
  'https://api.farz.app/api/developer/v1/transactions' \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  --data-urlencode 'start=2026-10-01' \
  --data-urlencode 'end=2026-10-10' \
  --data-urlencode 'limit=50'
```

**Example response item**

The collection returns a [Page](#page) containing transaction objects like this:

```json
{
  "id": "33333333-3333-4333-8333-333333333333",
  "revision": 1,
  "account_id": "22222222-2222-4222-8222-222222222222",
  "destination_account_id": null,
  "type": "expense",
  "description": "Groceries",
  "occurred_on": "2026-10-09",
  "amount": {"amount":"25.50","currency":"AED"},
  "category": "groceries",
  "allocations": [],
  "tags": [],
  "reviewed": true,
  "reversed": false,
  "reversal_of": null
}
```

### Get a transaction

`GET /transactions/{entry_id}`

Read one posted own entry and its allowed classification/reversal links.

**Scopes:** `transactions:read`.  
**Response:** [Transaction](#transaction).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `entry_id` | UUID (path) | Required | ID returned by your posted transaction list. |

No date filter or pagination; no attachment/source-document content.

**Example request**

```sh
curl --fail-with-body \
  "$FARZ_API_BASE/transactions/$FARZ_ENTRY_ID" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

### List assets

`GET /assets`

List own asset estimates and holdings with explicit source, valuation date and freshness.

**Scopes:** `assets:read`.  
**Response:** [Page<Asset>](#asset).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | string | Optional | Asset kind; see [Asset](#asset). |
| `as_of` | date | Optional | Valuation date; defaults to today. |

Order: name ascending, then ID. Shared or jointly owned records outside permitted personal visibility are excluded.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/assets" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'limit=20'
```

### Get an asset

`GET /assets/{asset_id}`

Read one allowed own asset and its dated estimate.

**Scopes:** `assets:read`.  
**Response:** [Asset](#asset).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `asset_id` | UUID (path) | Required | ID returned by your asset list. |
| `as_of` | date | Optional | Valuation date; defaults to today. |

**Example request**

```sh
curl --fail-with-body \
  "$FARZ_API_BASE/assets/$FARZ_ASSET_ID" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json'
```

### List asset lots

`GET /assets/{asset_id}/lots`

Read exact holding lot quantity/cost/disposal evidence. Cost basis is an estimate under the identified method, not universal tax advice.

**Scopes:** `assets:read`.  
**Response:** [Page<Lot>](#lot).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `asset_id` | UUID (path) | Required | Your stock, ETF or crypto holding asset ID. |
| `through` | date | Optional | Include lots through this date; defaults to today. |

Applies to stock, ETF and crypto holdings. An unsupported asset type returns `422 INVALID_INPUT`. Order: acquired_on ascending, then lot ID.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/assets/$FARZ_ASSET_ID/lots" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'limit=20'
```

### List liabilities

`GET /liabilities`

List own dated obligations and projected due states. Net-worth inclusion identifies duplicate economic representations.

**Scopes:** `liabilities:read`.  
**Response:** [Page<Liability>](#liability).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | string | Optional | Liability kind; see [Liability](#liability). |
| `active` | boolean | Optional | Filter by active status; omission includes both. |
| `as_of` | date | Optional | Valuation date; defaults to today. |

Order: name ascending, then ID.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/liabilities" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'limit=20'
```

### List a liability schedule

`GET /liabilities/{liability_id}/schedule`

Read effective original/adjusted/skipped/paid/remaining schedule evidence. Elapsed due date does not automatically mean paid.

**Scopes:** `liabilities:read`.  
**Response:** [Page<Installment>](#installment).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `liability_id` | UUID (path) | Required | ID returned by your liability list. |
| `start` | date | Required | Inclusive start of the schedule date range. |
| `end` | date | Required | Inclusive end; maximum range is 366 calendar days. |

Order: effective_due_on ascending, then installment index. An unsupported/absent schedule returns an empty authorized page with warnings in page metadata.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/liabilities/$FARZ_LIABILITY_ID/schedule" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'start=2026-10-01' \
  --data-urlencode 'end=2026-10-10' \
  --data-urlencode 'limit=50'
```

### List budgets

`GET /budgets`

Read category budgets with exact native spending and remaining values for the selected period.

**Scopes:** `budgets:read`.  
**Response:** [Page<Budget>](#budget).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `period` | date | Required | First day of the month, in `YYYY-MM-DD` format. |
| `category` | string | Optional | Exact category key. |
| `currency` | string | Optional | A supported launch currency code. |

Order: currency, category, then ID. Payday/seasonal extensions will be versioned separately.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/budgets" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'period=2026-10-01' \
  --data-urlencode 'limit=50'
```

### List goals

`GET /goals`

Read manual target/progress/contribution projections. Goal progress is not another asset in net worth.

**Scopes:** `goals:read`.  
**Response:** [Page<Goal>](#goal).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | boolean | Optional | Filter by active status; omission includes both. |

Order: target_date ascending, then ID.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/goals" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'active=true' \
  --data-urlencode 'limit=20'
```

### List valuation history

`GET /valuations`

Read original saved dated estimates and correction lineage without recomputing them from current prices.

**Scopes:** `valuations:read`.  
**Response:** [Page<ValuationSnapshot>](#valuationsnapshot).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `start` | date | Required | Inclusive beginning of the saved cutoff-date range. |
| `end` | date | Required | Inclusive end; maximum range is 366 calendar days. |
| `period` | date | Optional | First-of-month date matching the selected range. |

Order: through descending, revision descending, then ID.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/valuations" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'start=2026-10-01' \
  --data-urlencode 'end=2026-10-10' \
  --data-urlencode 'limit=50'
```

### Get report data

`GET /reports`

Read bounded deterministic report rows and assumptions. This endpoint returns report data, not a PDF/archive download or arbitrary report runner.

**Scopes:** `reports:read` plus the scopes for the selected report kind.  
**Response:** [Page<ReportRow>](#reportrow).

**Parameters**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | string | Required | `transactions`, `net_worth`, `cashflow` or `performance`. |
| `start` | date | Required | Inclusive beginning of the report date range. |
| `end` | date | Required | Inclusive end; maximum range is 366 calendar days. |
| `account_id` | UUID | Optional | Your account ID; supported for `transactions` reports only. |
| `currency` | string | Optional | Enabled reporting currency code. |

Each report kind requires the following scopes in addition to `reports:read`:

| Report kind | Additional scopes |
| --- | --- |
| `transactions` | `transactions:read` |
| `net_worth` | `accounts:read`, `assets:read`, `liabilities:read` |
| `cashflow` | `accounts:read`, `budgets:read`, `liabilities:read` |
| `performance` | `assets:read`, `valuations:read` |

Order: report period/date ascending, then stable row key.

**Example request**

```sh
curl --fail-with-body --get \
  "$FARZ_API_BASE/reports" \
  -H "Authorization: Bearer $FARZ_API_KEY" \
  -H 'Accept: application/json' \
  --data-urlencode 'kind=transactions' \
  --data-urlencode 'start=2026-10-01' \
  --data-urlencode 'end=2026-10-10' \
  --data-urlencode 'limit=50'
```

## Response schemas

These public DTOs contain only fields permitted by the personal integration scope. They are not copies of internal application/database models. All fields listed are present unless marked **optional**. Nullable fields are present with `null` when unknown or inapplicable. Arrays are empty when there are no values; omitted fields are not a synonym for zero.

### Page

`Page<T>` contains the exact endpoint item type T.

| Field | Type | Meaning |
| --- | --- | --- |
| `items` | T[] | Authorized items, at most the requested limit |
| `next_cursor` | string or null | Opaque continuation; null when complete |
| `has_more` | boolean | Whether the snapshot has a next page |
| `meta` | PageMetadata, optional | Report context or safe warnings when needed |

### PageMetadata

| Field | Type | Meaning |
| --- | --- | --- |
| `as_of` | date | Snapshot reporting date |
| `timezone` | string | IANA reporting zone |
| `base_currency` | string | Reporting currency |
| `warnings` | string[] | Safe missing/schedule/coverage limitations |
| `algorithm` | string, optional | Versioned calculation/report method |

### Money

| Field | Type | Meaning |
| --- | --- | --- |
| `amount` | decimal string | Exact signed native or converted value |
| `currency` | string | Currency for this amount |

### ValuationContext

| Field | Type | Meaning |
| --- | --- | --- |
| `as_of` | date | Date represented by this result |
| `timezone` | string | IANA calendar zone |
| `freshness` | enum | `current`, `stale`, `estimated`, `missing` |
| `source` | string or null | Safe recorded/manual/public quote attribution |
| `fx_legs` | FxLeg[] | Dated conversion lineage; empty for no conversion |
| `warnings` | string[] | Missing/partial/delayed/estimate limitations |

Freshness does not upgrade a manual estimate into a verified market or bank observation. `source` excludes private document text, addresses, contacts and provider credentials.

### FxLeg

| Field | Type | Meaning |
| --- | --- | --- |
| `base_currency` | string | Directed rate base |
| `quote_currency` | string | Directed rate quote |
| `rate` | decimal string | Positive quote units per one base unit |
| `observed_on` | date | Original reference date |
| `source` | string | Approved safe reference attribution |
| `inverted` | boolean | Whether this leg was inverted in the calculation |

### Profile

| Field | Type | Meaning |
| --- | --- | --- |
| `locale` | enum | `en`, `ar`, `fr`, `ru` |
| `timezone` | string | IANA reporting zone |
| `base_currency` | string | Enabled native reporting currency |
| `revision` | integer | Preference version |

### FinancialSummary

| Field | Type | Meaning |
| --- | --- | --- |
| `domains` | string[] | Requested and authorized accounts/assets/liabilities domains |
| `as_of` | date | Requested reporting date |
| `timezone` | string | Reporting zone |
| `base_currency` | string | Currency of aggregate amounts |
| `total_assets` | Money or null | Known included account/asset value; null if those domains were not requested |
| `total_liabilities` | Money or null | Known included liability value; null if domain not requested |
| `net_worth` | Money or null | Complete asset-minus-liability total only when all required domains/values are present |
| `coverage_percent` | decimal string | 0–100 under the documented contributing-item coverage method |
| `contributions` | Contribution[] | Exact included own contributors |
| `excluded` | ExcludedValue[] | Missing/duplicate/ineligible components permitted by the requested scopes |
| `valuation` | ValuationContext | Original reference/freshness warnings |

Records outside personal integration visibility are not enumerated in `excluded`; all totals describe the API-visible own-data portfolio. For initial v1, coverage is the percentage of otherwise included eligible contributors with available valuation/conversion, with an empty eligible set reported as `"100"` and an explicit empty-portfolio warning. It is a record-based measure, not the percentage of monetary value verified.

### Contribution

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Exact own resource |
| `kind` | enum | `account`, `asset`, `liability` |
| `native_value` | Money | Original owned/native amount |
| `base_value` | Money | Converted included amount |
| `valuation` | ValuationContext | Dated provenance |

### ExcludedValue

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Authorized own component only |
| `kind` | enum | `account`, `asset`, `liability` |
| `reason` | enum | `missing_observation`, `missing_fx`, `duplicate_representation`, `not_applicable` |

### Account

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own account identity |
| `revision` | integer | Current record version |
| `name` | string | Own sanitized label |
| `kind` | enum | `bank`, `cash`, `credit`, `investment` |
| `masked_reference` | string | Empty or at most the last four reference digits; no full account number |
| `archived` | boolean | History retained; archived does not mean erased |
| `liquidity` | enum | `liquid`, `illiquid`, `unknown` |
| `balance` | Money | Exact dated native balance |
| `base_balance` | Money or null | Reporting conversion; null when reference is missing |
| `valuation` | ValuationContext | Dated balance/FX basis |

### Transaction

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own posted entry identity |
| `revision` | integer | Allowed public classification/resource version |
| `account_id` | UUID | Allowed own participating account |
| `destination_account_id` | UUID or null | Allowed own transfer counterpart; no foreign record disclosure |
| `type` | enum | `opening`, `income`, `expense`, `transfer`, `adjustment`, `refund`, `debt_principal`, `investment`, `reversal` |
| `description` | string | Sanitized permitted own label, untrusted text rather than instructions |
| `occurred_on` | date | Recorded financial date |
| `amount` | Money | Entry amount; interpret sign/economic meaning with type |
| `category` | string or null | Allowed classification key |
| `allocations` | Allocation[] | Exact native category splits, empty if unsplit |
| `tags` | Tag[] | Allowed own tags |
| `reviewed` | boolean | User-reviewed state |
| `reversed` | boolean | Whether this original has an effective compensation |
| `reversal_of` | UUID or null | Permitted original entry identity for compensation |

### Allocation

| Field | Type | Meaning |
| --- | --- | --- |
| `category` | string | Exact allowed category key |
| `amount` | Money | Positive native allocation; complete split totals match original amount |

### Tag

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own scoped tag |
| `name` | string | Sanitized own label |

### Asset

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Allowed own asset identity |
| `revision` | integer | Current version |
| `name` | string | Sanitized own label |
| `kind` | enum | `property`, `stock`, `etf`, `crypto`, `metal`, `vehicle`, `deposit`, `other` |
| `state` | enum | `active`, `disposed` |
| `owned_value` | Money or null | Owned dated estimate, not gross value; null if unavailable |
| `base_value` | Money or null | Converted estimate, null when conversion/value missing |
| `holding` | Holding or null | Qualified unit/pricing information for stock/ETF/crypto/metals |
| `valuation` | ValuationContext | Actual estimate/quote date/source/limitations |

Property addresses, tenancy contacts, private beneficiary details and uploaded evidence are not returned. A disposal state alone does not prove a sale proceeds payment.

### Holding

| Field | Type | Meaning |
| --- | --- | --- |
| `instrument_id` | string | Qualified exchange/chain/provider identifier |
| `quantity` | decimal string | Exact owned quantity |
| `quantity_unit` | string | Explicit shares/token/gram/troy-ounce unit |
| `price_per_unit` | decimal string or null | Observed price or missing |
| `quote_currency` | string | Quote's currency |
| `price_unit` | string | Listing unit; GBp is distinct from GBP |
| `price_on` | date or null | Date of observed price |

### Lot

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Exact allowed purchase lot |
| `asset_id` | UUID | Own holding |
| `instrument_id` | string | Qualified instrument |
| `acquired_on` | date | Original dated acquisition |
| `original_quantity` | decimal string | Acquired quantity under disclosed split normalization |
| `remaining_quantity` | decimal string | Current unallocated owned units through requested date |
| `remaining_cost` | Money | Exact remaining native cost estimate |
| `disposed_cost` | Money | Exact allocated native cost estimate |
| `cost_basis_method` | string | Explicit versioned lot allocation method |
| `revision` | integer | Position/evidence version |

### Liability

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own obligation identity |
| `revision` | integer | Current version |
| `name` | string | Sanitized own label |
| `kind` | enum | `loan`, `mortgage`, `financing`, `card`, `bnpl`, `custom` |
| `active` | boolean | Current recorded lifecycle |
| `outstanding` | Money or null | Actual dated native balance, not sum of forecast payments |
| `base_outstanding` | Money or null | Converted balance or missing |
| `net_worth_included` | boolean | Prevent duplicate account/debt economic representation |
| `exclusion_reason` | string or null | Safe own-record explanation |
| `valuation` | ValuationContext | Dated balance/FX basis |

A credit limit is not outstanding debt or an asset. Schedules are forecasts until linked to recorded payment evidence.

### Installment

| Field | Type | Meaning |
| --- | --- | --- |
| `liability_id` | UUID | Own liability |
| `index` | integer | Stable positive index within the disclosed schedule version |
| `schedule_revision` | integer | Effective schedule/evidence version |
| `original_due_on` | date | Original forecast date |
| `effective_due_on` | date | Current adjusted date |
| `scheduled_amount` | Money | Effective total forecast |
| `paid_amount` | Money | Recorded matching payments only |
| `remaining_amount` | Money | Exact currently unmatched scheduled amount |
| `state` | enum | `scheduled`, `rescheduled`, `skipped`, `partial`, `paid` |
| `past_due` | boolean | Remaining scheduled amount/date implies overdue forecast; not creditor-confirmed delinquency |

### Budget

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own budget |
| `revision` | integer | Current definition version |
| `period` | date | Month-start date |
| `category` | string | Allowed exact category key |
| `amount` | Money | Planned native budget |
| `spent` | Money | Exact posted net spending, including refunds/compensation under the period rules |
| `remaining` | Money | Budget minus spending; can be negative |

### Goal

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Own goal |
| `revision` | integer | Current version |
| `title` | string | Sanitized own label |
| `target` | Money | Positive native target |
| `saved` | Money | Recorded manual progress, not a second cash asset |
| `monthly_contribution` | Money | Planned contribution, not automatic payment |
| `target_date` | date | Explicit target date |
| `active` | boolean | Current planning participation |
| `projected_by_target` | Money | Estimate under disclosed contribution/calendar assumptions |
| `assumptions` | string[] | Method/return/rounding basis |

### ValuationSnapshot

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | UUID | Immutable saved estimate |
| `revision` | integer | Correction sequence |
| `period` | date | Month-start reporting period |
| `through` | date | Original month-end cutoff |
| `recorded_at` | UTC timestamp | Saving/correction instant |
| `previous_snapshot_id` | UUID or null | Previous own correction version |
| `reason` | string | Safe permitted correction explanation |
| `total_assets` | Money | Original API-visible own included asset estimate |
| `total_liabilities` | Money | Original included liability estimate |
| `net_worth` | Money or null | Complete permitted total when coverage supports it |
| `coverage_percent` | decimal string | Coverage under saved method |
| `contributions` | Contribution[] | Scope-permitted original own lineage only |
| `excluded` | ExcludedValue[] | Allowed original missing/duplicate reasons |
| `valuation` | ValuationContext | Original cutoff/context; never silently today's prices |

Only snapshots whose permitted own-data projection can be returned without leaking shared/foreign information are visible. Public totals are recalculated from the approved original own inputs when needed; they do not expose excluded household figures. All original-input projections disclose this own-only scope in warnings.

### ReportRow

| Field | Type | Meaning |
| --- | --- | --- |
| `key` | string | Stable row identity within kind/range/snapshot |
| `kind` | enum | `transactions`, `net_worth`, `cashflow`, `performance` |
| `on` | date | Row's period/observation date |
| `resource_id` | UUID or null | Allowed own contributor, when applicable |
| `values` | ReportValues | Kind-specific exact allowed measurements |
| `valuation` | ValuationContext | Dates/freshness/assumptions |

### ReportValues

Exactly the fields for the selected report kind appear; arbitrary additional keys/field selections are unsupported.

| Kind | Fields and types |
| --- | --- |
| `transactions` | `type` (Transaction enum), `amount` (Money), `category` (string or null), `reversed` (boolean) |
| `net_worth` | `asset_value` (Money or null), `liability_value` (Money or null), `net_worth` (Money or null), `coverage_percent` (decimal string) |
| `cashflow` | `income` (Money), `expenses` (Money), `net` (Money), `basis` (string stating posted/forecast assumptions); separate rows for each native currency |
| `performance` | `return_percent` (decimal string or null), `method` (string), `status` (`available`, `missing_observations`, `nonconvergent`, `unsupported`) |

Performance cannot be inferred from incomplete flows/prices. Report rows do not trigger payments, new AI output or bulk document/export jobs.

### ApiError

| Field | Type | Meaning |
| --- | --- | --- |
| `code` | string | Stable safe machine code from the error table |
| `message` | string | Human-readable safe explanation |
| `request_id` | UUID | Server correlation |
| `field_errors` | FieldError[] | Invalid query/path fields, empty otherwise |
| `retry` | boolean | Whether bounded retry is appropriate |

### FieldError

| Field | Type | Meaning |
| --- | --- | --- |
| `field` | string | Dot path, such as query.end |
| `message` | string | Safe explanation without private submitted content |

## Python and TypeScript examples

These clients use only the public developer surface. No published public SDK or live sandbox is claimed by this pre-release guide. Set `FARZ_API_KEY` securely; values in returned example payloads are synthetic.

### Python: paginate and preserve decimal precision

This example requires `accounts:read` and uses `httpx`:

```python
import os
from decimal import Decimal, localcontext
import httpx

headers = {
    "Authorization": f"Bearer {os.environ['FARZ_API_KEY']}",
    "Accept": "application/json",
}
cursor = None
seen = set()
totals = {}

with localcontext() as arithmetic, httpx.Client(
    base_url="https://api.farz.app/api/developer/v1/",
    headers=headers,
    timeout=20,
) as client:
    arithmetic.prec = 80
    while True:
        params = {"limit": 50}
        if cursor is not None:
            params["cursor"] = cursor
        response = client.get("accounts", params=params)
        response.raise_for_status()  # Handle documented errors before retrying.
        page = response.json()
        for account in page["items"]:
            if account["id"] in seen:
                continue
            seen.add(account["id"])
            money = account["balance"]
            currency = money["currency"]
            totals[currency] = totals.get(currency, Decimal("0")) + Decimal(money["amount"])
        cursor = page["next_cursor"]
        if cursor is None:
            break

# Keep native currency totals separate. Do not log tokens or private amounts.
print(f"Read {len(seen)} accounts across {len(totals)} native currencies.")
```

### TypeScript: request one page from a private Node backend

This example requires `transactions:read`. Keep amounts as strings or use a decimal library:

```ts
type Money = { amount: string; currency: string };
type Page<T> = { items: T[]; next_cursor: string | null; has_more: boolean };
type Transaction = {
  id: string;
  type: string;
  occurred_on: string;
  amount: Money;
};

const token = process.env.FARZ_API_KEY;
if (!token) throw new Error('Missing private runtime credential');

const url = new URL('https://api.farz.app/api/developer/v1/transactions');
url.searchParams.set('start', '2026-10-01');
url.searchParams.set('end', '2026-10-10');
url.searchParams.set('limit', '50');

const response = await fetch(url, {
  headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  cache: 'no-store',
  signal: AbortSignal.timeout(20_000),
});
if (!response.ok) {
  // Use code, request_id and Retry-After for handling; never log the credential.
  throw new Error(`Farz request failed (${response.status})`);
}
const page = (await response.json()) as Page<Transaction>;
// Validate the full response against the published public schema before use.
// Do not Number(transaction.amount.amount) for financial calculations.
```

For production, handle 401/403 explicitly, cap transient retries, respect Retry-After and validate the public response schema. A retry of these GET operations does not duplicate a financial posting.

## OAuth

### Discovery

Obtain the resource's protected-resource metadata, then use its advertised authorization server:

| URL | Purpose |
| --- | --- |
| `https://api.farz.app/.well-known/oauth-protected-resource/api/developer/v1` | REST resource metadata |
| `https://api.farz.app/.well-known/oauth-protected-resource/mcp` | MCP resource metadata |
| Authorization server metadata URL advertised by discovery | Actual issuer, authorize/token/revocation endpoints, supported scopes and PKCE methods |

Do not assume an authorization server is hosted on api.farz.app or hard-code unpublished `/oauth/*` URLs. Validate the returned issuer/resource and your registered client configuration. The REST and MCP resource identifiers are respectively `https://api.farz.app/api/developer/v1` and `https://api.farz.app/mcp`.

### Authorization request

Use the discovered authorization endpoint with:

| Parameter | Requirement |
| --- | --- |
| `response_type` | `code` |
| `client_id` | Approved registered client |
| `redirect_uri` | Exact registered URI |
| `scope` | Space-separated minimum read scopes |
| `state` | Fresh unpredictable state; verify exact match on callback |
| `code_challenge` | PKCE challenge for this request |
| `code_challenge_method` | `S256` |
| `resource` | Exact intended Farz REST or MCP resource |

The user signs in, verifies identity when required, and reviews client name, scopes and disclosure. Do not activate a connection without explicit approval or widen scopes silently. Registration is by approved client configuration; dynamic registration is available only if the launched authorization server advertises it. Client credentials, password and implicit grants are not supported by this personal API.

### Exchange and refresh

Send `application/x-www-form-urlencoded` to the discovered token endpoint. Authorization-code exchange includes `grant_type=authorization_code`, `code`, `client_id`, the exact `redirect_uri`, `code_verifier` and resource binding as required by the issuer. Authenticate confidential clients using the server-advertised supported method; public PKCE clients do not embed a client secret.

A successful token response has:

```json
{
  "access_token": "<opaque access token>",
  "token_type": "Bearer",
  "expires_in": 900,
  "scope": "accounts:read transactions:read",
  "refresh_token": "<rotating refresh token when granted>"
}
```

The example values are placeholders, not credentials or a promise every grant receives a refresh token. Use returned expiry. Refresh includes `grant_type=refresh_token`, the current refresh token and required client/resource authentication. Store the replacement atomically and stop reusing the old token. Invalid/expired/replayed grants require fresh authorization. Loss of Paid access or revoked consent/connection invalidates refresh eligibility too.

Use the discovered revocation endpoint to revoke grants/tokens as supported, or disconnect in Farz settings. Revocation is non-enumerating; a successful acknowledgement does not reveal another user's credential existence.

OAuth errors follow standard authorization/token responses, such as `invalid_request`, `invalid_grant`, `invalid_scope` and `access_denied`. They are not wrapped in the REST ApiError schema. Never log the authorization code, verifier, token response or query parameters containing secrets.

## Compatibility and troubleshooting

The versioned path is `/api/developer/v1`. The published public OpenAPI, machine-readable tool schemas and release notes will be the authoritative contract once activated. This guide does not claim a public schema download endpoint, SDK package or sandbox that has not been published.

Clients should ignore unknown response fields while validating the fields they use, reject unsupported input combinations and preserve money strings. Additive response fields should remain compatible; breaking field/type/meaning changes require a new API version or an announced migration. Deprecations must include replacement instructions and a published support window. No arbitrary public API deprecation duration has been guaranteed here.

| Problem | Check |
| --- | --- |
| 401 after previously successful reads | Token expiry, rotation/revocation, correct resource/audience; OAuth refresh cannot restore revoked grants |
| 403 despite a Farz trial | Developer API/MCP requires actual Paid; Trial is not sufficient |
| Scope denial on summary/report | Request only your authorized domains or grant every constituent scope |
| 404 for a visible in-app record | Shared/household/joint records may be outside personal integration visibility |
| Portfolio totals differ from the app | Own-only scope, selected domains/date, missing/stale FX, original saved snapshot or duplicate economic representation |
| Null converted amount | Missing dated FX/reference; retain native value and warnings |
| Repeated 429 | Combined per-user/token limits, concurrent expensive reads and aggressive polling |
| Cursor fails after changing a filter | Restart without cursor; continuation binds the original filters and subject |
| MCP authorization succeeds but tool absent | Granted scopes, active Paid access, supported client/server tool discovery |
| Old connection fails after re-upgrade | Fresh authorization is required; revoked credentials are not resurrected |

For support, use Farz's authenticated support channel. Include the request ID, endpoint path, UTC time and safe error code. Do not attach tokens, full response bodies, account numbers or financial files by default.

## Personal use and data handling

Access is for your own private monitoring or authorized personal assistant connection. Do not resell or white-label Farz, pool credentials/subscriptions, sublicense tokens, publish a credential-bearing wrapper, or run a multi-user service through one user's subscription. Third-party connection consent must explain what authorized data that client receives.

Use HTTPS, protect credentials and returned plaintext, limit local retention and remove access when no longer needed. Private financial responses should not enter shared caches, analytics, public logs or unreviewed third-party storage. A browser-only client must use approved OAuth/PKCE and registered origins instead of embedding a long-lived user API key.

Disconnecting stops future requests; it does not erase data already copied to your script or connector. Review that client's privacy and deletion controls. Farz's privacy/export/deletion workflows remain available in the app regardless of whether developer API access is active.

