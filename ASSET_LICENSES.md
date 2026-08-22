# Asset Provenance & Licences

**Ahmed Sobhy — Academic Portfolio** · Version 1.0.0

Every file shipped with this project is listed below, separated into work
owned by Ahmed Sobhy and work licensed from third parties. SHA-256 digests for
all of them are recorded in [`meta/ownership.json`](meta/ownership.json).

---

## 1. Original work — © 2026 Ahmed Sobhy, All Rights Reserved

Covered by [LICENSE.txt](LICENSE.txt). Not licensed for reuse.

### Photography

| File | Description | Notes |
|---|---|---|
| `assets/images/profile.jpg` | Studio portrait of Ahmed Sobhy, 900 × 1256 | Subject and rights holder are the same person. Not licensed for any third-party use. |

> **Open item:** this file currently carries no EXIF or XMP metadata — no
> copyright field, no creator, no rights statement. Embedding one with
> `exiftool` or Lightroom would let the claim travel with the file if it is
> ever separated from the site.

### Graphics

| File | Description | Notes |
|---|---|---|
| `assets/images/favicon.svg` | Browser-tab mark: navy ground, gold arch, "AS" monogram | Hand-authored SVG. Detail deliberately minimal so it survives 16 × 16. |
| `assets/images/profile-placeholder.svg` | Fallback monogram shown before the portrait loads | Hand-authored SVG. |

### Inline vector work (not separate files)

| Location | Description |
|---|---|
| `js/app.js` → `ICONS` | Sixteen stroke icons drawn for this project — years, globe, content, system, culture, chat, student, activity, mic, tech, certificate, language, book, computer, design, linkedin. Consistent 24 × 24 grid, 1.6 stroke, `currentColor`. |
| `index.html` → `.hero-calligraphy` | The Arabic word **اقرأ** as a background watermark. |
| `index.html` → theme and chevron icons | Sun, moon and chevron marks. |

> The `linkedin` icon is an original stroke drawing in this project's icon
> style. It is **not** the LinkedIn brand asset and does not use LinkedIn's
> colours. "LinkedIn" is a trademark of Microsoft Corporation, referenced here
> nominatively to identify a profile link.

### Design system

Not files, but original work covered by the licence: the Deep Navy / Gold /
Turquoise token set, the arched portrait treatment, the seven-level type scale
with its per-script optical multipliers, and the layout system. See
[ARCHITECTURE.md](ARCHITECTURE.md).

---

## 2. Third-party — NOT owned by Ahmed Sobhy

### Noto Sans Arabic

| | |
|---|---|
| **Files** | `assets/fonts/NotoSansArabic-Regular.woff2` (400) · `-Medium.woff2` (500) · `-SemiBold.woff2` (600) |
| **Copyright** | Copyright 2022 The Noto Project Authors |
| **Licence** | SIL Open Font License, Version 1.1 |
| **Licence text** | [`assets/fonts/OFL.txt`](assets/fonts/OFL.txt) — required to ship with the fonts |
| **Source** | Google Fonts, Arabic-subset WOFF2 builds |
| **Upstream** | https://github.com/notofonts/arabic |

**Obligations under the OFL, and how they are met:**

| Requirement | Status |
|---|---|
| Ship the licence text with the fonts | `assets/fonts/OFL.txt` ✅ |
| Keep the copyright notice intact | Unmodified font files ✅ |
| Do not sell the fonts on their own | Not sold ✅ |
| Do not use the reserved font name on a modified version | Fonts are unmodified ✅ |

The fonts are **excluded** from this project's licence. Anyone may take them
under the OFL; that permission does not extend to anything else here.

---

## 3. System fonts — referenced, not shipped

Named in CSS font stacks and loaded from the visitor's own machine. Nothing is
redistributed and no licence applies to this project.

| Script | Stack |
|---|---|
| Latin display | Georgia · Iowan Old Style · Palatino Linotype · Book Antiqua |
| Latin body | system UI stack |
| Arabic display | Traditional Arabic · Scheherazade New · Amiri |
| Arabic body | Segoe UI · Noto Sans Arabic · Dubai · Geeza Pro · Tahoma |
| Chinese | Songti SC · PingFang SC · Microsoft YaHei · Heiti SC |
| Japanese | Hiragino Mincho ProN · Yu Mincho · Hiragino Kaku Gothic ProN · Yu Gothic · Meiryo |
| Korean | Apple SD Gothic Neo · Malgun Gothic |
| Monospace | Courier New |

---

## 4. Code dependencies

**None.** No framework, no library, no polyfill, no build tool, no analytics,
no CDN. Every line of JavaScript and CSS in this project was written for it.

This is a deliberate constraint, not an accident: it means there is no
third-party code to audit, no supply chain to trust, no version to keep
current, and no network request at runtime.

---

## 5. Content

All written content in all nine languages — professional titles, biography,
experience, teaching methodology, project description, and every interface
string — is original work by Ahmed Sobhy, covered by
[LICENSE.txt](LICENSE.txt).

---

## Summary

| Category | Owner | Licence |
|---|---|---|
| Photography, graphics, icons | Ahmed Sobhy | All Rights Reserved |
| Design system and architecture | Ahmed Sobhy | All Rights Reserved |
| Content, nine languages | Ahmed Sobhy | All Rights Reserved |
| Noto Sans Arabic | The Noto Project Authors | SIL OFL 1.1 |
| System fonts | Their vendors | Not redistributed |
| Third-party code | — | None used |
