# Deploy Activore — free forever

Everything below is **100% free**. You'll end up with:
- Site live at **https://activore.app** (world's fastest CDN, free SSL)
- **hello@activore.app** email forwarding to your personal inbox
- Automatic redeploys whenever you change the site

---

## Part 1 — Push site to GitHub (5 min)

1. Create a free GitHub account at [github.com](https://github.com) if you don't have one.
2. Create a new repo named `activore-site` (Public or Private — either works).
3. On your computer, in the `activore-site` folder, run:

```bash
git init
git add .
git commit -m "Initial Activore site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/activore-site.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub handle.

---

## Part 2 — Deploy to Cloudflare Pages (free forever)

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) — free account.
2. In the left sidebar, click **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare to read your GitHub repos, then pick `activore-site`.
4. On the build config screen, use:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**.

~60 seconds later, your site is live at something like `activore-site.pages.dev`.

---

## Part 3 — Point activore.app to Cloudflare (15 min)

This moves DNS control to Cloudflare so you get free hosting, free SSL, and free email routing.

1. In Cloudflare, click **Websites** → **Add a site** → type `activore.app` → Free plan.
2. Cloudflare will scan your DNS records. Click **Continue**.
3. Cloudflare shows you **2 nameservers** like `lola.ns.cloudflare.com` and `max.ns.cloudflare.com`. Copy them.
4. Go to **Porkbun → your activore.app domain → Authoritative Nameservers**.
5. Replace the existing nameservers with Cloudflare's two. Save.
6. Back in Cloudflare, click **Check nameservers**. Propagation takes 5 min – 24 hrs (usually fast).

Once activated:
7. Go to your Pages project → **Custom domains** → **Set up a custom domain** → enter `activore.app` and `www.activore.app`. Cloudflare wires the DNS automatically.

Site is live at **https://activore.app**.

---

## Part 4 — Free `hello@activore.app` email

1. In Cloudflare dashboard → click your site → **Email** in the left sidebar → **Email Routing**.
2. Click **Get started**. Cloudflare auto-adds the MX records needed.
3. Under **Routes** → **Create address**:
   - Custom address: `hello@activore.app`
   - Destination: your personal email (Gmail, Outlook, whatever)
4. Verify the destination email (Cloudflare sends a confirmation link).
5. Done. Any email to `hello@activore.app` now lands in your personal inbox.

Add more addresses anytime: `support@`, `press@`, `daily-drip@`, `sound-meter@` — all free.

---

## Part 5 — Update the site

Edit files locally, then:

```bash
git add .
git commit -m "what you changed"
git push
```

Cloudflare rebuilds and deploys automatically in under a minute.

---

## When apps go live on Google Play / App Store

In `index.html`, replace each app card's "Get early access →" link with the real store badge + link. Commit, push, done.

---

## Recap

| What | Where | Cost |
|------|-------|------|
| Domain | Porkbun | ~$11/yr |
| Hosting | Cloudflare Pages | **Free** |
| SSL / HTTPS | Cloudflare | **Free** |
| Custom email forwarding | Cloudflore Email Routing | **Free** |
| DNS | Cloudflare | **Free** |
| Unlimited bandwidth | Cloudflare | **Free** |

Total: **$11/year** for a professional app studio with a custom domain and email.
