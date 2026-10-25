# Changelog

Notable frontend changes, newest first, following [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). There are no version tags yet, so entries are grouped by date.

## 2026-10-24

### Added
- Backend picker shows an amber "waking up" state for sleeping free-tier servers (and red only after 75 seconds without an answer).
- Documentation set: architecture, deployment, contributing and security guides, license.

### Changed
- Stopped tracking zip files in the repository (`*.zip` is git-ignored).

## 2026-10-23

### Changed
- All screens read ids through `idOf()` (`_id ?? id`), so every page works on both the Express and the NestJS backend. Affected: class create/edit trainer dropdowns, admin members and trainers, class member list, notifications, payments, subscriptions, "Booked" labels.

## 2026-10-11 to 2026-10-22

### Added
- Web push notifications through Firebase Cloud Messaging (NestJS backend only) with a service worker and a "Turn on notifications?" prompt.
- Live seat counts over socket.io (NestJS backend only).
- Backend picker with status dots and a "Backend: X, Switch" pill.
- Deployment to Vercel against the hosted backends.
