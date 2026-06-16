# Eternal — Claude Change Log

Running log of changes made to this codebase by Claude. Newest entries on top.

---

## 2026-06-16 — Single bouquets: listing → product detail page

### Why
The single-bouquet cards crammed the image, description, greenery toggle, and an Add-to-Cart button all into the tile, and the flower photos were being cropped by the card. Reworked into a standard shop pattern: clean clickable tiles → a dedicated product page.

### What changed
- **Image fit:** card images switched from `object-fit: cover` (which cropped the flowers) to `contain` on a soft Tana background, so the whole flower shows. Same treatment on the detail page's main image.
- **Listing (`SingleBouquet.js`):** each card is now a clickable `Link` showing only image + name + price (+ discount badge / out-of-stock). The Add-to-Cart button, description, and greenery toggle were removed from the tile.
- **New `ProductDetail.js` + `.css`** at route `/single-bouquet/:id`: larger image (with a thumbnail strip if a product ever has multiple images), full description, greenery option (swaps to `imageWithGreenery` when available and adds the greenery price), and the Add-to-Cart button. The card passes the already-loaded product via router `state` for an instant render, and falls back to fetching by id on direct link / refresh.
- **Backend:** `getProduct` (`GET /api/products/:id`) now applies active offers too (extracted a shared `applyOffers`/`getActiveOffers` helper reused by `getProducts`), so the detail page shows the correct discounted price even when reached by direct URL rather than from the list. Verified live: Rose $45 → $38.25 with image, on both list and single-product endpoints.

---

## 2026-06-16 — Images, admin dashboard, order statuses, theme refresh, partners section

### Why
Product images were broken (frontend read `product.images[0]`, but the backend `Product` model never had an `images` field), the admin dashboard was a styled shell with no real functionality, order status was a 6-stage pipeline with no reporting, and the site read as a generic template in a few concrete spots. This pass fixed all of that and added a Partners showcase.

### Images — now backed by Cloudinary
- `backend/src/config/cloudinary.js`, `backend/src/middleware/upload.js`, `backend/src/controllers/uploadController.js`, `backend/src/routes/uploadRoutes.js` — new `POST /api/upload` (admin-only, multipart, up to 6 files) that streams files straight to Cloudinary (`eternal/products` folder) and returns the resulting URLs. No new npm packages needed (uses Node's built-in `stream` module).
- `Product` model: removed the unused `base64` field, added `images: [String]`. This is the actual fix for the broken images — the frontend's existing `product.images[0]` reads now resolve to something real.
- New `frontend/src/components/common/ProductImage.js` — renders the image, or a soft floral placeholder (not a broken-image icon) when there isn't one yet, or if the URL fails to load. Used everywhere a product/cart/order image is rendered (SingleBouquet, CustomizeBouquet, Events, Cart, Checkout, OrderConfirmation, Admin product list).
- Admin's `ProductForm` is the only place that uploads — it calls the new `uploadService`, then submits the returned URLs like any other product field.

### Admin dashboard — actually built out
- Order status simplified from 6 stages (`pending/confirmed/in-preparation/ready/completed/cancelled`) to 3: `ongoing/delivered/cancelled` (`Order` model, `orderController`). No production order data existed, so this was a clean schema swap, not a migration.
- New `GET /api/orders/stats` (admin-only): orders this week/month/year, counts by status, total products, total revenue.
- New admin pages, replacing the placeholder `<div>`s: `AdminOverview` (the stats above), `AdminProducts` (list + remove, soft-delete via existing `isActive` flag), `ProductForm` (create/edit, image upload), `AdminOrders` (filter by status, mark delivered/cancelled/reopen), `AdminPartners` (add/remove partners + logo upload).
- Events/Promo Codes/Offers admin sections are still placeholders (out of scope for this pass) — now using a shared `EmptyState` component instead of a bare div.

### Partners section
- New `Partner` model/controller/routes (`GET /api/partners` public, `POST`/`DELETE` admin-only).
- New Home page section ("Our Partners") plus a 4th "Collaborate With Us" tile in the Services grid, both linking to `/#partners`. Seeded with 4 placeholder partners (self-contained SVG logos, no external image dependency) — replace these from `/admin/partners` whenever real partner logos are ready.

### Theme refresh
- Fixed a real bug: `Checkout.css` and `OrderConfirmation.css` referenced `var(--primary-color)`/`var(--secondary-color)`, which were never defined anywhere (the real tokens are `--color-primary`/`--color-secondary`). Both files were silently falling back to leftover generic Bootstrap-style colors (`#6c757d`, `#28a745`, `#f8f9fa`, a blue-grey gradient, a yellow `#fffbea` callout box) instead of the Kelp/Tana brand palette. This is likely a good chunk of why those two pages felt "off-brand" — fixed by re-pointing every color to the real brand tokens.
- Added one supporting accent color, `--color-blush` (a dusty terracotta-rose), used sparingly: a small underline accent under section titles, the new "kicker" eyebrow-label utility, and the admin revenue stat card.
- Home hero text is now left-offset instead of dead-centered; added a `FloralDivider` (inline SVG) between Home sections instead of hard color-block edges.
- Footer: fixed three links that pointed at routes which no longer exist (`/account`, `/my-orders`, `/my-events`), added a decorative wave edge instead of a flat color block, added an "Our Partners" link.
- Header: added a "Collaborate" nav link to the new Partners section.
- Consolidated duplicated `.form-row`/`.form-group` CSS (previously copy-pasted in `Checkout.css` and `Events.css`) into `index.css` as a shared utility, also used by the new admin forms.

### Follow-up — seeded products now actually have images
- Diagnosed why product images still didn't appear after the model fix: the seed created all 16 flowers with empty `images` arrays, so there was nothing to fetch (storefront correctly showed the placeholder). The real photos existed but were stranded in `frontend/SingleFlowers/` (a folder nothing serves and the seed never referenced).
- `seedDatabase.js` now uploads each of those 16 `.jpeg`s to Cloudinary (folder `eternal/products`, fixed public_ids so reseeding overwrites rather than duplicating) and links the URL onto the matching product. Verified: 16/16 products return a real Cloudinary URL and the image loads (HTTP 200, image/jpeg).
- Note: centerpieces, fillers, and greenery still have no images — there were no source files for them in `SingleFlowers/`. Add those via `/admin/products` (or drop files in and extend the same seed map) when ready.

### Setup notes
- Re-run `npm run seed` in `backend/` to get the updated seed data (3-status orders going forward, placeholder partners, **and the 16 flower images now uploaded + linked**). Existing local Mongo data with old order statuses will simply not match the new enum — fine for this pre-launch dev database, but worth knowing if you don't reseed.
- Cloudinary credentials were already present in `backend/.env`; nothing new to configure.
