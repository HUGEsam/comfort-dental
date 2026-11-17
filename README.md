# Comfort Dental Surgery & Implant Center

Web platform for **Comfort Dental Surgery & Implant Center** (BDDL Basabo Height, 1 Central Basabo, 2nd Floor, Dhaka-1214), built with Next.js App Router, Tailwind CSS, Framer Motion, Lucide Icons, and Three.js, alongside a self-contained portable HTML bundle.

---

## Project Structure (File Explorer)

```text
.
├── public/                     # Static assets served at site root
│   ├── assets/                 # Clinic brand logo & banner (logo.png, clinic-banner.png)
│   └── images/                 # Consultant portraits & clinical procedure photography
├── src/
│   ├── app/                    # Next.js App Router entry, metadata, & special routes
│   │   ├── favicon.ico
│   │   ├── globals.css         # Apple Pearl Liquid Glass theme & mobile input safeguards
│   │   ├── layout.tsx          # Root layout, SEO metadata, Viewport & safe-area spacing
│   │   ├── manifest.ts         # PWA / mobile home-screen web app manifest
│   │   ├── not-found.tsx       # Branded 404 recovery page
│   │   ├── page.tsx            # Main landing composition & role portal router
│   │   ├── robots.ts           # Search engine crawler policy
│   │   └── sitemap.ts          # Canonical sitemap route
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, FloatingWidgets (mobile dock), SmoothScroll
│   │   ├── modals/             # ServiceModal, AuthModal, CountrySelectorModal, ServicesMegaMenu, ThreeDotDrawer
│   │   ├── portals/            # CustomerPortal, ModeratorDashboard, AdminDashboard
│   │   ├── sections/           # Hero, SearchBar, Consultants, AssociateDentists, ServicesBento, SmileSlider, SterilizationProtocol, BookingAndContact
│   │   └── ui/                 # ErrorBoundary, ThreeVisuals (3D implant mesh with WebGL fallback)
│   ├── context/
│   │   └── AppContext.tsx      # Device-scoped session, appointments, services, & bilingual UI state
│   ├── data/
│   │   ├── servicesData.ts     # Clinical treatment catalog
│   │   └── translations.ts     # English / Bengali UI copy
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces
│   └── utils/
│       └── security.ts         # Input sanitization, phone/email validation, & rate limiting
├── standalone/
│   └── index.html              # Zero-dependency single-file HTML bundle (offline / static drop)
├── next.config.ts              # Next.js configuration & security headers
├── eslint.config.mjs           # ESLint configuration (excludes standalone/)
└── package.json
```

---

## Running Locally & Testing on Your Phone

### Prerequisites (PowerShell on Windows)
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

### Development Server (Same Wi-Fi Phone Preview)
```powershell
npm run dev
```
1. Open `http://localhost:3000` on your PC.
2. On your phone (connected to the same Wi-Fi network), open `http://<YOUR-PC-IP>:3000` (replace `<YOUR-PC-IP>` with your PC's IPv4 address from `ipconfig`).

### Quality Checks & Production Build
```powershell
npm run lint
npm run build
npm start
```

---

## Publishing Options

### Option A: Full Next.js App (Recommended)
Deploy this repository directly to **Vercel**, **Netlify**, or any **Node.js 20+** server:
- Build command: `npm run build`
- Start command: `npm start`
- Optional environment variables:
  - `NEXT_PUBLIC_SITE_URL` — Canonical production domain (used by `robots.ts` and `sitemap.ts`).
  - `NEXT_PUBLIC_WEB3FORMS_KEY` — Enables background Web3Forms email dispatch on appointment submission in addition to instant WhatsApp confirmation.

### Option B: Portable Zero-Dependency Bundle
Upload `standalone/index.html` to any static host (Netlify Drop, Cloudflare Pages, GitHub Pages) or open it directly in any desktop or mobile browser.
