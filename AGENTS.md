# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single-service **Next.js 16 (App Router, Turbopack, React 19)** marketing/storefront landing page for an artisan coconut vinegar brand. There is no backend, database, or external service to run — everything is static/client-side. Standard scripts live in `package.json`.

- **Run (dev):** `npm run dev` — serves the storefront at `http://localhost:3000`.
- **Lint:** `npm run lint` (flat ESLint config in `eslint.config.mjs`, using `eslint-config-next`).
- **Build:** `npm run build` (production build; static prerender of `/`).

Notes / gotchas:
- No `.env` is required; the app runs with zero configuration.
- The "Order via Messenger" button copies the order summary to the clipboard and opens an external Facebook Messenger URL (`config/product.config.ts` → `contact.messengerUrl`) in a new tab. It does not POST to any backend, so there is no order persistence to verify.
- Dev logs show a benign warning about `next/image` quality `90` not being in `images.qualities`; it does not affect functionality.
- Phone validation expects a Philippine mobile number (e.g. `0917 123 4567`) — see `lib/validation.ts`.
