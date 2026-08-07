# Hammer Mechanical — Website

Multi-page marketing site for **Hammer Mechanical** — Electrical, Plumbing & HVAC in
Hamilton, Ontario and Southern Ontario. Built on the same structure as the DHEM
Heating & Cooling site, restyled in **black and yellow**.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home — hero, why-choose, services grid, gallery, overviews, credentials, testimonials, quote form |
| `electrical.html` | Electrical Services (new page — not in the DHEM original) |
| `plumbing.html` | Plumbing Services (new page — not in the DHEM original) |
| `heating.html` `cooling.html` `heat-pumps.html` `indoor-air-quality.html` `ductwork.html` `water-heating.html` `smart-home.html` `maintenance.html` `emergency.html` | Service pages mirroring the DHEM page set |
| `style.css` / `script.js` | Shared styles (recolored black/yellow) and behaviour |
| `style.min.css` / `script.min.js` | Minified copies (same recolor). Not referenced by any page — swap the `<link>`/`<script>` tags to them for production if you want the smaller files |
| `sitemap.xml` / `robots.txt` / `llms.txt` | SEO files (point at hammermechanical.ca — update if the domain differs) |

## Run it locally

```bash
python -m http.server 8317
```

then open http://localhost:8317. (Or just double-click `index.html`.)

## Image placeholders — drop files into `images/`

Every image slot is intentionally blank. Add files with these exact names (see the
`src` attributes in each page for the full list):

- **Branding:** `hammer_logo.png`, `favicon.ico`, `apple-touch-icon.png`,
  `call_now_button.png`, `limited_time_offer_button.png`, `hammer_deal_ad.jpg`,
  `hammer_service_van_photo.jpg`
- **Home page:** `licensed_technician_photo.jpg`, `quality_installation_photo.jpg`,
  `clean_worksite_photo.jpg`, 11 × `*_main_photo.jpg` (services grid),
  `gallery_photo_01.jpg` … `gallery_photo_13.jpg`, 10 × `*_overview_photo.jpg`
- **Credentials/affiliates:** `esa_logo.png`, `tssa_logo.png`, `wsib_logo.png`,
  `skilled_trades_ontario_logo.png`, `affiliated_logo_1.png` … `affiliated_logo_5.png`
- **Service pages:** each page's hero + section photos (named after the section topic)

## Before launch — replace the placeholders

1. **Phone** — `(905) 555-0123` / `tel:19055550123` everywhere (find & replace).
2. **Email** — `info@hammermechanical.ca` if different.
3. **Address** — `123 Example Street (Unit 1), Hamilton, Ontario` in every footer,
   plus the Google Maps link.
4. **Hero testimonials** on `index.html` — sample reviews; replace with real ones.
5. **Quote form** — get a free access key at [web3forms.com](https://web3forms.com)
   and replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` in `index.html`.
6. **Testimonials widget** — create a Google Reviews widget at
   [elfsight.com](https://elfsight.com) and replace
   `elfsight-app-REPLACE-WITH-YOUR-WIDGET-ID` in `index.html`.
7. **Credentials** — confirm ESA/TSSA/WSIB/Skilled Trades Ontario apply before launch.
8. **Domain** — update `canonical` links, `sitemap.xml`, `robots.txt`, `llms.txt`
   if the real domain isn't hammermechanical.ca.

## Colors

The palette lives in `:root` at the top of `style.css`:
`--orange: #ffc400` (primary yellow — the variable kept its original name from the
DHEM stylesheet), `--blue-light: #ffd83d` (bright yellow accent), `--blue-dark: #d9a600`.
Sections that were solid blue in the DHEM design are now near-black (`#0b0d10`).
