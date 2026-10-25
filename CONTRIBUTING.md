# Contributing

This is the web app for Gym Ontime. It works against two backends, so a change is only finished when it works on **both**.

## Set up

Prerequisites: Node.js 18.17 or newer and Yarn, plus a running backend (Express on port 5000 and/or NestJS on port 3001, or use the hosted ones).

```bash
yarn install
cp .env.example .env.local     # fill in your own values; never commit .env.local
yarn dev                       # http://localhost:4000
```

The dev server runs on port **4000**. Both backends allow that origin and use it as the Paystack return address.

## Workflow

1. Branch from `master` (`feature/short-name` or `fix/short-name`). A push to `master` deploys to production, so use a pull request.
2. Make a focused change.
3. Run `yarn build` (it type-checks and compiles) and try the screens you touched.
4. **Test through the picker on both backends.** Many bugs here were response-shape differences (`_id` versus `id`) that only show on one backend.
5. Open a pull request using the template.

Commit messages: imperative, one line (`Show waking-up state for sleeping servers`).

## Conventions

- **Ids:** never read `entity._id` or `entity.id` directly; use `idOf(entity)` from `src/lib/ids.ts`.
- **API base URL:** build every URL with `getApiUrl()` at call time, never from a constant evaluated at import.
- **Requests** that need the session must send `credentials: "include"`.
- **Structure:** a page under `src/app/(routes)` stays thin and renders a component from `src/features/<area>`; fetching goes in that area's `hooks/`, shared types in its `types/`.
- **Environment variables:** anything read in the browser must start with `NEXT_PUBLIC_` and is therefore public. Never put a secret in one. Reference them literally (`process.env.NEXT_PUBLIC_X`) so Next can inline them.
- **Backend-specific features** (live counts, push) must do nothing, not crash, on the Express backend.
- **Line endings:** several files use CRLF and some LF; keep a file's existing style.

## Secrets

Never commit `.env.local`, service-account files or real keys, and never paste them into issues or pull requests. `*.env*.local`, `*.zip` and `*.stackdump` are git-ignored.
