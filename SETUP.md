# Activore Site — Manual setup steps

Three things need a few clicks in third-party dashboards. All three are free and take about 20 minutes total.

---

## 1. Waitlist backend — Formspree (5 min)

Right now the waitlist form falls back to `localStorage`. Once you add a Formspree ID, every submission will email you directly **and** show in a Formspree dashboard.

1. Go to **[formspree.io](https://formspree.io)** → **Sign up free** (50 submissions/month on free tier)
2. Once signed in → click **+ New Form**
3. Name it `Activore Waitlist`
4. Set the destination email: `info@activore.app`
5. Save. Formspree will give you a form endpoint that looks like:
   ```
   https://formspree.io/f/xnnvkpdz
   ```
6. Copy just the ID part — the `xnnvkpdz` (8 characters)
7. Open `script.js` in this repo. Find the line near the top:
   ```js
   const FORMSPREE_ID = ''; // e.g. 'xnnvkpdz'
   ```
8. Paste the ID inside the quotes:
   ```js
   const FORMSPREE_ID = 'xnnvkpdz';
   ```
9. Save, commit, push:
   ```bash
   git add script.js
   git commit -m "Wire waitlist to Formspree"
   git push
   ```
10. Cloudflare auto-redeploys in ~60s. Test the form at `activore.app`.

---

## 2. Cloudflare Web Analytics — already done ✅

Cloudflare auto-injects the analytics JS for sites on their network. No code changes needed.

To view your data:
- Cloudflare dashboard → **Analytics & logs** → **Web Analytics**
- Click `activore.app` to see visits, page views, Core Web Vitals, geography, browsers, etc.

To manage privacy settings:
- **Manage site** → choose between "Enable" (global) or "Enable, excluding EU" (privacy-extra)
- Both options are GDPR-safe since CF Web Analytics is cookieless and privacy-first.

---

## 3. Google Search Console + Bing Webmaster (10 min)

Without these, search engines barely know you exist.

### Google

1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**
2. Add a property → **Domain** → enter `activore.app`
3. Google gives you a TXT record to add to DNS for verification
4. In Cloudflare → **DNS** → **Records** → **Add record**
   - Type: `TXT`
   - Name: `@` (root)
   - Content: paste the Google verification string
   - TTL: Auto
5. Back in Search Console → **Verify**
6. Once verified → **Sitemaps** → submit `https://activore.app/sitemap.xml`

### Bing

1. Go to **[bing.com/webmasters](https://bing.com/webmasters)**
2. Sign in with Microsoft account
3. **Import from Google Search Console** (one-click — it pulls everything)

Or add manually using the same TXT-record verification flow.

---

## 4. (Optional) Convert OG image to PNG

The site uses an SVG for the social preview image (`assets/og.svg`). Most modern platforms (Twitter/X, Discord, iMessage) support SVG, but Facebook and LinkedIn prefer PNG.

To generate a PNG:

1. Open `assets/og.svg` in a browser (drag the file into Chrome)
2. Or use a free converter: [cloudconvert.com/svg-to-png](https://cloudconvert.com/svg-to-png)
3. Set dimensions to **1200 × 630**
4. Save as `assets/og.png`
5. In `index.html`, change `og.svg` references to `og.png` for `og:image` and `twitter:image`
6. Commit, push.

---

## 5. (When apps launch) — Update store links

In `index.html`, find both `<a href="#waitlist" class="app-cta">Get early access →</a>` lines. Replace with App Store + Google Play badges:

```html
<a href="https://apps.apple.com/...">
  <img src="assets/app-store-badge.svg" alt="Download on the App Store" />
</a>
<a href="https://play.google.com/...">
  <img src="assets/google-play-badge.svg" alt="Get it on Google Play" />
</a>
```

Free badge assets: [Apple guidelines](https://developer.apple.com/app-store/marketing/guidelines/) · [Google Play badges](https://play.google.com/intl/en_us/badges/)

---

## TL;DR — quickest path to a complete site

```
1. Sign up Formspree, paste ID into script.js, push.
2. Set up CF Analytics, replace REPLACE_WITH_YOUR_TOKEN, push.
3. Submit to Google Search Console + Bing.
```

20 minutes. Then you have: real waitlist capture, real analytics, search engine indexing.
