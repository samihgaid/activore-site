# Activore

Apps for people who love doing things.

Umbrella brand site for **The Daily Drip** and **Sound Meter** (and more to come).

## Stack

Static HTML, CSS, and JavaScript. No build step. Deploys anywhere.

## Local preview

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

See [`DEPLOY.md`](./DEPLOY.md) for the full Cloudflare Pages + Email Routing walkthrough.

## Structure

```
activore-site/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── favicon.svg
│   ├── daily-drip-icon.png
│   └── ...
├── DEPLOY.md
└── README.md
```
