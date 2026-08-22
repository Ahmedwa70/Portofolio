# -*- coding: utf-8 -*-
"""Regenerate meta/ownership.json.

Every source, asset and metadata file is hashed with SHA-256 and grouped by
role, so the manifest doubles as a file inventory. Re-run after ANY change,
then timestamp the result (a git commit is enough) so the digests can be tied
to a date."""
import hashlib, io, json, os, sys, datetime

ROOT = sys.argv[1]
VERSION = "1.0.0"
CREATED = "2026-01-01"

GROUPS = [
    ("markup",   ["index.html"]),
    ("styles",   ["css/style.css"]),
    ("scripts",  ["js/app.js", "js/data.js", "js/translations.js"]),
    ("images",   ["assets/images/profile.jpg",
                  "assets/images/favicon.svg",
                  "assets/images/profile-placeholder.svg",
                  "assets/images/wechat-qr.jpg"]),
    ("fonts",    ["assets/fonts/NotoSansArabic-Regular.woff2",
                  "assets/fonts/NotoSansArabic-Medium.woff2",
                  "assets/fonts/NotoSansArabic-SemiBold.woff2",
                  "assets/fonts/OFL.txt"]),
    ("metadata", ["site.webmanifest", "robots.txt", "sitemap.xml",
                  "LICENSE.txt", "VERSION.md", "ARCHITECTURE.md",
                  "ASSET_LICENSES.md", "RELEASE_NOTES.md", "README.md"]),
]

files, groups, missing = {}, {}, []
combined = hashlib.sha256()
total_bytes = 0

for group, rels in GROUPS:
    groups[group] = []
    for rel in rels:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p):
            missing.append(rel)
            continue
        raw = open(p, "rb").read()
        digest = hashlib.sha256(raw).hexdigest()
        files[rel] = {"sha256": digest, "bytes": len(raw), "group": group}
        groups[group].append(rel)
        combined.update(rel.encode("utf-8") + b"\0" + digest.encode("ascii") + b"\n")
        total_bytes += len(raw)

today = datetime.datetime.now().strftime("%Y-%m-%d")

manifest = {
    "$schema": "https://ahmedsobhy.invalid/schemas/ownership-manifest-1.json",
    "$comment": (
        "Ownership and integrity manifest. Each sha256 is of the file's exact "
        "bytes as published. Regenerate after any change and timestamp the "
        "result so the digests can be tied to a date."
    ),
    "manifestVersion": "1.0",

    "project": {
        "id": "as-academic-portfolio",
        "name": "Ahmed Sobhy - Academic Portfolio",
        "description": (
            "Offline-first multilingual academic portfolio for an Arabic "
            "language educator. Nine complete languages, right-to-left and "
            "left-to-right, no frameworks and no runtime network dependency."
        ),
        "version": VERSION,
        "created": CREATED,
        "updated": today,
        "status": "Published"
    },

    "owner": {
        "name": "Ahmed Sobhy",
        "role": "Author, designer and sole developer",
        "contact": "Ahmedwa70@yahoo.com",
        "profiles": {"linkedin": "https://www.linkedin.com/in/ahmedwa70/"}
    },

    "copyright": {
        "holder": "Ahmed Sobhy",
        "year": 2026,
        "notice": "Copyright (c) 2026 Ahmed Sobhy. All Rights Reserved.",
        "license": "LICENSE.txt",
        "licenseType": "Proprietary - All Rights Reserved",
        "covers": [
            "Original visual design and design-token system",
            "Original software architecture and implementation",
            "All written content in all nine languages",
            "Original photography, icons and vector graphics"
        ],
        "excludes": [
            "Noto Sans Arabic - Copyright 2022 The Noto Project Authors, SIL OFL 1.1"
        ]
    },

    "architecture": {
        "documentation": "ARCHITECTURE.md",
        "model": "Three-layer separation: DATA / STRINGS / ENGINE, with a text-free VIEW",
        "layers": {
            "data":    {"file": "js/data.js",
                        "exposes": "SUPPORTED_LANGUAGES, CV_DATA",
                        "role": "Single source of truth for personal content"},
            "strings": {"file": "js/translations.js",
                        "exposes": "UI_TRANSLATIONS",
                        "role": "Interface chrome only, keyed language-first"},
            "engine":  {"file": "js/app.js",
                        "exposes": "nothing - wrapped in an IIFE",
                        "role": "Resolver, renderers, language routing, validator"},
            "view":    {"files": ["index.html", "css/style.css"],
                        "role": "Structure and presentation - contains no text"}
        },
        "distinctiveElements": [
            "getLocalizedValue() - the single point where any multilingual field resolves",
            "Structural dictionary detection - avoids the 'id' collision between the Indonesian language code and the identifier field",
            "Development-only translation-completeness validator across nine languages",
            "Seven-level rem type scale with per-script optical multipliers",
            "bdi() bidirectional isolation for lines mixing scripts or digits",
            "Arabic long-form reading layer with unicode-range-scoped local Noto Sans Arabic",
            "Script-weighted copy-attribution threshold, fair across writing systems"
        ],
        "constraints": [
            "No frameworks, libraries or third-party code",
            "No build step - published files are the source files",
            "No runtime network requests",
            "No per-language branching anywhere in the codebase",
            "No hardcoded text outside the two data files"
        ]
    },

    "languages": {
        "count": 9,
        "default": "en",
        "supported": [
            {"code": "en", "name": "English",           "dir": "ltr"},
            {"code": "ar", "name": "Arabic",            "dir": "rtl"},
            {"code": "zh", "name": "Chinese",           "dir": "ltr"},
            {"code": "es", "name": "Spanish",           "dir": "ltr"},
            {"code": "fr", "name": "French",            "dir": "ltr"},
            {"code": "tr", "name": "Turkish",           "dir": "ltr"},
            {"code": "ko", "name": "Korean",            "dir": "ltr"},
            {"code": "ja", "name": "Japanese",          "dir": "ltr"},
            {"code": "id", "name": "Indonesian",        "dir": "ltr"}
        ],
        "completeness": "Every field is authored in all nine languages; a development-mode validator enforces it."
    },

    "assets": {
        "documentation": "ASSET_LICENSES.md",
        "original": {
            "photography": ["assets/images/profile.jpg"],
            "graphics": ["assets/images/favicon.svg",
                         "assets/images/profile-placeholder.svg"],
            "inlineVector": "16 stroke icons defined in js/app.js (ICONS), plus the Arabic calligraphy watermark and theme icons in index.html"
        },
        "thirdParty": [
            {
                "name": "Noto Sans Arabic",
                "files": ["assets/fonts/NotoSansArabic-Regular.woff2",
                          "assets/fonts/NotoSansArabic-Medium.woff2",
                          "assets/fonts/NotoSansArabic-SemiBold.woff2"],
                "copyright": "Copyright 2022 The Noto Project Authors",
                "license": "SIL Open Font License 1.1",
                "licenseFile": "assets/fonts/OFL.txt",
                "upstream": "https://github.com/notofonts/arabic"
            }
        ],
        "systemFonts": "Referenced in CSS stacks, loaded from the visitor's device, not redistributed."
    },

    "integrity": {
        "algorithm": "sha256",
        "generated": today,
        "fileCount": len(files),
        "totalBytes": total_bytes,
        "combined": combined.hexdigest(),
        "combinedNote": "sha256 over 'path\\0digest\\n' for every file, in the order listed.",
        "groups": groups,
        "files": files
    }
}

if missing:
    manifest["integrity"]["missing"] = missing

out = os.path.join(ROOT, "meta")
if not os.path.isdir(out):
    os.makedirs(out)
io.open(os.path.join(out, "ownership.json"), "w", encoding="utf-8", newline="").write(
    json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")

print("files hashed: %d  (%.1f KB)" % (len(files), total_bytes / 1024.0))
print("combined:", combined.hexdigest())
print("missing:", ", ".join(missing) if missing else "none")
