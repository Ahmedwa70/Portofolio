# Architecture

**Ahmed Sobhy — Academic Portfolio** · Version 1.0.0
Copyright © 2026 Ahmed Sobhy. All Rights Reserved. See [LICENSE.txt](LICENSE.txt).

> This document describes original architectural work. The layer separation,
> the single-resolver localisation model and the translation-completeness
> validator are part of the design of this project, not a pattern taken from
> a framework or template. The project uses no third-party code at all.

---

## The problem this architecture solves

A portfolio in nine languages, four of which use non-Latin scripts and one of
which is right-to-left, has one failure mode above all others: **language
logic leaking into presentation.** Once a single `if (lang === 'ar')` appears
in a renderer, every future change has to be made nine times, and the ninth is
the one that gets forgotten.

Everything below exists to make that impossible.

---

## Three layers

```
  js/data.js          DATA     what the site says about Ahmed Sobhy
        │
  js/translations.js  STRINGS  what the interface says, whoever it is about
        │
  js/app.js           ENGINE   resolution, rendering, routing, validation
        │
  index.html          VIEW     structure only — zero text
  css/style.css                design tokens and per-script typography
```

The rule that holds it together: **no text of any kind is written into
`index.html`, `css/style.css` or `js/app.js`.** Every visible string comes
from one of the two data files. Fallback text in HTML attributes exists only
so the page is readable if JavaScript never runs.

---

## DATA layer — `js/data.js`

`CV_DATA` is the single source of truth for everything personal.

**Translatable fields** are dictionaries keyed by language:

```js
degree: { en: "Bachelor of Industrial Education", ar: "بكالوريوس التعليم الصناعي", … }
```

**Non-translatable fields** stay plain strings, and the distinction is
deliberate:

| Kind | Example | Why plain |
|---|---|---|
| Years, periods | `year: "2021"`, `period: "2016 — 2026"` | Identical in every language |
| Contact | `email`, `phone` | Not language-dependent |
| Brand names | `social.linkedin.label: "LinkedIn"` | A trademark is not translated |

Institution names **are** translated (`المعهد العربي للدراسات` /
`Arabic Institute for Studies`), because an Arabic reader expects the Arabic
name while everyone else expects the official Latin one.

`SUPPORTED_LANGUAGES` at the top of the file is the canonical language
registry — code, label and text direction. Every other module reads from it;
nothing hardcodes a language list.

---

## STRINGS layer — `js/translations.js`

`UI_TRANSLATIONS` holds interface chrome only: navigation, section headings,
buttons, form labels, status text. Anything reusable for a different person's
CV belongs here; anything specific to Ahmed Sobhy belongs in `data.js`.

The two files are keyed in **opposite directions**, and that is intentional:

```
CV_DATA           content → language     one entry per CV item
UI_TRANSLATIONS   language → content     one block per language
```

Content is per-item and grows by item; interface strings are a fixed set that
grows by language. Each shape matches how its data actually changes.

### Adding a tenth language

1. Add the code to `SUPPORTED_LANGUAGES` in `data.js`, with the right `dir`.
2. Add that key to every translation dictionary in `CV_DATA`.
3. Add a full block to `UI_TRANSLATIONS`, using `en` as the shape reference.
4. If the script is non-Latin, add font stacks and tuning tokens in
   `style.css` next to the existing `html[lang="zh"]` blocks.

**No change to `index.html` or `app.js` is required.** The switcher, the
RTL/LTR flip and the SEO tags all derive from `SUPPORTED_LANGUAGES`.

---

## ENGINE layer — `js/app.js`

Wrapped in an IIFE; nothing internal is exposed on `window`.

### `getLocalizedValue(value, lang)`

The only place a multilingual dictionary is resolved to a display value.
Returns the requested language, falls back to English, then to an empty
string or array — it never returns `undefined` and never leaks an internal
key to a visitor.

A dictionary is recognised structurally: **an object whose keys are all
language codes.** The looser test "has at least one language code" cannot be
used, because `id` is simultaneously the ISO code for Indonesian and the
identifier field on every data item.

### `ui(lang, "path.to.key")`

The equivalent for interface strings, with the same English fallback.

### Renderers

One function per section, each building DOM from `CV_DATA`. Every value is
escaped, and every value that can sit beside another script or a digit is
wrapped by `bdi()` so the bidirectional algorithm cannot reorder the line.

### Validation system

Walks `CV_DATA` and `UI_TRANSLATIONS` recursively and reports missing or
empty translations, and arrays whose length differs from the English
reference. It runs **only** in development mode — `localhost`, `file://` or
`?debug`. In production it returns immediately and the console stays silent.

### Language routing

Priority: `?lang=` → `localStorage` → English. The chosen language is written
back to the URL with `history.replaceState`, and `<html lang dir>` is updated,
along with the title, meta description, Open Graph tags, `hreflang` links and
the canonical URL.

---

## VIEW layer — `index.html` + `css/style.css`

`index.html` carries structure and `data-i18n` / `data-i18n-cv` hooks. Three
attribute conventions:

| Attribute | Source |
|---|---|
| `data-i18n="nav.home"` | `UI_TRANSLATIONS` |
| `data-i18n-cv="hero.title1"` | `CV_DATA` |
| `data-i18n-attr="placeholder:form.namePlaceholder"` | `UI_TRANSLATIONS`, into an attribute |

### Typography system

Three layers of tokens, all declared in `:root`:

1. **Font stacks**, one per script family. Every per-language stack extends a
   *base* variable, never itself — a self-referential custom property is
   invalidated by CSS and silently falls back to Times New Roman.
2. **A seven-level scale** in `rem`: display · h1 · h2 · h3 · body-lg · body ·
   label. No rule anywhere hardcodes a pixel size.
3. **Per-script tuning.** Each language block redeclares only multipliers,
   line-heights and tracking — never a font-size. Arabic and CJK faces render
   smaller than Georgia at the same nominal size, so `--type-scale` and
   `--type-scale-display` correct them optically.

Letter-spacing and `text-transform: uppercase` resolve to zero and `none` for
Arabic and CJK: tracking severs Arabic cursive joins, and neither script has
letter case.

### Layout

Logical properties throughout (`inset-inline-start`, `padding-inline`,
`text-align: start`), so RTL is a direction change rather than a stylesheet.

---

## Design constraints

| Constraint | Consequence |
|---|---|
| No frameworks, no libraries | Zero supply-chain surface; nothing to update |
| No network at runtime | Fonts bundled; works from the filesystem |
| No build step | The published files are the source files |
| No per-language branching | A tenth language is a data change |
| No hardcoded text outside the data files | One place to edit any string |

---

## File map

| File | Layer | Role |
|---|---|---|
| `js/data.js` | DATA | `SUPPORTED_LANGUAGES` + `CV_DATA` |
| `js/translations.js` | STRINGS | `UI_TRANSLATIONS` |
| `js/app.js` | ENGINE | Resolver, renderers, routing, validator |
| `index.html` | VIEW | Structure and i18n hooks |
| `css/style.css` | VIEW | Tokens, type scale, per-script tuning |
| `meta/ownership.json` | META | Ownership and integrity manifest |
| `LICENSE.txt` | META | Terms |
| `ASSET_LICENSES.md` | META | Asset provenance |
