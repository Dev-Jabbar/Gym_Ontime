# Deployment

The app is deployed on **Vercel** (project `gym-ontime`, builds with Yarn, auto-deploys on every push to `master`). Live: https://gym-ontime.vercel.app

## Environment variables

Set the `NEXT_PUBLIC_*` variables in Vercel's Environment Variables. Because they ship in the browser bundle they are **public by design**: use the **Config** type, not Secret, and never put a secret in one.

| Variable | Live value |
| --- | --- |
| `NEXT_PUBLIC_NEST_API_URL` | `https://gym-ontime-nest.onrender.com/api` |
| `NEXT_PUBLIC_EXPRESS_API_URL` | `https://gym-ontime-backend.onrender.com/api` |
| `NEXT_PUBLIC_FIREBASE_API_KEY`, `..._PROJECT_ID`, `..._MESSAGING_SENDER_ID`, `..._APP_ID`, `..._VAPID_KEY` | The five Firebase web values (optional; push is hidden if any is missing) |

A change to a `NEXT_PUBLIC_*` variable needs a **redeploy**, because the values are inlined at build time.

## Checklist for a new domain or preview URL

1. Add the origin to the backends' CORS lists. Both allow `https://gym-ontime.vercel.app` by default; the NestJS API reads extra origins from `CORS_ORIGINS` (which **replaces** its defaults, so include the existing ones), the Express API has them in `src/index.ts`.
2. Add the domain to the allowed websites of the Firebase **browser API key** (Google Cloud console, Credentials), or push registration fails on it.
3. Make sure the NestJS API's `FRONTEND_URL` matches, because Paystack returns the browser to `${FRONTEND_URL}/payment-success`.

## Cookies

The login cookie is cross-site in production (`SameSite=None; Secure`), which works in Chrome and Edge. Safari and other browsers that block third-party cookies may not keep the session. A custom domain shared by the frontend and the API (or a Vercel rewrite that proxies `/api`) would fix that.

## Sleeping backends

Both backends run on Render's free tier and sleep after about 15 minutes idle. The first request can take up to a minute; the backend picker shows an amber "waking up" state meanwhile.

## Releasing

Push to `master`; Vercel builds and publishes. Confirm the deploy shows **Ready**, hard-refresh the site, and test once per backend through the picker. When a change depends on the API (for example a response shape), deploy the frontend first so it works with both versions, then the backend; see the NestJS repository's ADR 0006.
