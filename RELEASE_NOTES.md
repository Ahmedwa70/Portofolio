# Ahmed Sobhy Portfolio

**Version 1.0.0** · Released 2026-01-01

Initial public release.

---

## Included

- **Multilingual portfolio system** — nine complete languages, switchable
  without a page reload, with the chosen language kept in the URL and
  remembered on return.
- **Academic profile architecture** — content, interface strings and rendering
  logic kept in separate layers, so the CV is edited as data and never as code.
- **Digital learning project showcase** — a dedicated section for the
  Interactive Arabic Learning System.
- **Responsive design** — a single layout from 375 px phones to desktop, with
  right-to-left handled as a direction change rather than a second stylesheet.
- **Offline capability** — no frameworks, no CDNs, no analytics, no external
  fonts. The site opens and works straight from the filesystem.

## Also in this release

- **Typography tuned per script.** Arabic and CJK faces render smaller than
  Georgia at the same nominal size, so each script carries its own optical
  correction. Letter-spacing and uppercase are switched off for Arabic and
  CJK, where they break cursive joins and word cohesion.
- **Arabic reading layer.** Noto Sans Arabic bundled locally for long-form
  Arabic text, scoped by `unicode-range` so Latin runs keep the system face.
- **Accessibility.** WCAG AA contrast in both light and dark themes, a
  translated skip link, semantic landmarks and a keyboard-navigable language
  menu.
- **Search visibility.** Per-language canonical URLs, nine `hreflang`
  alternates plus `x-default`, absolute Open Graph and Twitter tags, and page
  titles kept under 60 characters in every language.
- **Print stylesheet.** The page prints as a clean academic CV — navigation,
  controls, the contact form and decorative elements are dropped, and no
  qualification is split across a page break.
- **Ownership framework.** Copyright metadata in the markup, structured data
  and every source file, plus a SHA-256 integrity manifest over all twenty
  source and asset files.

## Languages

English · العربية · 中文 · Español · Français · Türkçe · 한국어 · 日本語 ·
Bahasa Indonesia

Every field is authored in all nine — a development-mode validator reports any
gap, so partial coverage cannot ship unnoticed.

## Known limitations

- The CV download button stays hidden until at least one PDF is added to
  `assets/cv/` and registered in `personal.cvFiles`.
- Five qualification descriptions and the phone number are intentionally
  empty.
- The contact form opens the visitor's email client; it does not send mail
  itself.

## Before deploying

`robots.txt` and `sitemap.xml` ship with a placeholder domain that must be
replaced. The full checklist is at the end of [VERSION.md](VERSION.md).

---

Copyright © 2026 Ahmed Sobhy. All Rights Reserved. See [LICENSE.txt](LICENSE.txt).
