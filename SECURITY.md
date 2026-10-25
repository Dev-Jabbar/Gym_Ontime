# Security policy

## Reporting a vulnerability

Please **do not open a public issue** for a security problem. Use GitHub's private reporting: the **Security** tab of this repository, **Report a vulnerability**. Include what you found, how to reproduce it and the impact. Please do not access other people's data or use real payment details on the live demo. This is a personal project with no formal response-time guarantee.

## Design

- The session token lives in an **HTTP-only cookie** set by the backend; scripts in the page cannot read it, and the frontend never stores a token.
- The app holds no secrets. Every environment variable starts with `NEXT_PUBLIC_` and is public by design (Firebase web config, API URLs). The Firebase browser API key is restricted to this site's domains.
- Payments run entirely on Paystack's hosted checkout; card details never touch this app or the backends.
- Image uploads use parameters signed by the backend, so the Cloudinary secret is never in the browser.

## Known gaps

- Safari and other browsers that block third-party cookies may not keep the cross-site production session (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)).
- The app stores the chosen backend and the push token's state in `sessionStorage` / `localStorage`; neither holds credentials.
