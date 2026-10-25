## What and why

## How it was checked

- [ ] `yarn build` succeeds
- [ ] Tried the changed screens on the **Express** backend
- [ ] Tried the changed screens on the **NestJS** backend
- [ ] Ids read through `idOf()`; URLs built with `getApiUrl()`
- [ ] No secrets in the diff (`NEXT_PUBLIC_*` values are public, but do not commit `.env.local`)
