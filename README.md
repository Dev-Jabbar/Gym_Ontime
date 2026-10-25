# Gym Ontime — Frontend

Web app for **Gym Ontime**, a gym class booking platform. Members browse the schedule and pay for a class with Paystack, trainers see who is in their classes, and admins manage classes, trainers and members.

**Live:** https://gym-ontime.vercel.app

Built with Next.js 14 (App Router) and TypeScript. It works with **two interchangeable backends** that expose the same `/api/...` routes, and a switch in the app lets you pick one:

| Backend | Stack | Repo |
| --- | --- | --- |
| **Express** | Express + MongoDB | The app's original API, in its own repo (hosted at https://gym-ontime-backend.onrender.com/api) |
| **NestJS** | NestJS + PostgreSQL + Redis + WebSocket | [`gym_ontime_nestjs_backend`](https://github.com/Dev-Jabbar/gym_ontime_nestjs_backend) (API docs at https://gym-ontime-nest.onrender.com/api/docs) |

> The two backends use separate databases, so an account created on one does not exist on the other.

## Try it

1. Open https://gym-ontime.vercel.app and choose a backend in the picker. Both backends run on Render's free tier and **sleep when idle**: a card shows an amber "waking up" dot while a server starts (up to a minute), then turns green. Pick it once it is green.
2. Register a member account, open **Schedule**, pick a class and click **Book Now**.
3. Payments run in **Paystack test mode**, so no real money moves. Test card `4084 084 084 084 08`, any future expiry, CVV `408`, PIN `1234`, OTP `123456`.
4. After paying you return to the site, the class shows **Booked** and you get a notification. On the NestJS backend, other open browsers see the seat count change without refreshing.

Admin and trainer screens need an account with that role, so they are not available to new visitors.

## Features

- Email and password login and registration; the session is an **HTTP-only cookie** set by the backend (the frontend never touches the token)
- Role-based navigation and screens for `member`, `trainer` and `admin`
- Class schedule with date navigation, search and filters; admins create, edit and delete classes and assign a trainer
- Booking with Paystack checkout (one-time and subscription), a "Booked" label, and a payment-success page that verifies the payment
- Member payment history and subscriptions; admin payments table
- Admin pages for members and trainers (details, upgrade a member to trainer, avatars)
- Dashboard with stat cards and Chart.js charts (revenue, capacity), recent signups
- Notification bell with unread count and click to read
- **Live seat counts** over socket.io (NestJS backend only)
- **Web push notifications** through Firebase Cloud Messaging (NestJS backend only; the app asks permission with a "Turn on notifications?" card)
- Profile page with signed Cloudinary avatar uploads
- Accepts both id shapes (`_id` from MongoDB and `id` from PostgreSQL) through a small helper, so every screen works on both backends

## Pages by role

| Page | Who sees it |
| --- | --- |
| `/login`, `/register` | Everyone (logged-out visitors are redirected to `/login`) |
| `/dashboard`, `/schedule`, `/profile` | admin, trainer, member |
| `/subscriptions` | member |
| `/members` (members of a class) | trainer |
| `/admin/members`, `/admin/trainers`, `/payments` | admin |
| `/payment-success` | The page Paystack sends you back to |

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS 3, shadcn-style UI primitives (Radix, class-variance-authority), some MUI and Headless UI components |
| State | Zustand (current user) |
| Forms and validation | react-hook-form with zod |
| Charts | Chart.js through react-chartjs-2 |
| Real time | socket.io-client |
| Push | Firebase web SDK (FCM) and a service worker |
| Uploads | Cloudinary (signed uploads) |
| Package manager | Yarn |

## Getting started

Prerequisites: Node.js 18.17 or newer (Next.js 14's minimum) and Yarn, plus a running backend (Express on port 5000 and/or NestJS on port 3001, or use the hosted ones).

```bash
yarn install

cp .env.example .env.local     # fill in your own values; never commit .env.local

yarn dev                       # http://localhost:4000
```

The dev server runs on **port 4000**, not 3000. Both backends allow `http://localhost:4000` through CORS and use it as the Paystack return address.

### Scripts

| Command | Purpose |
| --- | --- |
| `yarn dev` | Development server on port 4000 |
| `yarn build` | Production build |
| `yarn start` | Run the production build on port 4000 |
| `yarn lint` | `next lint` |

## Configuration

Copy [`.env.example`](.env.example) to `.env.local`. Every variable starts with `NEXT_PUBLIC_`, which means it is **public by design** and ends up in the browser bundle, so never put a secret in one.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_EXPRESS_API_URL` | No | Express API base URL. Default `http://localhost:5000/api` |
| `NEXT_PUBLIC_NEST_API_URL` | No | NestJS API base URL. Default `http://localhost:3001/api` |
| `NEXT_PUBLIC_FIREBASE_API_KEY`, `..._PROJECT_ID`, `..._MESSAGING_SENDER_ID`, `..._APP_ID` | For push | Firebase web app config (Firebase console, Project settings, Your apps) |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY` | For push | Web push key pair (Project settings, Cloud Messaging) |

If any of the five Firebase variables is missing, the push prompt is hidden and everything else works. Push only works over https or on `localhost`, and you need the matching `FIREBASE_*` service-account settings on the NestJS backend.

## How it fits together

- **Backend switch:** `src/lib/backend.ts` holds the two API base URLs and the current choice (kept in `sessionStorage`); `src/components/BackendGate.tsx` is the picker. It pings the public `GET /classes` of each backend to show a status dot (grey checking, amber waking up, green online, red offline).
- **Auth:** the backend sets an HTTP-only cookie on login and the browser sends it with each request (`credentials: "include"`). The current user is held in `src/store/useUserStore.ts`.
- **Ids:** `src/lib/ids.ts` exports `idOf(entity)` = `entity._id ?? entity.id`, used wherever a screen needs an id.
- **Live counts:** `src/features/schedule/hooks/useLiveCapacity.ts` connects to the `/classes` socket.io namespace of the NestJS backend and updates seat counts as `class:capacity` events arrive.
- **Push:** `src/lib/pushNotifications.ts` registers the browser with Firebase and sends the token to `POST /api/notifications/device-token`; it is removed on logout. The service worker file is `public/firebase-messaging-sw.js`.

```
src/
  app/(routes)/      pages: login, register, dashboard, schedule, subscriptions, members,
                     admin/members, admin/trainers, payments, profile, payment-success
  features/          one folder per area (schedule, payments, subscriptions, admin, dashboard,
                     members, notifications, profile), each with components/, hooks/, types/
  components/        layout (Header, Footer, LayoutWrapper), ui primitives, BackendGate, PushPrompt
  lib/               backend.ts, ids.ts, pushNotifications.ts, cloudinaryUpload.ts, utils.ts
  store/             useUserStore.ts (Zustand)
  hooks/             useUser.ts
```

## Deployment

The app is deployed on **Vercel** (project `gym-ontime`, builds with Yarn, auto-deploys on every push to `master`).

- Set the `NEXT_PUBLIC_*` variables in Vercel's Environment Variables. Because they are public, use the **Config** type (not Secret). The live site uses `NEXT_PUBLIC_NEST_API_URL=https://gym-ontime-nest.onrender.com/api`, the Express URL, and the five Firebase web values.
- The backends must list the site's origin: both allow `https://gym-ontime.vercel.app` by default. A new domain or Vercel preview URL needs adding to the backend's CORS list (and to the Firebase browser API key's allowed websites).
- The login cookie is cross-site in production (`SameSite=None; Secure`), which works in Chrome and Edge. Safari and other browsers that block third-party cookies may not keep the session. A custom domain shared by the frontend and API would fix that.

## Known limitations

- The first request to a sleeping free-tier backend is slow (the picker shows the amber state while it wakes).
- Live seat counts and push notifications exist only on the NestJS backend.
- The user menu links to `/settings`, but there is no settings page yet.
- `src/lib/api.ts` is a legacy client from an earlier token-based login and is not used by any page (it is the only reader of `NEXT_PUBLIC_API_URL`, which is why that variable is not in `.env.example`). `MOCK_RECENT_SIGNUPS` in `src/features/dashboard/constants/mockData.ts` is also unused now that the dashboard reads real signups.
- `yarn lint` has no ESLint configuration yet (no `.eslintrc` and no ESLint packages), so `next lint` offers to create one the first time it runs.
- Mobile layouts have not been checked systematically on every page.

## Documentation

| Document | What it covers |
| --- | --- |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | The backend switch, auth, id shapes, live counts, push, folder layout and conventions |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel setup, environment variables, CORS, cookies, Firebase key restrictions |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed and when |

## Contributing, security and license

- Local workflow and conventions: [CONTRIBUTING.md](CONTRIBUTING.md)
- Reporting a vulnerability: [SECURITY.md](SECURITY.md)
- License: [MIT](LICENSE)
