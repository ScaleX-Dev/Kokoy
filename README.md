# KOKOY Pool Club website

Next.js 16 site for KOKOY Pool Club, Unawatuna (English at `/en`, Russian at `/ru`).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
npm run lint
```

## Going live

1. **Set the domain.** Add `NEXT_PUBLIC_SITE_URL` (e.g. `https://kokoy.lk`, no trailing slash) to the
   host's environment *before building*. It feeds canonical links, hreflang, the sitemap, robots.txt,
   social previews and the structured data. On Vercel the production domain is used automatically if
   it is not set; anywhere else the site falls back to `localhost`.
2. **Fill in the contact details** in `src/lib/content.ts`: `whatsapp` (digits with country code, e.g.
   `9477…`; while empty, every WhatsApp button opens a contact picker), `email` (hidden while empty),
   the Google/Yandex map links, and the map pin in `src/components/ui/KokoyMap.tsx`.
3. **Search engines.** After launch, add the domain to Google Search Console and Yandex Webmaster,
   submit `/sitemap.xml`, and create or claim the Google Business Profile with the same name, hours
   and website.

Every open item is marked `TODO(confirm)` in the code: `grep -rn "TODO(confirm)" src`.

## Media

The hero films in `public/video` are encoded from the master `KOKOY_WEB_VID1.mp4`, which is kept
outside the repo (`~/Documents/KOKOY-media`, with the portrait framing keyframes in
`hero-portrait-keys.py`). See the note on `heroVideo` in `src/lib/content.ts`.
