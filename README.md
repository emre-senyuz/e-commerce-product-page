# ecommerce-product-page

A complete single-product storefront for **Forma One**, a fictional premium wireless headphone. Built with Vite, React, strict TypeScript, Tailwind CSS v4, and lucide-react. All artwork is local SVG or CSS; no external image services, backend, or paid APIs.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run build
npm run preview
```

The production build type-checks the application and generates `dist/`. Deploy that directory to any static web host. No environment variables are needed.

## Features

- Responsive four-view product gallery with locally illustrated headphones and case.
- Three finishes, per-finish stock limits, quantity selection, and accurate USD totals.
- Shopping bag drawer with quantity updates, removal, and empty state.
- Validated localStorage persistence, including malformed-data recovery and a storage-unavailable notice.
- Native modal dialogs with browser focus containment, Escape dismissal, background inertness, scroll locking, and focus restoration.
- Shipping and specifications accordions, illustrative review summary, and non-purchasable companion products.
- Checkout informational modal: no payments, personal information, or orders are processed.
- Keyboard focus indicators, descriptive controls, reduced-motion support, and mobile layouts.

All specifications, stock, reviews, policies, and prices are fictional demo content. Stock represents the maximum quantity per finish in the current local bag, not live inventory. Browser storage can be cleared through site settings. No tests or routing libraries are included.

## Source guide

- `src/App.tsx`: storefront, cart operations, related products, and checkout demo.
- `src/product.ts`: typed catalog, currency formatting, storage validation.
- `src/Headphones.tsx`: self-contained, finish-aware SVG artwork.
- `src/Overlay.tsx`: reusable accessible native dialog.
- `src/styles.css`: Tailwind import and responsive visual system.

## Screenshot

_Screenshot placeholder: add a desktop storefront screenshot at `docs/storefront.png` after running the app. A mobile screenshot can be added alongside it._
