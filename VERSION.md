# Version History

**Project:** Ahmed Sobhy — Academic Portfolio
**Identifier:** `as-academic-portfolio`
**Owner:** Ahmed Sobhy
**Copyright:** © 2026 Ahmed Sobhy. All Rights Reserved. See [LICENSE.txt](LICENSE.txt).

Versions follow `MAJOR.MINOR.PATCH`:
**MAJOR** — a change to the architecture or the data contract.
**MINOR** — a new capability or section.
**PATCH** — content, copy or fixes with no structural change.

After any release, regenerate the integrity digests in
[`meta/ownership.json`](meta/ownership.json) so the manifest keeps matching
the files it describes.

---

## 1.0.0 — 2026-01-01

First published release.

### Architecture

- **Three-layer separation.** Personal content (`js/data.js`), interface
  strings (`js/translations.js`) and rendering logic (`js/app.js`) never mix.
  No text of any kind is hardcoded in `index.html`, `style.css` or `app.js`.
- **Single-resolver localisation.** Every multilingual field passes through
  one function, `getLocalizedValue()`. There is no per-language branching
  anywhere in the codebase — adding a tenth language touches data only.
- **Translation-completeness validator.** Walks `CV_DATA` and
  `UI_TRANSLATIONS` recursively and reports any gap. Development mode only;
  silent in production.

### Languages

Nine, each complete rather than partial:
English · Arabic · Chinese · Spanish · French · Turkish · Korean · Japanese ·
Indonesian.

Language is resolved from `?lang=` first, then `localStorage`, then English.
`<html lang dir>` and the whole layout flip with it.

### Typography

- Seven-level type scale in `rem`, so browser font-size settings are honoured.
- Per-script optical correction: Arabic and CJK faces render smaller than
  Georgia at the same `font-size`, so each script carries its own multiplier
  instead of a hardcoded size.
- Letter-spacing and uppercase are neutralised for Arabic and CJK, where they
  break cursive joins and word cohesion.
- Noto Sans Arabic bundled locally for Arabic long-form reading, restricted by
  `unicode-range` so Latin runs keep the system face.
- Bidirectional isolation (`<bdi>`) on every line that mixes scripts or digits.

### Accessibility

- WCAG AA contrast in both themes.
- Translated skip-to-content link.
- Semantic landmarks, one `<h1>`, no heading-level skips.
- Keyboard-navigable language listbox with correct ARIA roles.

### SEO

- Absolute `og:url` and `og:image`, computed at runtime for any domain.
- Nine `hreflang` alternates plus `x-default`, and a per-language canonical.
- Page titles kept under 60 characters in all nine languages.
- `robots.txt` and a multilingual `sitemap.xml`.

### Ownership

- Copyright metadata in HTML, JSON-LD and every source file.
- SHA-256 integrity manifest over all source and asset files.
- Automatic source attribution appended to substantial copied excerpts,
  weighted so the threshold is fair across scripts.

### Offline

Zero runtime network dependencies. No frameworks, no CDNs, no analytics, no
external fonts. Opens and works from the filesystem.

---

## Before publishing

- [ ] Replace `example.com` in `robots.txt` and `sitemap.xml` with the real domain.
- [ ] Add `personal.phone` in `js/data.js`, or leave it empty deliberately.
- [ ] Add CV PDFs to `assets/cv/` and fill `personal.cvFiles` — the download
      button stays hidden until at least one exists.
- [ ] Export a 180×180 `apple-touch-icon.png` for iOS home screens.
- [ ] Add a Copyright field to the EXIF of `assets/images/profile.jpg`.
- [ ] Timestamp `meta/ownership.json` (git commit, or a timestamping service)
      so the digests can be tied to a date.
