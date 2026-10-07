# Matthew Ponce — Email, SMS & Web Growth

Premium, conversion-focused landing page for **Matthew Ponce** — Klaviyo
Email & SMS Marketing Specialist and freelance Shopify/WordPress website
builder. Single goal: land the client (book a free strategy call / send an
inquiry).

## Stack

- **React 19 + Vite 7 + TypeScript**
- **Tailwind CSS v4** (all styling; design tokens in `src/index.css`)
- **Self-hosted fonts** via Fontsource (Inter Variable + Fraunces Variable) — no font CDN
- **lucide-react** icons (pinned; no other runtime deps)
- Hash routing (`#/privacy`, `#/terms`) so the static build works on any host
- schema.org structured data as **microdata** (CSP-safe; see note below)

## Develop

```bash
npm install
npm run dev
npm run build   # → dist/
```

## Before launch — swap the placeholders

Search-and-replace these tokens across the repo:

| Token            | Where                                   | Replace with            |
| ---------------- | --------------------------------------- | ----------------------- |
| `[SITE_URL]`     | `index.html`, `public/robots.txt`, `public/.well-known/security.txt`, `src/App.tsx` | Production domain       |
| `[LINKEDIN_URL]` | `src/lib/site.ts`                       | LinkedIn profile URL    |
| `[PORTFOLIO_URL]`| `src/lib/site.ts`                       | Portfolio URL           |
| `[OLJ_URL]`      | `src/lib/site.ts`                       | OnlineJobs.PH URL       |
| `[CALENDLY_URL]` | `src/lib/site.ts`                       | Calendly embed URL — the sandboxed iframe appears automatically |
| `[PRICE]`        | `src/components/Pricing.tsx`            | Real pricing            |
| `[CLIENT_NAME]` / `[QUOTE]` / `[ROLE]` / `[COMPANY]` | `src/components/Testimonials.tsx` | Real, permitted testimonials |
| `[PROJECT_NAME]` / `[LIVE_URL]` | `src/components/Projects.tsx` | First real client project |
| Email parts      | `src/lib/site.ts` (`buildEmail`)        | Real contact email      |

## Environment variables

Copy `.env.example` → `.env`. **No secrets in client code** — VITE_ vars are
public-by-design values only:

- `VITE_FORM_ENDPOINT` — Formspree AJAX URL (or your serverless endpoint).
  Without it, the form degrades gracefully to a reveal-email fallback.
- `VITE_TURNSTILE_SITE_KEY` — Cloudflare Turnstile public site key.
- `VITE_PLAUSIBLE_DOMAIN` — enables the consent-gated Plausible banner.

## Push to GitHub

### 1) Create a GitHub repository

On GitHub, create a new repository, for example:

- `matthew-ponce-landing-page`

Do **not** add a README or `.gitignore` on GitHub since this project already has them.

### 2) Initialize Git locally

Run these commands in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
```

### 3) Connect the GitHub repo

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` below:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

If your repo already has a remote, use this instead:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## Make it live

### Best option: Vercel

This project already includes `vercel.json`, so Vercel is the easiest option.

1. Push the code to GitHub
2. Go to **https://vercel.com**
3. Sign in with GitHub
4. Click **Add New Project**
5. Import your repository
6. Vercel should detect **Vite** automatically
7. Add your environment variables if needed:
   - `VITE_FORM_ENDPOINT`
   - `VITE_TURNSTILE_SITE_KEY`
   - `VITE_PLAUSIBLE_DOMAIN`
8. Click **Deploy**

After deploy:
- Vercel gives you a live URL like `https://your-project.vercel.app`
- Later, connect your custom domain in **Project Settings → Domains**

### Also good: Netlify

This project already includes `public/_headers`, which Netlify can use.

1. Push the code to GitHub
2. Go to **https://netlify.com**
3. Click **Add new site** → **Import an existing project**
4. Choose GitHub and select your repo
5. Use these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Add the same environment variables if needed
7. Click **Deploy site**

### GitHub Pages

Possible, but **not recommended** for this project if you want the easiest setup,
because Vercel/Netlify handle headers and deployment better.

If you still want GitHub Pages, you would need to:
- build the app
- publish `dist`
- configure SPA/hash routing carefully
- manually work around header limitations

For this portfolio, **Vercel is the best choice**.

## After deployment

### Replace placeholders before going public

Make sure you update:
- `[SITE_URL]`
- `[LINKEDIN_URL]`
- `[PORTFOLIO_URL]`
- `[OLJ_URL]`
- `[CALENDLY_URL]`
- portfolio placeholders in `src/components/Projects.tsx`
- pricing placeholders in `src/components/Pricing.tsx`
- email parts in `src/lib/site.ts`

### Recommended custom domain setup

If you buy a domain like `matthewponce.com`:

1. Add it in Vercel or Netlify
2. Update your DNS records at your domain registrar
3. Enable:
   - HTTPS
   - DNSSEC
   - 2FA on registrar + hosting
   - Cloudflare proxy/WAF if using Cloudflare

### Every time you update the site

Use:

```bash
git add .
git commit -m "Update site"
git push
```

Your host will redeploy automatically.

## Deployment hardening checklist

1. **HTTPS everywhere** — enforce TLS 1.2+ and redirect HTTP → HTTPS at the
   host/CDN; submit the domain to the HSTS preload list (headers already set).
2. **Headers** — deploy with `public/_headers` (Netlify/Cloudflare Pages) or
   `vercel.json` (Vercel). Both ship:
   - `Content-Security-Policy` (strict, `script-src 'self'` + whitelisted
     Turnstile/Plausible origins, `frame-ancestors 'none'`)
   - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
     `Referrer-Policy: strict-origin-when-cross-origin`,
     `Permissions-Policy` (camera/mic/geolocation disabled),
     `Cross-Origin-Opener-Policy`, `X-Frame-Options: DENY`
   - ⚠️ **Single-file builds:** if your build inlines all JS/CSS into one
     HTML file, use the *compatibility CSP* variant commented at the bottom of
     `public/_headers` — strict `script-src 'self'` requires external assets.
3. **DNSSEC** — enable at your DNS provider/registrar.
4. **Account security** — enable **2FA** on hosting, domain registrar, Git
   host, Klaviyo, and any client platforms you touch.
5. **WAF/DDoS** — front the site with Cloudflare (proxy on), enable WAF
   managed rules and rate limiting on `/#contact` + form endpoint.
6. **Form service** — enable server-side validation, IP rate limiting, and
   spam filtering on Formspree/Web3Forms; verify the Turnstile token
   server-side where your provider supports it.
7. **Dependencies** — run `npm audit` before deploys; lock versions; review
   updates quarterly. Any future CDN asset **must** be version-pinned with
   Subresource Integrity (`integrity` + `crossorigin`) or self-hosted.
8. **Backups & recovery** — repository is the source of truth; tag releases.
9. **Privacy** — Plausible is cookie-free and loads only after consent;
   keep the Privacy Policy updated if processors change.
10. **Verify** — after deploy, test with securityheaders.com / Mozilla
    Observatory and re-check Lighthouse (target 90+).

## Form security (implemented)

- Client-side validation + sanitization (length caps, control-char strip) —
  the server/service must re-validate.
- Hidden **honeypot** field + **time-based** trap + per-session **rate limit**.
- Optional **Cloudflare Turnstile** (loaded only when configured).
- Contact email is **assembled at runtime on user interaction** — never
  printed in the shipped HTML (anti-scraping).
- All rendering via React text nodes (no `innerHTML`, no XSS sinks),
  `rel="noopener noreferrer"` on every external link.
- Calendly iframe: `sandbox`, `loading="lazy"`, restricted `allow`.

## Structured data note

JSON-LD would require an inline `<script>`, which a strict CSP blocks.
Structured data is therefore expressed as **microdata**
(`Person` + `ProfessionalService` in the markup) — fully supported by Google
and 100% CSP-safe.
